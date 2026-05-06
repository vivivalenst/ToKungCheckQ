// ══════════════════════════════════════════════════════════════
//  เปลี่ยนแพลน — แก้แค่ 2-3 บรรทัดนี้
// ══════════════════════════════════════════════════════════════
const PLAN        = 'pro';        // 'free' | 'pro'
const TRIAL_START = '2026-05-06'; // วันที่เริ่มใช้งาน (ตั้งตามลูกค้าแต่ละราย)
const ADDONS      = [''];           // เพิ่ม add-on ที่ซื้อ เช่น ['email']

// ── ฟีเจอร์ตาม Plan ──────────────────────────────────────────
// Pro        : ตอบกลับรีวิว, CSV, กราฟการเงิน, ประวัติย้อนหลัง,
//              ค้นหาคิว, ประกาศด่วน, เปลี่ยนธีมสี
// Add-on email (+100฿) : ส่งแจ้งเตือนอีเมล + สร้างโฟลเดอร์ Drive

// ── ตรวจสอบหมดอายุ (เฉพาะแพลน free) ─────────────────────────
const _trialExpired = PLAN === 'free' && (() => {
    const start = new Date(TRIAL_START);
    const diff  = (Date.now() - start.getTime()) / 86400000; // แปลงเป็นวัน
    return diff > 30;
})();

window.PLAN     = _trialExpired ? 'expired' : PLAN;
window.ADDONS   = ADDONS;
window.hasAddon = (name) => ADDONS.includes(name);

// ── Apply ทันทีก่อน render: เพิ่ม class บน <html> ────────────
(function () {
    document.documentElement.classList.add('plan-' + window.PLAN);
    ADDONS.forEach(a => document.documentElement.classList.add('has-addon-' + a));

    if (!_trialExpired) return;

    // ล็อกหน้าจอเมื่อหมดอายุทดลองใช้
    document.addEventListener('DOMContentLoaded', function () {
        const overlay = document.createElement('div');
        overlay.id = 'trial-expired-overlay';
        overlay.style.cssText = [
            'position:fixed', 'inset:0', 'z-index:99999',
            'background:rgba(0,0,0,0.88)',
            'display:flex', 'align-items:center', 'justify-content:center',
            'font-family:"Mali",sans-serif'
        ].join(';');

        overlay.innerHTML = `
<div style="
    background:#fff; border-radius:20px; padding:40px 32px;
    text-align:center; max-width:340px; width:90%; margin:16px;
    box-shadow:0 20px 60px rgba(0,0,0,0.4);
">
    <div style="font-size:52px; margin-bottom:12px;"></div>
    <h2 style="
        font-size:20px; font-weight:700; color:#111827;
        margin:0 0 10px;
    ">หมดระยะทดลองใช้แล้ว</h2>
    <p style="
        font-size:14px; color:#6b7280; margin:0 0 8px; line-height:1.6;
    ">คุณใช้งานแพลนฟรีครบ 30 วันแล้ว<br>กรุณาอัปเกรดเพื่อใช้งานต่อ</p>
    <p style="
        font-size:12px; color:#9ca3af; margin:0 0 28px;
    ">เริ่มใช้งานเมื่อ: ${TRIAL_START}</p>
    <div style="
        background:#f97316; color:#fff; border-radius:12px;
        padding:14px 24px; font-size:15px; font-weight:600;
        cursor:default; letter-spacing:0.3px;
    ">ติดต่ออัปเกรดแพลน Pro</div>
    <p style="font-size:11px; color:#d1d5db; margin:16px 0 0;">
        สอบถามผู้ให้บริการของคุณ
    </p>
</div>`;

        document.body.appendChild(overlay);
    });
})();
