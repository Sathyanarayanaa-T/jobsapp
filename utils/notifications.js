import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export async function requestNotificationPermissions() {
    if (Platform.OS === 'web') return false;

    try {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        return finalStatus === 'granted';
    } catch (err) {
        console.log('Error requesting notification permissions:', err);
        return false;
    }
}

export async function scheduleLocalNotification(title, body) {
    if (Platform.OS === 'web') {
        console.log(`[Web Notification] ${title}: ${body}`);
        return;
    }

    try {
        await Notifications.scheduleNotificationAsync({
            content: {
                title,
                body,
                sound: true,
            },
            trigger: null,
        });
    } catch (err) {
        console.log('Error scheduling notification:', err);
    }
}
