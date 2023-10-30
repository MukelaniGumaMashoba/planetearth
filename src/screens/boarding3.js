import React from 'react';
import { Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, View } from 'react-native';

const Boarding3 = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.page}>
            <Image
                source={require('../assets/splash4.jpg')}
                style={styles.backgroundImage}
            />
            <View style={styles.container}>
                <Text style={styles.antext}>Help Planet Earth</Text>
                <Text style={styles.description}>
                    Help Us Change the world and be able to achieve good together. Let's minimize Global Warming.
                </Text>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.texts}>Get Started</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.texts}>Skip for now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Boarding3;

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
        backgroundColor: 'rgba(173, 216, 230, 0.5)', // 50% transparent lightblue
        borderRadius: 23,
        padding: 23,
        width: '80%',
        alignItems: 'center',
    },
    antext: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        textAlign: 'center',
        marginBottom: 20,
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
