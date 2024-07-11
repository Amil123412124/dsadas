const Guild = require('./models/guild');
const Warns = require('./models/warns.js');
const Member = require('./models/member');


Member.hasMany(Warns);
Warns.belongsTo(Member);

// Guild.sync({alter: true});
// Warns.sync({force: true});
// Member.sync({force:true});
