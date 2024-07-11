const { SlashCommandBuilder, PermissionFlagsBits } = require ('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("defer")
     .setDescription('Defer Reply Example"')
     .addStringOption(option => option
        .setName('string')
        .setDescription('test')
        .setMaxLength (10)
        .setMinLength(3) 
        .setRequired(true)
        
        .setChoices
        ({name: 'hello', value: 'hello'}, 
        {name: 'jinxed', value: 'jinxed'}))
      

      .addIntegerOption(option => option
       .setName('number')
       .setDescription('test')
       .setMaxValue(10)
       .setMinValue(3)
       .setRequired(true)
       )
        
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)
      ,
     
     
     
    
     async execute(interaction){
       await interaction.deferReply({ephemeral: true});
       await interaction.editReply({content: "Hello"});

     }
}

