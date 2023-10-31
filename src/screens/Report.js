import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useNavigation } from '@react-navigation/native';
import iconImage from '../icons/icon.png';

const Report = ({
  energyData = {tips},
  wasteData = {tips},
  equipmentData = {tips},
  vehicleData = {tips},
}) => {
  const navigation = useNavigation();

  const generatePDF = async () => {
    const html = `
      <html>
        <body>
          <h1 style="text-align: center;">Energy Usage Report</h1>
          <p>Building Type: ${energyData.buildingType}</p>
          <p>Monthly Power Usage: ${energyData.monthlyPowerUsage}</p>
          <p>Building Size: ${energyData.buildingSize} m²</p>
          <p>Carbon Emissions: ${energyData.carbonEmissions || 'N/A'}</p>
          <h3>Energy Usage Tips:</h3>
          <ul>
            ${energyData.tips && energyData.tips.map((tip) => `<li>${tip}</li>`).join('')}
          </ul>

          <h1 style="text-align: center;">Waste Management Report</h1>
          <p>Waste Type: ${wasteData.wasteType}</p>
          <p>Waste Amount: ${wasteData.wasteAmount} kg</p>
          <p>Disposal Method: ${wasteData.disposalMethod}</p>
          <p>Carbon Emissions: ${wasteData.carbonEmissions || 'N/A'}</p>
          <h3>Waste Management Tips:</h3>
          <ul>
            ${wasteData.tips && wasteData.tips.map((tip) => `<li>${tip}</li>`).join('')}
          </ul>

          <h1 style="text-align: center;">Equipment and Machinery Report</h1>
          <p>Tool Type: ${equipmentData.toolType}</p>
          <p>Power Usage (Watts): ${equipmentData.powerUsage}</p>
          <p>Hours Used: ${equipmentData.hoursUsed} hours</p>
          <p>Carbon Emissions: ${equipmentData.carbonEmissions || 'N/A'}</p>
          <h3>Equipment and machinery Tips</h3>
          <ul>
            ${equipmentData.tips && equipmentData.tips.map((tip) => `<li>${tip}</li>`).join('')}
          </ul>

          <h1 style="text-align: center;">Vehicle Report</h1>
          <p>Distance (in km): ${vehicleData.distance}</p>
          <p>Fuel Efficiency (km/l): ${vehicleData.fuelEfficiency}</p>
          <p>Fuel Type: ${vehicleData.fuelType}</p>
          <p>Vehicle Name: ${vehicleData.vehicleName}</p>
          <p>Vehicle Type: ${vehicleData.vehicleType}</p>
          <p>Carbon Emissions: ${vehicleData.carbonEmissions || 'N/A'}</p>
          <h3>Vehicle  Tips:</h3>
          <ul>
            ${vehicleData.tips && vehicleData.tips.map((tip) => `<li>${tip}</li>`).join('')}
          </ul>
        </body>
      </html>
    `;

    const file = await Print.printToFileAsync({ html });

    if (file) {
      await Sharing.shareAsync(file.uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Calculator')}>
            <Text style={styles.buttonText}>BACK</Text>
          </TouchableOpacity>
          <Image source={iconImage} style={styles.logo} />

          <Text style={styles.reportTitle}>Energy Usage Report</Text>
          <Text style={styles.label}>Building Type:</Text>
          <Text style={styles.data}>{energyData.buildingType}</Text>
          <Text style={styles.label}>Monthly Power Usage:</Text>
          <Text style={styles.data}>{energyData.monthlyPowerUsage}</Text>
          <Text style={styles.label}>Building Size:</Text>
          <Text style={styles.data}>{energyData.buildingSize} m²</Text>
          <Text style={styles.label}>Carbon Emissions:</Text>
          <Text style={styles.data}>{energyData.carbonEmissions || 'N/A'}</Text>
          <Text style={styles.label}>Energy Usage Tips:</Text>
          {energyData.tips && energyData.tips.map((tip, index) => (
            <Text key={index} style={styles.data}>{tip}</Text>
          ))}

          <Text style={styles.reportTitle}>Waste Management Report</Text>
          <Text style={styles.label}>Waste Type:</Text>
          <Text style={styles.data}>{wasteData.wasteType}</Text>
          <Text style={styles.label}>Waste Amount:</Text>
          <Text style={styles.data}>{wasteData.wasteAmount} kg</Text>
          <Text style={styles.label}>Disposal Method:</Text>
          <Text style={styles.data}>{wasteData.disposalMethod}</Text>
          <Text style={styles.label}>Carbon Emissions:</Text>
          <Text style={styles.data}>{wasteData.carbonEmissions || 'N/A'}</Text>
          <Text style={styles.label}>Waste Management Tips:</Text>
          {wasteData.tips && wasteData.tips.map((tip, index) => (
            <Text key={index} style={styles.data}>{tip}</Text>
          ))}

          <Text style={styles.reportTitle}>Equipment and Machinery Report</Text>
          <Text style={styles.label}>Tool Type:</Text>
          <Text style={styles.data}>{equipmentData.toolType}</Text>
          <Text style={styles.label}>Power Usage (Watts):</Text>
          <Text style={styles.data}>{equipmentData.powerUsage}</Text>
          <Text style={styles.label}>Hours Used:</Text>
          <Text style={styles.data}>{equipmentData.hoursUsed} hours</Text>
          <Text style={styles.label}>Carbon Emissions:</Text>
          <Text style={styles.data}>{equipmentData.carbonEmissions || 'N/A'}</Text>
          <Text style={styles.label}>Equipment and machinery Tips:</Text>
          {equipmentData.tips && equipmentData.tips.map((tip, index) => (
            <Text key={index} style={styles.data}>{tip}</Text>
          ))}

          <Text style={styles.reportTitle}>Vehicle Report</Text>
          <Text style={styles.label}>Distance (in km):</Text>
          <Text style={styles.data}>{vehicleData.distance}</Text>
          <Text style={styles.label}>Fuel Efficiency (km/l):</Text>
          <Text style={styles.data}>{vehicleData.fuelEfficiency}</Text>
          <Text style={styles.label}>Fuel Type:</Text>
          <Text style={styles.data}>{vehicleData.fuelType}</Text>
          <Text style={styles.label}>Vehicle Name:</Text>
          <Text style={styles.data}>{vehicleData.vehicleName}</Text>
          <Text style={styles.label}>Vehicle Type:</Text>
          <Text style={styles.data}>{vehicleData.vehicleType}</Text>
          <Text style={styles.label}>Carbon Emissions:</Text>
          <Text style={styles.data}>{vehicleData.carbonEmissions || 'N/A'}</Text>
          <Text style={styles.label}>Vehicle Tips:</Text>
          {vehicleData.tips && vehicleData.tips.map((tip, index) => (
            <Text key={index} style={styles.data}>{tip}</Text>
          ))}

          <TouchableOpacity style={styles.exportButton} onPress={generatePDF}>
            <View style={styles.exportButtonContent}>
              <Image source={iconImage} style={styles.exportIcon} />
              <Text>Export</Text>
            </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  logo: {
    width: 180,
    height: 110,
    marginBottom: 20,
    alignSelf: 'center',
  },
  reportTitle: {
    color : colors.green,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 8,
    textAlign: 'center',
    textDecorationLine: 'underline',
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
  },
  buttonText: {
    color: colors.green,
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    color: 'black',
    fontSize: 18,
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
  data: {
    marginBottom: 3,
    color: colors.green,
  },
  exportButton: {
    backgroundColor: colors.green,
    borderRadius: 9,
    padding: 10,
    width: 100,
    height: 40,
    alignSelf: 'center',
    marginTop: 20,
  },
  exportButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exportIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});

export default Report;
