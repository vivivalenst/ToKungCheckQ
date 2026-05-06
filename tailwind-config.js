// Tailwind custom colors — อ่านจาก CSS vars ที่ theme.js กำหนดไว้
tailwind.config = {
    theme: {
        extend: {
            colors: {
                brand: {
                    50:  'var(--brand-50)',
                    100: 'var(--brand-100)',
                    200: 'var(--brand-200)',
                    300: 'var(--brand-300)',
                    600: 'var(--brand-600)',
                }
            }
        }
    }
}
