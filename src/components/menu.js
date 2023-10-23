import React from 'react';
import { Text, Image, StyleSheet, View, TouchableOpacity } from 'react-native';

export default function Menu({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Calculator")}>
                <Image source={require('../assets/calculator.png')} style={styles.image} />
                <Text style={styles.text}>Calculator</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Game")}>
                <Image source={require('../assets/game-console.png')} style={styles.image} />
                <Text style={styles.text}>Game</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("CostSaving")}>
                <Image source={require('../assets/piggy-bank.png')} style={styles.image} />
                <Text style={styles.text}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Settings")}>
                <Image source={require('../assets/settings.png')} style={styles.image} />
                <Text style={styles.text}>Settings</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20,
    },
    item: {
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'lightgreen',
        borderRadius: 12,
    },
    text: {
        marginTop: 5,
        fontSize: 12,
        textAlign: 'center',
    },
});
