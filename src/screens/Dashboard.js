import React, { useState } from 'react';
import Menu from '../components/menu';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity, ImageBackground, Image, Modal } from 'react-native';
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
  const [modalVisible, setModalVisible] = useState(false);

  const Open = () => {
    setModalVisible(true)
  }
  const Close = () => {
    setModalVisible(false)
  }

  return (
    <View style={styles.container}>

      <View style={styles.h1}>
      <Text style={styles.welcomeText}>PlanetPulse 🌍</Text>

      <TouchableOpacity style={styles.icon} onPress={()=>{navigation.navigate("Inbox")}}>
        <Icon name="notifications" color='green' size={26} />
      </TouchableOpacity>
      </View>

      <Text style={styles.txt}>Know What Is Happening Around You!</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <ImageBackground
          source={require('../assets/information.jpg')}
          style={styles.backgroundImage}
        >
          <Text style={styles.txt2}>Global Warming Alert: </Text>
          <Text style={styles.txt2}>Rising greenhouse gases are heating our planet, melting polar ice and threatening coastal cities.</Text>
        </ImageBackground>
        <ImageBackground
          source={require('../assets/globe.png')}
          style={styles.backgroundImage}
        >
          <Text style={styles.txt2}>Climate Crisis Warning:</Text>
          <Text style={styles.txt2}> Extreme weather events intensify as global temperatures soar, endangering communities worldwide.</Text>
        </ImageBackground>
        <ImageBackground
          source={require('../assets/information.jpg')}
          style={styles.backgroundImage}
        >
          <Text style={styles.txt2}>Global Warming Alert: </Text>
          <Text style={styles.txt2}>Rising greenhouse gases are heating our planet, melting polar ice and threatening coastal cities.</Text>
        </ImageBackground>
      </ScrollView>

      <View>
        <Text style={styles.menu}>Menu</Text>
        <Menu navigation={navigation} />
      </View>

      <View>
        <Text style={styles.news}>Trending News</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={Open}>
            <Image
              source={require('../assets/climate_change.jpg')}
              style={styles.top2}
            />
            <Text style={styles.txt3}>Climate Crisis Warning:</Text>
            {/* <Text style={styles.txt2}> Extreme weather events intensify as global temperatures soar, endangering communities worldwide.</Text> */}
          </TouchableOpacity>

          <TouchableOpacity onPress={Open}>
            <Image
              source={require('../assets/news.jpg')}
              style={styles.top2}
            />
            <Text style={styles.txt3}>Daily New To Keep you updated all times</Text>
            {/* <Text style={styles.txt2}> Extreme weather events intensify as global temperatures soar, endangering communities worldwide.</Text> */}
          </TouchableOpacity>

        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={Close}>
              <Text style={styles.btn}>Back</Text>
            </TouchableOpacity>

            <View style={styles.newContainer}>
              <News />
            </View>

          </View>
        </Modal>
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
    fontSize: 17,
    alignSelf: 'center',
    backgroundColor: '#dedcd7',
    paddingHorizontal: 160,
    paddingVertical: 10,
  },
  news: {
    fontWeight: 'bold',
    fontSize: 17,
    alignSelf: 'center',
    backgroundColor: '#dedcd7',
    paddingHorizontal: 120,
    paddingVertical: 10,
  },
  txt: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 5,
    backgroundColor: '#dedcd7',
    padding: 10,
  },
  backgroundImage: {
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
  h1: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 16, 
    marginTop: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 16,
  },
  modalContainer: {
    backgroundColor: 'grey',
    height: '100%'
  },
  btn: {
    backgroundColor: "lightgreen",
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 12,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  newContainer: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 20,
  }
});
