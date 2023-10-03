import React from 'react';
import { Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, View } from 'react-native';

const Boarding2 = ({ navigation }) => {
    return (
        <View style={styles.page}>
            <Image source={require('../assets/splash3.jpg')} style={styles.image} />
            <View style={styles.container}>
                <Text style={styles.antext}>Discover Amazing Skills</Text>
                <Text>You can use Planet Pulse to gain more news about glabal warnign and also involve your self in this news which are available in the application</Text>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Boarding3')}>
                    <Text style={styles.texts}>Next</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.texts}>Skip for now</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Boarding2



const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'black',
    },
    image: {
        borderRadius: 12,
        width: 338,
        height: 390,
        marginBottom: 60,
        marginTop: 25,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: 'black',
        borderColor: 'lightgreen',
        borderWidth: 2,
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