import React, { useState, useContext } from 'react';
import { Text, View, FlatList, Button, SafeAreaView, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { UserContext } from '../../userCtxt';

export const AdminPage = ({navigation}) => {
    const [users, setUsers] = useState([]);

    const { user, doLogout } = useContext(UserContext);

    const fetchUsers = async () => {
        const usersCollectionRef = collection(db, 'companies');
        const querySnapshot = await getDocs(usersCollectionRef);
        const usersData = [];
        querySnapshot.forEach((doc) => {
            usersData.push({ id: doc.id, ...doc.data() });
        });
        setUsers(usersData);
    };

    const deleteUser = async (companyId) => {
        const userDocRef = doc(db, 'companies', companyId);
        await deleteDoc(userDocRef);
        fetchUsers();
    };

    const handleLogout = () => {
        navigation.goBack()
      };

    const logout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    onPress: handleLogout,
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/LogBack.jpg')} style={styles.backgroundImage} />
            <View style={styles.centeredView}>
                <Text style={styles.heading}>Welcome To the Admin Panel</Text>
                <View style={styles.panel}>
                    <Button title="See all users" onPress={fetchUsers} color="green" />
                </View>
                <FlatList
                    data={users}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.userContainer}>
                            <Text style={styles.emailText}>{item.name}</Text>
                            <Button  title="Delete" onPress={() => deleteUser(item.id)} color="red" />
                        </View>
                    )}
                />
                
                <View style={styles.panel}>

                    <TouchableOpacity onPress={logout} style={styles.logout}>
                        <Text style={styles.buttonText}>LOGOUT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 24,
        marginBottom: 20,
        marginTop: 50,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    panel: {
        width: 200,
        marginBottom: 20,
    },
    userContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    emailText: {
        fontSize: 18,
        marginRight: 20,
    },
    logout: {
        padding: 10,
        backgroundColor: 'gray',
        borderRadius: 5,
    },
    buttonText: {
        padding: 10,
        fontSize: 16,
        color: 'white',
        alignSelf: 'center',
    },
});
