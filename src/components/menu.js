import React from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';

export default function Menu( { navigation } ) {
    return (
        <View>
            <TouchableOpacity onPress={()=>navigation.navigate("Calculator")}>
                <Image source={require('../assets/calculator.png')} style={styles.image} /></TouchableOpacity>
            
            <TouchableOpacity onPress={()=>navigation.navigate("Game")}>
                <Image source={require('../assets/game-console.png')} style={styles.image} />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate("CostSaving")}>
                <Image source={require('../assets/piggy-bank.png')} style={styles.image} />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>navigation.navigate("Settings")}> 
                <Image source={require('../assets/settings.png')} style={styles.image} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 80,
        height: 80,
        marginBottom: 30,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
