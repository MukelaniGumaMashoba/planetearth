import React from 'react';
import { Text, Image, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';

export default function Menu({ navigation }) {
    return (
        <ScrollView>
        <View style={styles.container}>
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Calculator")}>
                <Image source={require('../assets/budget.png')} style={styles.image} />
                <Text style={styles.text}>Calculator</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Game")}>
                <Image source={require('../assets/game-folder.png')} style={styles.image} />
                <Text style={styles.text}>Game</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("CostSavings")}>
                <Image source={require('../assets/money.png')} style={styles.image} />
                <Text style={styles.text}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Account")}>
                <Image source={require('../assets/settings.png')} style={styles.image} />
                <Text style={styles.text}>Settings</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
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
    },
    text: {
        marginTop: 5,
        fontSize: 13,
        textAlign: 'center',
    },
});
