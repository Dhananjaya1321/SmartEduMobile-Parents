import React, {useState, useEffect} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";
import alAdmissionAPIController from "@/controllers/ALAdmissionAPIController";

export default function AdmissionStatusScreen() {
    const [admissions, setAdmissions] = useState([]);

    useEffect(() => {
        fetchAdmissions();
    }, []);

    const fetchAdmissions = async () => {
        try {
            const response = await alAdmissionAPIController.getAllALAdmissionsStatusToParents();
            if (response?.data) {
                setAdmissions(response.data);
            }
        } catch (err) {
            console.error("Error fetching admissions:", err);
        }
    };

    const handleAccept = async (id) => {
        const response = await alAdmissionAPIController.acceptTheALApplication(id);
        if (response) {
            alert("Accepted successfully");
            fetchAdmissions();
        }
    };

    const handleReject = async (id) => {
        const response = await alAdmissionAPIController.rejectTheALApplication(id);
        if (response) {
            alert("Rejected successfully");
            fetchAdmissions();
        }
    };

    const renderItem = ({item}) => {
        const isStudentAccepted = item.status === "STUDENT_ACCEPTED";
        const isStudentRejected = item.status === "STUDENT_REJECTED";
        const showButtons = item.status === "SCHOOL_ACCEPTED";

        return (
            <View
                style={[
                    styles.card,
                    isStudentAccepted && {backgroundColor: "#d4edda", borderColor: "#28a745"},
                    isStudentRejected && {backgroundColor: "#f8d7da", borderColor: "#dc3545"},
                ]}
            >
                <Text style={styles.schoolName}>{item.schoolName}</Text>
                <Text style={styles.infoText}>Stream: {item.subjectStream}</Text>
                <Text style={styles.infoText}>Status: {item.status}</Text>

                {/* Score Breakdown */}
                <View style={styles.breakdown}>
                    <Text style={styles.breakdownTitle}>Score Calculation</Text>
                    <Text style={styles.breakdownText}>
                        🎓 O/L Results
                        <Text style={{display:"flex",flexDirection:"column",paddingLeft:25}}>
                            <Text>A=6</Text>
                            <Text>B=5</Text>
                            <Text>C=4</Text>
                            <Text>S=2</Text>
                            <Text>W=0</Text>
                        </Text>
                    </Text>
                    <Text style={styles.breakdownText}>
                        🏆 Achievements you achieved in the 2 years you studied for O/L
                        <Text style={{display:"flex",flexDirection:"column",paddingLeft:25}}>
                            <Text>National 1st/2nd/3rd=6</Text>
                            <Text>Provincial 1st/2nd/3rd=5</Text>
                            <Text>Zonal 1st/2nd/3rd=4</Text>
                        </Text>
                    </Text>
                    <Text style={styles.breakdownText}>
                        📍 Residency based on your current school
                        <Text style={{display:"flex",flexDirection:"column",paddingLeft:25}}>
                            <Text>Province=2</Text>
                            <Text>District=3</Text>
                            <Text>Zonal=4</Text>
                        </Text>
                    </Text>
                </View>

                <View style={styles.scoreRow}>
                    <Text style={styles.scoreText}>Total Score: {item.totalScore}</Text>
                    <Text style={styles.scoreText}>Cutoff: {item.cutOffScore}</Text>
                </View>

                {showButtons && (
                    <View style={styles.actions}>
                        <TouchableOpacity
                            style={[styles.button, styles.acceptButton]}
                            onPress={() => handleAccept(item.id)}
                        >
                            <Text style={styles.buttonText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.rejectButton]}
                            onPress={() => handleReject(item.id)}
                        >
                            <Text style={styles.buttonText}>Reject</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    };

    const renderHeader = () => (
        <View>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black"/>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>A/L Admissions</Text>
                <Ionicons name="notifications-outline" size={24} color="black"/>
            </View>

            <View style={styles.totalView}>
                <Text style={styles.totalText}>Total Applications</Text>
                <Text style={styles.totalCount}>{admissions.length}</Text>
            </View>
        </View>
    );

    return (
        <FlatList
            style={styles.container}
            data={admissions}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListHeaderComponent={renderHeader}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F9FC",
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 40,
    },
    headerTitle: {fontSize: 18, fontWeight: "600"},
    totalView: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    totalText: {fontSize: 14, color: "#777"},
    totalCount: {fontSize: 16, fontWeight: "bold"},
    list: {paddingBottom: 20},
    card: {
        borderColor: "#00d0ff",
        borderWidth: 1,
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 15,
        padding: 15,
    },
    schoolName: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#000",
    },
    infoText: {fontSize: 14, color: "#333", marginBottom: 3},
    breakdown: {
        marginTop: 10,
        padding: 8,
        backgroundColor: "#f1f9ff",
        borderRadius: 6,
    },
    breakdownTitle: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 4,
        color: "#0077b6",
    },
    breakdownText: {
        fontSize: 12,
        color: "#333",
        marginBottom: 2,
    },
    scoreRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 8,
    },
    scoreText: {fontSize: 14, fontWeight: "500"},
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginHorizontal: 5,
    },
    acceptButton: {backgroundColor: "#4CAF50"},
    rejectButton: {backgroundColor: "#F44336"},
    buttonText: {color: "#fff", fontWeight: "bold"},
    disabled: {backgroundColor: "#ccc"},
});
