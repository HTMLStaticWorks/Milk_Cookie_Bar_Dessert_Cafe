/* auth.js - Interactivity for Milk & Cookie Bar Auth Pages */

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const rtlToggle = document.getElementById('rtlToggle');
    const passwordToggles = document.querySelectorAll('.password-toggle');

    // Theme Toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // Update icon/text if needed
            const themeIcon = themeToggle.querySelector('.theme-icon');
            if (themeIcon) {
                themeIcon.innerHTML = newTheme === 'dark' 
                    ? '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-11.314l.707.707m11.314 11.314l.707.707M12 5a7 7 0 100 14 7 7 0 000-14z"/>' 
                    : '<path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>';
            }
        });
    }

    // RTL Toggle
    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir');
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            document.documentElement.setAttribute('dir', newDir);
            rtlToggle.textContent = newDir === 'rtl' ? 'LTR' : 'RTL';
        });
    }

    // Password Visibility Toggle
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const inputId = toggle.getAttribute('data-target');
            const input = document.getElementById(inputId);
            const icon = toggle.querySelector('svg');

            if (input.type === 'password') {
                input.type = 'text';
                icon.innerHTML = '<path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.539 7.539l3.29 3.29M3 3l18 18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
            } else {
                input.type = 'password';
                icon.innerHTML = '<path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>';
            }
        });
    });
});
