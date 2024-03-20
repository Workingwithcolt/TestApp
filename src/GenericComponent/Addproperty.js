import { Modal, View, Button, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SchemaTypes } from "../helper/extrapropertise"
import { GenericDatePicker } from "./DatePicker"
import ModallImageView from "../screens/ModalImageView"
import { dataview } from '../styles/Dataview';
import { AntDesign } from '@expo/vector-icons';
import { CommonClass } from '../styles/Commonclass';

export const Addproperty = ({ element, Onchange, onUpload, state, handleDelete, value = undefined, index }) => {
    if (element.type === SchemaTypes.file) {
        let src = undefined;
        let title = undefined;
        if (index >= 0) {
            src = value?.value
            title = value?.fileName
            ContentType = value?.ContentType
        }
        if (index === undefined) {
            src = state[element.name]?.value
            title = state[element.name]?.fileName
            ContentType = state[element.name]?.ContentType
        }
        return (
            <View style={dataview.fileContainer}>
                <View style = {{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
                    <TouchableOpacity style={CommonClass.chooseFile} onPress={async () => await onUpload(index, element.name)}>
                        <Text>Choose file</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={CommonClass.Editbutton} onPress={() => handleDelete(index, element.name)}>
                        <AntDesign name="delete" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <ModallImageView
                    src={src}
                    ContentType = {ContentType}
                    title={title}
                />
            </View>
        )
    }

    if (element.type === SchemaTypes.DATE) {
        return (
            <View>
                <GenericDatePicker
                    Onchange={Onchange}
                    value={(state[element.name]) ? new Date(state[element.name]) : new Date(1598051730000)}
                    key={element.name}
                    element={element}
                />
            </View>
        )
    }

    return (
        <View>
            <TextInput
                textContentType=''
                style={element.style}
                onChangeText={(e) =>
                    Onchange(e, element)}
                placeholder={element.placeholder}
                value={(state[element.name]) ? state[element.name] : ""}
            // keyboardType={element.type}
            />
        </View>
    )
}