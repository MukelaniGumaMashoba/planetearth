import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import iconImage from '../../icons/icon.png';

function IconButton({ text, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
      <View style={styles.buttonContent}>
        <Image source={icon} style={styles.buttonIcon} />
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

function MainApp({ navigation }) {

  const navigateToForm = (routeName) => {
    navigation.navigate(routeName);
  };

  return (
    <SafeAreaView style={styles.container} >
      <ScrollView showsHorizontalScrollIndicator={false}>
      {/* <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('')}>
            <Text style={styles.buttonText}>BACK</Text>
          </TouchableOpacity> */}
        <View >
          {/* <View style={styles.centeredContent}>
            <Image source={iconImage} style={styles.icon} />
          </View> */}
          <Text style={styles.text}>TOOLS</Text>
          <View style={styles.buttonContainer}>

            <IconButton  text="Energy Usage" icon={require('../../icons/energy-icon.jpg')} onPress={() => navigateToForm('Energy Usage')}/>
            <Text style={styles.texts1} onPress={() => navigateToForm('Energy Usage')}>Use This Tool To Calculate Emission Caused By Energy Power Used In A Work Place</Text><Text style={styles.arror1} onPress={() => navigateToForm('Energy Usage')}>:</Text>


            <IconButton text="Waste Management" icon={require('../../icons/waste-icon.jpg')} onPress={() => navigateToForm('Waste Management')} />
             <Text style={styles.texts2} onPress={() => navigateToForm('Waste Management')} >Use This Tool To Calculate Emission Caused By Waste In A Work Placehjbnmghn</Text><Text style={styles.arror2} onPress={() => navigateToForm('Waste Management')}>:</Text>
             

            <IconButton text="Equipment and Machinery" icon={require('../../icons/equipment-icon.jpg')} onPress={() => navigateToForm('EandQ')} />
            <Text style={styles.texts3} onPress={() => navigateToForm('EandQ')}>Use This Tool To Calculate Emission Caused By Equipment & Machinery In A Work Place</Text><Text style={styles.arror3} onPress={() => navigateToForm('EandQ')}>:</Text>


            <IconButton text="Vehicle" icon={require('../../icons/Vehicle-icon.jpg')} onPress={() => navigateToForm('Vehicle')} />
             <Text style={styles.texts4} onPress={() => navigateToForm('Vehicle')}>Use This Tool To Calculate Emission Caused By Vehicle Used In A Work Place</Text><Text style={styles.arror4}  onPress={() => navigateToForm('Vehicle')}>:</Text>


            <IconButton text="Report" icon={require('../../icons/download-icon.jpg')} onPress={() => navigateToForm('Report')} />
             <Text style={styles.texts5} onPress={() => navigateToForm('Report')} >Download Report Of The Calculated Emission </Text><Text style={styles.arror5} onPress={() => navigateToForm('Report')} >:</Text>


          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const colors = {
  green: '#4CAF50',
  white: '#FFFFFF',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,    
    backgroundColor: 'white',
  },
  icon: {
    left:95,
    width: 180,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  text: {
    left:145,
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonText: {
    color: colors.green,
    fontSize: 15,
    fontWeight: 'bold',
    },
  buttonStyle: {
    backgroundColor: '#f5f5f5',
    borderRadius: 22,
    padding: 10,
    width: 360,
    height: 90,
    marginTop: 5,
    borderColor: '#e5e4e2',
    borderWidth: 1,
  },
  buttonContent: {
    flexDirection: 'row',
  },
  texts1:{
    position:'absolute',
    top:37,
    left:92,
    color:'gray',
    fontSize:12,
    width: 180,
  },
  texts2:{
    position:'absolute',
    top:133,
    left:92,
    color:'gray',
    fontSize:12,
    width: 180,
  },
  texts3:{
    position:'absolute',
    top:230,
    left:92,
    color:'gray',
    fontSize:12,
    width: 180,
  },
  
  texts4:{
    position:'absolute',
    top:323,
    left:92,
    color:'gray',
    fontSize:12,
    width: 180,
  },
   texts5:{
    position:'absolute',
    top:420,
    left:98,
    color:'gray',
    fontSize:12,
    width: 180,
  },
  arror1:{
     position:'absolute',
    top:37,
    right: -49,
    color:colors.green,
    fontSize:25,
    width: 65,

  },
   arror2:{
     position:'absolute',
    top:133,
    right: -49,
    color:colors.green,
    fontSize:25,
    width: 65,

  },
   arror3:{
     position:'absolute',
    top:230,
   right: -49,
     color:colors.green,
    fontSize:25,
    width: 65,

  },
   arror4:{
     position:'absolute',
    top:323,
    right: -49,
     color:colors.green,
    fontSize:25,
    width: 65,

  },
   arror5:{
     position:'absolute',
    top:420,
    right: -49,
    color:colors.green,
    fontSize:25,
    width: 65,

  },
  buttonIcon: {
    top:-11,
    width: 85,
    height: 89,
    left:-10,
  },
});

export default MainApp;
