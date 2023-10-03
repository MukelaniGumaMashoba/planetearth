import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, View, Button, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Score from '../components/Score';
import { UserContext } from '../../userCtxt';

const AccountScreen = ({ navigation }) => {
  const { user, doLogout } = useContext(UserContext);

  const handleLogout = () => {
    doLogout();
  };

  return (
    <SafeAreaView style={styles.container}>
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

        {/* <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Age:</Text>
          <Text style={styles.detailText}>{user.age}</Text>
        </View> */}
        {/* <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Location:</Text>
          <Text style={styles.detailText}>{user.location}</Text>
        </View> */}
        <Score />
        <View style={styles.container2}>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={styles.button}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={[styles.button, styles.logoutButton]}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
