const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const {URL} = require('url');

export default async function handler(req, res) {
    const jsonReq = JSON.parse(req.body)
    const url = jsonReq.url;

    // Use Puppeteer to launch headful Chrome and don't use its default 800x600 viewport.
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    // Wait for Lighthouse to open url, then inject our stylesheet.
    browser.on('targetchanged', async target => {
    const page = await target.page();
    if (page && page.url() === url) {
        await page.addStyleTag({content: '* {color: red}'});
    }
    });

    // Lighthouse will open the URL.
    // Puppeteer will observe `targetchanged` and inject our stylesheet.
    const {lhr} = await lighthouse(url, {
    port: (new URL(browser.wsEndpoint())).port,
    output: 'json',
    logLevel: 'info',
    });

    console.log(`Lighthouse scores: ${Object.values(lhr.categories).map(c => {
        console.log(c)
        
    }).join(', ')}`);

    await browser.close();
    res.status(200).json({ data: Object.values(lhr.categories).map(c => {
        return {
            title: c.title,
            description: c.description,
            score: c.score * 100
        }
    })})
}