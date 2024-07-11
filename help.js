const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Help menu for the bot"),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('Commands für den Bot')
      .setDescription('Bot help menu')
      .setColor('Gold')
      .setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL()  })
      .setTimestamp()
      .addFields(
        {
           name:"/info",
           value:'zeigt die Infos der Spieler z.B die warns',
           inline: true
        },
        {
            name:"/warn",
            value:'warnt einen Spieler',
            inline: true
        },
        {
         name:"/ban",
         value:'Bannt ein Member',
         inline: true    
        },
        {
        name:"/kick",
        value:'Kicked einen Member',
        inline: true
        },
        {
          name:"/embed-make",
          value:'Macht ein Embed (Anfangsbuchstab bei Color muss immer Groß sein z.B **Red**',
          inline: true
          }
         
      );
    
      await interaction.reply({
        embeds: [embed],
        ephemeral: false
      })
  }
}
