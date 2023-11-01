import React, { useContext, useEffect, useState } from 'react';
import { TextInput, Modal } from 'react-native';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Text, Box, Progress } from 'native-base';
import { ImageBackground, View, ScrollView, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Score from '../components/Score';
import { UserContext } from '../../userCtxt';
import { db } from '../../firebase';

const backgroundImage = require('../assets/LogBack.jpg');

const AccountScreen = ({ navigation }) => {
  const { user, doLogout } = useContext(UserContext);

  const [company, setCompany] = useState(null);
  const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);
  const [editedEmail, setEditedEmail] = useState(user.email);

  useEffect(() => {
    const q = query(collection(db, "companies"), where("user", "==", user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setCompany(null);
      querySnapshot.forEach((doc) => {
        setCompany({ ...doc.data(), id: doc.id });
      });
    });
    return () => unsubscribe();
  }, []);

  const openEditProfileModal = () => {
    setEditProfileModalVisible(true);
  };

  const closeEditProfileModal = () => {
    setEditProfileModalVisible(false);
  };

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
    <ImageBackground source={backgroundImage} style={styles.container}>
      <KeyboardAvoidingView>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.account}>
            <View style={styles.profileContainer}>
              <Image
                style={styles.profileImage}
                source={require('../../src/assets/globe.png')}
              />
            </View>

            <Text style={styles.title}>Welcome {user.name}!</Text>
            <Text style={styles.subtitle}>Email: {user.email}</Text>
          </View>

          <Score />

          {company ? (
            <TouchableOpacity onPress={() => {
              navigation.navigate('Company', company);
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
                  colorScheme={(company.goal - company.emissions) / company.goal * 100 < 20 ? "red" : (company.goal - company.emissions) / company.goal * 100 < 60 ? "blue" : "green"}
                  mb={3}
                  mt={3}
                />
                <Text fontSize={14} fontWeight="bold" mb={2}>
                  {getTrophyMessage((company.goal - company.emissions) / company.goal * 100)}
                </Text>
              </Box>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => {
              navigation.navigate('Company', {});
            }} >
              {/* <Box style={{ backgroundColor: 'grey', opacity: 0.85 }} */}
              <Box
                bg="white"
                p={4}
                borderRadius={8}
                shadow={2}
                mb={3}
                maxWidth="100%"
              >
                <Text
                  style={{ fontSize: 20, fontWeight: '500', }}
                  p={4}>
                  Click To Add Company
                </Text>
              </Box>
            </TouchableOpacity>
          )}

          <View style={styles.container2}>
            <TouchableOpacity onPress={openEditProfileModal} style={styles.button}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={[styles.button, styles.logoutButton]}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>

          {/* Edit Profile Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={editProfileModalVisible}
            onRequestClose={closeEditProfileModal}
          >
            <View style={styles.editProfileModalContainer}>
              <View style={styles.editProfileModalContent}>
                <TouchableOpacity onPress={closeEditProfileModal} style={styles.backButton}>
                  <Text style={styles.backButtonText}>❌</Text>
                </TouchableOpacity>
                <Text style={{ marginBottom: 5 }}>Update Email</Text>
                <TextInput
                  style={styles.editProfileInput}
                  value={editedEmail}
                  onChangeText={(text) => setEditedEmail(text)}
                  placeholder="Edit Email"
                />

                <TouchableOpacity onPress={closeEditProfileModal} style={styles.updateAccountButton}>
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={closeEditProfileModal} style={styles.deleteAccountButton}>
                  <Text style={styles.buttonText}>Delete Account</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>


        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
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
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 12,
    opacity: 0.8,
    borderRightcolor: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'black'
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
    marginTop: 10,
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
    opacity: 0.9,
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
    backgroundColor: '#DC3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  editProfileModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 300,
  },
  editProfileModalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  editProfileInput: {
    borderBottomWidth: 1,
    borderColor: '#000',
    fontSize: 16,
    marginBottom: 20,
  },
  deleteAccountButton: {
    backgroundColor: '#DC3545',
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  updateAccountButton: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
});
