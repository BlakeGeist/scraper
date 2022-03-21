// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { parse } from "node-html-parser";
import cheerio from 'cheerio';

import puppeteer from 'puppeteer';

export default async function handler(req, res) {
  const jsonReq = JSON.parse(req.body)
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  await page.setRequestInterception(true);

  page.once('request', request => {
      var data = {
          'method': 'POST',
          'headers': {
              ...request.headers(),
              'Content-Type': 'application/x-www-form-urlencoded'
          },
      };
  
      request.continue(data);
  
      // Immediately disable setRequestInterception, or all other requests will hang
      page.setRequestInterception(false);
  });
  
  await page.goto(jsonReq.url, {waitUntil: 'networkidle2'});
  const pageRresponse = await page.goto(jsonReq.url);
  
  await page.evaluate(async () => {
    let scrollPosition = 0
    let documentHeight = document.body.scrollHeight

    while (documentHeight > scrollPosition) {
      window.scrollBy(0, documentHeight)
      await new Promise(resolve => {
        setTimeout(resolve, 1000)
      })
      scrollPosition = documentHeight
      documentHeight = document.body.scrollHeight
    }
  })

  const html = await page.evaluate(() => document.querySelector('*').outerHTML);

  const getElementBy = async (query, content) => {
    try {
      return await page.$eval(query, (el, content) => el[content], content);
    }
    catch {
      return ''
    }    
  }

  const schema = () => {
    const document = parse(html);
    const structuredData = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    const structuredDataJson = structuredData.map((node) => JSON.parse(node.innerHTML)).flat();
    return structuredDataJson
  }

  const getParsedMainContent = async () => {
    const mainContent = await getElementBy(".main-content", 'innerHTML')
    let $ = cheerio.load(mainContent);   
    $('*').each(function() {      // iterate over all elements
        this.attribs = {};     // remove all attributes
    });
    $('*').remove('iframe')
    return $.html($('body'));
  }

  const images = await page.$$eval("img", el => el.map(img => {
    return {
      src: img.src,
      alt: img.alt
    }
  }))

  const data = {
    meta: {
      data: {
        title: await page.title(),
        description: await page.$eval("head > meta[name='description']", element => element.content),
        canonical: await page.$eval("head > link[rel='canonical']", element => element.href),
        ampUrl: await page.$eval("head > link[rel='amphtml']", element => element.href),
        robots: await page.$eval("head > meta[name='robots']", element => element.content),
        og: {
          title: await getElementBy("head > meta[property='og:title']", 'content'),
          siteName: await getElementBy("head > meta[property='og:site_name']", 'content'),
          description: await getElementBy("head > meta[property='og:description']", 'content'),
          type: await getElementBy("head > meta[property='og:type']", 'content'),
          image: await getElementBy("head > meta[property='og:image']", 'content'),
          url: await getElementBy("head > meta[property='og:url']", 'content'),
        },
        twitter: {
          card: await getElementBy("head > meta[name='twitter:card']", 'content'),
          site: await getElementBy("head > meta[name='twitter:site']", 'content'),
          siteId: await getElementBy("head > meta[name='twitter:site:id']", 'content'),
          creator: await getElementBy("head > meta[name='twitter:creator']", 'content'),
          creatorId: await getElementBy("head > meta[name='twitter:creator:id']", 'content'),
          description: await getElementBy("head > meta[name='twitter:description']", 'content'),
          title: await getElementBy("head > meta[name='twitter:title']", 'content'),
          image: await getElementBy("head > meta[name='twitter:image']", 'content'),
          image: await getElementBy("head > meta[name='twitter:image']", 'content'),
          imageAlt: await getElementBy("head > meta[name='twitter:image:alt']", 'content')
        }        
      },
      score: 66
    },
    urlInfo: {
      data: {
        url: jsonReq.url,
        status: pageRresponse.status()
      },
      score: 75,
      failed: true
    },
    articleDate: {
      data: {
        date: await getElementBy(".article-date time", 'innerText')
      },
      score: 87
    },
    images: {
      score: 22,
      data: images
    },
    schema: {
      data: schema(),
      score: 58
    },
    links: {
      data: await page.$$eval(".article-body a", el => el.map(a => {
        const link = {
          href: a.href,
          text: a.innerText,
        }
  
        if(a.target) link.target = a.target
        if(a.rel) link.rel = a.rel
  
        return link
      })),
      score: 85
    },
    headers: {
      data: {
        h1: await page.$$eval("h1", el => el.map(heading => heading.textContent)),
        h2: await page.$$eval("h2", el => el.map(heading => heading.textContent)),
        h3: await page.$$eval("h3", el => el.map(heading => heading.textContent)),
        h4: await page.$$eval('h4', el => el.map(heading => heading.textContent))        
      },
      score: 99
    },
    articleText: await getElementBy(".article-body", 'innerText'),
    mainContent: await getElementBy(".main-content", 'innerHTML'),
    parsedMainContent: await getParsedMainContent()
  }

  await browser.close();
  res.status(200).json({ data: data })


}

