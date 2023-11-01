import React, { useState } from 'react';
import { Text, View, FlatList, Button, SafeAreaView, StyleSheet } from 'react-native';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

export const AdminPage = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const usersCollectionRef = collection(db, 'users');
        const querySnapshot = await getDocs(usersCollectionRef);
        const usersData = [];
        querySnapshot.forEach((doc) => {
            usersData.push({ id: doc.id, ...doc.data() });
        });
        setUsers(usersData);
    };

    const deleteUser = async (userId) => {
        const userDocRef = doc(db, 'users', userId);
        await deleteDoc(userDocRef);
        fetchUsers();
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Button title="See all users" onPress={fetchUsers} />
                <FlatList
                    data={users}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View>
                            <Text>{item.email}</Text>
                            <Button title="Delete" onPress={() => deleteUser(item.id)} />
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        position: 'relative',
        top: 10,
    }
})