const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf8');
content = content.replace(/export const initialTheme = null;/g, '');
content = content.replace(/export const initialContent = null;/g, '');
content = content.replace(/export const initialBranding = null;/g, '');
content = content.replace(/export const initialMedia = \[\];/g, '');
fs.writeFileSync('src/data.ts', content);
