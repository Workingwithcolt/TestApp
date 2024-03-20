import { SafeAreaView } from "react-native";
import { MD2Colors, ActivityIndicator } from "react-native-paper";

function LoadingSpinner({ size = 'small' }) {
    return (
        <SafeAreaView>
            <ActivityIndicator animating={true} size={size} color={MD2Colors.red800} />
        </SafeAreaView>
    )
}

export default LoadingSpinner;