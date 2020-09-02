module.exports.run = async(client, message, args) => {

    let embedDescrizioneKick = {
        "embed": {
            "title": "Struttura:",
            "description": "\`.kick @persona da kickare, motivo\`",
            "color": 16744448,
            "author": {
                "name": "Comando \".kick\""
            },
            "fields": [
                {
                    "name": "Descrizione",
                    "value": "▪ Il comando \".kick\" fa uscire dal server l'utente menzionato. \n▪ Può essere utilizzato solo dagli **Admin** e dai **Founder**. \n▪ Viene utilizzato in caso non vengano rispettate alcune Regole."
                }  
            ],
            "footer" : {
                "icon_url" : "https://imgur.com/PoL5A73.png",
                "text" : "Questo messaggio viene mandato anche in caso di errore nella struttura del comando"
            }
        }
    }

    if(args === ".kick"){
        message.channel.send(embedDescrizioneKick)
    } else {

        if (!message.member.hasPermission("KICK_MEMBERS")) {
            message.channel.send(embedDescrizioneKick) 
        }
        let User = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
        if (!User) { 
            message.channel.send("Invalid User")
        }
        let motivo = message.content.slice(message.content.indexOf(", ") + 1);
        if (User.hasPermission("KICK_MEMBERS")) {
            message.reply("Non puoi kickare questa persona");
        }
        try {
            embedKick = {
                "embed": {
                    "color": 16744448,
                    "author": {
                        "name": "Kick Info" 
                    },
                    "thumbnail" : {
                        "url" : "https://cdn.discordapp.com/avatars/"+ User.id +"/" + message.mentions.users.first().avatar +".png"
                    },
                    "fields": [
                        {
                            "name": "Utente",
                            "value" : message.mentions.users.first()
                        },
                        {
                            "name" : "Motivo",
                            "value" : motivo.charAt(1).toUpperCase() + motivo.slice(2)
                        }
                    ]
                }
            };
            User.createDM().then((DMChannel) => {
                DMChannel
                    .send(embedKick)
                    .then(() => {
                        User.kick().then(message.channel.send(embedKick))
                                .catch((e) => {
                                    console.log('Failed to kick!', e);
          });
      });
  });
        } catch(err) {
            console.log(err)
        }
    }
}