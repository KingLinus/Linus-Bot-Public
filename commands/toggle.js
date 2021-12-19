module.exports = {
	name: 'toggle',
	description: 'Toggles feature',
	execute(message) {
    const Database = require("@replit/database");
    const db = new Database();
    db.get(message.guild.id).then(value => {
      if(value) db.delete(message.guild.id);
      else db.set(message.guild.id, "1");

      if(!value) message.channel.send("Server enabled");
      else message.channel.send("Server disabled");
    });
	},
};