import axios from 'axios';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { requestNotificationPermissions, scheduleLocalNotification } from '../utils/notifications';

// IMPORTANT: Replace with your computer's local IP address if testing on a physical device.
// e.g., 'http://192.168.1.100:8000'
const API_URL = 'https://early-pets-march.loca.lt';

export default function Login({ navigation }) {
    const { theme } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        requestNotificationPermissions();
    }, []);

    const handleLogin = async () => {
        setErrorMsg('');

        if (!email || !password) {
            setErrorMsg('Please enter both email and password');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/login`, {
                email,
                password
            }, {
                headers: {
                    'Bypass-Tunnel-Reminder': 'true',
                }
            });

            // Login successful
            await scheduleLocalNotification('Welcome Back!', 'You have successfully logged in.');
            navigation.replace('Home', {
                email: response.data.user.email,
                name: response.data.user.name,
                password
            });
        } catch (error) {
            if (error.response && error.response.data && error.response.data.detail) {
                setErrorMsg(error.response.data.detail);
            } else {
                setErrorMsg('Login failed. Please check your connection.');
            }
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={[styles.screen, { backgroundColor: theme.background }]}>
            <Text style={[styles.title, { color: theme.text }]}>Welcome Back</Text>

            <View style={[styles.formContainer, { backgroundColor: theme.surface, shadowColor: theme.isDark ? '#000' : '#ccc' }]}>
                {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

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

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: theme.primary }, loading && styles.buttonDisabled]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color={theme.surface} />
                    ) : (
                        <Text style={styles.buttonText}>Login</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.registerContainer}>
                    <Text style={[styles.registerText, { color: theme.textSecondary }]}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={[styles.registerLink, { color: theme.primary }]}>Register Here</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
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
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
    },
    registerText: {
        color: '#a0a0b0',
        fontSize: 14,
    },
    registerLink: {
        color: '#a29bfe',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
