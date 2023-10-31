import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, View, TextInput, StyleSheet, Text, Button, Alert } from 'react-native';
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from '../../firebase';
import { UserContext } from '../../userCtxt';


const App = ({ route }) => {

    const { params } = route

    const { user } = useContext(UserContext);
    const [company, setCompany] = useState({ name: "", emissions: "", goal: "", id: null });

    useEffect(() => {
        if (params?.id) {
            setCompany({
                name: params.name,
                goal: params.goal.toString(),
                id: params.id,
                emissions: params.emissions.toString()
            })
        }
    }, [params?.id])

    const saveCompany = async () => {
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
            setCompany((prev) => ({ ...prev, id: docRef.id }))
            Alert.alert("Saved", `${company.name} created successfully.`);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Company</Text>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input}
                    placeholder='Company Name'
                    value={company.name}
                    onChangeText={(e) => {
                        setCompany((prev) => ({ ...prev, name: e }))
                    }}
                />
                <TextInput
                    onChangeText={(e) => {
                        setCompany((prev) => ({ ...prev, emissions: e }))
                    }}
                    value={company.emissions}
                    style={styles.input}
                    keyboardType='number-pad'
                    placeholder='Emission'
                />
                <TextInput
                    value={company.goal}
                    onChangeText={(e) => {
                        setCompany((prev) => ({ ...prev, goal: e }))
                    }}
                    style={styles.input}
                    keyboardType='number-pad'
                    placeholder='Goal'
                />

                <Button title='Save' onPress={() => saveCompany()} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        paddingLeft: 10,
    },
});

export default App;
