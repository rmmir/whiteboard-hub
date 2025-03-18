module.exports = {
    // Apply ESLint to JS, JSX, TS, and TSX files
    '**/*.{js,jsx,ts,tsx}': ['npm run lint:fix'],

    // Apply Prettier to various file types including JSON
    '**/*.{js,jsx,ts,tsx,json,md,css,scss}': ['prettier --write'],
};
