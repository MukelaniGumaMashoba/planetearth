import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../assets/Logo.jpg')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: "75%",
    height: 50,
    marginBottom: 50,
    justifyContent: "center",
    alignItems:"center",
  },
})