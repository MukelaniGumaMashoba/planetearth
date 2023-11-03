import React, { useContext, useEffect, useState } from 'react';
import { TextInput, Modal, Alert } from 'react-native';
import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { Text, Box, Progress } from 'native-base';
import { ImageBackground, View, ScrollView, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Score from '../components/Score';
import { UserContext } from '../../userCtxt';
import { db } from '../../firebase';
import { Ionicons } from '@expo/vector-icons';

const backgroundImage = require('../assets/LogBack.jpg');
import { getAuth, deleteUser } from "firebase/auth";



const AccountScreen = ({ navigation }) => {
  const { user, doLogout } = useContext(UserContext);

  const [company, setCompany] = useState(null);
  const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [users, setUsers] = useState({})

  const deleteFroFB = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    deleteUser(user).then(() => {

    }).catch((error) => {
      Alert.alert("Wowo hai ngamawala", error.message)
    });
  }

  const Delete = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'I am sure',
          onPress: deleteFroFB,
        },
      ]
    );
  };



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



  const UserName = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUsers(docSnap.data())
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  }

  useEffect(() => {
    UserName()
  }, []);

  const openEditProfileModal = () => {
    setEditProfileModalVisible(true);
  };

  const closeEditProfileModal = () => {
    setEditProfileModalVisible(false);
  };

    // State to control the contact info pop-up
    const [showContactPopUp, setShowContactPopUp] = useState(false);

    // Function to open the contact info pop-up
    const openContactPopUp = () => {
      setShowContactPopUp(true);
    };
  
    // Function to close the contact info pop-up
    const closeContactPopUp = () => {
      setShowContactPopUp(false);
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

            <Text style={styles.title}>Welcome {users?.name}!</Text>
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
          <TouchableOpacity onPress={openContactPopUp} style={styles.button3}>
              <Text style={styles.buttonText}>PlanetPulse Support</Text>
          </TouchableOpacity>

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

                <TouchableOpacity onPress={Delete} style={styles.deleteAccountButton}>
                  <Text style={styles.buttonText}>Delete Account</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={showContactPopUp}
            onRequestClose={closeContactPopUp}
          >
            <View style={styles.contactInfoPopUp}>
              <TouchableOpacity onPress={closeContactPopUp} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
              <View style={styles.contactInfoContainer}>
                <View style={styles.searchContainer}>
                  <Ionicons name="search" size={24} color="black" style={styles.searchIcon} />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                  />

              </View>
                <Text style={styles.contactName}>Contact Us</Text>
                <Text style={styles.contactEmail}>Tel: 011 065 0288</Text>
                <Text style={styles.contactEmail}>Email: planetpulse@email.com</Text>
                <Text style={styles.contactEmail}></Text>
              </View>

              <View style={styles.faq}>
                  <Text style={styles.faqHeading}>FAQ</Text>
                  <Text style={styles.faqInfo}>How to use the carbon calculator?</Text>
                  <Text style={styles.faqInfo}>How to calculate cost savings</Text>
                  <Text style={styles.faqInfo}>User Support. Report a problem</Text>
                  <Text style={styles.faqInfo}>Assisting you with connecting to the world</Text>
                </View>
                <Text style={styles.faqSave}>🌍 Save Earth 🌍</Text>
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
    paddingTop: 10,
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
  button3: {
    marginVertical: 10,
    width: 300,
    height: 50,
    backgroundColor: 'green',
    borderRadius: 5,
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
  contactInfoPopUp: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop:120,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 10,
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius:10,

  },
  contactInfoContainer: {
    padding: 20,
    alignItems: 'center',
    
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 40,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  contactName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  contactEmail: {
    fontSize: 16,
  },
  faq: {
    alignItems: 'center',
    marginTop:50,
    fontSize: 16,
  },
  faqHeading: {
    fontSize: 22,
    marginBottom: 10,
    marginTop: -80,
    backgroundColor: 'gray',
    paddingHorizontal: 171,
    paddingVertical: 15,
  },
  faqInfo: {
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'lightgray',
    paddingHorizontal: 100,
    paddingVertical: 15,
    marginTop: 5,
    borderRadius:5,
  },
  faqSave: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'green',
    color: 'white',
    paddingHorizontal: 100,
    paddingVertical: 15,
    marginTop: 10,
  },
});
