module.exports = (client, message) => {
    const db = require('../../database/db');
    let server = client.guilds.cache.get("725722217714811011")
    if(message.author.bot) return;
    if(message.guild != server) return 
    else {
        let nuovoMessaggio = "UPDATE statistiche SET totale = totale + 1 WHERE x = 'messaggi inviati'";
        db.query(nuovoMessaggio, (err, result) => {
            if(err){throw err};
        });

        client.emit('updateStats')
    }
}