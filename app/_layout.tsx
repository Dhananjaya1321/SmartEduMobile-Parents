import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import 'react-native-reanimated';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRouter} from 'expo-router';

import {useColorScheme} from '@/hooks/useColorScheme';
import StudentReportScreen from "@/app/StudentReportScreen";
import GCEExamResultsScreen from "@/app/GCEExamResultsScreen";
import LeaderBoard from "@/app/LeaderBoard";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });
    const router = useRouter();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const user = await AsyncStorage.getItem('user');
                if (!user) {
                    router.replace('/LoginScreen');
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        };
        checkLoginStatus();
    }, []);

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                <Stack.Screen name="+not-found"/>
                <Stack.Screen
                    name="AttendanceScreen"
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="LeaderBoard"
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="GCEExamResultsScreen"
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="StudentReportScreen"
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="TimeTableScreen"
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="ProfileScreen"
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="LettersAndCertificatesScreen"
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="ExamResultsScreen"
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="ExaminationsDetailsScreen"
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="ALExamScheduleScreen"
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="OLExamScheduleScreen"
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="ScholarshipExamScheduleScreen"
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="SemesterExamScheduleScreen"
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="ViewEventsScreen"
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="HomeworkScreen"
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="LoginScreen"
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="RegisterScreen"
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="ForgotPasswordScreen"
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="VerifyCodeScreen"
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="ChangePasswordScreen"
                    options={{headerShown: false}}
                />
            </Stack>
            <StatusBar style="auto"/>
        </ThemeProvider>
    );
}
