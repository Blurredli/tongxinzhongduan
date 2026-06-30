
const puppeteer = require('puppeteer');
const path = require('path');

async function captureSlides() {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    const htmlPath = 'file:///' + path.resolve('D:\\Work_Place\\Cursor\\claude\\tongxinzhongduan\\dds_presentation.html');
    await page.goto(htmlPath, { waitUntil: 'networkidle0' });

    // 等待动画完成
    await page.waitForTimeout(2000);

    // 截图每一页
    for (let i = 1; i <= 16; i++) {
        // 导航到对应页
        await page.evaluate((slideNum) => {
            currentSlide = slideNum;
            updateSlide();
        }, i);

        // 等待过渡动画
        await page.waitForTimeout(800);

        // 截图
        await page.screenshot({
            path: `D:\\Work_Place\\Cursor\\claude\\tongxinzhongduan\\screenshots\\slide_${String(i).padStart(2, '0')}.png`,
            fullPage: false
        });

        console.log(`Captured slide ${i}`);
    }

    await browser.close();
    console.log('All slides captured!');
}

captureSlides().catch(console.error);
