const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const domain = process.env.MAILGUN_DOMAIN;
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });
const fromEmail = 'Excited User <mbnism@gmail.com>';
const toEmails = ['mbnism@gmail.com'];
const PORT = process.env.PORT || 5000

const rackspaceLogo1 = fs.createReadStream(`${__dirname}/en/pdp-added.png`);
const rackspaceLogo2 = fs.createReadStream(`${__dirname}/en/dropdown-new.png`);

const ads = [
  {title: 'Hello, world (again)!'}
];

express()
  .use(helmet())
  .use(bodyParser.json())
  .use(cors())
  .use(morgan('combined'))
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/qa', (req, res) => {
    mg.messages.create(domain, {
      from: fromEmail,
      to: toEmails,
      subject: 'Hello :)',
      html: '<img src="cid:en/minicart.png" width="200px"><br><h3>Testing some Mailgun awesomness!</h3>',
      text: 'Testing some Mailgun awesomness!!!',
      //inline: [mailgunLogo],
      attachment: [rackspaceLogo1, rackspaceLogo2]
    })
      .then((msg) => console.log(msg))
      .catch((err) => console.log(err));
    res.send('done')
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