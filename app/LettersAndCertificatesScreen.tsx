// LettersAndCertificatesScreen.tsx
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import lettersAndCertificatesAPIController from "@/controllers/LettersAndCertificatesController";
import { base_url } from "@/apiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LettersAndCertificatesScreen() {
    const router = useRouter();
    const navigation = useNavigation();
    const [accepted, setAccepted] = useState<any[]>([]);
    const [pending, setPending] = useState<any[]>([]);
    const [rejected, setRejected] = useState<any[]>([]);
    const [letterType, setLetterType] = useState<string | undefined>();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const acceptedRes =
                await lettersAndCertificatesAPIController.getAllAcceptedLettersAndCertificates();
            const pendingRes =
                await lettersAndCertificatesAPIController.getAllPendingLettersAndCertificates();
            const rejectedRes =
                await lettersAndCertificatesAPIController.getAllRejectedLettersAndCertificates();

            if (acceptedRes) setAccepted(acceptedRes);
            if (pendingRes) setPending(pendingRes);
            if (rejectedRes) setRejected(rejectedRes);
        } catch (err: any) {
            console.error("Error fetching letters/certificates:", err);
            Alert.alert("Error", err.message || "Failed to fetch letters");
        }
    };

    const handleRequest = async () => {
        if (!letterType) {
            Alert.alert("Error", "Please select a letter or certificate type");
            return;
        }
        try {
            const response =
                await lettersAndCertificatesAPIController.requestLettersAndCertificates(
                    { letterType }
                );
            if (response) {
                Alert.alert("Success", "Request Saved");
                fetchData(); // Refresh after new request
            } else {
                Alert.alert("Error", "Failed to request certificate");
            }
        } catch (err: any) {
            Alert.alert("Error", err.message || "Failed to request certificate");
        }
    };

    const handleDownload = async (documentUrl: string, studentName: string) => {
        try {
            console.log("Download clicked!", documentUrl, studentName);

            if (!documentUrl) {
                Alert.alert("Error", "No document available");
                return;
            }

            const token = await AsyncStorage.getItem("token");
            const fileUrl = `${base_url}/letters/files/${documentUrl}`;
            const fileName = `${studentName.replace(/\s/g, "_")}_${documentUrl}.pdf`;

            if (Platform.OS === "web") {
                // ✅ Web: trigger browser download
                console.log("Downloading on Web:", fileUrl);
                const link = document.createElement("a");
                link.href = fileUrl + `?auth=${token}`; // if token needed, backend must accept query
                link.download = fileName;
                link.target = "_blank";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                return;
            }

            // ✅ Mobile (iOS/Android)
            const fileUri = `${FileSystem.documentDirectory}${fileName}`;
            console.log("Starting mobile download:", fileUrl, "→", fileUri);

            const downloaded = await FileSystem.downloadAsync(fileUrl, fileUri, {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                },
            });

            console.log("Download finished:", downloaded);

            const fileInfo = await FileSystem.getInfoAsync(downloaded.uri);
            console.log("File info:", fileInfo);

            if (!fileInfo.exists) {
                throw new Error("Failed to save file on device");
            }

            await Sharing.shareAsync(downloaded.uri);
            Alert.alert("Success", "File downloaded successfully");
        } catch (err: any) {
            console.error("Download error:", err);
            Alert.alert("Error", err.message || "Failed to download PDF");
        }
    };

    const renderRequests = (title: string, data: any[], color: string) => (
        <>
            <Text style={styles.requestsTitle}>{title}</Text>
            {data.length === 0 && (
                <Text style={styles.emptyText}>No {title.toLowerCase()} found</Text>
            )}
            {data.map((req, index) => (
                <View key={req.id || index} style={styles.requestItem}>
                    <Text style={styles.requestTitle}>
                        {req.letterType?.replace("_", " ")}
                    </Text>
                    <Text style={styles.requestDetail}>Student: {req.studentName}</Text>
                    <Text style={styles.requestDetail}>
                        Issued Date: {req.issuedDate || "Pending"}
                    </Text>
                    <Text style={styles.requestDetail}>Status: {req.status}</Text>
                    {req.documentUrl && (
                        <TouchableOpacity
                            style={[styles.downloadButton, { backgroundColor: color }]}
                            onPress={() => handleDownload(req.documentUrl, req.studentName)}
                        >
                            <Ionicons name="download-outline" size={20} color="white" />
                            <Text style={styles.downloadText}>Download</Text>
                        </TouchableOpacity>
                    )}
                    {req.status==="REJECTED" && (
                        <Text style={{color:"red"}}>{req.principalRemarks}</Text>
                    )}
                </View>
            ))}
        </>
    );

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Letters and Certificates</Text>
                <Ionicons name="notifications-outline" size={24} color="black" />
            </View>

            {/* Request Form */}
            <View style={styles.gradeBox}>
                <Text style={styles.labelDropDown}>Select a letter or certificate</Text>
                <View style={styles.inputBox}>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        data={[
                            {
                                label: "School Leaving Certificate",
                                value: "LEAVING_CERTIFICATE",
                            },
                            { label: "Character Certificate", value: "CHARACTER_CERTIFICATE" },
                        ]}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select type"
                        value={letterType}
                        onChange={(item) => setLetterType(item.value)}
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.requestButton} onPress={handleRequest}>
                <Text style={styles.requestText}>Request</Text>
            </TouchableOpacity>

            {/* Lists */}
            {renderRequests("Approved Letters & Certificates", accepted, "#4CAF50")}
            {renderRequests("Pending Requests", pending, "#FF9800")}
            {renderRequests("Rejected Requests", rejected, "#F44336")}
        </ScrollView>
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
        marginBottom: 30,
    },
    headerTitle: { fontSize: 18, fontWeight: "600" },
    requestButton: {
        backgroundColor: "#607D8B",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 20,
    },
    requestText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    requestsTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    requestItem: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    requestTitle: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
    requestDetail: { fontSize: 14, color: "#555", marginBottom: 3 },
    downloadButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
        justifyContent: "center",
    },
    downloadText: { color: "#fff", fontWeight: "bold", marginLeft: 5 },
    gradeBox: { marginBottom: 20 },
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
    emptyText: { fontSize: 14, color: "#777", marginBottom: 15, fontStyle: "italic" },
});
