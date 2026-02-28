import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { requestNotificationPermissions, scheduleLocalNotification } from '../utils/notifications';

// IMPORTANT: Replace with your computer's local IP address if testing on a physical device.
// e.g., 'http://192.168.1.100:8000'
const API_URL = 'https://early-pets-march.loca.lt';

export default function Register({ navigation }) {
    const { theme } = useTheme();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        requestNotificationPermissions();
    }, []);

    const handleRegister = async () => {
        setErrorMsg('');

        if (!name || !email || !password || !confirmPassword) {
            setErrorMsg('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMsg('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/register`, {
                name,
                email,
                password
            }, {
                headers: {
                    'Bypass-Tunnel-Reminder': 'true',
                }
            });

            // On success, navigate back to Login
            await scheduleLocalNotification('Registration Complete', 'You can now log in.');
            alert('Registration successful! Please login.');
            navigation.navigate('Login');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.detail) {
                setErrorMsg(error.response.data.detail);
            } else {
                setErrorMsg('Registration failed. Please check your connection.');
            }
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.title, { color: theme.text }]}>Create Account</Text>

            <View style={[styles.formContainer, { backgroundColor: theme.surface, shadowColor: theme.isDark ? '#000' : '#ccc' }]}>
                {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

                <TextInput
                    style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]}
                    placeholder="Full Name"
                    placeholderTextColor={theme.textSecondary}
                    value={name}
                    onChangeText={setName}
                />

                <TextInput
                    style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]}
                    placeholder="Email Address"
                    placeholderTextColor={theme.textSecondary}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]}
                    placeholder="Password"
                    placeholderTextColor={theme.textSecondary}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TextInput
                    style={[styles.input, { backgroundColor: theme.background, color: theme.text, borderColor: theme.border }]}
                    placeholder="Confirm Password"
                    placeholderTextColor={theme.textSecondary}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: theme.primary }, loading && styles.buttonDisabled]}
                    onPress={handleRegister}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color={theme.surface} />
                    ) : (
                        <Text style={styles.buttonText}>Register</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.loginContainer}>
                    <Text style={[styles.loginText, { color: theme.textSecondary }]}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={[styles.loginLink, { color: theme.primary }]}>Login Here</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a2e',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        color: '#ffffff',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
    },
    formContainer: {
        backgroundColor: '#16213e',
        padding: 24,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    input: {
        backgroundColor: '#1a1a2e',
        color: '#ffffff',
        borderWidth: 1,
        borderColor: '#2d2d44',
        borderRadius: 8,
        padding: 14,
        fontSize: 16,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#6c5ce7',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: '#ff7675',
        marginBottom: 16,
        textAlign: 'center',
        fontWeight: '500',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
    },
    loginText: {
        color: '#a0a0b0',
        fontSize: 14,
    },
    loginLink: {
        color: '#a29bfe',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
