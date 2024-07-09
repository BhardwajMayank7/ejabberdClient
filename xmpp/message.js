class Message {
    constructor(type, content) {
        this.type = type
        this.content = content
    }

    getBody() {
        return {
            type: this.type,
            content: this.content,
        }
    }

    render() {
        throw new Error('Render method not implemented')
    }
}

class TextMessage extends Message {
    constructor(content) {
        super('text', content)
    }

    render() {
        return `${this.content}`
    }
}

class StickerMessage extends Message {
    constructor(content) {
        super('sticker', content)
    }

    render() {
        return `Sticker Message: ${this.content}`
    }
}

class VanishingText extends Message {
    constructor(content) {
        super('vanishingText', content)
    }

    render() {
        return `Vanishing Text: ${this.content}`
    }
}

class MessageFactory {
    static createMessage(type, content) {
        switch (type) {
            case 'text':
                return new TextMessage(content)
            case 'sticker':
                return new StickerMessage(content)
            case 'vanishingText':
                return new VanishingText(content)
            default:
                throw new Error('Unknown message type')
        }
    }
}

export { MessageFactory, TextMessage, StickerMessage, VanishingText }
