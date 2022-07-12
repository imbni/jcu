// const mailgun = require("mailgun.js");
// const DOMAIN = 'https://api.mailgun.net/v3/sandbox0d0e42a8c1ea48d7977fd1b987336192.mailgun.org';
// const mg = mailgun({apiKey: '6ec389ca55ed3bf29be7040e9376f250-18e06deb-6dbcd6df', domain: DOMAIN});
// const data = {
// 	from: 'Excited User <me@samples.mailgun.org>',
// 	to: 'mbnism@gmail.com',
// 	subject: 'Hello',
// 	text: 'Testing some Mailgun awesomness!'
// };
// mg.messages().send(data, function (error, body) {
// 	console.log(body);
// });

const mailgun = require('mailgun.js');
console.log('mailgun')

const mg = mailgun.client({ username: 'api', key: '6ec389ca55ed3bf29be7040e9376f250-18e06deb-6dbcd6df', timeout: 60000 });

const domain = 'https://api.mailgun.net/v3/sandbox0d0e42a8c1ea48d7977fd1b987336192.mailgun.org';
const fromEmail = 'Excited User <mailgun@sandbox-123.mailgun.com>';
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