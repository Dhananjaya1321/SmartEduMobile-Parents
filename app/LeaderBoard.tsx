import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";
import studentResultsAPIController from "@/controllers/StudentResultsController";

// Placeholder image (replace with actual image source from backend)
const placeholderImage = require("@/assets/images/character.png");

// Logged-in user's child rank (for highlight) - Will be set from API
let loggedInChildRank = null;

export default function LeaderBoard() {
    const router = useRouter();
    const navigation = useNavigation();
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [rankLevel, setRankLevel] = useState("Class Ranks");
    const [childData, setChildData] = useState<any>(null);

    const params = useLocalSearchParams();
    const id = params.id as string | undefined;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await studentResultsAPIController.getAllClassStudentsResultsDetails(id);

                if (response) {
                    // Sort by rank before setting
                    const sorted = [...response].sort((a, b) => a.rank - b.rank);
                    setStudents(sorted);

                    // Extract examId from the first response item (assuming all items share the same examId)
                    const examId = response[0]?.examId;
                    if (examId) {
                        await fetchMyChildData(examId);
                    } else {
                        setError("Exam ID not found in response.");
                    }
                } else {
                    setError("No results found for this exam.");
                }
            } catch (err) {
                setError("Failed to load data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const fetchMyChildData = async (examId: string) => {
        try {
            setLoading(true);
            const response = await studentResultsAPIController.getMyChildData(examId);
            if (response) {
                setChildData(response);
                loggedInChildRank = response.rank; // Update the global rank for highlighting
            }
        } catch (err) {
            setError("Failed to load child data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

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

    const renderTrendIcon = (trend) => {
        switch (trend) {
            case "up":
                return <Text style={{ color: "green", fontWeight: "bold" }}>▲</Text>;
            case "down":
                return <Text style={{ color: "red", fontWeight: "bold" }}>▼</Text>;
            case "same":
                return <Text style={{ color: "purple", fontWeight: "bold" }}>■</Text>;
            default:
                return null;
        }
    };

    const renderItem = ({ item }) => {
        const isChild = item.rank === loggedInChildRank;
        return (
            <View style={[styles.row, isChild && styles.userRow]}>
                <Image source={placeholderImage} style={styles.photo} />
                <Text style={[styles.name, isChild && styles.userName]}>{item.studentName}</Text>
                <View style={styles.rankWrapper}>
                    <Text style={styles.rank}>{item.rank}</Text>
                    {renderTrendIcon(item.trend)} {/* Placeholder trend, adjust based on API */}
                </View>
            </View>
        );
    };

    // Move child's rank to the top if found
    const displayStudents = childData
        ? [
            ...students.filter((student) => student.rank === loggedInChildRank),
            ...students.filter((student) => student.rank !== loggedInChildRank),
        ]
        : students;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Leader Board</Text>
                <Ionicons name="notifications-outline" size={24} color="black" />
            </View>

            {/* Header Row */}
            <View style={styles.headerRow}>
                <Text style={styles.headerList}>Photo</Text>
                <Text style={styles.headerList}>Name</Text>
                <Text style={styles.headerList}>Rank in class</Text>
            </View>

            {/* List */}
            <FlatList
                data={displayStudents}
                keyExtractor={(item) => item.studentId}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F6F9FC", paddingTop: 50, paddingHorizontal: 20 },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 50 },
    headerTitle: { fontSize: 18, fontWeight: "600" },
    gradeBox: { display: "flex", marginBottom: 20 },
    labelDropDown: { fontSize: 16, color: "#444", marginBottom: 8 },
    placeholderStyle: { fontSize: 16, color: "#888" },
    selectedTextStyle: { fontSize: 16, color: "#333" },
    iconStyle: { width: 20, height: 20 },
    inputBox: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    dropdown: { backgroundColor: "transparent" },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 5,
        marginBottom: 5,
    },
    headerList: { fontSize: 14, fontWeight: "bold", color: "#555" },
    row: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 8,
        marginBottom: 8,
        borderRadius: 12,
    },
    userRow: {
        backgroundColor: "#FDCB6E",
    },
    photo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    name: {
        flex: 1,
        fontWeight: "600",
    },
    userName: {
        fontWeight: "bold",
    },
    rankWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    rank: {
        fontWeight: "bold",
        marginRight: 5,
    },
    downloadButton: {
        marginBottom: 20,
        backgroundColor: "#445669",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20,
    },
    downloadButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    errorText: { textAlign: "center", fontSize: 16, color: "red" },
});
