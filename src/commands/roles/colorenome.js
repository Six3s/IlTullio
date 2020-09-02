module.exports.run = async(client, message, args) => {
    var colore = [
        "746406874307624981", //Maroon
        "746407714791358505", //Rosso
        "746409173196996690", //Arancione
        "746409342298750997", //Giallo
        "746409661682417757", //Lime
        "746409855778291882", //Verde
        "746409985617035415", //Verde scuro
        "746409972690321418", //Verdeacqua
        "746410393194463262", //Ciano
        "746410638531625040", //Azzurro
        "746410627316318258", //Blu
        "746410893436256436", //Viola
        "746412027605680171", //Magenta
        "746411625631711410", //Rosa
        "746411275268915291", //Rosa chiaro
        "746411101180133528", //Lavanda
        "746412130848473089", //Bianco
        "746412297836298461"  //Nero
    ]
    let role = args.toString().replace("<","").replace("@","").replace("&","").replace(">","");
    let s = 0
    while(s < colore.length){
        let member = message.guild.member(message.author);
        member.roles.remove(colore[s]);
        if(role !== colore[s]){}
        else {
            member.roles.add(role);
            message.reply("Colore cambiato")
        }
        s++
    }
}