import React, {useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Animated} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from "expo-router";
import ScrollView = Animated.ScrollView;
import eventAPIController from "@/controllers/EventController";
import examAPIController from "@/controllers/ExamController";


export default function ALAdmissionDetailsScreen() {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black"/>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>A/L Admission</Text>
                <Ionicons name="notifications-outline" size={24} color="black"/>
            </View>

            {/*G.C.E. Examinations*/}
            <View style={styles.mainSection}>
                <View style={styles.subSection}>
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('ALAdmissionScreen')}
                    >
                        <Image source={require('@/assets/images/applications.png')} style={styles.cardImage}/>
                        <Text style={styles.cardText}>Apply to school for A/L</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('OLExamScheduleScreen')}
                    >
                        <Image source={require('@/assets/images/applications.png')} style={styles.cardImage}/>
                        <Text style={styles.cardText}>View applications status</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#F6F9FC', paddingTop: 50, paddingHorizontal: 20},
    header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 50},
    headerTitle: {fontSize: 18, fontWeight: '600'},
    mainSection: {flexDirection: 'column', justifyContent: 'space-between', marginBottom: 35},
    subSection: {flexDirection: 'row', alignItems: 'center'},
    headerSubTitle: {fontSize: 16, fontWeight: '600', marginBottom: 10},
    card: {
        flex: 1,
        margin: 5,
        height: 150,
        borderRadius: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    cardImage: {width: 60, height: 60, resizeMode: 'contain', marginBottom: 8},
    cardText: {fontSize: 12, textAlign: 'center', paddingHorizontal: 15},
    invisibleCard: {backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0}
});
