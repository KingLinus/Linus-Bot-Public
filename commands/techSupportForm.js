module.exports = {
	name: 'techSupportForm',
    description: 'form to fill out for people who needs help with setting up Project64',
    aliases: ['form'],
	execute(message) {
		message.channel.send('Please answer the following: \n 1. Please describe the problem. \n 2. What were you trying to do? \n 3. What ROM are you trying to play? \n 4. What version of Project64 are you running? \n 5. Did you get Project64 from this server? \n 6. What kind of controller are you using?* \n 7. What controller plugin are you using?** \n *If using GameCube controller, please specify adapter as well \n \\*\\*If using NRage, please specify 1.80, 1.83, 2.3, or other');
	},
};