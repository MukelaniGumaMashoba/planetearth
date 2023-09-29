import React, { useContext } from 'react';
import { UserContext } from '../../App';
import { Text, View, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Score from '../components/Score';

const AccountScreen = ({ navigation }) => {
  const { user, doLogout } = useContext(UserContext);

  const handleLogout = () => {
    doLogout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>AccountScreen</Text>
      <Text>{user.email}</Text>
      <Score />
      <Button title="Logout" onPress={handleLogout} />
    </SafeAreaView>
  );
};

export default AccountScreen;

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
});


