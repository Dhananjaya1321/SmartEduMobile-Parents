import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Table, Row } from 'react-native-table-component';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import {useNavigation} from "expo-router";

export default function StudentReportScreen() {
    const [loading, setLoading] = useState(true);
    const [reportData, setReportData] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        // Simulate API fetch delay
        setTimeout(() => {
            const sampleData = {
                student: {
                    name: 'John Doe',
                    grade: 10,
                    className: 'A',
                    year: 2021,
                    avatar: 'https://via.placeholder.com/60',
                    badge: 'https://via.placeholder.com/40',
                    totalMarks: 580
                },
                ranks: {
                    classRank: 1,
                    schoolRank: 1,
                    zonalRank: 335,
                    districtRank: 1000,
                    provinceRank: 15000,
                    islandRank: 100000
                },
                classInfo: {
                    grade: 10,
                    className: 'A',
                    totalStudents: 40
                },
                reportTable: [
                    ['Mathematics', 25, 25, 25],
                    ['Buddhism', 25, 25, 25],
                    ['Sinhala', 25, 25, 25],
                    ['English', 25, 25, 25],
                    ['History', 25, 25, 25],
                    ['Science', 25, 25, 25],
                    ['Commerce', 25, 25, 25],
                    ['ICT', 25, 25, 25],
                    ['TOTAL', 570, 600, 580]
                ],
                chartData: {
                    labels: ['6B', '6F', '7D', '7E', '8B', '9D', '10E', '11C', '11D'],
                    series1: [500, 605, 400, 600, 450, 470, 620, 202, 150],
                    series2: [65, 55, 30, 40, 35, 37, 55, 18, 14]
                }
            };
            setReportData(sampleData);
            setLoading(false);
        }, 800);
    }, []);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    if (!reportData) {
        return (
            <View style={styles.loader}>
                <Text>Failed to load data</Text>
            </View>
        );
    }

    const { student, ranks, classInfo, reportTable, chartData } = reportData;

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Report</Text>
                <Ionicons name="notifications-outline" size={24} color="black" />
            </View>

            {/* Student Info */}
            <View style={styles.studentCard}>
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <View style={{display:"flex",alignItems:"center" }}>
                        <View style={styles.profileHeader}>
                            <Image
                                source={require('@/assets/images/character.png')} // Replace with actual image path
                                style={styles.profileImage}
                            />
                        </View>
                        <Text style={styles.studentName}>{student.name}</Text>
                        <Text style={styles.studentClass}>{student.grade} - {student.className} ({student.year})</Text>
                    </View>
                     <View style={styles.rankContainer}>
                        <View style={{display:"flex", alignItems:"center"}}>
                            <Text>{ranks.classRank}</Text>
                            <Text style={{fontSize:10}}>Class Rank</Text>
                        </View>
                        <View style={{display:"flex", alignItems:"center"}}>
                            <Text>{ranks.schoolRank}</Text>
                            <Text style={{fontSize:10}}>School Rank</Text>
                        </View>
                        <View style={{display:"flex", alignItems:"center"}}>
                            <Text>{ranks.classRank}</Text>
                            <Text style={{fontSize:10}}>Zonal Rank</Text>
                        </View>
                    </View>
                    <View style={styles.rankContainer}>
                        <View style={{display:"flex", alignItems:"center"}}>
                            <Text>{ranks.schoolRank}</Text>
                            <Text style={{fontSize:10}}>District Rank</Text>
                        </View>
                        <View style={{display:"flex", alignItems:"center"}}>
                            <Text>{ranks.schoolRank}</Text>
                            <Text style={{fontSize:10}}>Province Rank</Text>
                        </View>
                        <View style={{display:"flex", alignItems:"center"}}>
                            <Text>100,000</Text>
                            <Text style={{fontSize:10}}>Island Rank</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Grade & Class Selector */}
            <View style={styles.selectorContainer}>
                <TouchableOpacity style={styles.selector}>
                    <Text>Grade - {classInfo.grade}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.selector}>
                    <Text>Class - {classInfo.className}</Text>
                </TouchableOpacity>
            </View>

            {/* Total Students */}
            <Text style={styles.totalStudents}>
                The total number of students in this class in this grade
                <Text style={{ fontWeight: 'bold' }}> {classInfo.totalStudents}</Text>
            </Text>

            {/* Report Table */}
            <Text style={styles.sectionTitle}>Report</Text>
            <View style={styles.tableContainer}>
                <Table borderStyle={{ borderWidth: 1, borderColor: '#ccc' }}>
                    <Row
                        data={['Subject', 'T1 Mar.', 'T2 Mar.', 'T3 Mar.']}
                        style={styles.tableHeader}
                        textStyle={styles.tableHeaderText}
                    />
                    {reportTable.map((row, index) => (
                        <Row
                            key={index}
                            data={row}
                            style={index === reportTable.length - 1 ? styles.tableFooter : styles.tableRow}
                            textStyle={styles.tableText}
                        />
                    ))}
                </Table>
            </View>

            {/* Chart */}
            <LineChart
                data={{
                    labels: chartData.labels,
                    datasets: [
                        { data: chartData.series1, color: () => 'blue' },
                        { data: chartData.series2, color: () => 'red' }
                    ]
                }}
                width={Dimensions.get('window').width - 40}
                height={220}
                chartConfig={{
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#fff',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: () => '#000'
                }}
                bezier
                style={{ marginVertical: 20, borderRadius: 10 }}
            />

            {/* Download Button */}
            <TouchableOpacity style={styles.downloadBtn}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Download Report</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#F6F9FC', paddingTop: 50, paddingHorizontal: 20},
    header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 50},
    headerTitle: {fontSize: 18, fontWeight: '600'},
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    studentCard: {
        flexDirection: 'row', backgroundColor: '#fff', padding: 10, borderRadius: 10, alignItems: 'center'
    },
    avatar: { width: 60, height: 60, borderRadius: 30 },
    badge: { width: 40, height: 40 },
    studentName: { fontSize: 16, fontWeight: 'bold' },
    studentClass: { fontSize: 12, color: 'gray' },
    rankContainer: {display:"flex",flexDirection:"row",marginTop: 5,marginBottom:10,justifyContent:"space-around", gap:15 },
    selectorContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginBottom:5 },
    selector: { backgroundColor: '#fff', padding: 10, borderRadius: 10, width: '48%', alignItems: 'center' },
    searchBtn: { backgroundColor: '#4a5568', padding: 12, borderRadius: 10, marginTop: 10, alignItems: 'center' },
    totalStudents: { marginTop: 20 },
    sectionTitle: { fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
    tableContainer: { backgroundColor: '#fff', borderRadius: 10 },
    tableHeader: { height: 40, backgroundColor: '#f0f0f0' },
    tableHeaderText: { fontWeight: 'bold', textAlign: 'center' },
    tableRow: { height: 40 },
    tableFooter: { height: 40, backgroundColor: '#f0f0f0' },
    tableText: { textAlign: 'center' },
    downloadBtn: { backgroundColor: '#2d3748', padding: 15,marginBottom:20, borderRadius: 10, alignItems: 'center', marginTop: 10 },
    profileHeader: {alignItems: 'center', marginBottom: 20},
    profileImage: {width: 100, height: 100, borderRadius: 10},
});
