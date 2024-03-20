import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinneer";
// import { TextInput, View, Text, Button } from "react-native-web";
import { Text, TextInput, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { dataview } from "../styles/Dataview";


function DataView({ queryFunction, queryKey, getSearchableValue, Card, DetailedElement, newDataButton, dataviewTitle, navigation }) {
    const [searchString, setSearchString] = useState("");
    const [selectedItem, setSelectedItem] = useState(undefined);

    var { data, isError, isLoading, error } = useQuery({ queryKey: queryKey, queryFn: async () => await queryFunction() });

    if (data && searchString !== "") {
        data = data.filter((current) => {
            var valueToSearchIn = getSearchableValue(current).toLowerCase();
            var valueToSearch = searchString.toLowerCase();
            return valueToSearchIn.includes(valueToSearch);
        })
    }
    if (selectedItem && DetailedElement) {
        return (
            <DetailedElement item={selectedItem} setSelectedItem={setSelectedItem} navigation={navigation} />
        )
    }

    if (isLoading) {
        return (
            <View  >
                <LoadingSpinner />
            </View >
        )
    }

    if (isError) {
        return (
            <View >
                <View role="alert">
                    <Text>Something Went Wrong</Text>
                </View>
            </View>
        )
    }

    if (data) {
        return (
            <View style={{ padding: 10 }}>
                <View style={dataview.stickyInput} >
                    <TextInput

                        style={dataview.input}
                        onChangeText={(e) => setSearchString(e)}
                        placeholder="Search"
                    />
                    {
                        newDataButton ?
                            <View style={dataview.textStyle}>
                                <Text>{newDataButton}</Text>
                            </View> : <View></View>
                    }
                </View>
                <ScrollView  >
                    <View style={dataview.heightAndOverflow}>
                        <View >
                            {
                                data && data.length === 0 ?
                                    <View style={dataview.card}>
                                        <Text style={dataview.textStyle}>
                                            No Data To Display
                                        </Text>
                                    </View>
                                    :
                                    <View >
                                        {
                                            data?.map((item, index) =>
                                                <View style={dataview.cardContainer} key={index} >
                                                    <Card item={item} navigation={navigation} setSelectedItem={setSelectedItem}></Card>
                                                </View>
                                            )
                                        }
                                        <Text>End</Text>
                                    </View>
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default DataView;