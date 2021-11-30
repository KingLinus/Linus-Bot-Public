module.exports = {
	name: 'hmmm',
    description: 'corn',
    cooldown: 30,
	execute(message, args) {
        return message.channel.send('Corn.');
    },
};