module.exports = (client, member) => {
    console.log("Un utente in meno in " + member.guild.name);

    const db = require('../../database/db');

    if(member.guild.id != "725722217714811011") return 
    else {
        let menoUtente = "UPDATE statistiche SET totale = totale - 1 WHERE x = 'membri'";

        db.query(menoUtente, (err, result) => {
            if(err){throw err};
        });

        client.emit('updateStats')
    }
}