import React from 'react';
import { Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, View } from 'react-native';

const Boarding3 = ({ navigation }) => {
    return (
        <View>
            {/* <Image source={require('../../assets/Onboarding/Board3.png')} style={styles.image} /> */}
            <View style={styles.container}>
                <Text style={styles.antext}>Share Your Adventures</Text>
                <Text>Enjoy your holiday! don't forget to take a photo and share to the world</Text>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.texts}>Get Started</Text>
                </TouchableOpacity>
                <Text style={styles.texts}>Skip for now</Text>
            </View>
        </View>
    )
}

export default Boarding3


const styles = StyleSheet.create({
    image: {
        borderRadius: 12,
        width: 360,
        height: 450,
        marginBottom: 20,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',

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
        textAlign: 'center'
    },
    container: {
        backgroundColor: 'grey',
        borderRadius: 23,
        padding: 23,
        margin: 12,
    },
    antext: {
        fontWeight:'bold',
        fontSize: 22,
        textAlign: 'center'
    }
})
