module.exports = async function onReady() {
    this.user.setActivity(`Netflix.`, { type: 'WATCHING' })
    console.log('[STATUS] Carregado com sucesso.')
}