"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheap_search_1 = require("./cheap-search");
let message = "Hello World";
console.log(message);
(async () => {
    var cheapSearch = new cheap_search_1.default();
    await cheapSearch.init();
    var sec = 1000;
    var min = 60 * sec;
    var hr = min * 60;
    let day = hr * 24;
    await cheapSearch.openMomondoSearch('default', {
        from: 'MSP',
        to: 'HNL',
        fromDate: Date.now() + 10 * day,
        toDate: Date.now() + 100 * day
    });
    await cheapSearch.search('default');
    // const browser = await puppeteer.launch({headless: false}); // default is true
    // const page = await browser.newPage();
    // await page.goto('https://example.com');
    // await page.screenshot({path: 'example.png'});
    // await cheapSearch.shutdown();
    // await browser.close();
})();
//# sourceMappingURL=index.js.map