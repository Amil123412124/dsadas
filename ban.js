const { PermissionFlagsBits, EmbedBuilder, PermissionsBitField} = require('discord.js');
const Warns = require('../models/warns');
const Member = require('../models/member');

const { SlashCommandBuilder } = require ('discord.js');
module.exports = {

    data: new SlashCommandBuilder()
    .setName('ban')
     .setDescription('ban a member"')
     .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
     .setDMPermission(false)
     .addUserOption(option => option
     .setName('member')
     .setDescription('member you wish to Ban')
     .setRequired(true)   
     )
     .addStringOption(option => option
        .setName('reason')
        .setDescription('Reason to ban member')
        .setRequired(false) 
        .setMinLength(1)
        .setMaxLength(255)
    ),
     async execute(interaction){
       await interaction.deferReply({ephemeral: true});
       const { options, guild, user } = interaction;

       const target = await options.getMember('member');
       let reason = await options.getString('reason') ?? 'no reason provided';

       if ( user.id === target.id) return interaction.editReply("You cant ban yourself");
       if(!target.bannable) return interaction.editReply("i cant ban that member");

       const senderRoles = await interaction.member.roles.cache.map(r => r);
       const targetPerms = target.permissions;
       const targetHighestPosition = await target.roles.highest.rawPosition;
       let higherPerms = new PermissionsBitField();

       for(let role of senderRoles){
        if(role.rawPosition > target.roles.highest.rawPosition){
            higherPerms.add(role.permissions);
         }
       }

       if(user.id !== guild.ownerId){
        if(!higherPerms.has('BanMembers'))
        return interaction.editReply("missing permission, you need higher perms than youre target");
        else if(targetPerms.has('Administrator') && !higherPerms.has('Administrator'));
        return interaction.editReply("missing Permission, you need to have Higher Perms as youre Target!");
       }

       let embed = new EmbedBuilder();
       await target.ban({reason: reason});

       const [ member, created ] = await Member.findOrCreate({where:{ id: target.id, guildId: guild.id}});

       await Warns.create({
        guildId: guild.id,
        reason: reason,
        type: 'Ban',
        enforcerId: user.id
       }).then (result => {
        embed

        .setColor('Red')
        .setAuthor({name : target.user.tag, inconURL: target.displayAvatarURL() })
        .setTitle('New Warn')
        .setDescription(`issued by ${user.tag}`)
        .addFields(
            {
                name: 'Id:',
                value: "" + result.dataValues.id + "",
                inline: true
            },
            {
                name: 'Type:',
                value: "" + result.dataValues.type + "",
                inline: true
              },
              {
                name: 'Guild:',
                value: "" + result.dataValues.guild.name + "",
                inline: true
              },
              {
                name: 'Reason:',
                value: "" + result.dataValues.reason + "",
                inline: true
              })  
       }).catch(error  => {
        console.log(error);
       });
       await interaction.editReply({ embeds: [embed]});
    }
}
