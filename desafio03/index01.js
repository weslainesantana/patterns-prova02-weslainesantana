class EmailChannel {
    dispatch(text) {
        console.log(`📧 Email enviado: ${text}`);
    }
}

class SMSChannel {
    dispatch(text) {
        console.log(`📱 SMS enviado: ${text}`);
    }
}

class PushChannel {
    dispatch(text) {
        console.log(`🔔 Push enviado: ${text}`);
    }
}

class Notifier {
    constructor(channel) {
        if (!channel || typeof channel.dispatch !== "function") {
            throw new Error("Canal inválido: é necessário implementar o método dispatch().");
        }
        this.channel = channel;
    }

    sendNotification(text) {
        this.channel.dispatch(text);
    }
}

const emailChannel = new EmailChannel();
const notifierEmail = new Notifier(emailChannel);
notifierEmail.sendNotification("Seu pedido foi processado e enviado via email!");

const smsChannel = new SMSChannel();
const notifierSMS = new Notifier(smsChannel);
notifierSMS.sendNotification("Seu pedido foi confirmado por SMS!");
