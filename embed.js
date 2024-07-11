const { PermissionFlagsBits, SlashCommandBuilder, ChannelType, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('embed-make')
    .setDescription('Make an embed message')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption( option => option
        .setName('title')
        .setDescription('Title of the embed.')
        .setRequired(true))
    .addStringOption(option => option
        .setName('description')
        .setDescription('Description field of embed. Specify newlines with "\n" as its own "word".')
        .setRequired(true))
    .addStringOption(option => option
        .setName('color')
        .setDescription('Color of the embed border. Accepts hex code colors.')
        .setRequired(true))
    .addChannelOption(option => option
        .setName('channel')
        .setDescription('The channel to send the embed to.')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(true)),

    async execute(interaction){
        const { client, options } = await interaction;
        const title = options.getString('title');
        const desc = options.getString('description');
        const color = options.getString('color');
        const channel = options.getChannel('channel') ?? interaction.channel;
        const aDesc = desc.split("\\n");

        let embed;

        embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(aDesc.join("\n"))
        .setColor(color)
        .setAuthor({ name: client.user.tag, iconURL: client.user.displayAvatarURL()})
        .setFooter({text: client.user.tag, iconURL: client.user.displayAvatarURL()}),

        await channel.send({embeds: [embed]});
        await interaction.reply({content: 'Embed created.', ephemeral: true });



    }
}