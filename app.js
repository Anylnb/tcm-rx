// TCM Prescription Tool - App Logic
const searchInput = document.getElementById('searchInput');
const dropdown = document.getElementById('dropdown');
const rxBody = document.getElementById('rxBody');
const emptyState = document.getElementById('emptyState');
const rxOutput = document.getElementById('rxOutput');
let rxItems = [];

document.getElementById('rxDate').valueAsDate = new Date();

// Herb lookup
const herbMap = {};
HERBS.forEach(h => { herbMap[h.pinyin] = h; });

// Build pinyin initials for each item: "Chuan Xiong" -> "cx", "Gui Zhi Tang" -> "gzt"
function getInitials(pinyin) {
  return pinyin.split(/[\s\-]+/).map(w => w[0] || '').join('').toLowerCase();
}

// Search: supports full pinyin, Chinese, English, AND pinyin initials (cx, gzt, etc.)
function matchItem(item, q) {
  const py = item.pinyin.toLowerCase();
  const ini = getInitials(item.pinyin);
  const ql = q.toLowerCase();
  // Pinyin initials match (e.g. "cx" matches "Chuan Xiong")
  if (ini.startsWith(ql)) return 2; // high priority
  // Full pinyin contains
  if (py.includes(ql)) return 1;
  // Chinese contains
  if (item.cn.includes(q)) return 1;
  // English contains
  if (item.en && item.en.toLowerCase().includes(ql)) return 1;
  return 0;
}

