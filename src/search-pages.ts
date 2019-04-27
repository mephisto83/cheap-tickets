import puppeteer = require('puppeteer');
import SearchParameters from './search-parameters';

const ORIGIN_CSS_SELECTOR = '[aria-label="Flight origin input"]';
const DESTINATION_CSS_SELECTOR = '[aria-label="Flight destination input"]';
const DEPARTURE_DATE_CSS = '[aria-label="Departure date input"]';
const RETURN_DATE_CSS = '[aria-label="Return date input"]';
const COMPARISON_DISABLE_BUTTON = '[aria-label="Disable results comparison for this search"]';
const SEARCH_BTN = '.search-form-inner button[type="submit"]';
export default class SearchPages {
    async search() {
        var page = this.pages[0];

        await this.enterValues(page, ORIGIN_CSS_SELECTOR, this.searchParameters.from);

        await this.enterValues(page, DESTINATION_CSS_SELECTOR, this.searchParameters.to);

        let fromDate: Date = new Date(this.searchParameters.fromDate);
        let leaveDate = `${fromDate.getMonth() + 1}/${fromDate.getDate()}/${fromDate.getUTCFullYear()}`;
        console.log(leaveDate);
        await this.enterValues(page, DEPARTURE_DATE_CSS, leaveDate);


        var toDate: Date = new Date(this.searchParameters.toDate);
        var returnDate = `${toDate.getMonth() + 1}/${toDate.getDate()}/${toDate.getUTCFullYear()}`;
        console.log(returnDate);
        await this.enterValues(page, RETURN_DATE_CSS, returnDate);

        await this.wait();
        await page.click(COMPARISON_DISABLE_BUTTON);
        
        await this.wait();
        await page.click(SEARCH_BTN);
    }
    async clickBtn(page: puppeteer.Page, select: string, text: string) {
        return await page.evaluate((_select, _text) => {
            var res = document.querySelectorAll(_select);
            for (var i = 0; i < res.length; i++) {
                if ((<any>res[i]).innerText.indexOf(_text) !== -1) {
                    (<any>res[i]).click();
                    return true;
                }
            }
        }, select, text);

    }
    async enterValues(page, select, text) {
        await page.focus(select);
        await this.wait();
        await this.clearField(page, select)
        await this.wait(500);
        await this.sendText(page, select, text);

    }
    async clearField(page: puppeteer.Page, css: string) {
        await page.click(css, { clickCount: 3 })
        await page.keyboard.press('Backspace');
    }
    async sendText(page: puppeteer.Page, select: string, text: string, noenter = false) {
        await page.type(select, text, { delay: 250 });
        if (!noenter)
            await page.keyboard.press('Enter');
    }

    async wait(timeout = 0) {
        return await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, timeout || 3000);
        })

    }

    private pages: puppeteer.Page[];
    public name: String;
    searchParameters: SearchParameters;
    constructor(name, page, searchParameters: SearchParameters) {
        this.name = name;
        this.pages = [page];
        this.searchParameters = searchParameters;
    }

    public addPage(page) {
        this.pages.push(page);
    }
}