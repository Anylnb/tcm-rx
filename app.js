// TCM Prescription Tool - Single Page App
// ========== TAB SWITCHING ==========
function switchTab(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  // Activate the clicked tab button
  document.querySelectorAll('.tab').forEach(t => { if(t.onclick.toString().includes("'"+id+"'")) t.classList.add('active'); });
  if (id === 'inv') renderInv();
  if (id === 'hist') renderHist();
}

// ========== SHARED ==========
const herbMap = {};
HERBS.forEach(h => { herbMap[h.pinyin] = h; });
function esc(s) { return s.replace(/'/g, "\\'"); }
function getInitials(py) { return py.split(/[\s\-]+/).map(w => w[0]||'').join('').toLowerCase(); }

// ========== PRESCRIPTION ==========
const searchInput = document.getElementById('searchInput');
const dropdown = document.getElementById('dropdown');
const rxBody = document.getElementById('rxBody');
const emptyState = document.getElementById('emptyState');
const rxOutput = document.getElementById('rxOutput');
let rxItems = [];
let unit = 'g';
const QIAN_G = 3.75;

document.getElementById('rxDate').valueAsDate = new Date();
if (!localStorage.getItem('tcm_inventory')) Inventory.initDefaults(HERBS);

function g2d(g) { return unit==='qian' ? g/QIAN_G : g; }
function d2g(v) { return unit==='qian' ? v*QIAN_G : v; }
function ul() { return unit==='qian' ? '錢' : 'g'; }

function setUnit(u) {
  unit = u;
  document.getElementById('btnG').classList.toggle('active', u==='g');
  document.getElementById('btnQ').classList.toggle('active', u==='qian');
  const l = ul();
  document.getElementById('thPer').textContent = l+'/dose';
  document.getElementById('thDay').textContent = l+'/day';
  document.getElementById('thTot').textContent = 'Total('+l+')';
  renderRx();
}

function matchItem(item, q) {
  const ql = q.toLowerCase();
  if (getInitials(item.pinyin).startsWith(ql)) return 2;
  if (item.pinyin.toLowerCase().includes(ql)) return 1;
  if (item.cn.includes(q)) return 1;
  if (item.en && item.en.toLowerCase().includes(ql)) return 1;
  return 0;
}

searchInput.addEventListener('input', function() {
  const q = this.value.trim();
  if (q.length < 1) { dropdown.style.display = 'none'; return; }
  let hh = HERBS.map(h=>({...h,sc:matchItem(h,q)})).filter(h=>h.sc>0).sort((a,b)=>b.sc-a.sc).slice(0,12);
  let ff = FORMULAS.map(f=>({...f,sc:matchItem(f,q)})).filter(f=>f.sc>0).sort((a,b)=>b.sc-a.sc).slice(0,8);
  let html = '';
  if (hh.length) {
    html += '<div class="gl">🌿 Single Herbs 單味藥</div>';
    hh.forEach(h => { html += `<div class="di" onclick="addHerb('${esc(h.pinyin)}')"><span>${h.pinyin} <span class="cn">${h.cn}</span><span class="tag tag-h">藥</span></span><span class="en">${h.en}</span></div>`; });
  }
  if (ff.length) {
    html += '<div class="gl">📜 Formulas 方劑</div>';
    ff.forEach(f => { html += `<div class="di" onclick="addFormula('${esc(f.pinyin)}')"><span>${f.pinyin} <span class="cn">${f.cn}</span><span class="tag tag-f">方</span></span><span class="en" style="max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${f.herbs.map(h=>h.cn).join(' ')}</span></div>`; });
  }
  if (!html) html = '<div class="di" style="color:#ccc">No results</div>';
  dropdown.innerHTML = html;
  dropdown.style.display = 'block';
});
document.addEventListener('click', e => { if (!e.target.closest('.search-wrap')) dropdown.style.display = 'none'; });
searchInput.addEventListener('keydown', e => { if (e.key==='Escape') dropdown.style.display='none'; });

function addHerb(py) {
  const h = herbMap[py]; if (!h) return;
  rxItems.push({pinyin:h.pinyin,cn:h.cn,en:h.en,gPerDose:1,price:h.price,src:''});
  dropdown.style.display='none'; searchInput.value=''; searchInput.focus(); renderRx();
}
function addFormula(py) {
  const f = FORMULAS.find(x=>x.pinyin===py); if (!f) return;
  f.herbs.forEach(fh => {
    const h = herbMap[fh.name];
    rxItems.push({pinyin:fh.name,cn:fh.cn,en:h?h.en:'',gPerDose:fh.g,price:h?h.price:0.15,src:f.cn});
  });
  dropdown.style.display='none'; searchInput.value=''; searchInput.focus(); renderRx();
}
function removeItem(i) { rxItems.splice(i,1); renderRx(); }
function updateDose(i,v) { rxItems[i].gPerDose = d2g(parseFloat(v)||0); recalc(); }
function updatePrice(i,v) { rxItems[i].price = parseFloat(v)||0; recalc(); }

function renderRx() {
  if (!rxItems.length) { rxBody.innerHTML=''; emptyState.style.display='block'; recalc(); return; }
  emptyState.style.display='none';
  const t=parseInt(document.getElementById('timesPerDay').value), d=parseInt(document.getElementById('numDoses').value);
  rxBody.innerHTML = rxItems.map((item,i) => {
    const pd=g2d(item.gPerDose), dg=item.gPerDose*t, dd=g2d(dg), tg=dg*d, td=g2d(tg), st=(tg*item.price).toFixed(2);
    const src = item.src ? `<span class="src-tag">${item.src}</span>` : '';
    const stock = Inventory.getStock(item.pinyin), jars=(stock/100).toFixed(1);
    const sc = stock<=0?'stk-out':stock<tg?'stk-low':'stk-ok';
    const sl = stock<=0?'缺貨':jars+'罐';
    return `<tr><td>${item.pinyin} ${src}</td><td>${item.cn} <span class="stk ${sc}">${sl}</span></td><td class="en-name">${item.en}</td>
      <td><input type="number" value="${+pd.toFixed(2)}" min="0" max="99" step="0.1" onchange="updateDose(${i},this.value)"></td>
      <td>${dd.toFixed(1)}</td><td>${td.toFixed(1)}</td>
      <td><input type="number" value="${item.price}" min="0" step="0.01" style="width:58px" onchange="updatePrice(${i},this.value)"></td>
      <td>$${st}</td><td class="no-print"><button class="btn btn-red" onclick="removeItem(${i})">✕</button></td></tr>`;
  }).join('');
  recalc();
}

function recalc() {
  const t=parseInt(document.getElementById('timesPerDay').value), d=parseInt(document.getElementById('numDoses').value);
  let dg=0,cost=0;
  rxItems.forEach(item => { const dd=item.gPerDose*t; dg+=dd; cost+=dd*d*item.price; });
  document.getElementById('sItems').textContent = rxItems.length;
  document.getElementById('sDailyG').textContent = g2d(dg).toFixed(1)+' '+ul();
  document.getElementById('sDoses').textContent = d;
  document.getElementById('sCost').textContent = '$'+cost.toFixed(2);
  genOutput();
}

function genOutput() {
  const name=document.getElementById('patientName').value||'___', date=document.getElementById('rxDate').value;
  const d=parseInt(document.getElementById('numDoses').value), t=parseInt(document.getElementById('timesPerDay').value), u=ul();
  if (!rxItems.length) { rxOutput.value=''; return; }
  const groups={}, singles=[];
  rxItems.forEach(item => { if(item.src){if(!groups[item.src])groups[item.src]=[];groups[item.src].push(item);}else singles.push(item); });
  let L=[], tdg=0, tc=0;
  L.push('══════════════════════════════════');
  L.push('  TCM Prescription 中醫處方箋');
  L.push('══════════════════════════════════');
  L.push(`Patient 患者: ${name}`);
  L.push(`Date 日期: ${date}`);
  L.push(`Doses 劑數: ${d}    ${t}×/day`);
  if(unit==='qian') L.push('Unit: 錢 qián [1錢=3.75g]');
  L.push('─────────────────────────────────');
  for (const [fn,items] of Object.entries(groups)) {
    const fm=FORMULAS.find(f=>f.cn===fn);
    L.push(`\n【${fn}】${fm?' '+fm.en:''}`);
    items.forEach(item => { const dg=item.gPerDose*t; tdg+=dg; tc+=dg*d*item.price; L.push(`  ${item.cn} ${item.pinyin}${item.en?' ('+item.en+')':''}  ${g2d(item.gPerDose).toFixed(1)}${u}/dose  ${g2d(dg).toFixed(1)}${u}/day`); });
  }
  if (singles.length) {
    L.push('\n【單味藥 Single Herbs】');
    singles.forEach(item => { const dg=item.gPerDose*t; tdg+=dg; tc+=dg*d*item.price; L.push(`  ${item.cn} ${item.pinyin}${item.en?' ('+item.en+')':''}  ${g2d(item.gPerDose).toFixed(1)}${u}/dose  ${g2d(dg).toFixed(1)}${u}/day`); });
  }
  L.push('\n─────────────────────────────────');
  L.push(`Daily Total 每日: ${g2d(tdg).toFixed(1)} ${u}`);
  L.push(`Doses 劑數: ${d}`);
  L.push(`Total Cost 總費用: $${tc.toFixed(2)}`);
  L.push('══════════════════════════════════');
  rxOutput.value = L.join('\n');
}

function copyRx() {
  rxOutput.select();
  navigator.clipboard.writeText(rxOutput.value).then(() => {
    const b=document.getElementById('copyBtn'); b.textContent='✅ Copied!'; setTimeout(()=>{b.textContent='📋 Copy';},1500);
  });
}
function confirmRx() {
  if (!rxItems.length) return;
  const t=parseInt(document.getElementById('timesPerDay').value), d=parseInt(document.getElementById('numDoses').value);
  const bad = Inventory.deductPrescription(rxItems, t, d);
  if (bad.length) { alert('Insufficient stock 庫存不足:\n'+bad.map(x=>`${x.pinyin}: need ${x.needed.toFixed(0)}g, have ${x.have.toFixed(0)}g`).join('\n')); return; }
  // Save to history
  const now = new Date().toISOString();
  const rec = {
    id: Date.now().toString(36),
    patient: document.getElementById('patientName').value || '未填',
    date: document.getElementById('rxDate').value,
    doses: d, timesPerDay: t, unit,
    items: rxItems.map(it=>({...it})),
    output: rxOutput.value,
    createdAt: now, updatedAt: now
  };
  const hist = JSON.parse(localStorage.getItem('tcm_history')||'[]');
  hist.unshift(rec);
  localStorage.setItem('tcm_history', JSON.stringify(hist));
  alert('✅ Confirmed! Stock deducted & saved.\n處方確認！庫存已扣除，記錄已保存。');
  renderRx();
}
function clearAll() { if(rxItems.length&&!confirm('Clear? 清空處方？'))return; rxItems=[]; renderRx(); }

// ========== INVENTORY ==========
let invSortF='pinyin', invSortA=true;
function invSort(f) { if(invSortF===f)invSortA=!invSortA;else{invSortF=f;invSortA=true;} renderInv(); }
function getJar() { return parseFloat(document.getElementById('jarSize').value)||100; }
function getAlertG() { return (parseFloat(document.getElementById('alertJars').value)||10)*getJar(); }

function renderInv() {
  const q=(document.getElementById('invFilter').value||'').trim().toLowerCase();
  const st=document.getElementById('invStatus').value, jar=getJar(), ag=getAlertG();
  const inv=Inventory.getAll();
  let rows=HERBS.map(h=>({pinyin:h.pinyin,cn:h.cn,en:h.en,stock:inv[h.pinyin]?inv[h.pinyin].stock:0}));
  if(q) rows=rows.filter(r=>r.pinyin.toLowerCase().includes(q)||r.cn.includes(q)||r.en.toLowerCase().includes(q));
  if(st==='low') rows=rows.filter(r=>r.stock>0&&r.stock<=ag);
  else if(st==='out') rows=rows.filter(r=>r.stock<=0);
  else if(st==='ok') rows=rows.filter(r=>r.stock>0);
  rows.sort((a,b)=>{let va=a[invSortF],vb=b[invSortF];if(typeof va==='string'){va=va.toLowerCase();vb=vb.toLowerCase();}return invSortA?(va<vb?-1:va>vb?1:0):(va>vb?-1:va<vb?1:0);});

  document.getElementById('invBody').innerHTML = rows.map(r => {
    let cls='',stxt='',sc='';
    if(r.stock<=0){cls='inv-row-out';stxt='🔴 Out';sc='stk-out';}
    else if(r.stock<=ag){cls='inv-row-low';stxt='⚠️ Low';sc='stk-low';}
    else{stxt='✅ OK';sc='stk-ok';}
    const j=(r.stock/jar).toFixed(1);
    return `<tr class="${cls}"><td>${r.pinyin}</td><td>${r.cn}</td><td class="en-name">${r.en}</td>
      <td><strong>${j}</strong> 罐 <span class="jar-info">(${r.stock.toFixed(0)}g)</span></td>
      <td><span class="stk ${sc}">${stxt}</span></td>
      <td style="white-space:nowrap"><input type="number" id="ra_${esc(r.pinyin)}" value="" min="0" step="1" placeholder="罐" style="width:50px;font-size:13px"> 罐</td>
      <td><button class="btn btn-green" onclick="doRestock('${esc(r.pinyin)}')">+ 進貨</button></td></tr>`;
  }).join('');

  // Stats
  let iS=0,lo=0,ou=0;
  HERBS.forEach(h=>{const s=inv[h.pinyin]?inv[h.pinyin].stock:0;if(s<=0)ou++;else if(s<=ag)lo++;else iS++;});
  document.getElementById('statTotal').textContent=HERBS.length;
  document.getElementById('statIn').textContent=iS;
  document.getElementById('statLow').textContent=lo;
  document.getElementById('statOut').textContent=ou;
}

function doRestock(p) {
  const i=document.getElementById('ra_'+p), j=parseFloat(i.value)||0;
  if(j<=0)return; Inventory.addStock(p,j*getJar()); i.value=''; renderInv();
}
function resetInv() { if(!confirm('Reset to demo stock? 重置？'))return; Inventory.clear(); Inventory.initDefaults(HERBS); renderInv(); }
function exportInv() { const b=new Blob([Inventory.exportJSON()],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='tcm-inv-'+new Date().toISOString().slice(0,10)+'.json';a.click(); }
function importInv(e) { const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=function(){try{Inventory.importJSON(r.result);renderInv();alert('✅ Imported!');}catch{alert('Invalid file');}};r.readAsText(f);e.target.value=''; }

// Init
renderInv();

// ========== HISTORY ==========
function getHist() { return JSON.parse(localStorage.getItem('tcm_history')||'[]'); }
function saveHist(h) { localStorage.setItem('tcm_history', JSON.stringify(h)); }

function fmtDate(iso) {
  if (!iso) return '-';
  const d = new Date(iso);
  return d.toLocaleDateString('zh-TW',{year:'numeric',month:'2-digit',day:'2-digit'}) + ' ' + d.toLocaleTimeString('zh-TW',{hour:'2-digit',minute:'2-digit'});
}

function renderHist() {
  const q = (document.getElementById('histFilter').value||'').trim().toLowerCase();
  let hist = getHist();
  if (q) hist = hist.filter(r => r.patient.toLowerCase().includes(q) || r.date.includes(q));
  document.getElementById('histEmpty').style.display = hist.length ? 'none' : 'block';

  document.getElementById('histList').innerHTML = hist.map((r,i) => {
    // Group herbs by formula
    const formulas = {}, singles = [];
    r.items.forEach(it => { if(it.src){if(!formulas[it.src])formulas[it.src]=[];formulas[it.src].push(it);}else singles.push(it); });
    let briefHtml = '';
    for (const [fn] of Object.entries(formulas)) briefHtml += `<span class="hist-formula">${fn}</span> `;
    if (singles.length) briefHtml += singles.map(it=>it.cn).join('、');

    // Cost
    let cost = 0;
    r.items.forEach(it => { cost += it.gPerDose * r.timesPerDay * r.doses * it.price; });

    // Detail table (hidden by default)
    let detailRows = '';
    for (const [fn,items] of Object.entries(formulas)) {
      detailRows += `<tr style="background:var(--light)"><td colspan="6" style="font-weight:600;color:#1565c0;padding:8px 6px">【${fn}】</td></tr>`;
      items.forEach(it => {
        const dg = it.gPerDose * r.timesPerDay, tg = dg * r.doses;
        detailRows += `<tr><td style="padding-left:20px">${it.pinyin}</td><td>${it.cn}</td><td class="en-name">${it.en||''}</td><td>${it.gPerDose}g</td><td>${dg.toFixed(1)}g</td><td>$${(tg*it.price).toFixed(2)}</td></tr>`;
      });
    }
    if (singles.length) {
      detailRows += `<tr style="background:var(--light)"><td colspan="6" style="font-weight:600;color:var(--accent);padding:8px 6px">【單味藥】</td></tr>`;
      singles.forEach(it => {
        const dg = it.gPerDose * r.timesPerDay, tg = dg * r.doses;
        detailRows += `<tr><td style="padding-left:20px">${it.pinyin}</td><td>${it.cn}</td><td class="en-name">${it.en||''}</td><td>${it.gPerDose}g</td><td>${dg.toFixed(1)}g</td><td>$${(tg*it.price).toFixed(2)}</td></tr>`;
      });
    }

    return `<div class="hist-card" onclick="toggleHist(this)" style="cursor:pointer">
      <div class="hist-header">
        <div>
          <span class="hist-patient">${r.patient}</span>
          <span style="font-size:0.85em;color:#888;margin-left:8px">${r.date}</span>
          <span style="font-size:0.75em;color:#bbb;margin-left:6px">▼</span>
        </div>
        <div class="hist-meta">
          Created: ${fmtDate(r.createdAt)}<br>Updated: ${fmtDate(r.updatedAt)}
        </div>
      </div>
      <div class="hist-herbs">${briefHtml}</div>
      <div class="hist-summary">
        <span>📦 ${r.items.length} herbs</span>
        <span>💊 ${r.doses} doses × ${r.timesPerDay}/day</span>
        <span>💰 $${cost.toFixed(2)}</span>
      </div>
      <div class="hist-detail" style="display:none" onclick="event.stopPropagation()">
        <table style="margin-top:10px">
          <thead><tr><th>Pinyin</th><th>中文</th><th>English</th><th>g/dose</th><th>g/day</th><th>Subtotal</th></tr></thead>
          <tbody>${detailRows}</tbody>
        </table>
        <div class="hist-actions" style="margin-top:10px">
          <button class="btn btn-ghost" onclick="event.stopPropagation();loadHist(${i})">📋 Load to Rx 載入處方</button>
          <button class="btn btn-ghost" onclick="event.stopPropagation();copyHistOutput(${i})">📄 Copy 複製</button>
          <button class="btn btn-red" onclick="event.stopPropagation();deleteHist(${i})">🗑 Delete 刪除</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

function toggleHist(el) {
  const detail = el.querySelector('.hist-detail');
  const arrow = el.querySelector('.hist-header span:last-child');
  if (!detail) return;
  const open = detail.style.display !== 'none';
  detail.style.display = open ? 'none' : 'block';
}

function loadHist(i) {
  const r = getHist()[i]; if(!r) return;
  // Load into prescription tab
  rxItems = r.items.map(it=>({...it}));
  document.getElementById('patientName').value = r.patient;
  document.getElementById('rxDate').value = r.date;
  document.getElementById('numDoses').value = r.doses;
  document.getElementById('timesPerDay').value = r.timesPerDay;
  if (r.unit) setUnit(r.unit);
  renderRx();
  switchTab('rx');
  // Mark as updated
  const hist = getHist();
  hist[i].updatedAt = new Date().toISOString();
  saveHist(hist);
}

function copyHistOutput(i) {
  const r = getHist()[i]; if(!r||!r.output) return;
  navigator.clipboard.writeText(r.output).then(()=>alert('✅ Copied!'));
}

function deleteHist(i) {
  if (!confirm('Delete this record? 刪除此記錄？')) return;
  const hist = getHist();
  hist.splice(i, 1);
  saveHist(hist);
  renderHist();
}

function exportHist() {
  const b = new Blob([JSON.stringify(getHist(),null,2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(b);
  a.download = 'tcm-history-'+new Date().toISOString().slice(0,10)+'.json';
  a.click();
}

renderHist();
