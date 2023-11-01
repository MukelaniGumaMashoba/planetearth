import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import iconImage from '../../icons/waste-icon.jpg';

const WasteForm = ({ onSubmit }) => {
  const [wasteType, setWasteType] = useState('');
  const [wasteAmount, setWasteAmount] = useState('');
  const [disposalMethod, setDisposalMethod] = useState('');
  const [carbonEmissions, setCarbonEmissions] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [tips, setTips] = useState([]);
  const navigation = useNavigation();
   const [isSaveButtonClicked, setIsSaveButtonClicked] = useState(false);
  
  const carbonEmissionFactors = {
    plastic: {
      Landfill: 0.3,
      composting: 0.05,
      incineration: 0.18,
      recycling: 0.15,
      sewageTreatment: 0.001,
    },
    paper: {
      Landfill: 0.1,
      composting: 0.05,
      incineration: 0.17,
      recycling: 0.15,
      sewageTreatment: 0.001,
    },
    glass: {
      Landfill: 0.1,
      composting: 0.05,
      incineration: 0.8,
      recycling: 0.15,
      sewageTreatment: 0.001,
    },
    metal: {
      Landfill: 0.1,
      composting: 0.05,
      incineration: 0.16,
      recycling: 0.15,
      sewageTreatment: 0.001,
    },
    rubber: {
      Landfill: 0.1,
      composting: 0.05,
      incineration: 0.20,
      recycling: 0.15,
      sewageTreatment: 0.001,
    },
  };

  const resetForm = () => {
    setWasteType('');
    setWasteAmount('');
    setDisposalMethod('');
    setCarbonEmissions(null);
    setError(false);
    setErrorMessage('');
    setTips([]);
  };

  const submit = () => {
    if (!wasteType || !wasteAmount) {
      setError(true);
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const emissionsData = carbonEmissionFactors[wasteType.toLowerCase()];
    const emissionFactor = emissionsData && emissionsData[disposalMethod] ? emissionsData[disposalMethod] : 0;

    const amount = parseFloat(wasteAmount);

    if (isNaN(amount)) {
      setError(true);
      setErrorMessage('Please enter a valid waste amount.');
      return;
    }

    const carbonEmissionsResult = (amount * emissionFactor).toFixed(2);
    setCarbonEmissions(carbonEmissionsResult + ' kg CO2');

    if (carbonEmissionsResult > 0.1) {
      setError(true);
      setErrorMessage('High carbon emissions! Consider the following tips to reduce emissions:');
      const shuffledTips = shuffleArray(wasteReductionTips);
      setTips(shuffledTips.slice(0, 3));
    } else {
      setError(false);
      setTips([]);
    }

    const wasteData = {
      wasteType,
      wasteAmount,
      disposalMethod,
      carbonEmissions: carbonEmissionsResult + ' kg CO2',
      tips,
    };

    onSubmit(wasteData);

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
   

  const wasteReductionTips = [
    'Minimize waste by reducing packaging and choosing products with minimal packaging.',
    'Implement a waste sorting and recycling program within your organization.',
    'Reuse items such as office supplies and containers whenever possible.',
    'Purchase products made from recycled materials to close the recycling loop.',
    'Encourage employees to bring their own reusable coffee cups and water bottles.',
    'Set up composting bins for organic waste in your workplace.',
    'Donate or repurpose old equipment and materials instead of discarding them.',
    'Opt for digital documentation to reduce paper waste and printing.',
    'Work with suppliers to reduce excess packaging in shipments.',
    'Eliminate single-use plastic products in the workplace, such as utensils and straws.',
    'Implement a "zero-waste" goal for your organization to minimize landfill waste.',
    'Audit your waste production to identify areas for improvement and waste reduction.',
    'Encourage employees to repair and maintain office equipment rather than replacing it.',
    'Host waste reduction and recycling education sessions for your staff.',
    'Collaborate with local recycling and waste management facilities to improve sustainability.'
  ];

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backStyle} onPress={() => navigation.navigate('Calculator')}>
          </TouchableOpacity>
          <Image source={iconImage} style={styles.icon} />
          <Text style={styles.text}>Waste Management</Text>
          <Text style={styles.text}>Calculator</Text>
          <TextInput
            style={styles.input}
            placeholder="Amount of Waste (in kg)"
            value={wasteAmount}
            onChangeText={(text) => setWasteAmount(text)}
            keyboardType="numeric"
          />
          <View style={styles.border}>
            <Picker
              selectedValue={wasteType}
              onValueChange={(itemValue) => setWasteType(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Type of waste:" value="" style={styles.pickerIitem} />
              <Picker.Item label="Paper" value="paper" style={styles.pickerItem} />
              <Picker.Item label="Plastic" value="plastic" style={styles.pickerItem} />
              <Picker.Item label="Glass" value="glass" style={styles.pickerItem} />
              <Picker.Item label="Metal" value="metal" style={styles.pickerItem} />
              <Picker.Item label="Rubber" value="rubber" style={styles.pickerItem} />
            </Picker>
          </View>
          <View style={styles.border}>
            <Picker
              selectedValue={disposalMethod}
              onValueChange={(itemValue) => setDisposalMethod(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Disposal Method" value="" style={styles.pickerIitem} />
              <Picker.Item label="Landfill" value="landfill" style={styles.pickerItem} />
              <Picker.Item label="Recycling" value="recycling" style={styles.pickerItem} />
              <Picker.Item label="Incineration" value="incineration" style={styles.pickerItem} />
              <Picker.Item label="Composting" value="composting" style={styles.pickerItem} />
              <Picker.Item label="Sewage Treatment" value="sewageTreatment" style={styles.pickerItem} />
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
            <Text style={styles.resultText}>Carbon Emissions: {carbonEmissions}</Text>
          )}
          <TouchableOpacity style={styles.resetButton} onPress={resetForm}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WasteForm;

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
    height: 700,
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
  resetButtonText: {
    color: colors.white,
    fontSize: 20,
  },
  icon: {
    top: -55,
    width: 140,
    height: 110,
  },
  text: {
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
  pickerItem: {
    color: colors.green,
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 5,
  },
  pickerIitem: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
    marginHorizontal: 20,
  },
  resultText: {
    fontSize: 20,
    color: colors.green,
    marginTop: 20,
  },
  border: {
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 5,
    height: 60,
    marginBottom: 10,
  },
  picker: {
    width: 300,
    backgroundColor: colors.white,
    alignItems: 'center',
    color: 'black',
    fontSize: 18,
  },
  tipsText:{
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
