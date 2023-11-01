import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ImageBackground, View, StyleSheet } from 'react-native'; // Import ImageBackground and StyleSheet
import WasteForm from '../screens/WasteManagement';
import VehicleForm from '../screens/Vehicle';
import BuildingForm from '../screens/EnergyUsage';
import MainApp from '../screens/Main';
import Report from '../screens/Report';
import EquipmentForm from '../screens/EandQ';
import LogBack from '../assets/LogBack.jpg';

const Stack = createStackNavigator();

function App() {
  const [vehicleData, setVehicleData] = useState({
    distance: '',
    fuelEfficiency: '',
    fuelType: '',
    vehicleName: '',
    carbonEmissions: null,
    vehicleType: '',
  });
  const handleVehicleDataSubmit = (data) => {
    setVehicleData(data);
  };

  const [equipmentData, setEquipmentData] = useState({
    toolType: '',
    powerUsage: '',
    hoursUsed: '',
    carbonEmissions: null,
  });
  const handleEquipmentDataSubmit = (data) => {
    setEquipmentData(data);
  };

  const [energyData, setEnergyData] = useState({
    buildingType: '',
    monthlyPowerUsage: '',
    buildingSize: '',
    carbonEmissions: null,
  });
  const handleFormDataSubmit = (energyData) => {
    setEnergyData(energyData);
  };

  const [wasteData, setWasteData] = useState({
    wasteType: '',
    wasteAmount: '',
    disposalMethod: '',
    carbonEmissions: null,
  });
  const handleWasteDataSubmit = (wasteData) => {
    setWasteData(wasteData);
  };
  
  return (
    <ImageBackground source={LogBack} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name="Calculator" component={MainApp} />

          <Stack.Screen name="Energy Usage" options={{ title: 'Building Form' }}>
            {() => <BuildingForm onSubmit={handleFormDataSubmit} />} 
          </Stack.Screen>

          <Stack.Screen name="Vehicle" options={{ title: 'Vehicle form' }}>
            {() => <VehicleForm onSubmit={handleVehicleDataSubmit} />} 
          </Stack.Screen>

          <Stack.Screen name="EandQ" options={{ title: 'EandQ' }}>
            {() => <EquipmentForm onSubmit={handleEquipmentDataSubmit} />} 
          </Stack.Screen>

          <Stack.Screen name="Waste Management" options={{ title: 'Waste Management' }}>
            {() => <WasteForm onSubmit={handleWasteDataSubmit} />} 
          </Stack.Screen>

          <Stack.Screen name="Report" >
            {() => <Report energyData={energyData} wasteData={wasteData} equipmentData={equipmentData} vehicleData={vehicleData}  />}
          </Stack.Screen>
        </Stack.Navigator>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
});

export default App;
