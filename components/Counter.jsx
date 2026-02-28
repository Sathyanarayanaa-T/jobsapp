import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Counter({ navigation }) {
    const [count, setCount] = useState(0);

    return (
        <View style={styles.screen}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.goBack}>← Go Back</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Counter</Text>
            <Text style={styles.count}>{count}</Text>
            <View style={styles.buttons}>
                <TouchableOpacity style={styles.button} onPress={() => setCount(count - 1)}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setCount(count + 1)}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#1a1a2e',
        padding: 20,
        paddingTop: 60,
        alignItems: 'center',
    },
    goBack: {
        color: '#a29bfe',
        fontSize: 16,
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    title: {
        color: '#e0e0e0',
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 12,
    },
    count: {
        color: '#ffffff',
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    buttons: {
        flexDirection: 'row',
        gap: 16,
    },
    button: {
        backgroundColor: '#6c5ce7',
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
    },
});
