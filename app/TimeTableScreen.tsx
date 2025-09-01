import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useRouter} from "expo-router";

export default function TimeTableScreen() {
    const [expandedDay, setExpandedDay] = useState('Tuesday'); // default open day
    const router = useRouter();
    const timeTableData = {
        Monday: [],
        Tuesday: [
            {time: '08:30 A.M. - 09:05 A.M.', subject: 'Sinhala'},
            {time: '09:05 A.M. - 09:40 A.M.', subject: 'English'},
            {time: '09:40 A.M. - 10:15 A.M.', subject: 'Mathematics'},
            {time: '10:15 A.M. - 10:50 A.M.', subject: 'Commerce'},
            {time: '10:50 A.M. - 11:10 A.M.', subject: 'Interval', highlight: true},
            {time: '11:10 A.M. - 11:45 A.M.', subject: 'History'},
            {time: '11:45 A.M. - 12:20 P.M.', subject: 'History'},
            {time: '12:20 P.M. - 12:55 P.M.', subject: 'Science'},
            {time: '12:55 P.M. - 01:30 P.M.', subject: 'ICT'},
        ],
        Wednesday: [],
        Thursday: [],
        Friday: [],
    };

    const toggleDay = (day) => {
        setExpandedDay(expandedDay === day ? null : day);
    };

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
                        <TouchableOpacity
                            style={styles.dayHeader}
                            onPress={() => toggleDay(day)}
                        >
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
                                </View>
                                {timeTableData[day].map((item, index) => (
                                    <View
                                        key={index}
                                        style={[
                                            styles.tableRow,
                                            item.highlight && styles.intervalRow
                                        ]}
                                    >
                                        <Text style={styles.tableCell}>{item.time}</Text>
                                        <Text style={styles.tableCell}>{item.subject}</Text>
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

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#F6F9FC', paddingTop: 50, paddingHorizontal: 20},
    header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 50},
    headerTitle: {fontSize: 18, fontWeight: '600'},
    dayContainer: {marginBottom: 10},
    dayHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    dayTitle: {fontSize: 16, fontWeight: 'bold'},
    table: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 5,
        overflow: 'hidden'
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#F0F0F0',
        padding: 10,
        display:"flex",
        alignItems:"center",
        justifyContent:"space-around"
    },
    tableHeaderText: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: 'bold'
    },
    tableRow: {
        display:"flex",
        alignItems:"center",
        justifyContent:"space-around",
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    tableCell: {flex: 1},
    intervalRow: {
        backgroundColor: '#EAF3FF'
    }
});
