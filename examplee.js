const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true,args: ['--window-size=1920,1080'],
  defaultViewport: null });
  const page = await browser.newPage();

  /*
  await page.goto('https://www.melanielyne.com/en/clothing/jumpsuits/off-the-shoulder-jumpsuit/6010101-1698.html?dwvar_6010101-1698_color=010&dwvar_6010101-1698_size=M&start=1&ccgid=melanie-lyne-clothing#start=1');
  const button = await page.$('button.addToBagButton');
  await button.evaluate(b => b.click());
  await page.screenshot({ path: 'en/pdp-added-n.png' });
*/
await page.goto('https://storefront:laura123@dwstaging.melanielyne.com/en/new-arrivals/?__siteDate=202207022320');

  await Promise.all([
    page.click('#navigation > ul > li:nth-child(1) > a'),
    page.waitForNavigation()
  ]);
  await page.screenshot({ path: 'en/new.png' });

  await page.evaluate(() => {
    document.querySelector('.leftnav-promo__container').scrollIntoView();
 });

 await page.screenshot({ path: 'en/left-nav.png' });

  await browser.close();
})();




async function findByLink(page, linkString) {
  const links = await page.$$('.menu-category a')
  for (var i=0; i < links.length; i++) {
    let valueHandle = await links[i].getProperty('innerText');
    let linkText = await valueHandle.jsonValue();
    const text = getText(linkText);
    //console.log(text);
    if (linkString == text) {
      console.log(linkString);
      console.log(text);
      console.log("Found");
      return links[i];
    }
  }
  return null;
}

function getText(linkText) {
  linkText = linkText.replace(/\r\n|\r/g, "\n");
  linkText = linkText.replace(/\ +/g, " ");

  // Replace &nbsp; with a space 
  var nbspPattern = new RegExp(String.fromCharCode(160), "g");
  return linkText.replace(nbspPattern, " ");
}
