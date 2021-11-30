module.exports = {
	name: 'coin',
    description: 'Flips a coin',
	execute(message) {
        var results = Math.random();
        if (results > 0.5){
            message.channel.send('Heads!');
        }else if(results <= 0.5){
            message.channel.send("Tails!");
        }
	},
};