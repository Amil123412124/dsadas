const { SlashCommandBuilder, EmbedBuilder} = require ('discord.js');



module.exports = {

    data: new SlashCommandBuilder()
    .setName('8-ball')
    .setDescription('Ask a Question')
    .addStringOption(option => option
        .setName('question')
        .setDescription('Question to ask the 8 ball')
        .setMinLength(5)
        .setMaxLength(250)

    )
    .addBooleanOption(option => option
       .setName('hidden')
       .setDescription('Whatever or not to hide the responses from the 8-ball (displayed by default)') 
    ),
    
     async execute(interaction){
        const { options, user } =  interaction;
        const question = options.getString('question');
        const hidden = await options.getBoolean('hidden');


        if(!question.endsWith('?')) return interaction.reply({ephemeral: true, content: 'Sentence must end with a "?"'})
        let randomNum = Math.floor (Math.random() * responses.length-0.001);
    
        const embed = new EmbedBuilder()
        .setTitle('8-Ball')
        .setAuthor({ name : user.username, URL: user.displayAvatarURL()})
        .setColor('Gold')
        .setDescription(question)
        .addFields({
            name: 'Question',
            value: question
        },
        {
            name: 'Response',
            value: responses[randomNum]
        }
        );

        interaction.reply({ephemeral: hidden, embeds:[embed]});
     }
}



const responses = [

    "It is certain.",
  
    "Without a doubt.",
  
    "You may rely on it.",
  
    "Yes, definitely.",
  
    "It is decidedly so.",
  
    "As I see it, yes.",
  
    "Most likely.",
  
    "Yes.",
  
    "Outlook good.",
  
    "Signs point to yes.",
  
    "Reply hazy, try again.",
  
    "Better not tell you now.",
  
    "Ask again later.",
  
    "Cannot predict now.",
  
    "Concentrate and ask again.",
  
    "Don't count on it.",
  
    "Outlook not so good.",
  
    "My sources say no.",
  
    "Very doubtful.",
  
    "My reply is no.",
  
    "No.",
  
    "Definitely not.",
  
    "No way.",
  
    "I highly doubt it.",
  
    "Absolutely not."
  
  ];

