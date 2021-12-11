module.exports = {
	name: 'anyone',
	description: 'description',
	execute(message, args) {
    const Database = require("@replit/database");
    const db = new Database();
    //db.set("debug", args[0]);
    db.get("debug").then(value => {
      return message.channel.send(value);
    });
    
		// if (!message.mentions.users.size) {
		// 	return message.channel.send(`Your avatar: <${message.author.displayAvatarURL}>`);
		// }

		// const avatarList = message.mentions.users.map(user => {
		// 	return `${user.username}'s avatar: <${user.displayAvatarURL}>`;
		// });

		// message.channel.send(avatarList);
	},
};