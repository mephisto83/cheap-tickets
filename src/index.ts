import puppeteer = require('puppeteer');
import CheapSearch from './cheap-search';

let message: string = "Hello World";
console.log(message);

(async () => {
    var cheapSearch = new CheapSearch();
    await cheapSearch.init();
    var sec = 1000;
    var min = 60 * sec;
    var hr = min * 60;
    let day: number = hr * 24;
    await cheapSearch.openMomondoSearch('default', {
        from: 'MSP',
        to: 'HNL',
        fromDate: Date.now() + 10 * day,
        toDate: Date.now() + 100 * day
    });
    await cheapSearch.search('default')
    // const browser = await puppeteer.launch({headless: false}); // default is true
    // const page = await browser.newPage();
    // await page.goto('https://example.com');
    // await page.screenshot({path: 'example.png'});
    // await cheapSearch.shutdown();
    // await browser.close();
})();