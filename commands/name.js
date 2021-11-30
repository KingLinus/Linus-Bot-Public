module.exports = {
	name: 'name',
    description: 'Changes the nickname of a member',
    cooldown: 86400,
	execute(message, args) {

	if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')){
        return message.channel.send('I don\'t have permission to change nicknames!');
    } 

    //console.log(message.mentions.users.first());
    //Checking if the user mentioned the target
    /*
    if (!message.mentions.users.first()){
        message.reply("You didn't mention the user!");
        //refunding the cooldown
        module.exports.cooldown = 1;
        return
    }*/

    var newNickname = "";
    for(i = 1; i < args.length; i++){
        var newNickname = newNickname + args[i] + " ";
    }

    const user = message.mentions.users.map(user => {
        if (user) {
            // Now we get the member from the user
            // console.log(user);
            const member = message.guild.fetchMember(user.id)
            .then(member => {
              member.setNickname(newNickname).then(() => {
                // We let the message author know we were able to change the nickname
                message.reply(`Successfully changed ${user.tag}`);
            })
            .catch(err => {
                // An error happened
                    // This is generally due to the bot not being able to change the nickname of the member,
                    // either due to missing permissions or role hierarchy
                    message.reply('I was unable to change the nickname');
                    module.exports.cooldown = 1;
                    // Log the error
                    console.error(err);
            })
            });
           
            }
    });       
        
	},
};