searchInput.addEventListener('input', function() {
  const q = this.value.trim();
  if (q.length < 1) { dropdown.style.display = 'none'; return; }

  // Score and sort herbs
  let herbs = HERBS.map(h => ({ ...h, score: matchItem(h, q) }))
    .filter(h => h.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 15);

  // Score and sort formulas
  let formulas = FORMULAS.map(f => ({ ...f, score: matchItem(f, q) }))
    .filter(f => f.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  let html = '';
  if (herbs.length) {
    html += '<div class="gl">🌿 單味藥</div>';
    herbs.forEach(h => {
      html += `<div class="item" onclick="addHerb('${esc(h.pinyin)}')">
        <span>${h.pinyin} <span class="cn">${h.cn}</span><span class="tag tag-h">藥</span></span>
        <span class="en">${h.en}</span></div>`;
    });
  }
  if (formulas.length) {
    html += '<div class="gl">📜 方劑</div>';
    formulas.forEach(f => {
      const hl = f.herbs.map(h => h.cn).join(' ');
      html += `<div class="item" onclick="addFormula('${esc(f.pinyin)}')">
        <span>${f.pinyin} <span class="cn">${f.cn}</span><span class="tag tag-f">方</span></span>
        <span class="en" style="max-width:180px;text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${hl}</span></div>`;
    });
  }
  if (!html) html = '<div class="item" style="color:#bbb">找不到結果</div>';
  dropdown.innerHTML = html;
  dropdown.style.display = 'block';
});

document.addEventListener('click', e => {
  if (!e.target.closest('.search-box')) dropdown.style.display = 'none';
});

function esc(s) { return s.replace(/'/g, "\\'"); }

function addHerb(pinyin) {
  const h = herbMap[pinyin];
  if (!h) return;
  rxItems.push({ pinyin: h.pinyin, cn: h.cn, en: h.en, gPerDose: 1, price: h.price, src: '' });
  dropdown.style.display = 'none';
  searchInput.value = '';
  searchInput.focus();
  renderTable();
}

function addFormula(pinyin) {
  const f = FORMULAS.find(x => x.pinyin === pinyin);
  if (!f) return;
  f.herbs.forEach(fh => {
    const herb = herbMap[fh.name];
    rxItems.push({
      pinyin: fh.name, cn: fh.cn, en: herb ? herb.en : '',
      gPerDose: fh.g, price: herb ? herb.price : 0.15, src: f.cn
    });
  });
  dropdown.style.display = 'none';
  searchInput.value = '';
  searchInput.focus();
  renderTable();
}

function removeItem(i) { rxItems.splice(i, 1); renderTable(); }
function updateG(i, v) { rxItems[i].gPerDose = parseFloat(v) || 0; recalc(); }
function updatePrice(i, v) { rxItems[i].price = parseFloat(v) || 0; recalc(); }

function renderTable() {
  if (!rxItems.length) {
    rxBody.innerHTML = '';
    emptyState.style.display = 'block';
    recalc();
    return;
  }
  emptyState.style.display = 'none';
  const t = parseInt(document.getElementById('timesPerDay').value);
  const d = parseInt(document.getElementById('numDoses').value);
  rxBody.innerHTML = rxItems.map((item, i) => {
    const dg = (item.gPerDose * t).toFixed(1);
    const tg = (item.gPerDose * t * d).toFixed(1);
    const st = (tg * item.price).toFixed(2);
    const src = item.src ? `<span class="src">${item.src}</span>` : '';
    return `<tr>
      <td>${item.pinyin} ${src}</td>
      <td>${item.cn}</td>
      <td><input type="number" value="${item.gPerDose}" min="0" max="20" step="0.1" onchange="updateG(${i},this.value)"></td>
      <td>${dg}</td><td>${tg}</td>
      <td><input type="number" value="${item.price}" min="0" step="0.01" onchange="updatePrice(${i},this.value)"></td>
      <td>$${st}</td>
      <td><button class="btn btn-rm" onclick="removeItem(${i})">✕</button></td>
    </tr>`;
  }).join('');
  recalc();
}

function recalc() {
  const t = parseInt(document.getElementById('timesPerDay').value);
  const d = parseInt(document.getElementById('numDoses').value);
  let dailyG = 0, cost = 0;
  rxItems.forEach(item => {
    const dg = item.gPerDose * t;
    dailyG += dg;
    cost += dg * d * item.price;
  });
  document.getElementById('sItems').textContent = rxItems.length;
  document.getElementById('sDailyG').textContent = dailyG.toFixed(1) + ' g';
  document.getElementById('sDoses').textContent = d;
  document.getElementById('sCost').textContent = '$' + cost.toFixed(2);
  genOutput();
}

function genOutput() {
  const name = document.getElementById('patientName').value || '___';
  const date = document.getElementById('rxDate').value;
  const d = parseInt(document.getElementById('numDoses').value);
  const t = parseInt(document.getElementById('timesPerDay').value);

  if (!rxItems.length) {
    rxOutput.value = '';
    return;
  }

  // Group by formula source
  const groups = {};
  const singles = [];
  rxItems.forEach(item => {
    if (item.src) {
      if (!groups[item.src]) groups[item.src] = [];
      groups[item.src].push(item);
    } else {
      singles.push(item);
    }
  });

  let lines = [];
  lines.push('═══════════════════════════════');
  lines.push('        中 醫 處 方 箋');
  lines.push('═══════════════════════════════');
  lines.push(`患者: ${name}`);
  lines.push(`日期: ${date}`);
  lines.push(`劑數: ${d} 劑    每日 ${t} 次`);
  lines.push('───────────────────────────────');

  let totalDaily = 0;
  let totalCost = 0;

  // Output formula groups
  for (const [fname, items] of Object.entries(groups)) {
    lines.push(`\n【${fname}】`);
    items.forEach(item => {
      const dg = item.gPerDose * t;
      const tg = dg * d;
      totalDaily += dg;
      totalCost += tg * item.price;
      lines.push(`  ${item.cn} (${item.pinyin})  ${item.gPerDose}g/次  ${dg.toFixed(1)}g/日`);
    });
  }

  // Output single herbs
  if (singles.length) {
    lines.push('\n【單味藥】');
    singles.forEach(item => {
      const dg = item.gPerDose * t;
      const tg = dg * d;
      totalDaily += dg;
      totalCost += tg * item.price;
      lines.push(`  ${item.cn} (${item.pinyin})  ${item.gPerDose}g/次  ${dg.toFixed(1)}g/日`);
    });
  }

  lines.push('\n───────────────────────────────');
  lines.push(`每日總克數: ${totalDaily.toFixed(1)} g`);
  lines.push(`總劑數:     ${d} 劑`);
  lines.push(`總費用:     $${totalCost.toFixed(2)}`);
  lines.push('═══════════════════════════════');

  rxOutput.value = lines.join('\n');
}

function copyRx() {
  rxOutput.select();
  navigator.clipboard.writeText(rxOutput.value).then(() => {
    const btn = document.getElementById('copyBtn');
    btn.textContent = '✅ 已複製！';
    setTimeout(() => { btn.textContent = '📋 複製處方'; }, 1500);
  });
}

function clearAll() {
  if (rxItems.length && !confirm('確定要清空處方嗎？')) return;
  rxItems = [];
  renderTable();
}

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Escape') dropdown.style.display = 'none';
});
