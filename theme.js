// ══════════════════════════════════════════════════════════════
//  เปลี่ยนสีทั้งเว็บ — แก้แค่บรรทัดนี้บรรทัดเดียว
//  (ถ้าเปิดใช้ระบบเลือกสีในหน้าแอดมิน ค่านี้จะเป็นแค่ default)
// ══════════════════════════════════════════════════════════════
const THEME_DEFAULT = 'pink'; // 'pink' | 'purple' | 'coral' | 'green' | 'blue'

// ── ชุดสีแต่ละธีม ─────────────────────────────────────────────
const THEMES = {
    pink: {
        c1:'#FFB6C1', c2:'#FFC8D2', c3:'#FFE4E8', c4:'#FFF0F2',
        c5:'#C9768A', c5d:'#D47890', c5m:'#E098A8', c5x:'#8B4A5C', cdark:'#3D1028',
        c1rgb:'255,182,193', c2rgb:'255,200,210',
        c5rgb:'201,118,138', cdarkrgb:'61,16,40',
    },
    purple: {
        c1:'#C3B1E1', c2:'#D5C8EE', c3:'#E8E0F5', c4:'#F5F0FF',
        c5:'#7B5EA7', c5d:'#8F72BB', c5m:'#A68EC5', c5x:'#554173', cdark:'#2D1B5A',
        c1rgb:'195,177,225', c2rgb:'213,200,238',
        c5rgb:'123,94,167', cdarkrgb:'45,27,90',
    },
    coral: {
        c1:'#FFBCAA', c2:'#FFCFBF', c3:'#FFE5DC', c4:'#FFF3EF',
        c5:'#C05A3A', c5d:'#D06A4A', c5m:'#D88A6A', c5x:'#853E28', cdark:'#3D1A0C',
        c1rgb:'255,188,170', c2rgb:'255,207,191',
        c5rgb:'192,90,58', cdarkrgb:'61,26,12',
    },
    green: {
        c1:'#b5eaca', c2:'#C9F0E3', c3:'#DEFAF1', c4:'#F0FDF8',
        c5:'#4a9e6a', c5d:'#5AB08F', c5m:'#7DBDA3', c5x:'#336D58', cdark:'#0D3B2B',
        c1rgb:'181,234,215', c2rgb:'201,240,227',
        c5rgb:'74,158,127', cdarkrgb:'13,59,43',
    },
    blue: {
        c1:'#AED9F7', c2:'#C4E6FA', c3:'#DAF0FC', c4:'#EEF7FD',
        c5:'#2E7EB8', c5d:'#3A8EC4', c5m:'#5AA0CC', c5x:'#1E6494', cdark:'#0D3A5C',
        c1rgb:'174,217,247', c2rgb:'196,230,250',
        c5rgb:'46,126,184', cdarkrgb:'13,58,92',
    },

    // ── สีแบรนด์ (ใช้ร่วมกันทุกธีม ไม่เปลี่ยนตามธีม) ──────────
    brand: {
        'brand-50':  '#EEF7FD',
        'brand-100': '#DAF0FC',
        'brand-200': '#C4E6FA',
        'brand-300': '#AED9F7',
        'brand-600': '#2E7EB8',
    },
};

window.THEME_DEFAULT = THEME_DEFAULT;
window.THEMES = THEMES;

// ── Apply CSS vars ────────────────────────────────────────────
function _applyTheme(name) {
    const t = THEMES[name] || THEMES[THEME_DEFAULT];
    const r = document.documentElement;
    Object.keys(t).forEach(k => r.style.setProperty('--' + k, t[k]));
    Object.keys(THEMES.brand).forEach(k => r.style.setProperty('--' + k, THEMES.brand[k]));
}

// ── Apply ทันทีก่อน render (อ่านจาก localStorage ก่อน) ────────
(function () {
    const saved = localStorage.getItem('site_theme');
    const active = (saved && THEMES[saved]) ? saved : THEME_DEFAULT;
    _applyTheme(active);
})();

// ── ฟังก์ชันเปลี่ยนธีมจาก UI (Pro) ───────────────────────────
window.setTheme = function (name) {
    if (!THEMES[name] || name === 'brand') return;
    localStorage.setItem('site_theme', name);
    _applyTheme(name);
    // อัปเดต active state ของปุ่ม swatches
    document.querySelectorAll('.theme-swatch').forEach(el => {
        const active = el.dataset.theme === name;
        el.style.outline = active ? '3px solid var(--c5)' : 'none';
        el.style.outlineOffset = active ? '3px' : '0';
        el.style.transform = active ? 'scale(1.15)' : 'scale(1)';
    });
};
