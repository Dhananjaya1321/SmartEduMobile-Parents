import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {Dropdown} from "react-native-element-dropdown";

export default function GCEExamResultsScreen() {
    const router = useRouter();
    const [exam, setExam] = useState('G.C.E O/L');
    const [year, setYear] = useState('2016');
    const [indexNumber, setIndexNumber] = useState('');
    const [results, setResults] = useState(null);

    const handleSearch = () => {
        // Simulate fetching results - replace with actual API call
        const mockResults = {
            exam: 'G.C.E (O/L) EXAMINATION 2016',
            syllabus: 'NEW SYLLABUS',
            name: 'AMIR FATHIMA AFRA',
            indexNumber: '8700583',
            subjects: [
                { subject: 'ISLAM', result: 'A' },
                { subject: 'TAMIL LANGUAGE & LITT', result: 'A' },
                { subject: 'ENGLISH LANGUAGE', result: 'A' },
                { subject: 'MATHEMATICS', result: 'A' },
                { subject: 'HISTORY', result: 'A' },
                { subject: 'SCIENCE', result: 'A' },
                { subject: 'APPR. OF ARABIC LIT TEXT', result: 'A' },
                { subject: 'SECOND LANGUAGE (SINHALA)', result: 'A' },
                { subject: 'INFOR. & COMM. TECHNOLOGY', result: 'A' },
            ],
        };
        setResults(mockResults);
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>G.C.E. Examinations</Text>
                <Text style={styles.headerSubtitle}>Results</Text>
                <Ionicons name="notifications-outline" size={24} color="black" />
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
                <Text style={styles.label}></Text>

                <View style={styles.gradeBox}>
                    <Text style={styles.labelDropDown}>Exam</Text>
                    <View style={styles.inputBox}>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            iconStyle={styles.iconStyle}
                            data={[
                                { label: 'G.C.E O/L', value: 'G.C.E O/L' },
                                { label: 'G.C.E A/L', value: 'G.C.E A/L' },

                            ]}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            value={exam}
                            onChange={item => setExam(item.value)}
                        />
                    </View>
                </View>

                <View style={styles.gradeBox}>
                    <Text style={styles.labelDropDown}>year</Text>
                    <View style={styles.inputBox}>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            iconStyle={styles.iconStyle}
                            data={[
                                { label: '2016', value: '2016' },
                                { label: '2017', value: '2017' },

                            ]}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            value={year}
                            onChange={item => setYear(item.value)}
                        />
                    </View>
                </View>


                <Text style={styles.label}>Index number</Text>
                <TextInput
                    style={styles.input}
                    value={indexNumber}
                    onChangeText={setIndexNumber}
                    placeholder="Enter here"
                    keyboardType="numeric"
                />

                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchText}>Search</Text>
                </TouchableOpacity>
            </View>

            {/* Results */}
            {results && (
                <View style={styles.resultsContainer}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={{ uri: 'https://via.placeholder.com/50' }} // Replace with actual logo URL
                            style={styles.logo}
                        />
                        <Text style={styles.resultsTitle}>{results.exam}</Text>
                    </View>
                    <Text style={styles.resultsInfo}>Examinee : {results.exam}</Text>
                    <Text style={styles.resultsInfo}>Syllabus : {results.syllabus}</Text>
                    <Text style={styles.resultsInfo}>Name : {results.name}</Text>
                    <Text style={styles.resultsInfo}>Index Number : {results.indexNumber}</Text>

                    <View style={styles.tableContainer}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableHeader}>Subject</Text>
                            <Text style={styles.tableHeader}>Result</Text>
                        </View>
                        {results.subjects.map((item, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.tableCell}>{item.subject}</Text>
                                <Text style={styles.tableCell}>{item.result}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            {/* Download Button */}
            <TouchableOpacity style={styles.downloadButton}>
                <Text style={styles.downloadText}>Download Report</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F6F9FC', padding: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    headerSubtitle: { fontSize: 14, color: 'gray' },
    formContainer: { marginBottom: 20 },
    label: { fontSize: 14, color: '#555', marginBottom: 5 },
    pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 15 },
    picker: { height: 50 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15 },
    searchButton: { backgroundColor: '#607D8B', padding: 15, borderRadius: 10, alignItems: 'center' },
    searchText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    resultsContainer: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 20 },
    logoContainer: { alignItems: 'center', marginBottom: 10 },
    logo: { width: 50, height: 50 },
    resultsTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
    resultsInfo: { fontSize: 14, marginBottom: 5 },
    tableContainer: { marginTop: 10 },
    tableRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
    tableHeader: { fontWeight: 'bold', flex: 1, textAlign: 'center' },
    tableCell: { flex: 1, textAlign: 'center' },
    downloadButton: { backgroundColor: '#607D8B', padding: 15, borderRadius: 10, alignItems: 'center' },
    downloadText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    gradeBox: {display:"flex",marginBottom:20 },
    labelDropDown: { fontSize: 16, color: '#444', marginBottom: 8 },
    placeholderStyle: { fontSize: 16, color: '#888' },
    selectedTextStyle: { fontSize: 16, color: '#333' },
    iconStyle: { width: 20, height: 20 },
    classBox: { flex: 1 },
    inputBox: { backgroundColor: '#fff', padding: 12, borderRadius: 8, elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 },
    dropdown: {backgroundColor: 'transparent' },
});
