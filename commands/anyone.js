module.exports = {
	name: 'anyone',
	description: 'description',
	aliases: ['icon', 'pfp'],
	execute(message) {
    message.channel.send(message.mentions);
		// if (!message.mentions.users.size) {
		// 	return message.channel.send(`Your avatar: <${message.author.displayAvatarURL}>`);
		// }

		// const avatarList = message.mentions.users.map(user => {
		// 	return `${user.username}'s avatar: <${user.displayAvatarURL}>`;
		// });

		// message.channel.send(avatarList);
	},
};