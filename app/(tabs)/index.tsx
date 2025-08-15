import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal, Pressable, ScrollView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useRouter} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeworkScreen from "@/app/HomeworkScreen";
import AttendanceScreen from "@/app/AttendanceScreen";
import ExamResultsScreen from "@/app/ExamResultsScreen";
import ProfileScreen from "@/app/ProfileScreen";

const teacherName = "Teacher’s Name";

const features = [
    {label: 'Attendance', image: require('@/assets/images/attendance.png'), route: '/AttendanceScreen'},
    {label: 'Timetable', image: require('@/assets/images/timetable.png'), route: '/ManageTimetableScreen'},
    {label: 'Student Profile', image: require('@/assets/images/students.png'), route: '/ProfileScreen'},
    {label: 'Exams', image: require('@/assets/images/exams.png'), route: '/ExaminationsDetailsScreen'},
    {label: 'Results', image: require('@/assets/images/results.png'), route: '/ExamResultsScreen'},
    {label: 'Homework', image: require('@/assets/images/homework.png'), route: '/HomeworkScreen'},
    {label: 'Events', image: require('@/assets/images/events.png'), route: '/ViewEventsScreen'},
    {label: 'Letters', image: require('@/assets/images/letter.png'), route: '/LettersAndCertificatesScreen'},
];

function formatData(data, numColumns) {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (numberOfElementsLastRow !== 0 && numberOfElementsLastRow !== numColumns) {
        data.push({label: `blank-${numberOfElementsLastRow}`, empty: true});
        numberOfElementsLastRow++;
    }
    return data;
}

export default function HomeScreen() {
    const router = useRouter();
    const [menuVisible, setMenuVisible] = useState(false);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            router.replace('/LoginScreen');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.helloText}>Hello</Text>
                    <Text style={styles.teacherName}>{teacherName}</Text>
                </View>
                <TouchableOpacity onPress={() => setMenuVisible(true)}>
                    <Ionicons name="menu" size={24} color="black"/>
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Academics</Text>

            <FlatList
                data={formatData(features, 2)}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                renderItem={({item}) => {
                    if (item.empty) {
                        return <View style={[styles.card, styles.invisibleCard]}/>;
                    }
                    return (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => item.route && router.push(item.route)}
                        >
                            <Image source={item.image} style={styles.cardImage}/>
                            <Text style={styles.cardText}>{item.label}</Text>
                        </TouchableOpacity>
                    );
                }}
            />

            <View style={{display: "flex",marginTop:30, marginBottom:50}}>
                <TouchableOpacity
                    style={styles.specialCard}
                    onPress={() => router.push('/')}
                >
                    <Image source={require('@/assets/images/applications.png')} style={styles.specialCardImage}/>
                    <Text style={styles.specialCardText}>Exam Applications & NIC Processing</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.specialCard}
                    onPress={() => router.push('/')}
                >
                    <Image source={require('@/assets/images/school.png')} style={styles.specialCardImage}/>
                    <Text style={styles.specialCardText}>A/L School Selection & Admission</Text>
                </TouchableOpacity>
            </View>


            {/* Menu Modal */}
            <Modal
                transparent={true}
                visible={menuVisible}
                animationType="fade"
                onRequestClose={() => setMenuVisible(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
                    <View style={styles.menuContainer}>
                        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                            <Text style={styles.menuItemText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#F6F9FC', paddingTop: 50, paddingHorizontal: 20},
    header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
    helloText: {fontSize: 14, color: '#555'},
    teacherName: {fontSize: 20, fontWeight: 'bold'},
    sectionTitle: {fontSize: 18, fontWeight: 'bold', marginVertical: 20},
    grid: {gap: 10},
    card: {
        flex: 1, margin: 5, height: 150, borderRadius: 10, backgroundColor: '#fff',
        alignItems: 'center', justifyContent: 'center', shadowColor: '#000',
        shadowOpacity: 0.1, shadowRadius: 4, elevation: 3
    },
    specialCard: {
        display: "flex",
        flexDirection: "row",
        gap: 5,
        margin: 5,
        height: 100,
        borderRadius: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    specialCardText: {
        fontSize: 12, textAlign: 'left',
        paddingHorizontal:20
    },
    specialCardImage: {height: 60, width: 60, resizeMode: 'contain', marginBottom: 8, marginLeft:20},
    cardImage: {height: 60, width: 60, resizeMode: 'contain', marginBottom: 8},
    cardText: {fontSize: 12, textAlign: 'center'},
    invisibleCard: {backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0},
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    menuContainer: {
        backgroundColor: '#fff',
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    menuItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    menuItemText: {
        fontSize: 16,
        color: '#000',
    },
});
