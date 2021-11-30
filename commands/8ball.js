const Discord = require('discord.js');

module.exports = {
	name: '8ball',
    description: 'returns one of the 8ball messages',
	execute(message, args) {
        if(args == ""){
            return message.channel.send('Please ask a question!')
        }
        var random = Math.random();
        var results = Math.floor(random * 8 , 1) ;
        //console.log(results);
        var answer = "";
        switch(results + 1){
            case 1:
            answer += 'It is certain'
            break;
        
            case 2:
            answer += 'Yes! Yes! Yes! Oh my God! :facepalm:'
            break;
        
            case 3:
            answer += 'Absolutely'
            break;
        
            case 4:
            answer += 'Go ask another magic 8-ball, I am tired of everyone asking me'
            break;
        
            case 5:
            answer += 'No comment'
            break;
        
            case 6:
            answer += 'Heck no'
            break;
        
            case 7:
            answer += 'My reply is no'
            break;
        
            case 8:
            answer += 'My sources say no'
            break;

            default:
            answer += ':pensive: How did you hit a perfect 9...'
        }
        const embed = new Discord.RichEmbed()
            .setColor('#7289a')
            .setTitle(answer);
            //.setURL()
            //.setAuthor()
            //.setDescription(answer)
            //.setThumbnail()
            //.addField(args, answer, true)
            //.setImage()
            //.setTimestamp()
            //.setFooter();

        message.channel.send(embed);
         
	},
};