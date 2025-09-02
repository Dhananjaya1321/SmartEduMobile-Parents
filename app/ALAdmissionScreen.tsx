import React, {useEffect, useState, useCallback} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    TextInput,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "expo-router";
import {Dropdown} from "react-native-element-dropdown";
import alAdmissionAPIController from "@/controllers/ALAdmissionAPIController";
import eventAPIController from "@/controllers/EventController";

// debounce helper
let searchTimeout: NodeJS.Timeout;

export default function ALAdmissionScreen() {
    const navigation = useNavigation();
    const currentYear = new Date().getFullYear();

    // Generate [current year, last year, year before last]
    const years = Array.from({length: 3}, (_, i) => currentYear - i);

    // Format data for dropdown
    const dropdownData = [
        {label: "Select year", value: ""},
        ...years.map((year) => ({
            label: year.toString(),
            value: year.toString(),
        })),
    ];

    const [selectedYear, setSelectedYear] = useState<string>("");
    const [selectedSchool, setSelectedSchool] = useState<string>("");
    const [selectedStream, setSelectedStream] = useState<string>("");
    const [schoolList, setSchoolList] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [indexNumber, setIndexNumber] = useState("");
    const [selectedSchools, setSelectedSchools] = useState<any[]>([]);

    useEffect(() => {
        fetchSchools();
    }, []);

    const fetchSchools = async () => {
        try {
            setLoading(true);
            const response = await alAdmissionAPIController.getAllSchoolsToParentsCanApplyForALs();
            if (response) {
                const formatted = response.data.map((school: any) => ({
                    label: school.schoolName,
                    value: school.id,
                }));
                setSchoolList(formatted);
            } else {
                setSchoolList([]);
            }
        } catch (err: any) {
            console.error(err);
            setSchoolList([]);
        } finally {
            setLoading(false);
        }
    };

    const handleRequest = async () => {
        try {
            if (!selectedSchool) {
                Alert.alert("Error", "Please select a school");
                return;
            }
            const payload = {
                indexNumber: indexNumber,
                year: selectedYear,
                subjectStream: selectedStream,
                schoolIds: selectedSchools.map((s) => s.value),
            }

            const response = await alAdmissionAPIController.applySchoolsToParentsForALs(payload);

            if (response) {
                setSelectedStream('')
                setIndexNumber('')
                setSelectedYear('')
                setSelectedSchools([])

                Alert.alert("Success", "Request Saved");
            } else {
                Alert.alert("Error", "Check you index number");
            }
        } catch (err: any) {
            Alert.alert("Error", err.message || "Failed to request certificate");
        }
    };

// Add school to table (max 5)
    const handleAddSchool = () => {
        if (!selectedSchool) {
            Alert.alert("Error", "Please select a school");
            return;
        }
        if (selectedSchools.length >= 5) {
            Alert.alert("Error", "You can select up to 5 schools only");
            return;
        }
        if (selectedSchools.find((s) => s.value === selectedSchool)) {
            Alert.alert("Error", "This school is already added");
            return;
        }
        const schoolObj = schoolList.find((s) => s.value === selectedSchool);
        setSelectedSchools([...selectedSchools, schoolObj]);
    };

// Remove school
    const handleRemoveSchool = (schoolId: string) => {
        setSelectedSchools(selectedSchools.filter((s) => s.value !== schoolId));
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black"/>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>A/L School Admission</Text>
                <Ionicons name="notifications-outline" size={24} color="black"/>
            </View>

            <View style={styles.gradeBox}>
                <Text style={styles.labelDropDown}>Year</Text>
                <View style={styles.inputBox}>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={{color: "gray"}}
                        selectedTextStyle={{color: "black"}}
                        iconStyle={{width: 20, height: 20}}
                        data={dropdownData}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select year"
                        value={selectedYear}
                        onChange={(item) => setSelectedYear(item.value)}
                    />
                </View>
            </View>

            {/* Index Number Input */}
            <View style={styles.gradeBox}>
                <Text style={styles.labelDropDown}>Index Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Index Number"
                    placeholderTextColor="#888"
                    value={indexNumber}
                    onChangeText={setIndexNumber}
                />
            </View>

            {/* School Search & Dropdown */}
            <View style={styles.gradeBox}>
                <Text style={styles.labelDropDown}>Select School</Text>
                <View style={styles.inputBox}>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={{color: "gray"}}
                        selectedTextStyle={{color: "black"}}
                        iconStyle={{width: 20, height: 20}}
                        data={schoolList}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select year"
                        value={selectedSchool}
                        onChange={(item) => setSelectedSchool(item.value)}
                    />
                </View>
            </View>

            <View style={styles.gradeBox}>
                <Text style={styles.labelDropDown}>Select Subject Stream</Text>
                <View style={styles.inputBox}>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={{color: "gray"}}
                        selectedTextStyle={{color: "black"}}
                        iconStyle={{width: 20, height: 20}}
                        data={[
                            {label: "Select stream", value: ""},
                            {label: "Bio", value: "Bio"},
                            {label: "Maths", value: "Maths"},
                            {label: "Commerce", value: "Commerce"},
                            {label: "Tech", value: "Tech"},
                            {label: "Arts", value: "Arts"},
                        ]}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select year"
                        value={selectedStream}
                        onChange={(item) => setSelectedStream(item.value)}
                    />
                </View>
            </View>
            {/*add selected 5 schools display table here and add button*/}
            <View style={styles.gradeBox}>
                {/* Add Button */}
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAddSchool}
                >
                    <Text style={styles.addButtonText}>Add School</Text>
                </TouchableOpacity>

                <Text style={styles.labelDropDown}>Selected Schools</Text>
                {/* Table */}
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableCell, {flex: 2, fontWeight: "bold"}]}>School Name</Text>
                        <Text style={[styles.tableCell, {flex: 1, fontWeight: "bold"}]}>Action</Text>
                    </View>
                    {selectedSchools.length === 0 ? (
                        <Text style={{textAlign: "center", marginTop: 10, color: "gray"}}>
                            No schools added yet
                        </Text>
                    ) : (
                        selectedSchools.map((school, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={[styles.tableCell, {flex: 2}]}>{school.label}</Text>
                                <TouchableOpacity
                                    onPress={() => handleRemoveSchool(school.value)}
                                    style={{backgroundColor: "#E57373", padding: 6, borderRadius: 6}}
                                >
                                    <Text style={{color: "#fff"}}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    )}
                </View>
            </View>


            {/* Request Button */}
            <TouchableOpacity style={styles.requestButton} onPress={handleRequest}>
                <Text style={styles.requestText}>Request</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: "#F6F9FC", paddingTop: 50, paddingHorizontal: 20},
    header: {flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 30},
    headerTitle: {fontSize: 18, fontWeight: "600"},
    gradeBox: {marginBottom: 20},
    labelDropDown: {fontSize: 16, color: "#444", marginBottom: 8},
    inputBox: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    dropdown: {backgroundColor: "transparent"},
    placeholderStyle: {fontSize: 16, color: "#888"},
    selectedTextStyle: {fontSize: 16, color: "#333"},
    inputSearchStyle: {height: 40, fontSize: 16, color: "#333"},
    iconStyle: {width: 20, height: 20},
    requestButton: {
        backgroundColor: "#607D8B",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 20,
    },
    requestText: {color: "#fff", fontSize: 16, fontWeight: "bold"},
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
    },

    addButton: {
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 10,
    },
    addButtonText: {color: "#fff", fontWeight: "bold"},

    table: {
        backgroundColor: "#fff",
        borderRadius: 8,
        marginTop: 10,
        padding: 10,
        elevation: 2,
    },
    tableHeader: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#ccc",
        paddingBottom: 5,
        marginBottom: 5,
    },
    tableRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },
    tableCell: {
        fontSize: 14,
        color: "#333",
    },

});
