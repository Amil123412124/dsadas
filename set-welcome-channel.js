const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require ('discord.js');
const Guild = require('../models/guild')

    module.exports = {

    data: new SlashCommandBuilder()
    .setName("set-welcome-channel")
    .setDescription('Set the welcome channel for this guild where the welcome message will be sent a new member joins')
    .addChannelOption(option => option
     .setName('channel')
     .setDescription('channel to send the welcome message in')  
     .addChannelTypes(ChannelType.GuildText) 
    )     
     .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
     .setDMPermission(false),

     async execute(interaction){
        await interaction.deferReply({ephemeral: true});
        const { options, member } = interaction;

        if(interaction.guild.ownerId !== member.id) return interaction.editReply('Only the server owner can use this command');

        const channel = await options.getChannel('channel');
        const [guild, created] = await Guild.findOrCreate({where: {id: interaction.guild.id}})
       
        if(!channel) await guild.update({welcomeChannelId: null});
        else await guild.update({welcomeChannelId: channel.id});

        if(!channel) interaction.editReply(`Disabled the welcome message system`);
       else interaction.editReply(`Set the Channel for welcome messages to ${channel}`);
     }
}

