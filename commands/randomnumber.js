module.exports = {
	name: 'randomnumber',
    description: 'generates a random number, you can give it a range to generate, if no arguments are provided it will provide one from 0 to 1',
	execute(message, args) {
        
        var random = Math.random();

        if(args == ""){
            return message.channel.send(random.toString());
        }

        if(args[0] <= args[1]){
            var lowerrange = parseInt(args[0]);
            var higherrange = parseInt(args[1]);
        }else{
            var lowerrange = parseInt(args[1]);
            var higherrange = parseInt(args[0]);
        }

        

        if (higherrange == lowerrange){
            return message.channel.send("Please provide valid ranges!");
        }

        var results = Math.floor(random * (higherrange - lowerrange) + lowerrange, 1) ;
        //console.log(results);
        message.channel.send(results.toString());
	},
};