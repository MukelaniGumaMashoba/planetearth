import React from 'react-native';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';

const LogOption = () => {
    return (
        <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")} >
                <Image source={require('../assets/iconacebook.png')} style={styles.img}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Home")} >
                <Image source={require('../assets/icongoogle.png')} style={styles.img}/>
            </TouchableOpacity>
        </View>
    )
}
export default LogOption


const styles = StyleSheet.create({
    img: {
        width : 65,
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