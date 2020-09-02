module.exports = (client) => {
    console.log(`Logged in as ${client.user.tag}.`);

    setInterval(() => {
        client.emit('updateStats')
    }, 15000)
}