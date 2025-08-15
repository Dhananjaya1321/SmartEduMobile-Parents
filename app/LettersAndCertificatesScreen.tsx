import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useNavigation, useRouter} from 'expo-router';
import {Dropdown} from "react-native-element-dropdown";

export default function LettersAndCertificatesScreen() {
    const router = useRouter();
    const navigation = useNavigation();
    const [selectedDocument, setSelectedDocument] = useState('School Leaving Letter');
    const [requests, setRequests] = useState(['School Leaving Letter Download']); // Sample request
    const [grade, setGrade] = useState('Grade - 10');

    const handleRequest = () => {
        // Add logic to process the request (e.g., API call)
        alert(`Requested ${selectedDocument}`);
        setRequests([...requests, `${selectedDocument} Download`]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black"/>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Letters and Certificates</Text>
                <Ionicons name="notifications-outline" size={24} color="black"/>
            </View>

            <View style={styles.gradeBox}>
                <Text style={styles.labelDropDown}>Select a letter or certificate</Text>
                <View style={styles.inputBox}>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        data={[
                            { label: 'School Leaving Letter', value: 'School Leaving Letter' },
                            { label: 'Character Certificate', value: 'Character Certificate' },

                        ]}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        value={grade}
                        onChange={item => setGrade(item.value)}
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.requestButton} onPress={handleRequest}>
                <Text style={styles.requestText}>Request</Text>
            </TouchableOpacity>

            <Text style={styles.requestsTitle}>Requests</Text>
            {requests.map((request, index) => (
                <View key={index} style={styles.requestItem}>
                    <Text style={styles.requestText}>{request}</Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#F6F9FC', paddingTop: 50, paddingHorizontal: 20},
    header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 50},
    headerTitle: {fontSize: 18, fontWeight: '600'},
    label: { fontSize: 14, color: '#555', marginBottom: 10 },
    pickerContainer: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 20 },
    picker: { height: 50, width: '100%' },
    requestButton: {
        backgroundColor: '#607D8B',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20
    },
    requestText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    requestsTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    requestItem: {
        backgroundColor: '#607D8B',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10
    },
    gradeBox: {display:"flex",marginBottom:20 },
    labelDropDown: { fontSize: 16, color: '#444', marginBottom: 8 },
    placeholderStyle: { fontSize: 16, color: '#888' },
    selectedTextStyle: { fontSize: 16, color: '#333' },
    iconStyle: { width: 20, height: 20 },
    classBox: { flex: 1 },
    inputBox: { backgroundColor: '#fff', padding: 12, borderRadius: 8, elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 },
    dropdown: {backgroundColor: 'transparent' },
});
