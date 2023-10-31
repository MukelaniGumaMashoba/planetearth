import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import iconImage from '../icons/Vehicle-icon.jpg';

const VehicleForm = ({ onSubmit }) => {
  const [distance, setDistance] = useState('');
  const [fuelEfficiency, setFuelEfficiency] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [carbonEmissions, setCarbonEmissions] = useState(null);
  const [vehicleType, setVehicleType] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [tips, setTips] = useState([]);
  const navigation = useNavigation();
  const [isSaveButtonClicked, setIsSaveButtonClicked] = useState(false);

  const submit = () => {
    if (!distance || !fuelEfficiency || !vehicleName || !vehicleType) {
      setError(true);
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const emissions =
      (distance / fuelEfficiency) * getEmissionFactor(fuelType, vehicleType);
    setCarbonEmissions(emissions.toFixed(0));

    if (emissions > 100) {
      setError(true);
      setErrorMessage('High carbon emissions! Consider the following tips to reduce emissions:');
      setTips(emissionReductionTips);
      const shuffledTips = shuffleArray(emissionReductionTips);
      setTips(shuffledTips.slice(0, 3));
    } else {
      setError(false);
      setErrorMessage('');
      setTips([]);
    }

    const vehicleData = {
      distance,
      fuelEfficiency,
      fuelType,
      vehicleName,
      vehicleType,
      carbonEmissions: emissions.toFixed(0) + ' kg CO2',
      tips,
    };

    onSubmit(vehicleData);
  };

    const handlePress = () => {
    if (letter === 'Save Tips') {
      setLetter('Saved');
    } else {
      setLetter('Save Tips');
    }
  };
  
   const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const resetForm = () => {
    setDistance('');
    setFuelEfficiency('');
    setFuelType('');
    setVehicleName('');
    setCarbonEmissions(null);
    setVehicleType('');
    setError(false);
    setErrorMessage('');
    setTips([]);
    setLetter('Calculate');
  };

  const getEmissionFactor = (fuelType, vehicleType) => {
    const emissionFactors = {
      electric: {
        sedan: 0.0,
        SUV: 0.0,
        bus: 0.0,
        motorcycle: 0.0,
        truck: 0.0,
        train: 0.0,
      },
      gasoline: {
        sedan: 2.3,
        SUV: 2.8,
        bus: 3.0,
        motorcycle: 1.5,
        truck: 4.0,
        train: 0.2,
      },
      diesel: {
        sedan: 2.7,
        SUV: 3.0,
        bus: 3.5,
        motorcycle: 2.2,
        truck: 6.0,
        train: 0.3,
      },
    };

    const factor = emissionFactors[fuelType] && emissionFactors[fuelType][vehicleType];

    return factor || 2.3;
  };

  const emissionReductionTips = [
    'Use energy-efficient vehicles, such as hybrids or electric cars.',
    'Implement regular vehicle maintenance to ensure optimal performance and reduce emissions.',
    'Optimize driving schedules to reduce idle time and fuel consumption.',
    'Consider using renewable energy sources, such as electric charging stations, to power vehicles.',
    'Encourage carpooling among employees to reduce the number of vehicles on the road.',
    'Promote telecommuting and remote work to reduce the need for daily commuting.',
    'Implement a fleet management system to track and optimize vehicle usage.',
    'Offer incentives for employees who choose eco-friendly commuting options, such as biking or public transportation.',
    'Introduce a vehicle sharing program to reduce the overall number of vehicles in use.',
    'Provide training on eco-friendly driving techniques to employees.',
    'Invest in fuel-efficient and low-emission vehicles for your company fleet.',
    'Utilize telematics systems to monitor and improve driving behavior and fuel efficiency.',
    'Explore alternative transportation options like electric scooters or bicycles for short trips.',
    'Set emission reduction targets for your company`s vehicle fleet and regularly monitor progress.',
    'Collaborate with suppliers to source eco-friendly and fuel-efficient vehicles for your company.'
];


  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backStyle} onPress={() => navigation.navigate('Calculator')}>
            <Text style={styles.buttonText}>BACK</Text>
          </TouchableOpacity>
          <Image source={iconImage} style={styles.icon} />
          <Text style={styles.text}>Vehicle Calculator</Text>
          <TextInput
            style={styles.input}
            placeholder="Vehicle Name:"
            value={vehicleName}
            onChangeText={(text) => setVehicleName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Distance (in km):"
            keyboardType="numeric"
            value={distance}
            onChangeText={(text) => setDistance(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Fuel Efficiency (km/l):"
            keyboardType="numeric"
            value={fuelEfficiency}
            onChangeText={(text) => setFuelEfficiency(text)}
          />
          <View style={styles.border}>
            <Picker
              selectedValue={vehicleType}
              onValueChange={(itemValue) => setVehicleType(itemValue)}
              style={styles.picker}>
              <Picker.Item label="Select Vehicle Type:" value="" style={styles.pickerIitem} />
              <Picker.Item label="Sedan" value="sedan" style={styles.pickerItem} />
              <Picker.Item label="SUV" value="SUV" style={styles.pickerItem} />
              <Picker.Item label="Bus" value="bus" style={styles.pickerItem} />
              <Picker.Item label="Motorcycle" value="motorcycle" style={styles.pickerItem} />
              <Picker.Item label="Truck" value="truck" style={styles.pickerItem} />
              <Picker.Item label="Train" value="train" style={styles.pickerItem} />
            </Picker>
          </View>
          <View style={styles.border}>
            <Picker
              selectedValue={fuelType}
              onValueChange={(itemValue) => setFuelType(itemValue)}
              style={styles.picker}>
              <Picker.Item label="Select Fuel Type:" value="" style={styles.pickerIitem} />
              <Picker.Item label="Electric" value="electric" style={styles.pickerItem} />
              <Picker.Item label="Gasoline" value="gasoline" style={styles.pickerItem} />
              <Picker.Item label="Diesel" value="diesel" style={styles.pickerItem} />
            </Picker>
          </View>
          {error && (
            <>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </>
          )}

         {tips.length > 0 && (
      <>
        <Text style={styles.tipsText}>
          {tips.map((tip, index) => `${index + 1}. ${tip}`).join('\n')}
        </Text>
        <TouchableOpacity
 
  onPress={() => {
    setIsSaveButtonClicked(true);
    submit();
  }}
>
  <Text  style={[
    styles.savetipText,
    {
      color: isSaveButtonClicked ? colors.white : colors.green,
    }
  ]}>Save Tip</Text>
</TouchableOpacity>

            </>
          )}

           <TouchableOpacity
      style={styles.submitButton}
   onPress={() => {submit(); submit(); }}>
      <Text style={styles.submitButtonText}>Calculate</Text>
    </TouchableOpacity>
          {carbonEmissions !== null && (
            <Text style={styles.resultText}>
              Carbon Emissions: {carbonEmissions} kg CO2
            </Text>
          )}
          <TouchableOpacity style={styles.resetButton} onPress={resetForm}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VehicleForm;



export const colors = {
  green: '#4CAF50',
  white: '#FFFFFF',
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    height:700,
  },
  backStyle: {
    position: 'absolute',
    top: 10,
    left: 10,
    borderRadius: 9,
    padding: 10,
    width: 70,
    height: 40,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: colors.green,
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    top:-25,
    width: 140,
    height: 110,
  },
  text: {
    top:-25,
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.green,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: 300,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: colors.green,
    borderRadius: 90,
    padding: 10,
    width: 150,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 20,
    color: colors.green,
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  },
  resetButton: {
    width: 300,
    alignItems: 'center',
    marginTop: 10,
  },
  resetButtonText:{
    color:colors.green,
    fontSize:20,
  },
  pickerItem: {
    borderRadius: 5,
    borderColor: colors.green,
    borderWidth: 1,
    color: colors.green,
    fontSize: 18,
    fontWeight: 'bold',
  },
   pickerIitem: {
     
    color: 'gray',
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 5,
  },
  border:{
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 5,
    height:60,
    marginBottom: 10,
  
  },
  picker: {
    width: 300,
    backgroundColor: colors.white,
    alignItems: 'center',
    color: 'black',
    fontSize: 18,
  },
});

