import React, { useState } from 'react';
import {View, Text, FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "expo-router";
import {Dropdown} from "react-native-element-dropdown";

// Sample leaderboard data
const sampleData = [
    { id: 1, name: 'Student Name', rank: 15, trend: 'up', photoUrl: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Student Name', rank: 1, trend: 'up', photoUrl: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Student Name', rank: 2, trend: 'down', photoUrl: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'Student Name', rank: 3, trend: 'up', photoUrl: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, name: 'Student Name', rank: 3, trend: 'same', photoUrl: 'https://i.pravatar.cc/150?img=5' },
    { id: 6, name: 'Student Name', rank: 5, trend: 'up', photoUrl: 'https://i.pravatar.cc/150?img=6' },
    { id: 7, name: 'Student Name', rank: 6, trend: 'up', photoUrl: 'https://i.pravatar.cc/150?img=7' },
    { id: 8, name: 'Student Name', rank: 7, trend: 'up', photoUrl: 'https://i.pravatar.cc/150?img=8' },
    { id: 9, name: 'Student Name', rank: 8, trend: 'up', photoUrl: 'https://i.pravatar.cc/150?img=9' },
    { id: 10, name: 'Student Name', rank: 9, trend: 'up', photoUrl: 'https://i.pravatar.cc/150?img=10' }
];

// Logged-in user's rank (for highlight)
const loggedInUserRank = 15;

export default function LeaderBoard() {
    const navigation = useNavigation();
    const [rankLevel, setRankLevel] = useState('Grade - 10');

    const renderTrendIcon = (trend) => {
        switch (trend) {
            case 'up': return <Text style={{ color: 'green', fontWeight: 'bold' }}>▲</Text>;
            case 'down': return <Text style={{ color: 'red', fontWeight: 'bold' }}>▼</Text>;
            case 'same': return <Text style={{ color: 'purple', fontWeight: 'bold' }}>■</Text>;
            default: return null;
        }
    };

    const renderItem = ({ item }) => {
        const isUser = item.rank === loggedInUserRank;
        return (
            <View style={[styles.row, isUser && styles.userRow]}>
                <Image source={{ uri: item.photoUrl }} style={styles.photo} />
                <Text style={[styles.name, isUser && styles.userName]}>{item.name}</Text>
                <View style={styles.rankWrapper}>
                    <Text style={styles.rank}>{item.rank}</Text>
                    {renderTrendIcon(item.trend)}
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Leader Board</Text>
                <Ionicons name="notifications-outline" size={24} color="black" />
            </View>
            {/* Title */}

            {/* Dropdown Placeholder */}
            <View style={styles.gradeBox}>
                <Text style={styles.labelDropDown}>Exam</Text>
                <View style={styles.inputBox}>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        data={[
                            { label: 'Class Ranks', value: 'Class Ranks' },
                            { label: 'School Ranks', value: 'School Ranks' },
                            { label: 'Zonal Ranks', value: 'Zonal Ranks' },
                            { label: 'District Ranks', value: 'District Ranks' },
                            { label: 'Province Ranks', value: 'Province Ranks' },
                            { label: 'Island Ranks', value: 'Island Ranks' },

                        ]}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        value={rankLevel}
                        onChange={item => setRankLevel(item.value)}
                    />
                </View>
            </View>

            {/* Header Row */}
            <View style={styles.headerRow}>
                <Text style={styles.headerList}>Photo</Text>
                <Text style={styles.headerList}>Name</Text>
                <Text style={styles.headerList}>Rank in class</Text>
            </View>

            {/* List */}
            <FlatList
                data={sampleData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center'
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        marginBottom: 5
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 8,
        marginBottom: 8,
        borderRadius: 12
    },
    userRow: {
        backgroundColor: '#FDCB6E'
    },
    photo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12
    },
    name: {
        flex: 1,
        fontWeight: '600'
    },
    userName: {
        fontWeight: 'bold'
    },
    rankWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    rank: {
        fontWeight: 'bold',
        marginRight: 5
    },
    container: {flex: 1, backgroundColor: '#F6F9FC', paddingTop: 50, paddingHorizontal: 20},
    headerList: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
    header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 50},
    headerTitle: {fontSize: 18, fontWeight: '600'},
    gradeBox: {display:"flex",marginBottom:20 },
    labelDropDown: { fontSize: 16, color: '#444', marginBottom: 8 },
    placeholderStyle: { fontSize: 16, color: '#888' },
    selectedTextStyle: { fontSize: 16, color: '#333' },
    iconStyle: { width: 20, height: 20 },
    classBox: { flex: 1 },
    inputBox: { backgroundColor: '#fff', padding: 12, borderRadius: 8, elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 },
    dropdown: {backgroundColor: 'transparent' },
});
