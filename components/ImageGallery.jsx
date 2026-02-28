import { Image } from 'expo-image';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const IMAGES = [
    { id: '1', source: require('../assets/images/landscape1.png'), label: 'Mountains' },
    { id: '2', source: require('../assets/images/landscape2.png'), label: 'Beach' },
    { id: '3', source: require('../assets/images/landscape3.png'), label: 'Forest' },
];

export default function ImageGallery({ navigation }) {
    return (
        <View style={styles.screen}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.goBack}>← Go Back</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Gallery</Text>

            <FlatList
                data={IMAGES}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={item.source} style={styles.image} contentFit="cover" />
                        <Text style={styles.label}>{item.label}</Text>
                    </View>
                )}
            />
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
    title: {
        color: '#e0e0e0',
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 12,
    },
    card: {
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#16213e',
    },
    image: {
        width: '100%',
        height: 200,
    },
    label: {
        color: '#d1d1e0',
        fontSize: 14,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
});
