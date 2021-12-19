module.exports = {
	name: 'toggleuser',
	description: 'Toggles feature',
	execute(message) {
    const Database = require("@replit/database");
    const db = new Database();
    db.get(message.author.id).then(value => {
      if(value) db.delete(message.author.id);
      else db.set(message.author.id, "1");

      if(!value) message.channel.send("You are blacklisted");
      else message.channel.send("You are whitelisted");
    });
	},
};