import React from 'react';
import { Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, View } from 'react-native';

const Boarding2 = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.page}>
            <Image source={require('../assets/splash2.jpg')} style={styles.backgroundImage} />
            <View style={styles.container}>
                <Text style={styles.antext}>Discover Amazing Skills</Text>
                <Text style={styles.description}>
                    You can use Planet Pulse to gain more news about global warning and also involve yourself in this news which is available in the application.
                </Text>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Boarding3')}>
                    <Text style={styles.texts}>Next</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.texts}>Skip for now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Boarding2;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    container: {
        backgroundColor: 'rgba(173, 216, 230, 0.5)', // Light blue with 50% transparency
        borderRadius: 23,
        padding: 23,
        margin: 12,
        alignItems: 'center',
    },
    antext: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
    },
    description: {
        textAlign: 'center',
    },
    btn: {
        backgroundColor: 'black',
        borderRadius: 23,
        margin: 12,
        padding: 13,
        justifyContent: 'center',
        alignItems: 'center',
    },
    texts: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
