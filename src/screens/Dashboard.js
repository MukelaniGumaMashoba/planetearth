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

      <Text style={styles.welcomeText}>PlanetPulse</Text>

      <TouchableOpacity style={styles.icon} onPress={()=>{navigation.navigate("Inbox")}}>
        <Icon name="notifications" color='grey' size={26} />
      </TouchableOpacity>


      <Text style={styles.txt}>Know What Happening Around You All The Time.!</Text>
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
      </ScrollView>

      <View>
        <Text style={styles.menu}>Menu</Text>
        <Menu navigation={navigation} />
      </View>

      <View>
        <Text style={styles.menu}>Trending News</Text>
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
    fontSize: 16,
  },
  txt: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
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
  icon: {
    alignItems: 'flex-end',
    margin: 12,
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
