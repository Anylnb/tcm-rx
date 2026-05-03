// Shared Inventory Module - localStorage CRUD
// Stock stored as { [pinyin]: { stock: grams, lowAlert: grams } }
const INV_KEY = 'tcm_inventory';
const DEFAULT_ALERT = 1000; // 10 jars × 100g = 1000g

const Inventory = {
  _load() {
    try { return JSON.parse(localStorage.getItem(INV_KEY)) || {}; }
    catch { return {}; }
  },
  _save(data) { localStorage.setItem(INV_KEY, JSON.stringify(data)); },

  getAll() { return this._load(); },

  getStock(pinyin) {
    const d = this._load();
    return d[pinyin] ? d[pinyin].stock : 0;
  },

  getLowAlert(pinyin) {
    const d = this._load();
    return d[pinyin] ? d[pinyin].lowAlert : DEFAULT_ALERT;
  },

  isLow(pinyin) {
    const d = this._load();
    if (!d[pinyin]) return false;
    return d[pinyin].stock <= d[pinyin].lowAlert;
  },

  setStock(pinyin, grams, lowAlert) {
    const d = this._load();
    if (!d[pinyin]) d[pinyin] = { stock: 0, lowAlert: DEFAULT_ALERT };
    d[pinyin].stock = Math.max(0, grams);
    if (lowAlert !== undefined) d[pinyin].lowAlert = lowAlert;
    this._save(d);
  },

  addStock(pinyin, grams) {
    const d = this._load();
    if (!d[pinyin]) d[pinyin] = { stock: 0, lowAlert: DEFAULT_ALERT };
    d[pinyin].stock = Math.max(0, d[pinyin].stock + grams);
    this._save(d);
  },

  deduct(pinyin, grams) {
    const d = this._load();
    if (!d[pinyin]) d[pinyin] = { stock: 0, lowAlert: DEFAULT_ALERT };
    d[pinyin].stock = Math.max(0, d[pinyin].stock - grams);
    this._save(d);
  },

  // Deduct all items from a prescription. Returns array of insufficient items.
  deductPrescription(rxItems, timesPerDay, numDoses) {
    const insufficient = [];
    const totals = {};
    rxItems.forEach(item => {
      const totalG = item.gPerDose * timesPerDay * numDoses;
      totals[item.pinyin] = (totals[item.pinyin] || 0) + totalG;
    });
    for (const [pinyin, needed] of Object.entries(totals)) {
      if (this.getStock(pinyin) < needed) {
        insufficient.push({ pinyin, needed, have: this.getStock(pinyin) });
      }
    }
    if (insufficient.length === 0) {
      for (const [pinyin, needed] of Object.entries(totals)) {
        this.deduct(pinyin, needed);
      }
    }
    return insufficient;
  },

  exportJSON() { return JSON.stringify(this._load(), null, 2); },

  importJSON(json) {
    const d = JSON.parse(json);
    this._save(d);
  },

  clear() { localStorage.removeItem(INV_KEY); },

  // Seed demo inventory: common herbs get 15-30 jars, less common 5-12
  initDefaults(herbs) {
    const d = this._load();
    const common = ['Bai Shao','Bai Zhu','Ban Xia','Chai Hu','Chen Pi','Chuan Xiong',
      'Da Huang','Da Zao','Dang Gui','Fang Feng','Fu Ling','Gan Cao (Sheng)',
      'Gan Cao (Zhi)','Gan Jiang','Ge Gen','Gui Zhi','Huang Qi','Huang Qin',
      'Jie Geng','Ma Huang','Mai Men Dong','Ren Shen','Bai Zhi','Shan Yao',
      'Sheng Jiang','Shu Di Huang','Dang Shen','Dan Shen','Jin Yin Hua','Lian Qiao',
      'Bo He','Mu Dan Pi','Fu Zi (Pao)','Hou Po','Huang Lian','Huang Bai',
      'Ze Xie','Zhi Mu','Zhi Zi','Xing Ren','Bai He','Chi Shao','Tao Ren',
      'Shan Zhu Yu','Wu Wei Zi','Suan Zao Ren','Yi Yi Ren','Sang Ye'];
    herbs.forEach(h => {
      if (d[h.pinyin]) return; // don't overwrite existing
      const isCommon = common.includes(h.pinyin);
      const jars = isCommon ? Math.floor(Math.random() * 16) + 15 : Math.floor(Math.random() * 8) + 5;
      d[h.pinyin] = { stock: jars * 100, lowAlert: DEFAULT_ALERT };
    });
    this._save(d);
  }
};
