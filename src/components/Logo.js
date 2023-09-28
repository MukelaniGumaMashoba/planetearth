import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function Logo() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/Logo.jpg')} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 145,
    height: 150,
    borderRadius: 20,
    resizeMode: 'contain',
    marginBottom: 20, 
  },
});
