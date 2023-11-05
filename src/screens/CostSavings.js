import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  Modal,
  ImageBackground,
} from "react-native";
import { Ozow } from "react-native-ozow";
import { UserContext } from "../../userCtxt";
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons for the back button
import { useNavigation } from "@react-navigation/native";

export default CostSavings = ({ navigation }) => {
  const n = useNavigation()
  const { user } = useContext(UserContext);
  // useState to handle values
  const [currentSpending, setCurrentSpending] = useState("");
  const [previousYearSpending, setPreviousYearSpending] = useState("");
  const [difference, setDifference] = useState("");
  const [savingsType, setSavingsType] = useState("");
  const [donationAmount, setDonationAmount] = useState(0);

  // Function to calculate the difference
  const calculateDifference = () => {
    if (currentSpending !== "" && previousYearSpending !== "") {
      const current = parseFloat(currentSpending); // Convert to float so we can have decimal figures
      const previous = parseFloat(previousYearSpending);
      const calculatedDifference = current - previous;
      setDifference(calculatedDifference.toFixed(2));

      if (calculatedDifference > 0) {
        setSavingsType("Cost Savings");
      } else if (calculatedDifference < 0) {
        setSavingsType("Negative Savings");
        setDonationAmount(0);
      } else {
        setSavingsType("");
        setDonationAmount(0);
      }
    } else {
      setDifference("");
      setSavingsType("");
      setDonationAmount(0);
    }
  };

  // Calculate the amount of donations
  const handleDonation = (percentage) => {
    const donation = (parseFloat(difference) * (percentage / 100)).toFixed(2); // Convert to float so we can have decimal figures
    setDonationAmount(donation);
    return donation;
  };

  const [success, setSuccess] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentData, setPaymentData] = useState({});

  useEffect(() => {
    if (success) {
      Alert.alert("Success", "Payment was successful", [
        {
          text: "Ok",
          onPress: () => setSuccess(false),
        },
      ]);
    }
  }, [success]);

  let onceOffPayment = {
    merchant_id: "10000100",
    merchant_key: "46f0cd694581a",
    amount: "60.00",
    item_name: "Donation",
    // return_url: "https://ulink.uj.ac.za/Default",
    // cancel_url: "https://ulink.uj.ac.za/Default",
    // notify_url: "https://ulink.uj.ac.za/Default",
    name_first: user.name,
    email_address: user.email,
  };

  let subscription = {
    subscription_type: 1,
    recurring_amount: "200.00",
    frequency: 3,
    cycles: 0,
  };

  function handleOnceOffPayment(amo) {
    setPaymentData({
      ...onceOffPayment,
      amount: handleDonation(amo) || onceOffPayment.amount,
    });
    setModalVisible(true);
  }

  function handleSubscriptionPayment() {
    setPaymentData({ ...onceOffPayment, ...subscription });
    setModalVisible(true);
  }

  const handleResponse = async (response) => {
    if (response === true) {
      // Payment was successful
      Alert.alert("Success", "Payment was successful", [
        {
          text: "Ok",
          onPress: () => setSuccess(false),
        },
      ]);
    }
  };

  return (
    <ImageBackground source={require('../assets/LogBack.jpg')} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Cost Savings</Text>
      </View>
      <Text style={styles.title}>Planet Pulse Saving 🌍</Text>
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
          {/* Display the amount in red if it's negative */}
        </View>
        <Button
          title="Calculate Difference"
          onPress={calculateDifference}
          color="green"
        />
        {difference !== "" && (
          <Text
            style={[
              styles.result,
              { color: difference < 0 ? "red" : "green" }, {/* Change text color to green */}
            ]}
          >
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
            onPress={() => handleOnceOffPayment(5)}
          >
            <Text style={styles.buttonText}>Donate 5%</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.donationButton}
            onPress={() => handleOnceOffPayment(7)}
          >
            <Text style={styles.buttonText}>Donate 7%</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.donationButton}
            onPress={() => handleOnceOffPayment(10)}
          >
            <Text style={styles.buttonText}>Donate 10%</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Ozow
          data={{
            SiteCode: "IPR-IPR-003",
            Amount: paymentData.amount,
            Currency: "ZAR",
            CountryCode: "ZA",
            TransactionReference: "1234567",
            BankReference: "123456",
            CancelUrl: "https://www.ozow.com",
            ErrorUrl: "https://www.ozow.com",
            SuccessUrl: "https://www.ozow.com",
            NotifyUrl: "https://www.ozow.com",
            IsTest: false
          }}
          privateKey="f276b028558946308361979e4bf88ffa"
          onErrorMessage={(erro) => {
            console.log(erro);
          }}
          onPaymentCancel={(data) => {
            console.log(data);
            n.goBack()
          }}
          onPaymentSuccess={(data) => {
            console.log(data);
            n.navigation("CostSavings")
            setModalVisible(!modalVisible);
          }}
        />
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // 50% transparent background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    color: 'black',
  },
  form: {
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)", // 70% transparent white background
    borderRadius: 10,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  label: {
    flex: 6,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  input: {
    flex: 2,
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: "#F5F5F5",
    paddingRight: 40,
  },
  result: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 25,
    color: "green",
  },
  donationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  donationButton: {
    backgroundColor: "green", // Change button color to green
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    marginRight: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  donationResult: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    color: "green",
  },
  btnWrapper: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    margin: 10,
  },
});
