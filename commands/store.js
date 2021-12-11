module.exports = {
	name: 'store',
	description: 'description',
	execute(message, args) {
    const Database = require("@replit/database");
    const db = new Database();
    db.set(args[0], args[1]);
	},
};