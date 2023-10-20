import React from 'react-native';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { auth, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const LogOption = () => {


const handleGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Error during Google authentication: ", error);
    }
}

    return (
        <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")} >
                <Image source={require('../assets/iconacebook.png')} style={styles.img} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleGoogle} >
                <Image source={require('../assets/icongoogle.png')} style={styles.img} />
            </TouchableOpacity>
        </View>
    )
}
export default LogOption


const styles = StyleSheet.create({
    img: {
        width: 65,
        height: 70,
        marginTop: 12,
        backgroundColor: 'lightblue',
        borderRadius: 12,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
})