import React, { useState, useEffect } from 'react'
import {
    View,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image,
    Text,
} from 'react-native'
import FloatingHearts from './src/components/FloatingHearts'
import Ocean from './src/components/Ocean'
import MessageList from './src/components/MessageList'
import MessageInput from './src/components/MessageInput'
import XMPPClient from './xmpp/XMPPClient'
import { XMPP_USERNAME, XMPP_PASSWORD, XMPP_DOMAIN, XMPP_RESOURCE } from '@env'
import { styles } from './styles'
import DropDownPicker from 'react-native-dropdown-picker'
import NotificationManager from './notification/NotificationManager'

const App = () => {
    const [xmppClient, setXmppClient] = useState(null)
    const [connected, setConnected] = useState(false)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')

    const [background, setBackground] = useState('no_background')
    const [open, setOpen] = useState(false) // State to control DropDownPicker
    const [value, setValue] = useState('no_background') // State to hold selected value
    const [items, setItems] = useState([
        // Items for the dropdown
        { label: 'Floating Hearts ❤️', value: 'float_hearts' },
        { label: 'Ocean 🌊', value: 'ocean' },
        { label: 'No Background', value: 'no_background' },
    ])

    useEffect(() => {
        const options = {
            domain: XMPP_DOMAIN,
            resource: XMPP_RESOURCE,
            username: XMPP_USERNAME,
            password: XMPP_PASSWORD,
        }
        const client = new XMPPClient(options)
        setXmppClient(client)

        client.on('message', (msg) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { id: Date.now(), text: msg },
            ])
        })

        client.on('error', (err) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { id: Date.now(), text: `Error: ${err.message}` },
            ])
        })

        client.on('offline', () => {
            setConnected(false)
            setMessages((prevMessages) => [
                ...prevMessages,
                { id: Date.now(), text: 'Disconnected' },
            ])
        })

        client.on('online', (address) => {
            setConnected(true)
            setMessages((prevMessages) => [
                ...prevMessages,
                { id: Date.now(), text: `Connected as ${address.toString()}` },
            ])
        })

        client.start()
        const notificationManager = new NotificationManager()
        notificationManager.requestUserPermission()

        return () => {
            client.stop()
        }
    }, [])

    const sendMessage = async (messageType = 'text') => {
        if (xmppClient && connected) {
            await xmppClient.sendMessage(message, messageType)
            setMessages((prevMessages) => [
                ...prevMessages,
                { id: Date.now(), text: `You: ${message}` },
            ])
            setMessage('')
        } else {
            console.error('XMPP client is not connected')
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    {background === 'float_hearts' ? <FloatingHearts /> : null}
                    {background === 'ocean' ? <Ocean /> : null}
                    {background === 'no_background' ? null : null}
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backButton}
                            accessibilityLabel="Back"
                        >
                            <Image
                                source={require('./assets/back_icon.png')}
                                style={styles.backIcon}
                            />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>Haply user</Text>
                        <View style={[styles.dropdownContainer]}>
                            <DropDownPicker
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={(itemValue) => {
                                    setValue(itemValue)
                                    setBackground(itemValue)
                                }}
                                setItems={setItems}
                                containerStyle={styles.dropdown} // Styling the container
                                dropDownContainerStyle={styles.dropDownPicker} // Styling the drop-down box
                                listMode="MODAL"
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.callButton}
                            accessibilityLabel="Call"
                        >
                            <Image
                                source={require('./assets/call_icon.png')}
                                style={styles.callIcon}
                            />
                        </TouchableOpacity>
                    </View>

                    <MessageList messages={messages} />
                    <MessageInput
                        message={message}
                        setMessage={setMessage}
                        sendMessage={sendMessage}
                    />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default App
