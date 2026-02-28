import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function Profile({ route, navigation }) {
    const { email, name } = route.params || {};
    const [image, setImage] = useState(null);
    const { theme } = useTheme();
    const styles = getStyles(theme);

    useEffect(() => {
        // Load the saved profile image when the component mounts
        const loadProfileImage = async () => {
            try {
                const savedImage = await AsyncStorage.getItem('@profile_image');
                if (savedImage) {
                    setImage(savedImage);
                }
            } catch (error) {
                console.error("Failed to load profile image", error);
            }
        };
        loadProfileImage();
    }, []);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImageUri = result.assets[0].uri;
            setImage(selectedImageUri);

            // Save the selected image to AsyncStorage
            try {
                await AsyncStorage.setItem('@profile_image', selectedImageUri);
            } catch (error) {
                console.error("Failed to save profile image", error);
            }
        }
    };

    return (
        <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.profileImage} />
                    ) : (
                        <View style={styles.placeholderImage}>
                            <Text style={styles.placeholderText}>+</Text>
                        </View>
                    )}
                </TouchableOpacity>
                <Text style={styles.headerName}>{name || 'John Doe'}</Text>
                <Text style={styles.headerRole}>Software Engineer</Text>
            </View>

            <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Account Information</Text>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Email Address</Text>
                    <Text style={styles.value}>{email || 'N/A'}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Location</Text>
                    <Text style={styles.value}>San Francisco, CA</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Experience</Text>
                    <Text style={styles.value}>5 Years</Text>
                </View>

                <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
                    <Text style={styles.label}>Resume</Text>
                    <Text style={styles.linkValue}>View Resume</Text>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.replace('Login')}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const getStyles = (theme) => StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: theme.background,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 40,
        backgroundColor: theme.surface,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 20,
        shadowColor: theme.isDark ? '#000' : '#ccc',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    imageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 16,
        borderWidth: 3,
        borderColor: theme.primary,
        shadowColor: theme.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
        backgroundColor: theme.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: theme.textSecondary,
        fontSize: 40,
        fontWeight: '300',
    },
    headerName: {
        color: theme.text,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    headerRole: {
        color: theme.primary,
        fontSize: 16,
        fontWeight: '600',
    },
    infoSection: {
        paddingHorizontal: 20,
    },
    sectionTitle: {
        color: theme.text,
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 16,
        marginTop: 10,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
    },
    label: {
        color: theme.textSecondary,
        fontSize: 15,
    },
    value: {
        color: theme.text,
        fontSize: 15,
        fontWeight: '500',
    },
    linkValue: {
        color: theme.primary,
        fontSize: 15,
        fontWeight: '600',
    },
    logoutButton: {
        marginTop: 40,
        padding: 15,
        borderRadius: 10,
        backgroundColor: 'rgba(231, 76, 60, 0.1)',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(231, 76, 60, 0.3)',
    },
    logoutText: {
        color: '#e74c3c',
        fontWeight: '600',
        fontSize: 16,
    }
});
