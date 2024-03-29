const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const puppeteer = require('puppeteer');
const fs = require('fs');
const { readdirSync, rmSync } = require('fs');
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const { IncomingWebhook } = require('@slack/webhook');
const ethPrice = require('eth-price');
const url = 'https://hooks.slack.com/services/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';
const webhook = new IncomingWebhook(url);
const mailgun = new Mailgun(formData);
const domain = process.env.MAILGUN_DOMAIN;
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });
const fromEmail = 'Excited User <mbnism@gmail.com>';
const toEmails = ['mbnism@gmail.com'];
const PORT = process.env.PORT || 5000

//const rackspaceLogo1 = fs.createReadStream(`${__dirname}/en/pdp-added.png`);
//const rackspaceLogo2 = fs.createReadStream(`${__dirname}/en/dropdown-new.png`);

const ads = [
  { title: 'done :)' }
];

et = '-';

express()
  .use(helmet({
    contentSecurityPolicy: false,
  }))
  .use(bodyParser.json())
  .use(cors())
  //.options('*', cors())
  .use(morgan('combined'))
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/qa', (req, res) => {
    (async () => {
      //res.send(ads);
      const browser = await puppeteer.launch({
        headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080'],
        defaultViewport: null
      });
      const page = await browser.newPage();
      await page.goto('https://www.melanielyne.com/');

      //wait for popup
      await page.waitForSelector('.ui-dialog[aria-describedby=popup-subscription-modal]')
      console.log('STEP 1 popup found')
      await page.screenshot({ path: 'en/popup-new.png' });
      //await page.waitForTimeout(15000);
      //await page.screenshot({ path: 'en/popup.png' });

      await page.goto('https://www.melanielyne.com/en/featured-shops/');
      await page.screenshot({ path: 'en/featured-shops.png' });
      console.log('STEP 2 featured-shops')

      //dropdowns
      await page.hover('#navigation > ul > li:nth-child(1) > a');
      await page.screenshot({ path: 'en/dropdown-new.png' });
      await page.hover('#navigation > ul > li:nth-child(2) > a');
      await page.screenshot({ path: 'en/dropdown-clothing.png' });
      console.log('STEP 3 dropdowns')

      //await page.waitForTimeout(10000);
      //pdp  
      await page.goto('https://www.melanielyne.com/en/clothing/jumpsuits/off-the-shoulder-jumpsuit/6010101-1698.html?dwvar_6010101-1698_color=010&dwvar_6010101-1698_size=M&start=1&ccgid=melanie-lyne-clothing#start=1');
      const button = await page.$('button.addToBagButton');
      await button.evaluate(b => b.click());
      await page.screenshot({ path: 'en/pdp-added.png' });
      console.log('STEP 4 pdp')

      //plp
      // await Promise.all([
      //   page.click('#navigation > ul > li:nth-child(1) > a'),
      //   page.waitForNavigation()

      // ]);
      await page.goto('https://www.melanielyne.com/en/new-arrivals/');
      await page.screenshot({ path: 'en/new-arrivals.png' });
      console.log('STEP 5 plp')

      //leftnav
      await page.evaluate(() => {
        document.querySelector('.leftnav-promo__container').scrollIntoView();
      });
      await page.screenshot({ path: 'en/left-nav.png' });
      console.log('STEP 6 leftnav')

      //minicart
      await page.hover('.minicart-quantity');
      await page.screenshot({ path: 'en/minicart.png' });
      console.log('STEP 7 minicart')

      await browser.close();
      res.send(ads);
    })();
  })
  .get('/api', (req, res) => {
    setTimeout(function () {
      console.log('This printed after about 3 second');
      res.send(ads);
    }, 3000);

  })
  .get('/mail', (req, res) => {
    (async () => {
      const attaches = [];
      const filesToSend = await readFiles();
      filesToSend.forEach(item => {
        filePath = fs.createReadStream(`${__dirname}/en/${item}`);
        attaches.push(filePath);
      });
      mg.messages.create(domain, {
        from: fromEmail,
        to: toEmails,
        subject: 'Hello :)',
        html: '<h3>Testing ML</h3>',
        text: 'Testing ML',
        attachment: attaches
      })
        .then((msg) => console.log(msg))
        .catch((err) => console.log(err));
      res.send('done')
    })();


  })
  .get('/clean', (req, res) => {
    (async () => {
      const dir = './en';
      readdirSync(dir).forEach(f => rmSync(`${dir}/${f}`));
      res.send('done')
    })();
  })
  .get('/buy', (req, res) => {

    (async () => {
      await getEthPrice()
        .then(data => {
          eth = JSON.stringify(data);
          et = eth;
        });
      await webhook.send({
        "type": "home",
        "blocks": [
          {
            "type": "header",
            "text": {
              "type": "plain_text",
              "text": "Buy eth " + et
            }
          }
        ]
      });
      res.send(ads);
    })();

  })
  .get('/sell', (req, res) => {

    (async () => {
      await getEthPrice()
        .then(data => {
          eth = JSON.stringify(data);
          et = eth;
        });
      await webhook.send({
        "type": "home",
        "blocks": [
          {
            "type": "header",
            "text": {
              "type": "plain_text",
              "text": "Sell eth " + et
            }
          },
          {
            "type": "divider"
          },
        ]
      });
      res.send(ads);
    })();

  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))

function readFiles() {
  const testFolder = path.join(__dirname, 'en');
  return new Promise((resolve, reject) => {
    fs.readdir(testFolder, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

function getEthPrice() {
  eth = ethPrice('usd');
  return eth;
}