const mailgun = require("mailgun-js");
const DOMAIN = 'https://api.mailgun.net/v3/sandbox0d0e42a8c1ea48d7977fd1b987336192.mailgun.org';
const mg = mailgun({apiKey: '6ec389ca55ed3bf29be7040e9376f250-18e06deb-6dbcd6df', domain: DOMAIN});
const data = {
	from: 'Excited User <me@samples.mailgun.org>',
	to: 'mbnism@gmail.com',
	subject: 'Hello',
	text: 'Testing some Mailgun awesomness!'
};
mg.messages().send(data, function (error, body) {
	console.log(body);
});