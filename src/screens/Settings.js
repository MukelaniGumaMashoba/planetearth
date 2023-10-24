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
} from "react-native";
import { Ozow } from "react-native-ozow"
import { UserContext } from "../../userCtxt";


export const Settings = ({ navigation }) => {
  const { user } = useContext(UserContext);
  //useStates to handle values
  const [currentSpending, setCurrentSpending] = useState("");
  const [previousYearSpending, setPreviousYearSpending] = useState("");
  const [difference, setDifference] = useState("");
  const [savingsType, setSavingsType] = useState("");
  const [donationAmount, setDonationAmount] = useState(0);

  //Function to calculate thr diffrence
  const calculateDifference = () => {
    if (currentSpending !== "" && previousYearSpending !== "") {
      const current = parseFloat(currentSpending); //convert yo float so we can have decima figures
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

  //Calculate the amount of donations
  const handleDonation = (percentage) => {
    const donation = (parseFloat(difference) * (percentage / 100)).toFixed(2); //convert yo float so we can have decima figures
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
      // payment was successful
      Alert.alert("Success", "Payment was successful", [
        {
          text: "Ok",
          onPress: () => setSuccess(false),
        },
      ]);
    }
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
        <Button
          title="Calculate Difference"
          onPress={calculateDifference}
          color="#007AFF"
        />
        {difference !== "" && (
          <Text
            style={[
              styles.result,
              { color: difference < 0 ? "red" : "#007AFF" },
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
          }}
          onPaymentSuccess={(data) => {
            console.log(data);
            setModalVisible(!modalVisible);
          }}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    padding: 20,
    backgroundColor: "#FFFFFF",
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
    color: "#007AFF",
  },
  donationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  donationButton: {
    backgroundColor: "#007AFF",
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