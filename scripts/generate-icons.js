// Simple script to create placeholder icons for PWA
// This would normally use a library like sharp or canvas to convert SVG to PNG
// For now, we'll create a simple HTML file that can be used to generate icons

const fs = require('fs');
const path = require('path');

const iconSizes = [192, 512, 1024];
const publicDir = path.join(__dirname, '..', 'public');

// Create a simple HTML file for icon generation
const iconGeneratorHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>Icon Generator</title>
</head>
<body>
    <canvas id="canvas" width="512" height="512"></canvas>
    <script>
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        
        // Draw the icon
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(0, 0, 512, 512);
        
        ctx.fillStyle = 'white';
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(256, 256, 120, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = '#3b82f6';
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(256, 256, 80, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = 'white';
        ctx.globalAlpha = 0.8;
        ctx.fillRect(200, 200, 112, 112);
        
        ctx.fillStyle = 'white';
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(256, 256, 40, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(256, 256, 20, 0, 2 * Math.PI);
        ctx.fill();
        
        // Convert to different sizes
        ${iconSizes.map(size => `
        const canvas${size} = document.createElement('canvas');
        canvas${size}.width = ${size};
        canvas${size}.height = ${size};
        const ctx${size} = canvas${size}.getContext('2d');
        ctx${size}.drawImage(canvas, 0, 0, ${size}, ${size});
        const link${size} = document.createElement('a');
        link${size}.download = 'icon-${size}x${size}.png';
        link${size}.href = canvas${size}.toDataURL();
        document.body.appendChild(link${size});
        link${size}.click();
        `).join('')}
    </script>
</body>
</html>
`;

fs.writeFileSync(path.join(publicDir, 'icon-generator.html'), iconGeneratorHTML);

console.log('Icon generator HTML created. Open public/icon-generator.html in a browser to generate PNG icons.');
console.log('Generated icons should be saved as:');
iconSizes.forEach(size => {
    console.log(`- icon-${size}x${size}.png`);
});
