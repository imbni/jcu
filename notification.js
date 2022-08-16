const fs = require('fs');
const { IncomingWebhook } = require('@slack/webhook');
const ethPrice = require('eth-price');


//const url = process.env.SLACK_WEBHOOK_URL;
const url = 'https://hooks.slack.com/services/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';
const webhook = new IncomingWebhook(url);



(async () => {
		await getEthPrice()
		.then(data => {
			//console.log(data);
			eth = JSON.stringify(data);
			var objectValue = JSON.parse(eth);
			console.log(objectValue);
		    et = eth;
		});


	await webhook.send({

		"type": "home",
		"blocks": [
			{
				"type": "header",
				"text": {
					"type": "plain_text",
					"text": "Buy eth"
				}
			},
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": "*Team Lunch (Internal)*\nCost: *$85.50USD*\nDate: *10/16/2019*\nService Provider: *Honest Sandwiches*  \nExpense no. *<fakelink.toUrl.com|#1797PD>*"
				}
			},
			{
				"type": "divider"
			},
		]
	});
})();


function getEthPrice(){
	eth = ethPrice('usd');
	return eth;
}