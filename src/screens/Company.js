import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, View, TextInput, StyleSheet, Text, Button, Alert, Image } from 'react-native';
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from '../../firebase';
import { UserContext } from '../../userCtxt';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

const App = ({ route }) => {
  const { params } = route;
  const { user } = useContext(UserContext);
  const [company, setCompany] = useState({ name: "", emissions: "", goal: "", id: null});
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")

  useEffect(() => {
    if (params?.id) {
      setCompany({
        name: params.name,
        goal: params.goal.toString(),
        id: params.id,
        emissions: params.emissions.toString()
      });
    }
  }, [params?.id]);

  const saveCompany = async () => {
    if (!company.name || !location || !company.emissions || !company.goal || !description) {
      Alert.alert("Invalid Inputs", "Please fill out all fields.");
      return;
    }
    if (company.id) {
      const docref = doc(db, "companies", company.id);
      await updateDoc(docref, {
        name: company.name,
        goal: parseInt(company.goal),
        emissions: parseInt(company.emissions),
      }).then(() => {
        Alert.alert("Updated", `${company.name} updated successfully.`);
      });
      return;
    }

    const docRef = await addDoc(collection(db, "companies"), {
      name: company.name,
      goal: parseInt(company.goal),
      emissions: parseInt(company.emissions),
      user: user.uid
    });

    if (docRef.id) {
      setCompany((prev) => ({ ...prev, id: docRef.id }));
      Alert.alert("Saved", `${company.name} created successfully.`);
    }
    if (!company) {
      Alert.alert("Invalid Inputs", "Enter missing fields information")
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/LogBack.jpg')} style={styles.backgroundImage} />

      <View style={styles.content}>
        <Ionicons name="business" size={64} color="green" style={styles.icon} />

        <Text style={styles.heading}>Company</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Company Name'
            value={company.name}
            onChangeText={(e) => {
              setCompany((prev) => ({ ...prev, name: e }));
            }}
          />
          <TextInput
            style={styles.input}
            placeholder='Company Discription'
            value={company.discription}
            onChangeText={(e) => {
              setDescription((prev) => ({ ...prev, discription: e }));
            }}
          />
          <TextInput
            style={styles.input}
            placeholder='Company Location'
            value={company.location}
            onChangeText={(e) => {
              setLocation((prev) => ({ ...prev, location: e }));
            }}
          />
          <TextInput
            value={company.goal}
            onChangeText={(e) => {
              setCompany((prev) => ({ ...prev, goal: e }))
            }}
            style={styles.input}
            keyboardType='number-pad'
            placeholder='Emission Goal'
          />
          <TextInput
            onChangeText={(e) => {
              setCompany((prev) => ({ ...prev, emissions: e }));
            }}
            value={company.emissions}
            style={styles.input}
            keyboardType='number-pad'
            placeholder='Current Emissions'
          />
          <Button title='Save' color='green' onPress={() => saveCompany()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  input: {
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 10,
  },
});

export default App;
