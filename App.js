import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';

import Counter from './components/Counter';
import HelloWorld from './components/HelloWorld';
import ImageGallery from './components/ImageGallery';
import Login from './components/Login';
import MainTabs from './components/MainTabs';
import Register from './components/Register';
import UsersTable from './components/UsersTable';

import { JobProvider } from './context/JobContext';
import { ThemeProvider } from './context/ThemeContext';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <ThemeProvider>
            <JobProvider>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                        <Stack.Screen name="Home" component={MainTabs} />
                        <Stack.Screen name="Counter" component={Counter} />
                        <Stack.Screen name="HelloWorld" component={HelloWorld} />
                        <Stack.Screen name="UsersTable" component={UsersTable} />
                        <Stack.Screen name="ImageGallery" component={ImageGallery} />
                    </Stack.Navigator>
                </NavigationContainer>
            </JobProvider>
        </ThemeProvider>
    );
}

registerRootComponent(App);
