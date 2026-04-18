const fs = require('fs');
const path = require('path');

function removeBOM(dir) {
    for (const file of fs.readdirSync(dir)) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            // Ignore heavy folders
            if (file !== 'node_modules' && file !== '.git' && file !== '.next') {
                removeBOM(fullPath);
            }
        } else if (/\.(ts|tsx|json|prisma|mjs)$/.test(file)) {
            const buffer = fs.readFileSync(fullPath);
            // Check for the exact hex signature of a UTF-8 BOM
            if (buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
                fs.writeFileSync(fullPath, buffer.subarray(3));
                console.log(`✅ Stripped BOM from: ${fullPath}`);
            }
        }
    }
}

console.log("Scanning for ghost characters...");
removeBOM(__dirname);
console.log("Done!");