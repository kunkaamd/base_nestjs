class MessageModel {
    constructor() {
        this.text = "";
        this.name = "";
        this.messages = [];
        this.socket = null;
        this.createSocket();
    }

    createSocket() {
        this.socket = io('http://localhost');
        this.socket.on('msgToClient', (message) => {
            this.receivedMessage(message)
        })
    }

    receivedMessage(message) {
        this.messages.push(message.payload)
        let listMessage = document.getElementById("list-message");
        let messageLine = document.createElement('li');
        messageLine.appendChild(document.createTextNode(message.payload));
        listMessage.appendChild(messageLine);
    }

    sendMessage() {
        let message = document.getElementById("message").value;
        this.socket.emit('msgToServer', message)
        
        //after finish send remove message in textarea
        document.getElementById("message").value = "";
    }

}

var messageModel = new MessageModel();

function sendMessage() {
    messageModel.sendMessage();
}