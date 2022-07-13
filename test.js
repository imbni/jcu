console.log(process.env.MAILGUN_API_KEY);

const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const domain = process.env.MAILGUN_DOMAIN;
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});

const fromEmail = 'Excited User';
const toEmails = ['mbnism@gmail.com'];

//const mailgunLogo = fs.createReadStream(`${__dirname}/mailgun.png`);
//const rackspaceLogo = fs.createReadStream(`${__dirname}/rackspace.png`);

mg.messages.create(domain, {
  from: fromEmail,
  to: toEmails,
  subject: 'Hello',
  html: '<img src="cid:mailgun.png" width="200px"><br><h3>Testing some Mailgun awesomness!</h3>',
  text: 'Testing some Mailgun awesomness!',
  //inline: [mailgunLogo],
  //attachment: [rackspaceLogo]
})
  .then((msg) => console.log(msg))
  .catch((err) => console.log(err));
  