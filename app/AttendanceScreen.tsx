import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import attendanceAPIController from "@/controllers/AttendanceController";

export default function AttendanceScreen() {
    const router = useRouter();
    const [attendanceStatus, setAttendanceStatus] = useState<'Absent' | 'Present' | null>(null);
    const [date] = useState(new Date());
    const [summary, setSummary] = useState<any>({});
    const [isMarked, setIsMarked] = useState(false);
    const [contactNumber, setContactNumber] = useState();

    useEffect(() => {
        fetchStudents();
        fetchTodayAttendanceStatus();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await attendanceAPIController.getAllAttendanceByStudentIdToParents();
            setSummary(response.data || {});
        } catch (err) {
            console.error('Error fetching students:', err);
        }
    };

    const fetchTodayAttendanceStatus = async () => {
        try {
            const response = await attendanceAPIController.getTodayAttendanceStatus();
            if (response.data) {
                // Attendance marked
                setIsMarked(true);
                setContactNumber(response.data.classId);
                setAttendanceStatus(response.data.status === "PRESENT" ? "Present" : "Absent");
            } else {
                // Attendance not marked yet
                setIsMarked(false);
                setAttendanceStatus(null);
            }
        } catch (err) {
            console.error('Error fetching today status:', err);
        }
    };

    const handleStatusUpdate = (status: 'Absent' | 'Present') => {
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
                <Text style={styles.year}>{date.toDateString()}</Text>
            </View>

            {/* Summary */}
            <Text style={styles.sectionTitle}>Summary</Text>
            <View style={styles.summaryContainer}>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryText}>Total days</Text>
                    <Text style={styles.summaryValue}>{summary.totalDays ?? 0}</Text>
                </View>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryText}>Total days attended</Text>
                    <Text style={styles.summaryValue}>{summary.totalAttended ?? 0}</Text>
                </View>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryText}>Total days absent</Text>
                    <Text style={styles.summaryValue}>{summary.totalAbsent ?? 0}</Text>
                </View>
                <View style={styles.summaryBox}>
                    <Text style={styles.summaryText}>Attendance rate</Text>
                    <Text style={styles.summaryValue}>{summary.attendedRate ? summary.attendedRate + "%" : "0%"}</Text>
                </View>
            </View>

            {/* Today's Status */}
            <Text style={styles.sectionTitle}>Today's Attendance Status</Text>
            {!isMarked && (
                <Text style={{color:"#555",marginBottom:10}}>
                    You can check your child's school attendance here between 8:15 a.m. and 8:45 a.m.
                </Text>
            )}

            {attendanceStatus === null && (
                <View style={styles.absentMessage}>
                    <Text style={styles.messageText}>
                        Attendance for today has not been marked yet. Please check again later.
                    </Text>
                </View>
            )}

            {attendanceStatus !== null && (
                <View>
                    <View style={[
                        styles.statusContainer,
                        attendanceStatus === 'Absent' ? styles.absent : styles.present
                    ]}>
                        <Text style={styles.statusText}>{summary.studentName ?? "Student Name"}</Text>
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
                                Your child did not come to school today. Please check. If your child left home to come to school or if you have any problems, please contact your child's class teacher.
                            </Text>
                            <Text style={{marginTop:2}}>Class teacher's contact number- {contactNumber}</Text>
                        </View>
                    )}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#F6F9FC', paddingTop: 50, paddingHorizontal: 20},
    header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 50},
    headerTitle: {fontSize: 18, fontWeight: '600'},
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
    button: { padding: 10, backgroundColor: '#000', borderRadius: 5, marginHorizontal: 5 },
    buttonText: { color: '#fff', fontSize: 14 },
    yearText: {fontSize: 14, color: '#555', marginBottom: 5},
    yearBox: {backgroundColor: '#E0E0E0', borderRadius: 5, padding: 10, marginBottom: 20},
    year: {fontSize: 16, fontWeight: 'bold', textAlign: 'center'},
    summaryBox: {display:"flex",flexDirection:"row",justifyContent:"space-between"},
});
