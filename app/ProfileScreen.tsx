import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useRouter} from 'expo-router';
import studentAPIController from "@/controllers/StudentController";

export default function ProfileScreen() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'Information' | 'Achievements'>('Information');

    const currentYear = new Date().getFullYear();
    const [loading, setLoading] = useState(true);
    const [student, setStudent] = useState<any>(null);

    useEffect(() => {

        const fetchStudent = async () => {
            setLoading(true);
            const data = await studentAPIController.findStudentToParent();
            if (data) {
                setStudent(data);
            }
            setLoading(false);
        };
        fetchStudent();
    }, []);

    if (loading) {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <ActivityIndicator size="large" color="#607D8B"/>
            </View>
        );
    }

    if (!student) {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text>Failed to load student data.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black"/>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
                <Ionicons name="notifications-outline" size={24} color="black"/>
            </View>

            {/* Profile Image + Name */}
            <View style={styles.profileHeader}>
                <Image
                    source={require('@/assets/images/character.png')}
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>{student?.fullNameWithInitials || "Unknown Student"}</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabs}>
                <TouchableOpacity onPress={() => setActiveTab('Information')}>
                    <Text style={[styles.tab, activeTab === 'Information' && styles.activeTab]}>Information</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('Achievements')}>
                    <Text style={[styles.tab, activeTab === 'Achievements' && styles.activeTab]}>Achievements</Text>
                </TouchableOpacity>
            </View>

            {/* Achievements Tab */}
            {activeTab === 'Achievements' && (
                <View>
                    <Text style={styles.sectionTitle}>Batches</Text>
                    <View style={styles.infoItem}/>

                    <Text style={styles.sectionTitle}>Education Achievements</Text>
                    <View style={styles.infoItem}/>

                    <Text style={styles.sectionTitle}>Sport Achievements</Text>
                    <View style={styles.infoItem}/>

                    <Text style={styles.sectionTitle}>Participated Projects</Text>
                    <View style={styles.infoItem}/>
                </View>
            )}

            {/* Information Tab */}
            {activeTab === 'Information' && (
                <View>
                    {/* Grade + Class */}
                    <View style={styles.infoRow}>
                        <View style={styles.infoBox}>
                            <Text style={styles.infoLabel}>Current Grade</Text>
                            <View style={styles.infoValueBox}>
                                <Text style={styles.infoValue}>Grade-{student.gradeName || "N/A"}</Text>
                            </View>
                        </View>
                        <View style={styles.infoBox}>
                            <Text style={styles.infoLabel}>Current Class</Text>
                            <View style={styles.infoValueBox}>
                                <Text style={styles.infoValue}>{student.className || "N/A"}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Dates */}
                    <View style={styles.infoRow}>
                        <View style={styles.infoBox}>
                            <Text style={styles.infoLabel}>Entered date</Text>
                            <View style={styles.infoValueBox}>
                                <Text style={styles.infoValue}>{student.entryDate || "N/A"}</Text>
                            </View>
                        </View>
                        <View style={styles.infoBox}>
                            <Text style={styles.infoLabel}>Current year</Text>
                            <View style={styles.infoValueBox}>
                                <Text style={styles.infoValue}>{currentYear}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Registration Number */}
                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Registration Number</Text>
                        <View style={styles.infoValueBox}>
                            <Text style={styles.infoValue}>{student.registrationNumber || "N/A"}</Text>
                        </View>
                    </View>

                    <Text style={styles.sectionTitle}>Student Basic Information</Text>

                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Student Name</Text>
                        <View style={styles.infoValueBox}>
                            <Text style={styles.infoValue}>{student.fullName || "N/A"}</Text>
                        </View>
                    </View>

                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Full Name with Initial</Text>
                        <View style={styles.infoValueBox}>
                            <Text style={styles.infoValue}>{student.fullNameWithInitials || "N/A"}</Text>
                        </View>
                    </View>

                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Birth of Date</Text>
                        <View style={styles.infoValueBox}>
                            <Text style={styles.infoValue}>{student.dateOfBirth || "N/A"}</Text>
                        </View>
                    </View>

                    <Text style={styles.sectionTitle}>Parents Details</Text>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Mother's Name</Text>
                        <View style={styles.infoValueBox}>
                            <Text style={styles.infoValue}>{student.motherName || "N/A"}</Text>
                        </View>
                    </View>

                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Mother's Contact Number</Text>
                        <View style={styles.infoValueBox}>
                            <Text style={styles.infoValue}>{student.motherContact || "N/A"}</Text>
                        </View>
                    </View>

                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Father's Name</Text>
                        <View style={styles.infoValueBox}>
                            <Text style={styles.infoValue}>{student.fatherName || "N/A"}</Text>
                        </View>
                    </View>

                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Father's Contact Number</Text>
                        <View style={styles.infoValueBox}>
                            <Text style={styles.infoValue}>{student.fatherContact || "N/A"}</Text>
                        </View>
                    </View>

                    <Text style={styles.sectionTitle}>Address</Text>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Address</Text>
                        <View style={styles.infoValueBox}>
                            <Text style={styles.infoValue}>{student.address || "N/A"}</Text>
                        </View>
                    </View>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#F6F9FC', paddingTop: 50, paddingHorizontal: 20},
    header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 50},
    headerTitle: {fontSize: 18, fontWeight: '600'},
    profileHeader: {alignItems: 'center', marginBottom: 20},
    profileImage: {width: 100, height: 100, borderRadius: 10},
    profileName: {fontSize: 18, fontWeight: 'bold', marginTop: 10},
    tabs: {gap:5,marginHorizontal:5,flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20},
    tab: {display:"flex",alignItems:"center",justifyContent:"center",width:'40vw',fontSize: 16, color: '#555', padding: 10, backgroundColor: '#E0E0E0', borderRadius: 5},
    activeTab: {fontWeight: 'bold', color: '#000', backgroundColor: '#607D8B'},
    sectionTitle: {fontSize: 18, fontWeight: 'bold', marginVertical: 10, marginTop: 20},
    infoItem: {backgroundColor: '#E0E0E0', padding: 10, borderRadius: 5, flex: 1, marginHorizontal: 5, height: 100},

    editableText: {color: '#000'},
    updateButton: {
        backgroundColor: '#607D8B',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    updateText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
    infoRow: {flexDirection: 'row', justifyContent: 'space-between'},
    infoBox: {marginBottom: 20, flex: 1, marginHorizontal: 5},
    infoLabel: {fontSize: 14, color: '#555', marginBottom: 5},
    infoValueBox: {backgroundColor: '#E0E0E0', borderRadius: 5, padding: 10},
    infoValue: {fontSize: 16, fontWeight: 'bold', textAlign: 'center'},
});
