import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const iconImage = require('../../icons/energy-icon.jpg');

const BuildingForm  = ({ onSubmit}) => {
  const [buildingType, setBuildingType] = useState('');
  const [monthlyPowerUsage, setMonthlyPowerUsage] = useState('');
  const [buildingSize, setBuildingSize] = useState('');
  const [carbonEmissions, setCarbonEmissions] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [tips, setTips] = useState([]);
  const navigation = useNavigation();
  const [isSaveButtonClicked, setIsSaveButtonClicked] = useState(false);

  

  const emissionReductionTips = [
    'Upgrade to energy-efficient LED lighting throughout the building.',
    'Improve insulation and weatherproof windows and doors to reduce heat loss.',
    'Install solar panels or utilize green energy sources for the building.',
    'Implement a comprehensive recycling program for paper, plastic, and other materials.',
    'Replace old, energy-wasting appliances and HVAC systems with energy-efficient models.',
    'Encourage telecommuting or remote work to reduce employee commuting emissions.',
    'Set up a carpooling program for employees to share rides to work.',
    'Use motion sensors and smart thermostats to optimize energy usage in the building.',
    'Reduce water consumption by fixing leaks and installing low-flow fixtures in restrooms.',
    'Encourage employees to power down computers and equipment when not in use.',
    'Minimize single-use plastics in the office by providing reusable alternatives.',
    'Implement a paperless office policy to reduce paper and ink waste.',
    'Support local and sustainable catering options for office events and meals.',
    'Promote sustainability and eco-friendly practices among employees through training and awareness programs.',
    'Invest in green infrastructure, such as green roofs or rainwater harvesting, to reduce environmental impact.'
  ];
  const carbonEmissionFactors = {
    commercial: 0.4,
    industrial: 0.6,
    other:0.3,
    office: 0.2,
  };

  const resetForm = () => {
    setBuildingType('');
    setMonthlyPowerUsage('');
    setBuildingSize('');
    setCarbonEmissions(null);
    setError(false);
    setErrorMessage('');
    setTips([]);
  };

  const submit = () => {
    const emissionFactor = carbonEmissionFactors[buildingType.toLowerCase()] || 0.4;
    const monthlyUsage = parseFloat(monthlyPowerUsage);
    const size = parseFloat(buildingSize);

    if (isNaN(monthlyUsage) || isNaN(size)) {
      setError(true);
      setErrorMessage('Please enter valid numbers');
      setCarbonEmissions(null);
      setTips([]); 
      return;
    }

    const carbonEmissionsResult = (monthlyUsage * emissionFactor * size).toFixed(2);
    setCarbonEmissions(carbonEmissionsResult + ' kg CO2');

    if (carbonEmissionsResult > 5000) {
      setError(true);
      setErrorMessage('High carbon emissions! Consider the following tips to reduce emissions:');
      const shuffledTips = shuffleArray(emissionReductionTips);
      setTips(shuffledTips.slice(0, 3));
    } else {
      setError(false);
      setErrorMessage('');
      setTips([]);
    }

    const energyData = {
      buildingType,
      monthlyPowerUsage,
      buildingSize,
      carbonEmissions: carbonEmissionsResult + ' kg CO2',
      tips, 
    };

    onSubmit(energyData);

     
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Calculator')}>
          </TouchableOpacity>
          <Image source={iconImage} style={styles.icon} />
          <Text style={styles.title}>Energy Usage Calculator</Text>
          <View style={styles.border}>
            <Picker
              selectedValue={buildingType}
              onValueChange={(itemValue) => setBuildingType(itemValue)}
              style={styles.picker}>
              <Picker.Item label="Select Building Type:" value="" style={styles.pickerIitem} />
              <Picker.Item label="Commercial" value="commercial" style={styles.pickerItem} />
              <Picker.Item label="Industrial" value="industrial" style={styles.pickerItem} />
              <Picker.Item label="Office" value="ffice" style={styles.pickerItem} />
              <Picker.Item label="Other..." value="other" style={styles.pickerItem} />
            </Picker>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Monthly Power Usage (kWh):"
            value={monthlyPowerUsage}
            onChangeText={(text) => setMonthlyPowerUsage(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Building Size (m²):"
            value={buildingSize}
            onChangeText={(text) => setBuildingSize(text)}
            keyboardType="numeric"
          />

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
              For {buildingType} the Carbon Emission: {carbonEmissions}
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

export const colors = {
  green: '#4CAF50',
  white: '#FFFFFF',
};

export const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: 700,
  },
  savetipText:{
     color:colors.green,
     fontSize:15,
  },
  tipsText:{
    marginHorizontal: 20,
    marginVertical: 10,
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
 
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    borderRadius: 9,
    padding: 10,
    width: 70,
    height: 40,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: colors.green,
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    top: -55,
    width: 140,
    height: 110,
  },
  title: {
    top: -55,
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
  resetButton: {
    width: 300,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: "lightgreen",
    width: 150,
    borderRadius: 90,
    padding: 10,
  },
  resetButtonText: {
    color: colors.white,
    fontSize: 20,
  },
  errorText: {
    color: 'red',
  },
});

export default BuildingForm;
