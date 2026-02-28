import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Home from './Home';
import JobDetails from './JobDetails';
import Profile from './Profile';
import SelectedJobs from './SelectedJobs';

const Tab = createBottomTabNavigator();

export default function MainTabs({ route }) {
    const { email, name, password } = route.params || {};
    const { theme, isDarkMode, toggleTheme } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: true,
                headerStyle: { backgroundColor: theme.surface },
                headerTintColor: theme.text,
                headerRight: () => (
                    <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 15 }}>
                        <MaterialCommunityIcons
                            name={isDarkMode ? 'weather-sunny' : 'weather-night'}
                            size={24}
                            color={theme.text}
                        />
                    </TouchableOpacity>
                ),
                tabBarStyle: { backgroundColor: theme.tabBar, borderTopColor: theme.border },
                tabBarLabelStyle: { fontSize: 13, fontWeight: '600' },
                tabBarActiveTintColor: theme.tabBarActive,
                tabBarInactiveTintColor: theme.tabBarInactive,
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'HomeTab') iconName = 'home';
                    else if (route.name === 'JobsTab') iconName = 'briefcase';
                    else if (route.name === 'SavedTab') iconName = 'bookmark';
                    else if (route.name === 'ProfileTab') iconName = 'account';
                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="HomeTab" component={Home} initialParams={{ email, password }} options={{ title: 'Home' }} />
            <Tab.Screen name="JobsTab" component={JobDetails} options={{ title: 'Jobs' }} />
            <Tab.Screen name="SavedTab" component={SelectedJobs} options={{ title: 'Saved' }} />
            <Tab.Screen name="ProfileTab" component={Profile} initialParams={{ email, name }} options={{ title: 'Profile' }} />
        </Tab.Navigator>
    );
}
