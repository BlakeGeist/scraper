import puppeteer from 'puppeteer'

const getPageInfo = async (url) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url, {waitUntil: 'networkidle2'})
    const title = await page.title()    
    await browser.close()
    console.log(title)
    return page
}

export default getPageInfo