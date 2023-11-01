import React, { useState } from 'react';
import { Text, View, FlatList, Button, SafeAreaView, StyleSheet } from 'react-native';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

export const AdminPage = () => {
    const [users, setUsers] = useState([]);

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

    return (
        <SafeAreaView style={styles.container}>
            <Button title="See all users" onPress={fetchUsers} />
            <FlatList
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.userContainer}>
                        <Text style={styles.emailText}>{item.name}</Text>
                        <Button title="Delete" onPress={() => deleteUser(item.id)} />
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    userContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    emailText: {
        fontSize: 16,
    },
    deleteButton: {
        marginLeft: 10,
    }
});
