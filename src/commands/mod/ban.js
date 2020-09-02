module.exports.run = async(client, message, args) => 

    {let embedDescrizioneBan = {

        "embed": {
            "title": "Struttura:",
            "description": "\`.ban @persona da bannare, motivo\`",
            "color": 14226185,
            "author": {
                "name": "Comando \".ban\""
            },
            "fields": [
                {
                    "name": "Descrizione",
                    "value": "▪ Il comando \".ban\" fa uscire dal server l'utente menzionato, senza poter rientrare. \n▪ Può essere utilizzato solo dai **Founder**. \n▪ Viene utilizzato in caso non vengano rispettate alcune Regole."
                }  
            ],
            "footer" : {
                "icon_url" : "https://imgur.com/x5nCmCU.png",
                "text" : "Questo messaggio viene mandato anche in caso di errore nella struttura del comando"
            }
        }
    }

    if(args === ".ban"){
        message.channel.send(embedDescrizioneBan)
    } else {

        if (!message.member.hasPermission("BAN_MEMBERS")) {
            message.channel.send(embedDescrizioneBan) 
        }
        let User = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
        if (!User) { 
            message.channel.send("Invalid User")
        }
        let motivo = message.content.slice(message.content.indexOf(", ") + 1);
        if (User.hasPermission("BAN_MEMBERS")) {
            message.reply("Non puoi bannare questa persona");
        }
        try {
            embedBan = {
                "embed": {
                    "color": 14226185,
                    "author": {
                        "name": "Ban Info" 
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
                    .send(embedBan)
                    .then(() => {
                        User.ban().then(message.channel.send(embedBan))
                                .catch((e) => {
                                    console.log('Failed to ban!', e);
          });
      });
  });
        } catch(err) {
            console.log(err)
        }
    }
}