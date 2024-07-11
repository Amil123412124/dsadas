const { PermissionFlagsBits, EmbedBuilder, PermissionsBitField} = require('discord.js');
const Warns = require('../models/warns');
const Member = require('../models/member');

const { SlashCommandBuilder } = require ('discord.js');
module.exports = {

    data: new SlashCommandBuilder()
    .setName('kick')
     .setDescription('Kick a member"')
     .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
     .setDMPermission(false)
     .addUserOption(option => option
     .setName('member')
     .setDescription('member you wish to kick')
     .setRequired(true)   
     )
     .addStringOption(option => option
        .setName('reason')
        .setDescription('Reason to kick member')
        .setRequired(false) 
        .setMinLength(1)
        .setMaxLength(255)
    ),
     async execute(interaction){
       await interaction.deferReply({ephemeral: true});
       const {options, guild, user} = interaction;

       const target = await options.getMember('member');
       let reason = await options.getString('reason') ?? 'no reason provided';

       if(user.id === target.Id) return interaction.editReply("you cant kick yourself!");
       if (!target.kickable) return interaction.editReply("i cant kick that member");

       const senderRoles = interaction.member.roles.cache.map(r => r);
       const targetPerms = target.permission;

       let higherPerms = new PermissionsBitField(); 

       for(let role  of senderRoles){
        if(role.rawPosition > target.roles.highest.rawPosition){
            higherPerms.add(role.permissions)
            console.log(role.name);
        }
       }

       if(user.id !== guild.ownerId){

        if(!higherPerms.has('KickMembers'))
        return interaction.editReply("Missing permission, you need to have gigher permission!");
      else if (targetPerms.has('Administrator') && !higherPerms.has('Administrator'))  
        return interaction.editReply("Missing permission, you need to have gigher permission!");
      }

      let embed = new EmbedBuilder();

      await target.kick(reason);

      const [ member, created ] = await Member.findOrCreate({ where: {id: target.id, guildId: guild.id}});

      await Warns.create({
        guildId: target.guild.Id,
        reason: reason,
        type : 'Kick',
        enforcerId: target.user.id

      }).then(result => {
         embed
        .setColor('Red')
        .setAuthor({name: target.user.tag, iconURL: target.displayAvatarURL()})
        .setTitle('New warn')
        .setDescription(`issued by ${user.tag}`)
        .addFields({
            name: 'Id:',
            value: "`" + result.dataValues.id + "`",
            inline: true
      },
      {
        name: 'Type:',
        value: "`" + result.dataValues.type + "`",
        inline: true
      },
      {
        name: 'Guild:',
        value: "`" + guild.name + "`",
        inline: false
      },
      {
        name: reason,
        value: "`" + result.dataValues.reason + "`",
        inline: true
      }
      )
      }).catch (err => {
        console.log(err);
      });
        await interaction.editReply({ embeds: [ embed ]});
    }
}
