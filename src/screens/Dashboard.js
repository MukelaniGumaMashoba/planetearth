import React from 'react';
import Menu from '../components/menu';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity, ImageBackground, Image } from 'react-native';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import News from '../components/news';

const Newspaper = () => {
  return (
    <View>
      <News />
    </View>
  );
}

export default function Dashboard({ navigation }) {
  return (
    <View style={styles.container}>

      <Text style={styles.welcomeText}>PlanetPulse</Text>

      <View style={styles.icon}>
        <Icon name="notifications" color='grey' size={26} />
      </View>


      <Text style={styles.txt}>Know What Happening Around You All The Time.!</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <ImageBackground
          source={require('../assets/information.jpg')}
          style={styles.backgroundImage}
        >
          <TouchableOpacity style={styles.top}>
            <Text style={styles.txt2}>Global Warming Alert: </Text>
            <Text style={styles.txt2}>Rising greenhouse gases are heating our planet, melting polar ice and threatening coastal cities.</Text>
          </TouchableOpacity>
        </ImageBackground>
        <ImageBackground
          source={require('../assets/globe.png')}
          style={styles.backgroundImage}
        >
          <TouchableOpacity style={styles.top}>
            <Text style={styles.txt2}>Climate Crisis Warning:</Text>
            <Text style={styles.txt2}> Extreme weather events intensify as global temperatures soar, endangering communities worldwide.</Text>
          </TouchableOpacity>
        </ImageBackground>
      </ScrollView>

      <View>
        <Text style={styles.menu}>Menu</Text>
        <Menu />
      </View>

      <View>
        <Text style={styles.menu}>Trending News</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={() => navigation.navigate('News')}>
            <Image
              source={require('../assets/climate_change.jpg')}
              style={styles.top2}
            />
            <Text style={styles.txt3}>Climate Crisis Warning:</Text>
            {/* <Text style={styles.txt2}> Extreme weather events intensify as global temperatures soar, endangering communities worldwide.</Text> */}
          </TouchableOpacity>

          <TouchableOpacity onPress={Newspaper}>
            <Image
              source={require('../assets/news.jpg')}
              style={styles.top2}
            />
            <Text style={styles.txt3}>Daily New To Keep you updated all times</Text>
            {/* <Text style={styles.txt2}> Extreme weather events intensify as global temperatures soar, endangering communities worldwide.</Text> */}
          </TouchableOpacity>

        </ScrollView>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 15,
    height: '100%',
    width: '100%'
  },
  menu: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  txt: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  backgroundImage: {
    // flex: 1,
    // borderRadius: 12,
    // resizeMode: 'cover',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginRight: 15,
    marginBottom: 15,
    borderColor: 'lightgreen',
    borderWidth: 2,
    width: 250,
    height: 160,
  },
  txt2: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  txt3: {
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
  },
  top2: {
    borderRadius: 12,
    width: 250,
    height: 153,
    marginBottom: 23,
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderColor: 'lightgreen',
    borderWidth: 2,
    padding: 15,
  },
  icon: {
    alignItems: 'flex-end',
    margin: 12,
  }
});
