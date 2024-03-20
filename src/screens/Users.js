
import { UPDATE_ON_USER, endpoints } from "../Endpoints/endpoints"
import { users } from "../helper/extrapropertise"
import DataView from "../GenericComponent/Dataview"
// import { SafeAreaView, View, Text } from "react-native-web"
import { Text } from "react-native-paper"
import { dataview } from "../styles/Dataview"
import { Card } from "react-native-paper"
import { CommonClass } from "../styles/Commonclass"

const ResponsiveCard = ({ item }) => {
    return (
        <Card style = {{width:"100%"}}>
            <Card.Content>
                <Text variant="bodyMedium">  {item.name}</Text>
                <Text variant="bodyMedium"> {item.email}</Text>
                <Text variant="bodyMedium">  {item.address}</Text>
            </Card.Content>
        </Card>
    )
}

export const Users = ({ navigation }) => {
    const queryKey = [UPDATE_ON_USER]
    const queryFunction = async () => {
        var data = await endpoints.Users.getAll()
        console.log(data);
        return data
    }
    const getValueToSearch = (current) => {
        return (
            current.name || ""
        )
    }

    return (
            <DataView
                queryFunction={queryFunction}
                queryKey={queryKey}
                getSearchableValue={getValueToSearch}
                Card={ResponsiveCard}
                dataviewTitle={"Users"}
                navigation={navigation}
            />
    )

}