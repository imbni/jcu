const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const fs = require('fs');
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: 'ecf3c15e43250274a71c20578faadd75-18e06deb-4292af6c' });
const domain = 'sandbox65e99c8a211e40dc8462f54c76a5f21c.mailgun.org';
const fromEmail = 'Excited User <mailgun@sandbox65e99c8a211e40dc8462f54c76a5f21c.mailgun.org>';
const toEmails = ['mbnism@gmail.com'];
const mailgunLogo = fs.createReadStream(`${__dirname}/en/new.png`);
const rackspaceLogo1 = fs.createReadStream(`${__dirname}/en/left-nav.png`);
const rackspaceLogo2 = fs.createReadStream(`${__dirname}/en/minicart.png`);

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/qa', (req, res) => {
    mg.messages.create(domain, {
      from: fromEmail,
      to: toEmails,
      subject: 'Hello',
      html: '<img src="cid:mailgun.png" width="200px"><br><h3>Testing some Mailgun awesomness!</h3>',
      text: 'Testing some Mailgun awesomness!',
      inline: [mailgunLogo],
      attachment: [rackspaceLogo1,rackspaceLogo2]
    })
      .then((msg) => console.log(msg))
      .catch((err) => console.log(err));
    res.send('mailgun')
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  /*
mg.messages.create(domain, {
  from: fromEmail,
  to: toEmails,
  subject: 'Hello',
  html: '<img src="cid:mailgun.png" width="200px"><br><h3>Testing some Mailgun awesomness!</h3>',
  text: 'Testing some Mailgun awesomness!',
  inline: [mailgunLogo],
  attachment: [rackspaceLogo1,rackspaceLogo2]
})
  .then((msg) => console.log(msg))
  .catch((err) => console.log(err));
  */