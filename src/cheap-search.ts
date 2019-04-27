import puppeteer = require('puppeteer');
import SearchPages from './search-pages';
import SearchParameters from './search-parameters';
const MOMONDO_PAGE = 'https://www.momondo.com';

export default class CheapSearch {
    private browser: puppeteer.Browser;
    private searchPages: SearchPages[]
    constructor() {
        this.searchPages = [];
    }
    /**
     * init
     */
    public async init() {
        this.browser = await puppeteer.launch({ headless: false }); // default async is true
    }

    public async openMomondoSearch(name: string, searchParameters: SearchParameters) {
        const page = await this.browser.newPage();
        await page.goto(MOMONDO_PAGE);
        var searchPage = this.searchPages.find(x => x.name === name);
        if (searchPage) {
            searchPage.addPage(page);
        }
        else {
            this.searchPages.push(new SearchPages(name, page, searchParameters));
        }
    }

    public async search(searchPageName: string) {
        var searchPage = this.searchPages.find(x => x.name === searchPageName);

        await searchPage.search();
    }

    public async shutdown() {
        await this.browser.close();
    }
}