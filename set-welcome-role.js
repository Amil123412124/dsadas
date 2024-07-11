const { SlashCommandBuilder, PermissionFlagsBits, ChannelType} = require ('discord.js');
const Guild = require('../models/guild')

    module.exports = {

    data: new SlashCommandBuilder()
    .setName("set-welcome-role")
    .setDescription('Set the welcome role for this guild where the welcome message will be sent a new member joins')
    .addRoleOption(option => option
     .setName('role')
     .setDescription('role to send the welcome message in')  
     
    )     
     .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
     .setDMPermission(false),

     async execute(interaction){
        await interaction.deferReply({ephemeral: true});
        const { options, member } = interaction;

        if(interaction.guild.ownerId !== member.id) return interaction.editReply('Only the server owner can use this command');

        const role = await options.getRole('role');
        const [guild, created] = await Guild.findOrCreate({where: {id: interaction.guild.id}})
       
        if(!role) await guild.update({welcomeRolelId: null});
        else await guild.update({welcomeRoleId: role.id});

        if(!role) interaction.editReply(`Disabled the  role system`);
       else interaction.editReply(`Set the Role for welcome messages to ${role}`);
     }
}

