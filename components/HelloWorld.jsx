import { StyleSheet, Text, View } from 'react-native';

export default function HelloWorld({ navigation }) {
    return (
        <View style={styles.screen}>
            {navigation && (
                <Text style={styles.goBack} onPress={() => navigation.goBack()}>← Go Back</Text>
            )}
            <View style={styles.container}>
                <Text style={styles.text}>Hello World</Text>
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
    },
    goBack: {
        color: '#a29bfe',
        fontSize: 16,
        marginBottom: 20,
    },
    container: {
        backgroundColor: '#6c5ce7',
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 12,
        alignItems: 'center',
    },
    text: {
        color: '#ffffff',
        fontSize: 32,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});
