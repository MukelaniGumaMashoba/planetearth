import React from 'react';
import { Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, View } from 'react-native';

const Boarding3 = ({ navigation }) => {
    return (
        <View style={styles.page}>
            <Image source={require('../assets/splash4.jpg')} style={styles.image} />
            <View style={styles.container}>
                <Text style={styles.antext}>Help Planet Earth</Text>
                <Text>Help Us Change the world and be able to achieve good togther. Let Minimize Global Warming</Text>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.texts}>Get Started</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.texts}>Skip for now</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Boarding3



const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'black',
    },
    image: {
        borderRadius: 12,
        width: 338,
        height: 420,
        marginBottom: 55,
        marginTop: 25,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: 'black',
        borderColor: 'lightgreen',
        borderWidth: 1,
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
    container: {
        backgroundColor: 'lightgreen',
        borderRadius: 23,
        padding: 23,
        margin: 12,
    },
    antext: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center'
    }

})