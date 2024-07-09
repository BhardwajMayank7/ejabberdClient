import { client, xml } from '@xmpp/client'
import debug from '@xmpp/debug'
import { EventEmitter } from 'events'
import { MessageFactory } from './message'
import {XMPP_SERVICE} from '@env'

/**
 *
 * 3. Create mechanism so the chat back grounds can be changed dynamically.
 * For ex. On Chat screen user might see an option to select from multiple chat backgrounds called chat moods. "float hearts", "ocean", "no-background"
 */
class XMPPClient extends EventEmitter {
    constructor(options) {
        super()
        this.client = client({
            service: XMPP_SERVICE,
            domain: options.domain,
            resource: options.resource,
            username: options.username,
            password: options.password,
        })

        debug(this.client, true)
        this.setupEventHandlers()
    }

    setupEventHandlers() {
        this.client.on('error', (err) => {
            console.error('XMPP Client Error:', err)
            this.emit('error', err)
        })

        this.client.on('offline', () => {
            console.log('XMPP client is offline')
            this.emit('offline')
        })

        this.client.on('stanza', (stanza) => {
            if (stanza.is('message')) {
                const messageText = stanza.getChildText('body')
                if (messageText) {
                    const messageType = 'text' // Assuming all incoming messages are text for testing
                    const message = MessageFactory.createMessage(
                        messageType,
                        messageText
                    )
                    this.emit('message', message.render())
                }
            } else {
                if (stanza.is('iq')) {
                    console.log(stanza)
                }
            }
        })

        this.client.on('online', async (address) => {
            console.log(`Connected as ${address.toString()}`)
            await this.client.send(xml('presence'))
            this.emit('online', address)
        })
    }

    async sendMessage(messageContent, messageType = 'text') {
        if (this.client && this.client.status === 'online') {
            const message = MessageFactory.createMessage(
                messageType,
                messageContent
            )

            const messageXml = xml(
                'message',
                { type: 'chat', to: 'user2@haply' }, // this is hardcoded for now as I assume these users will be fetched from the database
                xml('body', {}, message.content)
            )

            /*

            const messageXml = xml(
                'iq',
                {
                    id: 'x13',
                    type: 'get',
                    from: 'vikas@haply/mobile',
                    to: 'vikas@haply',
                }, // this is hardcoded for now as I assume these users will be fetched from the database
                xml('query', { xmlns: 'http://jabber.org/protocol/disco#info' })
            )
            */
            console.log('Sending message:', messageXml.toString())
            await this.client.send(messageXml)
        } else {
            console.error('XMPP client is not connected')
        }
    }

    async start() {
        try {
            await this.client.start()
        } catch (err) {
            console.error('XMPP Start Error:', err)
        }
    }

    async stop() {
        try {
            await this.client.stop()
        } catch (err) {
            console.error('XMPP Stop Error:', err)
        }
    }
}

export default XMPPClient
