import React from 'react';
import Menu from '../components/menu';
import { Text, View, StyleSheet } from 'react-native';

export default function Dashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome 💫</Text>
      <Text style={styles.loggedInText}>
        Congratulations, you are logged in.
      </Text>
      <Menu /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
  },
  loggedInText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
});
