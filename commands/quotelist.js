module.exports = {
	name: 'quotelist',
	description: 'The current list of quote as of 03/06/2019',
	execute(message) {
		message.channel.send('https://twitch.center/customapi/quote/list?token=6b7beb5b');
	},
};