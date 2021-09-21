// tailwind.config.js

module.exports = {
    future: {},
    purge: {
        enabled: true,
        content: [
            "./layouts/**/*.html",
            "./**/*.html",
        ],
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}