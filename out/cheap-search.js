"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
const search_pages_1 = require("./search-pages");
const MOMONDO_PAGE = 'https://www.momondo.com';
class CheapSearch {
    constructor() {
        this.searchPages = [];
    }
    /**
     * init
     */
    async init() {
        this.browser = await puppeteer.launch({ headless: false }); // default async is true
    }
    async openMomondoSearch(name, searchParameters) {
        const page = await this.browser.newPage();
        await page.goto(MOMONDO_PAGE);
        var searchPage = this.searchPages.find(x => x.name === name);
        if (searchPage) {
            searchPage.addPage(page);
        }
        else {
            this.searchPages.push(new search_pages_1.default(name, page, searchParameters));
        }
    }
    async search(searchPageName) {
        var searchPage = this.searchPages.find(x => x.name === searchPageName);
        await searchPage.search();
    }
    async shutdown() {
        await this.browser.close();
    }
}
exports.default = CheapSearch;
//# sourceMappingURL=cheap-search.js.map