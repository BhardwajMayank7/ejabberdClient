import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Alert,Platform } from 'react-native';


class NotificationManager {
    constructor() {
        this.tokenkey = 'fcmtoken'
    }

    // /**
    //  * Get Notification Permissions
    //  * on the user device
    //  */
    // getPermission() {

    // }

    // /**
    //  * Setup FCM Token
    //  */
    // getFCMToken = async () => {
    //     try {
    //         let token = await this.loadFCMToken()
    //         if(!token) {
    //             console.log("Generating fresh FCM token")
    //             token = await messaging().getToken()
    //             await this.saveFCMToken(token)
    //         }
    //         return token
    //     }
    //     catch(err) {
    //         conmsole.log(err)
    //     }
    // }

    /**
     * Register for push notifications and handle permissions
     */

    requestUserPermission = () => {
        Alert.alert(
            'Notification Permission',
            'Haply will send you notifications. Do you allow?',
            [
                {
                    text: 'No',
                    onPress: async () => {
                        console.log('User denied notification permission')
                        await this.sendTokenToBackend(null)
                    },
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        await this.registerForPushNotificationsAsync()
                    },
                },
            ],
            { cancelable: false }
        )
    }

    registerForPushNotificationsAsync = async () => {
        let token;

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                await this.sendTokenToBackend(null);
                return;
            }

            const projectId = Constants.expoConfig?.extra?.eas?.projectId;
            if (!projectId) {
                console.error('Project ID not found');
                await this.sendTokenToBackend(null);
                return;
            }

            token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
            console.log('Expo Push Token:', token);
        } else {
            alert('Must use physical device for Push Notifications');
            await this.sendTokenToBackend(null);
            return;
        }

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        await this.saveFCMToken(token);
        await this.sendTokenToBackend(token);
    };
    loadFCMToken = async () => {
        try {
            return await AsyncStorage.getItem(this.tokenkey)
        } catch (err) {
            console.log(err)
        }
    }

    saveFCMToken = async (token) => {
        try {
            return AsyncStorage.setItem(this.tokenkey, token)
        } catch (err) {
            console.log(err)
        }
    }
    
    // this is just a dummy function to send token to backend, we will replace it with Mamta's code later
    sendTokenToBackend = async (token) => {
        // try {
        //     await fetch('https://your-backend-url.com/api/notifications', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: token ? `Bearer ${token}` : '',
        //         },
        //         body: JSON.stringify({ token }),
        //     })
        // } catch (error) {
        //     console.error('Error sending token to backend:', error)
        // }

        console.log("Token sent to dummy backend")
    }
}

export default NotificationManager
