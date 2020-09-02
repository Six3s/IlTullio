module.exports = (client, member) => {
    console.log("Nuovo membro in " + member.guild.name);

    const db = require('../../database/db');

    if(member.guild.id != "725722217714811011") return 
    else {
        let nuovoUtente = "UPDATE statistiche SET totale = totale + 1 WHERE x = 'membri'";

        db.query(nuovoUtente, (err, result) => {
            if(err){throw err};
        });

        client.emit('updateStats')
    }
}