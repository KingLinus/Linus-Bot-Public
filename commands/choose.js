module.exports = {
	name: 'choose',
    description: 'chooses one of the choices',
	execute(message, args) {
        if(args == ""){
            return message.channel.send('Please provide choices!')
        }
        var random = Math.random();
        var results = Math.floor(random * args.length , 1) ;
        //console.log(results);
        message.channel.send('I choose ' + args[results] + '!');
	},
};