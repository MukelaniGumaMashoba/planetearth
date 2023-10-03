import React, { useEffect } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, StyleSheet, ProgressBarAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Boarding1');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={require('../assets/splash.jpg')}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Boarding1')}
          style={styles.logoContainer}
        >
          <Image source={require('../assets/Logo.jpg')} style={styles.logoImage} />
          <Text style={styles.logoText}>Welcome</Text>
        </TouchableOpacity>

        <ProgressBarAndroid styleAttr="Horizontal" />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoImage: {
    width: 150,
    height: 135,
    borderRadius: 30,
    marginBottom: 16,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default LoadingScreen;
