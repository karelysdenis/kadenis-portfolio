import { chromium } from 'playwright';

const placeholders = [
  { filename: 'fortheplanet.jpg', title: 'Creatives for the Planet', subtitle: 'Event Management' },
  { filename: 'depilacion.jpg', title: 'Depilación Láser', subtitle: 'Healthcare Platform' },
  { filename: 'barcelo.jpg', title: 'Barceló Abogados', subtitle: 'Legal Services' },
  { filename: 'conferencias.jpg', title: 'Conferencias ET', subtitle: 'Event Platform' },
  { filename: 'euroma.jpg', title: 'Euroma', subtitle: 'Event Organization' },
  { filename: 'verdi.jpg', title: 'Verdi Estudio', subtitle: 'Architecture Portfolio' },
  { filename: 'papermoon.jpg', title: 'Papermoon', subtitle: 'Creative Agency' },
  { filename: 'arquitectura-top.jpg', title: 'Arquitectura Top', subtitle: 'Construction Company' },
  { filename: 'artillum.jpg', title: 'Artillum', subtitle: 'Creative Services' },
  { filename: 'esjardiners.jpg', title: 'Es Jardiners Ibiza', subtitle: 'Landscaping Services' },
  { filename: 'lleal.jpg', title: 'Lleal', subtitle: 'Corporate Business' }
];

async function createPlaceholders() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1200, height: 675 }
  });
  const page = await context.newPage();

  for (const item of placeholders) {
    console.log(`Creating placeholder: ${item.filename}...`);

    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            width: 1200px;
            height: 675px;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            position: relative;
            overflow: hidden;
          }
          .pattern {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.03;
            background-image:
              linear-gradient(30deg, #22c55e 12%, transparent 12.5%, transparent 87%, #22c55e 87.5%, #22c55e),
              linear-gradient(150deg, #22c55e 12%, transparent 12.5%, transparent 87%, #22c55e 87.5%, #22c55e),
              linear-gradient(30deg, #22c55e 12%, transparent 12.5%, transparent 87%, #22c55e 87.5%, #22c55e),
              linear-gradient(150deg, #22c55e 12%, transparent 12.5%, transparent 87%, #22c55e 87.5%, #22c55e);
            background-size: 80px 140px;
            background-position: 0 0, 0 0, 40px 70px, 40px 70px;
          }
          .content {
            z-index: 1;
            text-align: center;
            padding: 40px;
          }
          .logo {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #16a34a, #22c55e);
            border-radius: 16px;
            margin: 0 auto 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 36px;
            font-weight: 700;
            color: white;
            box-shadow: 0 20px 60px rgba(34, 197, 94, 0.3);
          }
          h1 {
            font-size: 64px;
            font-weight: 700;
            color: white;
            margin-bottom: 16px;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          }
          h2 {
            font-size: 32px;
            font-weight: 400;
            color: #94a3b8;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          }
          .accent {
            position: absolute;
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%);
            border-radius: 50%;
          }
          .accent1 { top: -200px; right: -200px; }
          .accent2 { bottom: -200px; left: -200px; }
        </style>
      </head>
      <body>
        <div class="pattern"></div>
        <div class="accent accent1"></div>
        <div class="accent accent2"></div>
        <div class="content">
          <div class="logo">${item.title.charAt(0)}</div>
          <h1>${item.title}</h1>
          <h2>${item.subtitle}</h2>
        </div>
      </body>
      </html>
    `);

    await page.screenshot({
      path: `public/images/${item.filename}`,
      type: 'jpeg',
      quality: 85
    });

    console.log(`✓ Created: ${item.filename}`);
  }

  await browser.close();
  console.log('\n✓ All placeholders created!');
}

createPlaceholders();
