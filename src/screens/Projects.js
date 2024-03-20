
import { UPDATE_ON_ACCOUNT, endpoints } from "../Endpoints/endpoints"
import { NODATA } from "../helper/extrapropertise"
import DataView from "../GenericComponent/Dataview"
// import { Button, SafeAreaView, View } from "react-native-web"
import { Button, SafeAreaView, View, TouchableOpacity } from "react-native"
import { ProjectDetailView } from "./ProjectDetailView"
import { Card, Text } from 'react-native-paper';
import { ProjectModal } from "../GenericComponent/ProjectModal"
import { useState } from "react"
import LoadingSpinner from "../GenericComponent/LoadingSpinneer"
import { useQueryClient } from "@tanstack/react-query"
import { CommonClass } from "../styles/Commonclass"
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ResponsiveCard = ({ item, navigation, setSelectedItem }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const queryClient = useQueryClient()
    const [status, setStatus] = useState({
        isloading: false, error: undefined, isSuccess: false
    })

    const updateItem = async (state) => {
        try {
            await endpoints.Account.update(state, { _id: state._id })
            return state._id;
        } catch (e) {
            return Promise.reject(e.message)
        }
    }
    const deleteItem = async (item) => {
        try {
            setStatus({
                isloading: true, error: undefined, isSuccess: false
            })
            await endpoints.Account.delete(null, { _id: item._id })
            setStatus({
                isloading: false, error: undefined, isSuccess: true
            })
            queryClient.invalidateQueries({
                predicate: (query) =>
                    query.queryKey.includes(UPDATE_ON_ACCOUNT)
            })
        } catch (e) {
            setStatus({
                isloading: false, error: e.message, isSuccess: false
            })
        }
    }

    return (
        <Card style={{ width: "100%", padding: 5 }}>
            <Card.Content>
                <Text variant="titleLarge"> {item.clientName || NODATA}</Text>
                <Text variant="bodyMedium"> {item.email}</Text>
                <Text variant="bodyMedium"> {item.aadhar}</Text>
            </Card.Content>
            {
                modalVisible ?
                    <ProjectModal
                        init={item}
                        onSubmit={updateItem}
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                    />
                    : <View></View>
            }

            {
                status.isloading ?
                    <View>
                        <LoadingSpinner />
                    </View >
                    : status.error ? (<View>
                        {status.error}
                    </View>)
                        : status.isSuccess ?
                            (<View>
                                <Text>Deleted Successfully !!</Text>
                            </View>)
                            :
                            (<View style={{ display: "flex", flexDirection: 'row', justifyContent: "flex-end", gap: 10 }}>
                                <TouchableOpacity style={CommonClass.AddButton} onPress={() => setSelectedItem(item)} >
                                    <MaterialCommunityIcons name="account-details" size={24} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity style={CommonClass.AddButton} onPress={() => setModalVisible(true)}>
                                    <AntDesign name="edit" size={24} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity style={CommonClass.AddButton} onPress={async () => await deleteItem(item)}  >
                                    <AntDesign name="delete" size={24} color="black" />
                                </TouchableOpacity>
                            </View>)
            }
        </Card>
    )
}

export const Projects = ({ navigation }) => {
    const queryKey = [UPDATE_ON_ACCOUNT]
    const queryFunction = async () => {
        var accounts = await endpoints.Account.getAll()
        return accounts
    }
    const getValueToSearch = (current) => {
        return (
            (current?.email +
                current?.clientName +
                current?.aadhar) || ""
        )
    }

    return (
        <DataView
            queryFunction={queryFunction}
            queryKey={queryKey}
            getSearchableValue={getValueToSearch}
            Card={ResponsiveCard}
            dataviewTitle={"Projects"}
            navigation={navigation}
            DetailedElement={ProjectDetailView}
        />
    )

}