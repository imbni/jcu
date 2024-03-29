//console.log(process.env.MAILGUN_API_KEY);
const fs = require('fs');
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const domain = process.env.MAILGUN_DOMAIN;
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});

const fromEmail = 'Excited User <mbnism@gmail.com>';
const toEmails = ['mbnism@gmail.com'];

//const mailgunLogo = fs.createReadStream(`${__dirname}/mailgun.png`);
const rackspaceLogo1 = fs.createReadStream(`${__dirname}/en/pdp-added.png`);
const rackspaceLogo2 = fs.createReadStream(`${__dirname}/en/dropdown-new.png`);

mg.messages.create(domain, {
  from: fromEmail,
  to: toEmails,
  subject: 'Hello',
  html: '<img src="cid:en/minicart.png" width="200px"><br><h3>Testing some Mailgun awesomness!</h3>',
  text: 'Testing some Mailgun awesomness!!!',
  //inline: [mailgunLogo],
  attachment: [rackspaceLogo1,rackspaceLogo2]
})
  .then((msg) => console.log(msg))
  .catch((err) => console.log(err));
  