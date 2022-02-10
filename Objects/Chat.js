class Chat {

    clients = []
    hash = ''

    constructor(clients, io) {
        this.clients = clients
        this.createConnection(clients)
    }

    createConnection() {
        hash = ''
        for (i=0;i<30;i++) hash+='abcdefghijklmnopqrstuvwxyz0123456789'[Math.ceil(Math.random()*36+1)]
        this.hash = hash
        clients[0].join(hash)
        clients[1].join(hash)
        io.on('msg', () => {
            
        })
    }

    destroyConnection() {
        clients[0].leave(hash)
        clients[1].leave(hash)
        return this.clients
    }
}