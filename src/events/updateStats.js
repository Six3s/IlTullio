module.exports = (client) => {

    const db = require('../database/db');

    let totaleMembri = "SELECT totale FROM statistiche.statistiche WHERE x = 'membri'"
    let totaleMessaggi = "SELECT totale FROM statistiche.statistiche WHERE x = 'messaggi inviati'"

    db.query(totaleMembri, (err, result) => {
        if(err){throw err}
        else {
            membri = result[0].totale
        db.query(totaleMessaggi, (err, result) => {
            if(err) {throw err}
            else {
                messaggi = result[0].totale

                let embedStats = {
                    "embed": {
                        "color": 1433600,
                        "author": {
                            "name": "Statistiche del server"
                        },
                        "fields": [
                            {
                                "name": "Membri",
                                "value": membri,
                                "inline" : true
                            },
                            {
                                "name" : "Messaggi inviati",
                                "value" : messaggi,
                                "inline" : true
                            }
                        ]
                    }
                };

                client.channels.cache.find(channel => channel.name == "ꜱᴛᴀᴛɪꜱᴛɪᴄʜᴇ").messages.fetch("746832609727742012")
                .then(message => message.edit(embedStats));
            }
        })}
    })
}