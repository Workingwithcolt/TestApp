import { useStripe } from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Alert } from "react-native";
import { CommonClass } from "../styles/Commonclass";
import axios from "axios";

export default function CheckoutScreen() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const fetchPaymentSheetParams = async () => {
        let s = await axios.get('https://test-app-backend-virid.vercel.app/payments');

        const { paymentIntent, ephemeralKey, customer } = s.data;

        return {
            paymentIntent,
            ephemeralKey,
            customer,
        };
    };

    const initializePaymentSheet = async () => {
        const {
            paymentIntent,
            ephemeralKey,
            customer,
        } = await fetchPaymentSheetParams();

        const { error } = await initPaymentSheet({
            merchantDisplayName: "Example, Inc.",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: 'Jane Doe',
            }
        });
        if (!error) {
            setLoading(true);
        }
    };

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            Alert.alert('Success', 'Your order is confirmed!');
        }
    };

    useEffect(() => {
        initializePaymentSheet();
    }, []);

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%', gap: 10 }}>
            <Text style={CommonClass.Texttitle}>Pay To SomeOne Who Needs </Text>
            <TouchableOpacity style={CommonClass.AddButton} onPress={openPaymentSheet}>
                <Text>Donate Life</Text>
            </TouchableOpacity>
        </View>
    );
}