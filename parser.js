const puppeteer = require('puppeteer');
const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const BASE_URL = 'https://arztsuche24.at/suche/was_kinder%C3%A4rzt/%C3%B6sterreich/'
const PAGE_START = 1
const PAGE_END = 10;

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let pageNum = PAGE_START;
    const data = [];

    while (pageNum <= PAGE_END) {
        await page.goto(`${BASE_URL}${pageNum}`);
        const html = await page.content();
        const $ = cheerio.load(html);

        $('.result_item').each((index, element) => {
            const fullNameAndTitle = $(element).find('.list_entry_middle strong a').text().trim();
            const link = $(element).find('.list_entry_middle a').attr('href');
            const address = $(element).find('.list_entry_middle p').text().trim();
            const phoneNumber = $(element).find('.list_entry_right a').text().trim();
            data.push({ fullNameAndTitle, address, phoneNumber, link });
        });

        await new Promise(resolve => setTimeout(resolve, 10));
        console.log(`Page ${pageNum} done`)
        pageNum++;
    }

    console.log('\n\nAll pages done, start extracting emails')

    // Go to the link and extract the email
    for (let i = 0; i < data.length; i++) {
        const page2 = await browser.newPage();
        await page2.goto(data[i].link);

        try {
            const email = await page2.$eval('a[href^="mailto:"]', element => element.href.replace('mailto:', ''));
            data[i].email = email;
        } catch (e) { }

        await new Promise(resolve => setTimeout(resolve, 10));
        await page2.close();
        console.log(`Email ${i + 1}/${data.length - 1} ✅`)
    }
    const jsonDir = './jsons';

    if (!fs.existsSync(jsonDir)) fs.mkdirSync(jsonDir);

    fs.writeFileSync(path.join(jsonDir, `result_${PAGE_START}-${PAGE_END}.json`), JSON.stringify(data, null, 2), 'utf-8');
    fs.writeFileSync(`./${jsonDir}/result_${PAGE_START}-${PAGE_END}.json`, JSON.stringify(data, null, 2), 'utf-8');

    await browser.close();
})();
