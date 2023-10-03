import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert } from 'react-native';

export const Settings = () => {

  //useStates to handle values
  const [currentSpending, setCurrentSpending] = useState('');
  const [previousYearSpending, setPreviousYearSpending] = useState('');
  const [difference, setDifference] = useState('');
  const [savingsType, setSavingsType] = useState('');
  const [donationAmount, setDonationAmount] = useState(0);

  //Function to calculate thr diffrence 
  const calculateDifference = () => {
    if (currentSpending !== '' && previousYearSpending !== '') {
      const current = parseFloat(currentSpending); //convert yo float so we can have decima figures
      const previous = parseFloat(previousYearSpending);
      const calculatedDifference = current - previous;
      setDifference(calculatedDifference.toFixed(2));

      if (calculatedDifference > 0) {
        setSavingsType('Cost Savings');
      } else if (calculatedDifference < 0) {
        setSavingsType('Negative Savings');
        setDonationAmount(0);
      } else {
        setSavingsType('');
        setDonationAmount(0);
      }
    } else {
      setDifference('');
      setSavingsType('');
      setDonationAmount(0);
    }
  };


  //Calculate the amount of donations 
  const handleDonation = (percentage) => {
    const donation = (parseFloat(difference) * (percentage / 100)).toFixed(2); //convert yo float so we can have decima figures
    setDonationAmount(donation);

    Alert.alert(
      `Donate ${percentage}%`,
      `You can donate: R${donation}`,
      [
        {
          text: 'No',
          onPress: () => console.log('Donation canceled'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            // Handle the donation payment process here (e.g., PayPal API).
            // This is where you would integrate the payment system.
            console.log(`Donating R${donation}`);
            // After successful payment, you can reset donationAmount to 0.
            setDonationAmount(0);
          },
        },
      ],
      { cancelable: false }
    );
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Planet Pulse Saving</Text>
      <View style={styles.form}>
        <View style={styles.row}>
          <Text style={styles.label}>Current Spending On Energy:</Text>
          <TextInput
            style={styles.input}
            placeholder="R (current)"
            keyboardType="numeric"
            value={currentSpending}
            onChangeText={(text) => setCurrentSpending(text)}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Previous Year Spending On Energy:</Text>
          <TextInput
            style={styles.input}
            placeholder="R (previous)"
            keyboardType="numeric"
            value={previousYearSpending}
            onChangeText={(text) => setPreviousYearSpending(text)}
          />
          {/* display the amount in red if its negative  */}
        </View>
        <Button title="Calculate Difference" onPress={calculateDifference} color="#007AFF" />
        {difference !== '' && (
          <Text style={[styles.result, { color: difference < 0 ? 'red' : '#007AFF' }]}>
            {savingsType}: R{Math.abs(difference)}
          </Text>
        )}
        {donationAmount > 0 && (
          <Text style={styles.donationResult}>
            You can donate: R{donationAmount}
          </Text>
        )}
        <View style={styles.donationButtons}>
          <TouchableOpacity
            style={styles.donationButton}
            onPress={() => handleDonation(5)}
          >
            <Text style={styles.buttonText}>Donate 5%</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.donationButton}
            onPress={() => handleDonation(7)}
          >
            <Text style={styles.buttonText}>Donate 7%</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.donationButton}
            onPress={() => handleDonation(10)}
          >
            <Text style={styles.buttonText}>Donate 10%</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  label: {
    flex: 6,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  input: {
    flex: 2,
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#F5F5F5',
    paddingRight: 40,
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 25,
    color: '#007AFF',
  },
  donationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  donationButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  donationResult: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'green',
  },
});
