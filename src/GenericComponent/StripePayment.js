import { StripeProvider } from "@stripe/stripe-react-native"

export const StripePayments = ({ children }) => {
    return (
        <StripeProvider
            publishableKey={process.env.EXPO_PUBLIC_PUBLISHKEY}
        >
            {children}
        </StripeProvider>
    )
}