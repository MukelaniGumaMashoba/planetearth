import React from 'react';
import Menu from '../components/menu';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';

export default function Dashboard({ navigation }) {
  return (
    <View style={styles.container}>

      <Text style={styles.welcomeText}>PlanetPulse</Text>
      <Text style={styles.txt}>Know What Happening Around You All The Time.!</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.top}>
          <Text>Globalization</Text>
          <Text>Explore more about Globalization in this application and find ways to save...</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.top}>
          <Text>Globalization</Text>
          <Text>Explore more about Globalization in this application and find ways to save...</Text>
        </TouchableOpacity>
      </ScrollView>

      <View>
        <Text style={styles.menu}>Menu</Text>
        <Menu />
      </View>

      <View>
        <Text style={styles.menu}>Recommended</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
    textAlign: 'center',
  },
  loggedInText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
  top: {
    borderRadius: 12,
    backgroundColor: 'purple',
    width: 240,
    height: 130,
    marginBottom: 23,
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  txt: {
    fontSize : 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
