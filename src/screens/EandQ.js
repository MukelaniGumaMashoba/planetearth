import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import iconImage from '../../icons/equipment-icon.jpg';

const EquipmentForm = ({ onSubmit }) => {
  const [toolType, setToolType] = useState('');
  const [powerUsage, setPowerUsage] = useState('');
  const [hoursUsed, setHoursUsed] = useState('');
  const [carbonEmissions, setCarbonEmissions] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [tips, setTips] = useState([]);
  const navigation = useNavigation();
    const [isSaveButtonClicked, setIsSaveButtonClicked] = useState(false);

  const carbonEmissionFactor = 0.5;

 const emissionReductionTips = [
    'Upgrade to energy-efficient equipment and machinery.',
    'Implement a regular maintenance schedule to ensure optimal performance and reduce emissions.',
    'Optimize usage schedules to minimize idle time for machinery.',
    'Consider using renewable energy sources, such as solar or wind power, to operate equipment.',
    'Implement predictive maintenance techniques to prevent breakdowns and reduce downtime.',
    'Invest in electric or hybrid machinery to lower fuel consumption and emissions.',
    'Utilize advanced technology for real-time monitoring and control of machinery operations.',
    'Train employees to operate equipment efficiently and follow best practices for emission reduction.',
    'Implement a preventive maintenance program to identify and address potential issues before they become major problems.',
    'Install exhaust gas cleaning systems to reduce emissions from machinery exhausts.',
    'Explore the use of regenerative braking systems to recover energy from machinery in operation.',
    'Implement lean manufacturing principles to optimize machinery usage and reduce waste.',
    'Consider retrofitting older equipment with emission-reducing technology.',
    'Set emission reduction targets for machinery operation and regularly track progress.',
    'Collaborate with suppliers to source eco-friendly and energy-efficient machinery and equipment.'
];




  const resetForm = () => {
    setToolType('');
    setPowerUsage('');
    setHoursUsed('');
    setCarbonEmissions(null);
    setError(false);
    setErrorMessage('');
    setTips([]);

  };

  const submit = () => {
    if (toolType.trim() === '' || powerUsage.trim() === '' || hoursUsed.trim() === '') {
      setError(true);
      setErrorMessage('Please fill in all fields');
      setCarbonEmissions(null);
      return;
    }

    const powerInKilowatts = parseFloat(powerUsage) / 1000;
    const hours = parseFloat(hoursUsed);

    if (isNaN(powerInKilowatts) || isNaN(hours)) {
      setError(true);
      setErrorMessage('Please enter valid numbers');
      setCarbonEmissions(null);
      return;
    }

    const energyConsumed = powerInKilowatts * hours;
    const emissions = (energyConsumed * carbonEmissionFactor).toFixed(2);
    setCarbonEmissions(emissions + ' grams of CO2');

    if (emissions > 100) {
    
      setError(true);
      setErrorMessage('High carbon emissions! Consider the following tips to reduce emissions:');
      const shuffledTips = shuffleArray(emissionReductionTips);
      setTips(shuffledTips.slice(0, 3));
    } else {
      setError(false);
      setErrorMessage('');
      setTips([]);
    }

    const equipmentData = {
      toolType,
      powerUsage,
      hoursUsed,
      carbonEmissions: emissions + ' grams of CO2',
      tips,
    };

    onSubmit(equipmentData);
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

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backStyle} onPress={() => navigation.navigate('Calculator')}>
          </TouchableOpacity>
          <Image source={iconImage} style={styles.icon} />

          <Text style={styles.text}>Equipment And Machinery</Text>

          <TextInput
            style={styles.input}
            placeholder="Tool Type"
            value={toolType}
            onChangeText={(text) => setToolType(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Power Usage (Watts)"
            value={powerUsage}
            onChangeText={(text) => setPowerUsage(text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Hours Used"
            value={hoursUsed}
            onChangeText={(text) => setHoursUsed(text)}
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
              Carbon Emissions: {carbonEmissions}
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

export default EquipmentForm;


const colors = {
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
  resetButton: {
    width: 300,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: "lightgreen",
    width: 150,
    borderRadius: 90,
    padding: 10,
  },
  resetButtonText:{
    color:colors.white,
    fontSize:20,
  },
  icon: {
    top: -50,
    width: 140,
    height: 110,
  },
  text: {
    top: -50,
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.green,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
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
  },
  tipsText:{
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
