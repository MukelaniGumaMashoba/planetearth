import React from 'react';
import { Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, View } from 'react-native';

const Boarding1 = ({ navigation }) => {
    return (
        <View>
            <Image source={require('../assets/splash2.jpg')} style={styles.image} />
            <View style={styles.container}>
                <Text style={styles.antext}>Book a Local</Text>
                <Text>You can now book pravite city tours with locals on the top go experience a new place like never before</Text>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Boarding2')}>
                    <Text style={styles.texts}>Allow Notifications</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.texts}>Skip for now</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Boarding1


const styles = StyleSheet.create({
    image: {
        borderRadius: 12,
        width: 338,
        height: 450,
        marginBottom: 20,
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
