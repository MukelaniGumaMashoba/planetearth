import React from 'react';
import { Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, View } from 'react-native';

const Boarding2 = ({ navigation }) => {
    return (
        <View>
            {/* <Image source={require('../../assets/Onboarding/Board2.png')} style={styles.image} /> */}
            <View style={styles.container}>
                <Text style={styles.antext}>Discover Amazing Place</Text>
                <Text>You can now book pravite city tours with locals on the top go experience a new place like never before</Text>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Boarding3')}>
                    <Text style={styles.texts}>Next</Text>
                </TouchableOpacity>
                <Text style={styles.texts}>Skip for now</Text>
            </View>
        </View>
    )
}

export default Boarding2


const styles = StyleSheet.create({
    image: {
        borderRadius: 12,
        width: 360,
        height: 420,
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
