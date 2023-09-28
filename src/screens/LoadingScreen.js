import { TouchableOpacity } from 'react-native'
import { Text, Image, StyleSheet} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const LoadingScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}> 
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text>
                    LoadingScreen
                </Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
    }
})