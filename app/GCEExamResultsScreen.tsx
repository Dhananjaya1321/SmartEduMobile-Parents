import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Dropdown } from 'react-native-element-dropdown';
import studentResultsAPIController from '@/controllers/StudentResultsController';

export default function GCEExamResultsScreen() {
    const router = useRouter();
    const [exam, setExam] = useState();
    const [year, setYear] = useState();
    const [indexNumber, setIndexNumber] = useState('');
    const [results, setResults] = useState(null);

    const handleSearch = async () => {
        const response = await studentResultsAPIController.getNationalLevelExamsResults(indexNumber, exam, year);
        if (response) {
            setResults(response);
        } else {
            setResults(null); // Clear results on failure
        }
    };

    const renderOLResults = () => {
        if (!results) return null;
        return (
            <View style={styles.resultsContainer}>
                <View style={styles.logoContainer}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/50' }} // Replace with actual logo URL
                        style={styles.logo}
                    />
                    <Text style={styles.resultsTitle}>{results.examName} {results.year}</Text>
                </View>
                <Text style={styles.resultsInfo}>Name: {results.studentName}</Text>
                <Text style={styles.resultsInfo}>Index Number: {results.indexNumber}</Text>
                <View style={styles.tableContainer}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableHeader}>Subject</Text>
                        <Text style={styles.tableHeader}>Result</Text>
                    </View>
                    {results.results.map((item, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{item.subject}</Text>
                            <Text style={styles.tableCell}>{item.result}</Text>
                        </View>
                    ))}
                </View>
            </View>
        );
    };

    const renderALResults = () => {
        if (!results) return null;
        return (
            <View style={styles.resultsContainer}>
                <View style={styles.logoContainer}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/50' }} // Replace with actual logo URL
                        style={styles.logo}
                    />
                    <Text style={styles.resultsTitle}>{results.examName} {results.year}</Text>
                </View>
                <Text style={styles.resultsInfo}>Name: {results.studentName}</Text>
                <Text style={styles.resultsInfo}>Index Number: {results.indexNumber}</Text>
                <Text style={styles.resultsInfo}>Stream: {results.stream || 'N/A'}</Text>
                <Text style={styles.resultsInfo}>District Rank: {results.districtRank || 'N/A'}</Text>
                <Text style={styles.resultsInfo}>Island Rank: {results.islandRank || 'N/A'}</Text>
                <Text style={styles.resultsInfo}>Z-Score: {results.zscore || 'N/A'}</Text>
                <View style={styles.tableContainer}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableHeader}>Subject</Text>
                        <Text style={styles.tableHeader}>Result</Text>
                    </View>
                    {results.results.map((item, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{item.subject}</Text>
                            <Text style={styles.tableCell}>{item.result}</Text>
                        </View>
                    ))}
                </View>
            </View>
        );
    };

    const renderGrade5Results = () => {
        if (!results) return null;
        return (
            <View style={styles.resultsContainer}>
                <View style={styles.logoContainer}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/50' }} // Replace with actual logo URL
                        style={styles.logo}
                    />
                    <Text style={styles.resultsTitle}>{results.examName} {results.year}</Text>
                </View>
                <Text style={styles.resultsInfo}>Name: {results.studentName}</Text>
                <Text style={styles.resultsInfo}>Index Number: {results.indexNumber}</Text>
                <Text style={styles.resultsInfo}>Marks: {results.marks || 'N/A'}</Text>
                <Text style={styles.resultsInfo}>Cut-Off Marks: {results.cutOffMarks || 'N/A'}</Text>
            </View>
        );
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>National Examinations</Text>
                <Ionicons name="notifications-outline" size={24} color="black" />
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
                <View style={styles.gradeBox}>
                    <Text style={styles.labelDropDown}>Exam</Text>
                    <View style={styles.inputBox}>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            iconStyle={styles.iconStyle}
                            data={[
                                { label: 'G.C.E. (A/L) Examination', value: 'al' },
                                { label: 'G.C.E. (O/L) Examination', value: 'ol' },
                                { label: 'Grade 5 Scholarship Examination', value: 'g5' },
                            ]}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            value={exam}
                            onChange={(item) => setExam(item.value)}
                        />
                    </View>
                </View>

                <View style={styles.gradeBox}>
                    <Text style={styles.labelDropDown}>Year</Text>
                    <View style={styles.inputBox}>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            iconStyle={styles.iconStyle}
                            data={[
                                { label: '2016', value: '2016' },
                                { label: '2017', value: '2017' },
                                { label: '2018', value: '2018' },
                                { label: '2019', value: '2019' },
                                { label: '2020', value: '2020' },
                                { label: '2021', value: '2021' },
                                { label: '2022', value: '2022' },
                                { label: '2023', value: '2023' },
                                { label: '2024', value: '2024' },
                                { label: '2025', value: '2025' },
                            ]}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            value={year}
                            onChange={(item) => setYear(item.value)}
                        />
                    </View>
                </View>

                <Text style={styles.label}>Index Number</Text>
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
                <>
                    {results.examName === 'G.C.E. (O/L) Examination' && renderOLResults()}
                    {results.examName === 'G.C.E. (A/L) Examination' && renderALResults()}
                    {results.examName === 'Grade 5 Scholarship Examination' && renderGrade5Results()}
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F6F9FC', paddingTop: 50, paddingHorizontal: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 50 },
    headerTitle: { fontSize: 18, fontWeight: '600' },
    formContainer: { marginBottom: 20 },
    label: { fontSize: 14, color: '#555', marginBottom: 5 },
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
    gradeBox: { display: 'flex', marginBottom: 20 },
    labelDropDown: { fontSize: 16, color: '#444', marginBottom: 8 },
    placeholderStyle: { fontSize: 16, color: '#888' },
    selectedTextStyle: { fontSize: 16, color: '#333' },
    iconStyle: { width: 20, height: 20 },
    inputBox: { backgroundColor: '#fff', padding: 12, borderRadius: 8, elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 },
    dropdown: { backgroundColor: 'transparent' },
});
