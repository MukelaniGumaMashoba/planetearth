import { db } from '../../firebase';
import Score from '../components/Score';
import { UserContext } from '../../userCtxt';
import { Box, Progress, Text } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useContext, useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';


const AccountScreen = ({ navigation }) => {
  const { user, doLogout } = useContext(UserContext);

  const [company, setCompany] = useState(null)

  useEffect(() => {
    const q = query(collection(db, "companies"), where("user", "==", user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setCompany(null)
      querySnapshot.forEach((doc) => {
        setCompany({ ...doc.data(), id: doc.id })
      });
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = () => {
    doLogout();
  };
  const getTrophyMessage = (index) => {
    if (index >= 80) {
      return 'Congratulations! You are the Eco Champion!';
    } else if (index > 59) {
      return 'Great job! You are a Carbon Conqueror!';
    } else if (index > 20) {
      return 'Well done! You are an Eco Enthusiast!';
    } else {
      return `Keep it up! You are making a positive impact!`;
    }
  };

  return (

    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.account}>
            <View style={styles.profileContainer}>
              <Image
                style={styles.profileImage}
                source={require('../../src/assets/globe.png')}
              />
            </View>

            <Text style={styles.title}>Welcome, {user.name}!</Text>
            <Text style={styles.subtitle}>Email: {user.email}</Text>
          </View>

          <Score />

          {company ?
            <TouchableOpacity onPress={() => {
              navigation.navigate('Company', company)
            }} >
              <Box
                bg="white"
                p={4}
                borderRadius={8}
                shadow={2}
                mb={3}
                maxWidth="100%"
              >
                <Text style={{ fontSize: 20, fontWeight: 'bold' }} mb={2}>
                  {company.name}
                </Text>
                <Text fontSize={16} mb={2}>
                  Carbon Emissions: {company.emissions} tons
                </Text>
                <Progress
                  value={(company.goal - company.emissions) / company.goal * 100}
                  size="sm"
                  colorScheme={(company.goal - company.emissions) / company.goal * 100
                    < 20 ? "red" : (company.goal - company.emissions) / company.goal * 100 < 60 ? "blue" : "green"
                  }
                  mb={3}
                  mt={3}
                />
                <Text fontSize={14} fontWeight="bold" mb={2}>
                  {getTrophyMessage((company.goal - company.emissions) / company.goal * 100)}
                </Text>
              </Box>
            </TouchableOpacity>
            :
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Company', {})
              }} >
              <Box
                bg="white"
                p={4}
                borderRadius={8}
                shadow={2}
                mb={3}
                maxWidth="100%"
              >
                <Text
                  style={{ fontSize: 16, fontWeight: '400' }}
                  p={4}>
                  Click To Add Company
                </Text>
              </Box>
            </TouchableOpacity>}


          <View style={styles.container2}>
            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={styles.button}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={[styles.button, styles.logoutButton]}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  account: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
    width: '100%',
    backgroundColor: 'grey',
    padding: 5,
    borderRadius: 12,

  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  profileContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginBottom: 20,
    borderColor: 'lightgreen',
    borderWidth: 2,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  detailText: {
    fontSize: 16,
  },
  btn: {
    margin: 20,
    width: 45,
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 12,

  },
  button: {
    marginVertical: 10,
    width: 150,
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#DC3545', // Red color for logout button
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
