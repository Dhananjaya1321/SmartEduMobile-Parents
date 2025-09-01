import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useRouter} from 'expo-router';
import classTimetablesAPIController from '@/controllers/ClassTimetablesController';

export default function TimeTableScreen() {
    const [expandedDay, setExpandedDay] = useState<string | null>('Monday');
    const [loading, setLoading] = useState(true);
    const [timeTableData, setTimeTableData] = useState<any>({});
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await classTimetablesAPIController.findTimetableToParent();

                // Prepare empty structure
                const mappedData: Record<string, any[]> = {
                    Monday: [],
                    Tuesday: [],
                    Wednesday: [],
                    Thursday: [],
                    Friday: [],
                };

                res.timetablePeriods.forEach((periodObj: any) => {
                    const periodTime = getPeriodTime(periodObj.period);

                    // Each slot corresponds to a weekday
                    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

                    weekdays.forEach((day, idx) => {
                        const slot = periodObj.slots[idx];
                        if (slot) {
                            mappedData[day].push({
                                time: periodTime,
                                subject: slot.subject,
                                teacher: slot.teacherName,
                            });
                        }

                        if (periodObj.period === 4) {
                            mappedData[day].push({
                                time: '10:50 - 11:10',
                                subject: 'Interval',
                                teacher: '',
                                highlight: true,
                            });
                        }
                    });


                });

                setTimeTableData(mappedData);
            } catch (error) {
                console.error('Error fetching timetable:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const toggleDay = (day: string) => {
        setExpandedDay(expandedDay === day ? null : day);
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#000"/>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black"/>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Time Table</Text>
                <Ionicons name="notifications-outline" size={24} color="black"/>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {Object.keys(timeTableData).map((day) => (
                    <View key={day} style={styles.dayContainer}>
                        {/* Day Header */}
                        <TouchableOpacity style={styles.dayHeader} onPress={() => toggleDay(day)}>
                            <Text style={styles.dayTitle}>{day}</Text>
                            <Ionicons
                                name={expandedDay === day ? 'remove-circle-outline' : 'add-circle-outline'}
                                size={24}
                                color="gray"
                            />
                        </TouchableOpacity>

                        {/* Time Table Rows */}
                        {expandedDay === day && timeTableData[day].length > 0 && (
                            <View style={styles.table}>
                                <View style={styles.tableHeader}>
                                    <Text style={styles.tableHeaderText}>Time</Text>
                                    <Text style={styles.tableHeaderText}>Subject</Text>
                                    <Text style={styles.tableHeaderText}>Teacher</Text>
                                </View>
                                {timeTableData[day].map((item, index) => (
                                    <View
                                        key={index}
                                        style={[
                                            styles.tableRow,
                                            item.highlight && { backgroundColor: '#FFF3CD' }, // light yellow highlight
                                        ]}
                                    >
                                        <Text style={styles.tableCell}>{item.time}</Text>
                                        <Text style={[styles.tableCell, item.highlight && { fontWeight: 'bold' }]}>
                                            {item.subject}
                                        </Text>
                                        <Text style={styles.tableCell}>{item.teacher}</Text>
                                    </View>
                                ))}

                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

// Helper: Map period → time slots
function getPeriodTime(period: number) {
    const times = {
        1: '08:30 - 09:05',
        2: '09:05 - 09:40',
        3: '09:40 - 10:15',
        4: '10:15 - 10:50',
        5: '11:10 - 11:45',
        6: '11:45 - 12:20',
        7: '12:20 - 12:55',
        8: '12:55 - 01:30',
    };
    return times[period] || 'N/A';
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#F6F9FC', paddingTop: 50, paddingHorizontal: 20},
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    headerTitle: {fontSize: 18, fontWeight: '600'},
    loaderContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    dayContainer: {marginBottom: 10},
    dayHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    dayTitle: {fontSize: 16, fontWeight: 'bold'},
    table: {backgroundColor: '#fff', borderRadius: 10, marginTop: 5, overflow: 'hidden'},
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#F0F0F0',
        padding: 10,
        justifyContent: 'space-around',
    },
    tableHeaderText: {flex: 1, fontWeight: 'bold', textAlign: 'center'},
    tableRow: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        justifyContent: 'space-around',
    },
    tableCell: {flex: 1, textAlign: 'center'},
});
