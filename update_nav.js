const fs = require('fs');
const path = require('path');
const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html') && f !== 'food.html' && f !== 'index.html'); // Skip index.html as it was already updated successfully

files.forEach(file => {
    let content = fs.readFileSync(path.join(publicDir, file), 'utf8');
    if (file === 'admin.html') {
        content = content.replace('<li class="nav-item"><a class="nav-link" href="#" onclick="logout()">Logout</a></li>', '<li class="nav-item d-none" id="nav-food"><a class="nav-link" href="food.html">Food Menu</a></li>\n                    <li class="nav-item"><a class="nav-link" href="#" onclick="logout()">Logout</a></li>');
    } else {
        content = content.replace('<li class="nav-item" id="nav-login"><a class="nav-link" href="login.html">Login</a></li>', '<li class="nav-item d-none" id="nav-food"><a class="nav-link" href="food.html">Food Menu</a></li>\n                    <li class="nav-item" id="nav-login"><a class="nav-link" href="login.html">Login</a></li>');
    }
    fs.writeFileSync(path.join(publicDir, file), content);
});
console.log('Updated navbars in all HTML files.');
