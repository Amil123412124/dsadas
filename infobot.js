const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("helpbot")
    .setDescription("Help menu for the botts"),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("Bot Help Menu")
      .setDescription("Bot help menu")
      .setColor("Red")
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setTimestamp()
      .addFields({
        name: "/warn",
        value: "Spieler Warnen",
        inline: false,
      });

    await interaction.reply({
      embeds: [embed],
      ephemeral: false,
    });
  },
};
