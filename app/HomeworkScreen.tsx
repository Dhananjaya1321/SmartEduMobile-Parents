import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import homeworksAPIController from "@/controllers/HomeworksController";

export default function HomeworkScreen() {
    const { grade, class: className, subject, year } = useLocalSearchParams();
    const [totalHomework, setTotalHomework] = useState(0);
    const [homeworkList, setHomeworkList] = useState([]);

    useEffect(() => {
        fetchData();
    }, []); // Depend on classId for data fetching

    const fetchData = async () => {
        try {
            const response = await homeworksAPIController.getHomeworksToParents();
            console.log("API Response:", response.data);
            setTotalHomework(response.data.length);
            setHomeworkList(response.data.map(item => ({
                id: item.id,
                description: item.description,
                year: item.year,
                document: item.document, // Ensure document is a Base64 string
            })));
        } catch (err) {
            console.error("Error fetching homework data:", err);
        }
    };
    const renderItem = ({ item }) => {
        const isValidDataUrl = item.document?.startsWith('data:');
        const imageSource = isValidDataUrl ? { uri: item.document } : null;

        return (
            <View style={styles.homeworkItem}>
                {/* Description */}
                <Text style={styles.homeworkText}>{item.description || 'No description'}</Text>

                {/* Year */}
                <Text style={styles.yearText}>Year: {item.year || 'N/A'}</Text>

                {/* Document/Image */}
                {item.document && (
                    Platform.OS === 'web' ? (
                        <img
                            src={item.document}
                            alt="document"
                            style={{ width: '100%', objectFit: 'contain', borderRadius: 8 }}
                        />
                    ) : (
                        imageSource ? (
                            <Image
                                source={imageSource}
                                style={styles.image}
                                resizeMode="contain"
                            />
                        ) : (
                            <Text style={styles.errorText}>Invalid document format</Text>
                        )
                    )
                )}
            </View>
        );
    };

    const renderHeader = () => (
        <View>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Homeworks</Text>
                <Ionicons name="notifications-outline" size={24} color="black" />
            </View>


            <View style={styles.totalClassesView}>
                <Text style={styles.totalHomeworkText}>
                    The total homework
                </Text>
                <Text style={styles.totalHomework}>{totalHomework}</Text>
            </View>
        </View>
    );

    return (
        <FlatList
            style={styles.container}
            data={homeworkList}
            keyExtractor={(item) => item.id?.toString() || Math.random().toString()} // Ensure unique keys
            renderItem={renderItem}
            ListHeaderComponent={renderHeader}
            contentContainerStyle={styles.homeworkList}
            showsVerticalScrollIndicator={false}
        />
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F6F9FC', paddingTop: 50, paddingHorizontal: 20 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 50 },
    headerTitle: { fontSize: 18, fontWeight: '600' },
    infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    infoBox: { flex: 1, marginHorizontal: 5 },
    infoLabel: { fontSize: 14, color: '#555', marginBottom: 5 },
    infoValueBox: { backgroundColor: '#E0E0E0', borderRadius: 5, padding: 10 },
    infoValue: { fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
    totalHomeworkText: { fontSize: 14, color: '#777', marginBottom: 5 },
    totalHomework: { fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
    addButton: { backgroundColor: '#E0E0E0', padding: 10, borderRadius: 5, marginBottom: 15, alignItems: 'center' },
    addButtonText: { fontSize: 14, fontWeight: 'bold' },
    homeworkList: { fontSize: 14, color: '#555', marginBottom: 10, paddingBottom: 20 },
    homeworkItem: { borderColor: '#00d0ff', borderWidth: 1, backgroundColor: '#ffffff', borderRadius: 5, marginBottom: 10, padding: 10, alignItems: 'flex-start' },
    homeworkText: { fontSize: 16, color: '#000000', marginBottom: 5 },
    yearText: { fontSize: 12, color: '#000', marginBottom: 5 }, // Adjusted size for better readability
    image: { width: '100%', height: 850, borderRadius: 8 }, // Explicit dimensions for mobile
    errorText: { color: 'red', fontSize: 12, textAlign: 'center' },
    modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '90%', maxWidth: 400 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15 },
    fileButton: { backgroundColor: '#e0e0e0', padding: 10, borderRadius: 5, alignItems: 'center', marginBottom: 15 },
    fileButtonText: { fontSize: 14, color: '#333' },
    modalActions: { flexDirection: 'row', justifyContent: 'flex-end' },
    cancelButton: { marginRight: 10, padding: 10 },
    cancelButtonText: { color: '#999' },
    saveButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5 },
    saveButtonText: { color: '#fff', fontWeight: 'bold' },
    totalClassesView: { display:"flex",flexDirection:"row",justifyContent:"space-between"},
});
