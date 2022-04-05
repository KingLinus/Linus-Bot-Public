//Dependancies
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const keepAlive = require("./server");

//Discord Constants
const client = new Discord.Client();
const cooldowns = new Discord.Collection();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//Getting all the command files
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

//Keeps the replit instance alive
keepAlive();

//Linus Bot name/avatar/status
client.once('ready', () => {
	console.log('Ready!');
	client.user.setUsername('Linus Bot');
	client.user.setAvatar('Linus.PNG');
	client.user.setActivity('Pingu in the city', { type: 'WATCHING' });
});

//Message parser
var lastMessage = [""];
var sentGuild = [""];
var lastMessageAuthorId;
client.on('message', message => {

	//init database
	const Database = require("@replit/database");
	const db = new Database();
	db.get(message.guild.id).then(value => {
		if (value) {
			db.get(message.author.id).then(isUserBlacklisted => {
				if (!isUserBlacklisted) executeHiddenMeme(client, message);
			});
		}
	});

	//Finds logs channel and logs messages sent
	const LOGCHANNEL = 'logs';
	if (message.channel.type == 'text' && !message.author.bot) {
		var logger = message.guild.channels.find(
			channel => channel.name === LOGCHANNEL
		);
		if (logger) {
			logger.send(message.author.username + ' said: "' + message.cleanContent + '" in the "' + message.channel.name + '" channel.');
		}
	}

	/*
	1. If the message either doesn't start with the prefix or was sent by a bot, exit early.
	2. Create an args variable that slices off the prefix entirely and then splits it into an array by spaces.
	3. Create a command variable by calling args.shift(), which will take the first element in array and return it while also removing it from the original array (so that you don't have the command name string inside the args array).
	*/

	const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|\\${prefix})\\s*`);
	if (!message.content.startsWith(prefix) && !prefixRegex.test(message.content) || message.author.bot) {
		if (!message.author.bot) {
			if (sentGuild.indexOf(message.channel.id) === -1) {
				sentGuild.push(message.channel.id.toString());
				lastMessage.push(message.channel.lastMessage.toString());

			}
			else {
				lastMessage[sentGuild.indexOf(message.channel.id.toString())] = message.channel.lastMessage.toString();

			}
			lastMessageAuthorId = message.author.id;

		} else {
			/*if(message.content.endsWith('has left the server! Press :regional_indicator_f: to pay respects.')){
					message.react('🇫');
			}*/
		}
		return;
	}

	const [, matchedPrefix] = message.content.match(prefixRegex);
	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
	//const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	//Allows the use of alias for a function(avatar.js)
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	//Forces the function to be used inside a server and not in a DM (role.js)
	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	//Letting the user know that the function requires an argument (args-info.js)
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	//Forcing the command to have a cooldown time (ping.js)
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			const hourLeft = Math.trunc(timeLeft.toFixed(1) / 3600);
			const minLeft = Math.trunc((timeLeft - hourLeft * 3600) / 60)
			const secondsLeft = Math.trunc(timeLeft % 60)

			if (timeLeft.toFixed(1) > 3600) {
				return message.reply(`Please wait ${hourLeft} more hour(s) ${minLeft} minute(s) and ${secondsLeft} second(s) before reusing the \`${command.name}\` command.`);
			} else if (timeLeft.toFixed(1) > 3600) {
				return message.reply(`Please wait ${minLeft} more minute(s) and ${secondsLeft} second(s) before reusing the \`${command.name}\` command.`);
			}
			else
				return message.reply(`Please wait ${secondsLeft} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	//Deletes the message after the time has passed
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

});

var executeHiddenMeme = function(client, message) {
	var hiddenmeme = message.content.toLowerCase();
	if (message.author.bot) hiddenmeme = "";
	if (hiddenmeme.search('hmmm') > -1 && !message.author.bot) {
		try {
			const command = client.commands.get('hmmm');

			//Forcing the command to have a cooldown time (ping.js)
			if (!cooldowns.has(command.name)) {
				cooldowns.set(command.name, new Discord.Collection());
			}
			const now = Date.now();
			const timestamps = cooldowns.get(command.name);
			const cooldownAmount = (command.cooldown || 3) * 1000;
			if (timestamps.has(message.author.id)) {
				const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
				if (now < expirationTime) {
					return;
				}
			}

			command.execute(message);

			//Deletes the message after the time has passed
			timestamps.set(message.author.id, now);
			setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
		}
		catch (error) {
			console.error(error);
			message.reply('there was an error trying to execute that command!');
		}
	}

	if (hiddenmeme.search('when gacha') > -1) {
		return message.channel.send('Now.');
	} else if (hiddenmeme.search('i am ') > -1) {
		var name = message
			.content
			.substring(message
				.content
				.toLowerCase()
				.search('i am ') + 5);
		rename(message.guild, message.author, name);
	} else if (hiddenmeme.search("i'm ") > -1) {
		var name = message
			.content
			.substring(message
				.content
				.toLowerCase()
				.search("i'm ") + 4);
		rename(message.guild, message.author, name);
	} else if (hiddenmeme.search('im ') == 0
		|| hiddenmeme.search(' im ') > -1) {
		var name = message
			.content
			.substring(message
				.content
				.toLowerCase()
				.search('im ') + 3);
		rename(message.guild, message.author, name);
	}
}

var rename = function(guild, user, name) {
	if (Math.random() < 0.9) return;
	var member = guild.fetchMember(user.id)
		.then(member => {
			member.setNickname(name)
		})
		.catch(err => { console.log("Unknown Nickname Change Error") });
};

var sendIAmResponse = function(message, name) {
	return message
		.channel
		.send('Hi '
			+ name)
		.then(
			message
				.channel
				.send('I am Linus bot')
		);
}

client.login(token);

//Unused functions
//listening for members leaving the server 
/*client.on('guildMemberRemove', member =>{
    member.guild.channels.find(channel => channel.name === "general").send('**' + member.user.username + '** has left the server! Press :regional_indicator_f: to pay respects.');

});*/

	//Listening for "what" and repeating the last message sent before the command capitalized and bolded
	/*if ((message.content === 'What' || message.content === 'what' || message.content === 'What?' || message.content === 'what?') && !message.author.bot){
			if (lastMessage != null) {
				 var index = sentGuild.indexOf(message.channel.id.toString());
				 if(index != -1){
					var lastMessageCAPS = lastMessage[index].toUpperCase();
					if(message.author.id === lastMessageAuthorId){
							return;
					}
					return message.channel.send(`**${lastMessageCAPS}**`);
					}
			}

	}*/

	//Listening for "what" and repeating the last message sent before the command capitalized and bolded
	/*if ((message.content === 'What' || message.content === 'what' || message.content === 'What?' || message.content === 'what?') && !message.author.bot){
			if (lastMessage != null) {
				 var index = sentGuild.indexOf(message.channel.id.toString());
				 if(index != -1){
					var lastMessageCAPS = lastMessage[index].toUpperCase();
					if(message.author.id === lastMessageAuthorId){
							return;
					}
					return message.channel.send(`**${lastMessageCAPS}**`);
					}
			}
	}*/