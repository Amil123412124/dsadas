const { SlashCommandBuilder } = require ('discord.js');

module.exports = {

    data: new  SlashCommandBuilder()
    .setName('echo')
     .setDescription('repeats what you say')
     .addStringOption(option =>
    option
    .setName('text')
    .setDescription('text to repeat')
    .setRequired(true)     ),

    async execute(interaction){
        const text = interaction.options.getString('text');
        interaction.reply(text);
    }
    }
     

