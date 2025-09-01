import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AttendanceScreen() {
    const router = useRouter();
    const [attendanceStatus, setAttendanceStatus] = useState('Absent'); // Default status
    const [studentName] = useState('Student Name'); // Placeholder name
    const [date] = useState('2025/02/22'); // Placeholder date

    const summary = {
        totalDaysInSession: 226,
        daysAttended: 215,
        daysAbsent: 11,
        attendanceRate: '95%',
    };

    const handleStatusUpdate = (status) => {
        setAttendanceStatus(status);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Attendance</Text>
                <Ionicons name="notifications-outline" size={24} color="black" />
            </View>

            {/* Date */}
            <Text style={styles.yearText}>Date</Text>
            <View style={styles.yearBox}>
                <Text style={styles.year}>{date}</Text>
            </View>

            {/* Summary */}
            <Text style={styles.sectionTitle}>Summary</Text>
            <View style={styles.summaryContainer}>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryText}>Total days</Text>
                    <Text style={styles.summaryValue}>{summary.totalDaysInSession}</Text>
                </View>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryText}>Total days attended</Text>
                    <Text style={styles.summaryValue}>{summary.daysAttended}</Text>
                </View>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryText}>Total days absent</Text>
                    <Text style={styles.summaryValue}>{summary.daysAbsent}</Text>
                </View>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryText}>Attendance rate</Text>
                    <Text style={styles.summaryValue}>{summary.attendanceRate}</Text>
                </View>
            </View>

            {/* Today's Status */}
            <Text style={styles.sectionTitle}>Today's Attendance Status</Text>
            <View style={[
                styles.statusContainer,
                attendanceStatus === 'Absent' ? styles.absent : styles.present
            ]}>
                <Text style={styles.statusText}>{studentName}</Text>
                <Text style={[
                    styles.statusLabel,
                    { color: attendanceStatus === 'Absent' ? 'red' : 'green' }
                ]}>
                    {attendanceStatus}
                </Text>
            </View>

            {/* Absent Message */}
            {attendanceStatus === 'Absent' && (
                <View style={styles.absentMessage}>
                    <Text style={styles.messageText}>
                        Your child did not come to school today. Please check. If the child left home to come to school, press "Yes" otherwise press "No"
                    </Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => handleStatusUpdate('Present')}>
                            <Text style={styles.buttonText}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => handleStatusUpdate('Absent')}>
                            <Text style={styles.buttonText}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Download Button */}
            <TouchableOpacity style={styles.downloadButton} onPress={() => { /* Add download logic */ }}>
                <Text style={styles.downloadText}>Download Attendance Report</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#F6F9FC', paddingTop: 50, paddingHorizontal: 20},
    header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 50},
    headerTitle: {fontSize: 18, fontWeight: '600'},
    dateContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E0E0E0', padding: 10, borderRadius: 5, marginBottom: 20 },
    dateLabel: { flex: 1, color: 'gray' },
    date: { flex: 2, fontSize: 16, fontWeight: 'bold' },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    summaryContainer: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 20 },
    summaryText: { fontSize: 14, color: '#555' },
    summaryValue: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
    statusContainer: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderRadius: 10, marginBottom: 10 },
    absent: { backgroundColor: '#FFE6E6' },
    present: { backgroundColor: '#E6FFE6' },
    statusText: { fontSize: 16 },
    statusLabel: { fontSize: 16, fontWeight: 'bold' },
    absentMessage: { backgroundColor: '#FFF0F0', padding: 15, borderRadius: 10, marginBottom: 20 },
    messageText: { fontSize: 14, color: '#555', marginBottom: 10 },
    buttonContainer: { flexDirection: 'row', justifyContent: 'flex-end', gap:5 },
    button: { padding: 10, backgroundColor: '#000', borderRadius: 5 },
    buttonText: { color: '#fff', fontSize: 14 },
    downloadButton: { backgroundColor: '#607D8B', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
    downloadText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    yearText: {fontSize: 14, color: '#555', marginBottom: 5},
    yearBox: {backgroundColor: '#E0E0E0', borderRadius: 5, padding: 10, marginBottom: 20},
    year: {fontSize: 16, fontWeight: 'bold', textAlign: 'center'},
    summaryBox: {display:"flex",flexDirection:"row",justifyContent:"space-between"},
});
