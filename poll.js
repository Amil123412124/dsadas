const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Create a new poll.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMembers)
    .addStringOption(option => option
        .setName('poll-title')
        .setDescription('Set the title of the poll')
        .setMaxLength(125)
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName('option1')
        .setDescription('Option 1 of 5')
        .setMaxLength(50)
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName('option2')
        .setDescription('Option 2 of 5')
        .setMaxLength(50)
        .setRequired(true)
    )
    .addStringOption(option => option
        .setName('option3')
        .setDescription('Option 3 of 5')
        .setMaxLength(50)
    )
    .addStringOption(option => option
        .setName('option4')
        .setDescription('Option 4 of 5')
        .setMaxLength(50)
    )
    .addStringOption(option => option
        .setName('option5')
        .setDescription('Option 5 of 5')
        .setMaxLength(50)
    ),

    async execute(interaction){
        await interaction.deferReply({ephemeral: true});
        const { user, guild, channel } = await interaction;
        const options = await interaction.options.data;

        const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"];

        let embed = new EmbedBuilder()
            .setTitle(`${options[0].value}`)
            .setColor("Green");

        for(let i = 1; i < options.length; i++){
            let emoji = emojis[i-1];
            let option = options[i];
            embed.addFields(
            {
                name: `${emoji} ${option.value}`,
                value: ' '
            }
            )
        }
        const message = await channel.send({embeds: [embed]});
    
        for(let i = 1; i < options.length; i++){
            let emoji = emojis[i-1];
            message.react(emoji);
        }        


        await interaction.editReply({content: 'sent poll successfully!'});
    }
}