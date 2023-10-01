import React, { useContext } from 'react';
import { UserContext } from '../../App';
import { Text, View, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Score from '../components/Score';

const AccountScreen = ({ navigation }) => {
  const { user, doLogout } = useContext(UserContext);

  const handleLogout = () => {
    doLogout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            source={require('../../src/assets/globe.png')}
          />
        </View>
        <Text style={styles.title}>Welcome, {user.name}!</Text>
        <Text style={styles.subtitle}>Email: {user.email}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Age:</Text>
          <Text style={styles.detailText}>{user.age}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>Location:</Text>
          <Text style={styles.detailText}>{user.location}</Text>
        </View>
        <Score />
        <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile')} />
        <Button title="Logout" onPress={handleLogout} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
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
});
