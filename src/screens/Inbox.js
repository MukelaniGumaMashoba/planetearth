import React, { View } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Inbox = () => {
    return (
        <SafeAreaView>
            <Text>Inbox</Text>

            <View>
                <Text>Messages  : </Text>
            </View>
        </SafeAreaView>


    )
}

export default Inbox