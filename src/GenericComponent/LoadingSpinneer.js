import { MD2Colors,ActivityIndicator } from "react-native-paper";
import { View, Text } from "react-native-web";

function LoadingSpinner({size = 'small'}) {
    return (
          <ActivityIndicator animating={true} size={size} color={MD2Colors.red800} />
    )
}

export default LoadingSpinner;