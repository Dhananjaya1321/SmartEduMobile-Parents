// NICAndApplicationStatusScreen.tsx
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import nicAndApplicationAPIController from "@/controllers/NICAndApplicationController";

const applicationTypeMap: Record<string, string> = {
    al: "G.C.E. (A/L) Examination Application",
    ol: "G.C.E. (O/L) Examination Application",
    g5: "Grade 5 Scholarship Examination Application",
    nic: "NIC Application",
};

export default function NICAndApplicationStatusScreen() {
    const router = useRouter();
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch data from backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await nicAndApplicationAPIController.getAllAcceptedLettersAndCertificates();
                if (response) {
                    setApplications(response || []);
                } else {
                    setError("No applications found.");
                }
            } catch (err) {
                console.error("Fetch error:", err);
                setError("Something went wrong while fetching applications.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>View NIC And Application Status</Text>
                <Ionicons name="notifications-outline" size={24} color="black" />
            </View>

            {/* Applications list */}
            <FlatList
                data={applications}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.applicationItem}>
                        <Text style={styles.appName}>
                            {applicationTypeMap[item.type] || "Unknown Application"}
                        </Text>
                        <Text style={styles.appStatus}>
                            Status:{" "}
                            <Text style={styles[`status${item.status}`] || styles.statusDefault}>
                                {item.status}
                            </Text>
                        </Text>
                    </View>
                )}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F6F9FC", paddingTop: 50, paddingHorizontal: 20 },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 30 },
    headerTitle: { fontSize: 18, fontWeight: "600", textAlign: "center", marginHorizontal: 20 },
    applicationItem: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    appName: { fontSize: 16, fontWeight: "600", marginBottom: 8, color: "#333" },
    appStatus: { fontSize: 14, color: "#555" },
    statusPENDING: { color: "orange", fontWeight: "bold" },
    statusAPPROVED: { color: "green", fontWeight: "bold" },
    statusREJECTED: { color: "red", fontWeight: "bold" },
    statusDefault: { color: "#555", fontWeight: "bold" },
    errorText: { textAlign: "center", fontSize: 16, color: "red" },
});
