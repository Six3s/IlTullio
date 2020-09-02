module.exports.run = async(client, message, args) => { 

    const embedDescrizionePoll = {
        "embed": {
            "title": "Struttura:",
            "description": "\`.poll domanda, op1, op2, ...(il limite è 10 opzioni) [numero unità(s/m/h)]\n Es: .poll esempio, un'opzione, un'altra opzione, l'ultima opzione [10 m] \`",
            "color": 1733921,
            "author": {
                "name": "Comando \".poll\""
            },
            "fields": [
                {
                    "name": "Descrizione",
                    "value": "▪ Il comando \".poll\" crea un sondaggio in cui è possibile votare più opzioni utilizzando le reazioni.\n▪ Può essere utilizato da tutti.\n▪ Bisogna fare attenzione alla struttura, che se sbagliata rischia di far crashare il bot.\n▪ Se il bot viene riavviato prima dei risultati, il poll viene annullato."
                }  
            ],
            "footer" : {
                "icon_url" : "https://imgur.com/p7D0hYO.png",
                "text" : "Questo messaggio viene mandato anche in caso di errore nella struttura del comando"
            }
        }
    };

    if(args == ".poll"){
        message.channel.send(embedDescrizionePoll);
    } else {
        let var1 = message.content.split("[")
        let var2 = var1[1].replace("]", "").split(" ")

        if (!var2[1]){
            message.channel.send(embedDescrizionePoll);
        } else if(!var2[0]) {
            message.channel.send(embedDescrizionePoll);
        } else {  
            let poll = message.content.slice(6).split(", ") 
            let emojis =  ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"]
            let domanda = poll[0]
            let output = ""
            let s = 1
            poll[poll.length - 1] = poll[poll.length - 1].slice(0,poll[poll.length - 1].indexOf("["))
            while (s<poll.length){ 
                if(poll[s] == ""){
                    poll.splice(poll.indexOf(""), 1)
                }
                else if(poll[s] == " ") {
                    poll.splice(poll.indexOf(" "), 1)
                } else {
                    output = output +  emojis[s] + " " + poll[s] + "\n" 
                    s++
                }               
            }
                let embed = {
                    "embed": {
                        "color": 1733921,
                        "author": {
                            "name": "Poll"
                        },
                        "fields": [
                            {
                                "name": domanda.charAt(0).toUpperCase() + domanda.slice(1),
                                "value" : output
                            }
                        ]
                    }
                };
                message.delete({timeout:1})
                message.channel.send(embed).then(function (message){
                    let x = 1
                    while (x<poll.length) {
                        if(poll[x] == "") {x++}
                        else {
                            message.react(emojis[x])
                            x++
                        }
                    };
    
                    const filter = (reaction, user) =>{return reaction.emoji.name === "1️⃣" || 
                        reaction.emoji.name === "2️⃣" || 
                        reaction.emoji.name === "3️⃣" || 
                        reaction.emoji.name === "4️⃣" || 
                        reaction.emoji.name === "5️⃣" ||
                        reaction.emoji.name === "6️⃣" ||
                        reaction.emoji.name === "7️⃣" ||
                        reaction.emoji.name === "8️⃣" ||
                        reaction.emoji.name === "9️⃣" ||
                        reaction.emoji.name === "🔟"
                    };
                    
                    let tempo = 0
    
                    if(var2[1] == "s"){
                        tempo = var2[0] * 1000
                    } else if(var2[1] == "m"){
                        tempo = var2[0] * 60 * 1000
                    } else if(var2[1] == "h"){
                        tempo = var2[0] * 60 * 60 * 1000
                    }
    
                    const collector = message.createReactionCollector(filter, { time: tempo });
    
                    let tot = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    
                    collector.on('collect', (reaction, user) => {
                        console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
    
                        if(reaction.emoji.name === '1️⃣') {
                            tot[0] = tot[0] + 1
                        } else if(reaction.emoji.name === '2️⃣') {
                            tot[1] = tot[1] + 1
                        } else if(reaction.emoji.name === '3️⃣') {
                            tot[2] = tot[2] + 1
                        } else if(reaction.emoji.name === '4️⃣') {
                            tot[3] = tot[3] + 1
                        } else if(reaction.emoji.name === '5️⃣') {
                            tot[4] = tot[4] + 1
                        } else if(reaction.emoji.name === '6️⃣') {
                            tot[5] = tot[5] + 1
                        } else if(reaction.emoji.name === '7️⃣') {
                            tot[6] = tot[6] + 1
                        } else if(reaction.emoji.name === '8️⃣') {
                            tot[7] = tot[7] + 1
                        } else if(reaction.emoji.name === '9️⃣') {
                            tot[8] = tot[8] + 1
                        } else if(reaction.emoji.name === '🔟') {
                            tot[9] = tot[9] + 1
                        };
                    });
    
                    
                    
                    
                    collector.on('end', collected => {
                        let output2 = "";
                        let i = 0;
    
                        while(i<poll.length - 1){
                            if(tot[i] == 0 || tot[i] == 1) {i++}
                            else {
                                tot[i] = tot[i] - 2
                                output2 = output2 + emojis[i+1] + " " + poll[i+1] + ": " + tot[i] + "\n"
                                i++
                            }
                        };
                        message.delete({timeout:1});
                        let embed2 = {
                            "embed": {
                                "color": 1733921,
                                "author": {
                                    "name": domanda.charAt(0).toUpperCase() + domanda.slice(1)
                                },
                                "fields": [
                                    {
                                        "name": "Risultati",
                                        "value" : output2
                                    }
                                ]
                            }
                        };
                        message.channel.send(embed2);
                    })
                })
            }
    }
      
}