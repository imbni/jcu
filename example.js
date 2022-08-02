const puppeteer = require('puppeteer');
console.log('test puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    headless: true, args: ['--window-size=1920,1080', '--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: null
  });
  const page = await browser.newPage();
  await page.goto('https://www.melanielyne.com/');

  //dropdowns
  await page.hover('#navigation > ul > li:nth-child(1) > a');
  await page.screenshot({ path: 'en/dropdown-new.png' });
  await page.hover('#navigation > ul > li:nth-child(2) > a');
  await page.screenshot({ path: 'en/dropdown-clothing.png' });

  //pdp  
  await page.goto('https://www.melanielyne.com/en/clothing/jumpsuits/off-the-shoulder-jumpsuit/6010101-1698.html?dwvar_6010101-1698_color=010&dwvar_6010101-1698_size=M&start=1&ccgid=melanie-lyne-clothing#start=1');
  const button = await page.$('button.addToBagButton');
  await button.evaluate(b => b.click());
  await page.screenshot({ path: 'en/pdp-added.png' });

  //plp
  await Promise.all([
    page.click('#navigation > ul > li:nth-child(1) > a'),
    page.waitForNavigation()
  ]);
  await page.screenshot({ path: 'en/new.png' });

  //leftnav
  await page.evaluate(() => {
    document.querySelector('.leftnav-promo__container').scrollIntoView();
  });
  await page.screenshot({ path: 'en/left-nav.png' });


  //minicart
  await page.hover('.minicart-quantity');
  await page.screenshot({ path: 'en/minicart.png' });

  await browser.close();
})();

async function wait(time) {

  return new Promise(function (resolve) {

    setTimeout(resolve, time)

  });

}

function getText(linkText) {
  linkText = linkText.replace(/\r\n|\r/g, "\n");
  linkText = linkText.replace(/\ +/g, " ");

  // Replace &nbsp; with a space 
  var nbspPattern = new RegExp(String.fromCharCode(160), "g");
  return linkText.replace(nbspPattern, " ");
}

