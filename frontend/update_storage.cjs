const fs = require('fs');
const path = require('path');

const directories = [
    'src/pages',
    'src/service_description'
];

const basePath = 'c:/Users/ADMIN/Desktop/Prits IT WEBapp/pritsreact';

function updateFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = content;

    // Replace localStorage with sessionStorage for cartItems ONLY
    
    // 1. getItem
    updated = updated.replace(/localStorage\.getItem\('cartItems'\)/g, "sessionStorage.getItem('cartItems')");
    
    // 2. setItem
    updated = updated.replace(/localStorage\.setItem\('cartItems'/g, "sessionStorage.setItem('cartItems'");
    
    // 3. removeItem
    updated = updated.replace(/localStorage\.removeItem\('cartItems'\)/g, "sessionStorage.removeItem('cartItems')");

    if (content !== updated) {
        fs.writeFileSync(filePath, updated, 'utf8');
        console.log(`✅ Updated: ${path.basename(filePath)}`);
    }
}

directories.forEach(dir => {
    const fullDir = path.join(basePath, dir);
    if (fs.existsSync(fullDir)) {
        const files = fs.readdirSync(fullDir);
        files.forEach(file => {
            if (file.endsWith('.jsx')) {
                updateFile(path.join(fullDir, file));
            }
        });
    } else {
        console.log(`Directory not found: ${fullDir}`);
    }
});

console.log("Migration complete.");
