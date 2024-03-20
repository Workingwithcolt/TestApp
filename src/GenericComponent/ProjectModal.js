import React, { useReducer, useState } from 'react';
import { Modal, View, Button, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Propertylist, SchemaTypes, Section1, Section4, Section5, Section6 } from '../helper/extrapropertise';
import { ConvertBase64Format, blobToBase64, deepCopyObject } from '../helper/helper';
import { dataview } from '../styles/Dataview';
import { Divider } from 'react-native-paper';
import { CommonClass } from '../styles/Commonclass';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from './LoadingSpinneer';
import { UPDATE_ON_ACCOUNT } from '../Endpoints/endpoints';
import { GenericDatePicker } from './DatePicker';
import * as DocumentPicker from 'expo-document-picker';
import ModallImageView from '../screens/ModalImageView';
import { Addproperty } from './Addproperty';
import { AntDesign } from '@expo/vector-icons';

const ADD_PROPS_TYPE = "Add_Property";
const REMOVE_PROPS_TYPE = "Remove_Property";
const ADD_ARRAY = "push"
const UPDATE_PROP_VALUES = "update"
const REMOVE_ARRAY_PROPS_TYPE = "pop";

const reducer = (state, action) => {
    var currentState = deepCopyObject(state);
    if ((action.type === ADD_ARRAY || action.type === UPDATE_PROP_VALUES) && state[action.payload.name]) {
        currentState[action.payload.name] = [...state[action.payload.name]]
    }
    switch (action.type) {
        case ADD_PROPS_TYPE:
            let data = undefined
            if (action.payload?.ContentType) {
                data = { value: action.payload.value, ContentType: action.payload.ContentType, fileName: action.payload.fileName }
            } else {
                data = action.payload.value
            }
            currentState[action.payload.name] = data;
            break;
        case ADD_ARRAY:
            if (!currentState[action.payload.name]) {

                currentState[action.payload.name] = []
            }
            currentState[action.payload.name].push({})
            break;
        case UPDATE_PROP_VALUES:
            currentState[action.payload.name][action.payload.index] =
                { value: action.payload.value, ContentType: action.payload.ContentType, fileName: action.payload.fileName };
            break
        case REMOVE_ARRAY_PROPS_TYPE:
            let indexToRemove = action.payload.index
            currentState[action.payload.name].splice(indexToRemove, 1);
            break;
        case REMOVE_PROPS_TYPE:
            delete currentState[action.payload.name];
            break
        default:
    }

    return currentState;
};


export const ProjectModal = ({ init = {}, onSubmit, modalVisible, setModalVisible }) => {
    const [state, dispatch] = useReducer(reducer, init);
    const queryClient = useQueryClient();
    const [date, setDate] = useState(undefined);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const Upload = async (index, name) => {
        try {
            let data = await DocumentPicker.getDocumentAsync()
            let base64 = await ConvertBase64Format(data)
            if (index === 0 || index >= 0) {
                dispatch({ type: UPDATE_PROP_VALUES, payload: { ...base64, name: name, index: index } })
            } else if (index === undefined) {
                dispatch({ type: ADD_PROPS_TYPE, payload: { ...base64, name: name } })
            }

        } catch (e) {
            console.log(e);
            // if(CustomeDocumentPicker.isCancel(e)){
            //     console.log(e);
            // }else{
            //     console.log(e);
            // }
        }
    }

    const handleDelete = (index, name) => {
        if (index >= 0) {
            dispatch({ type: REMOVE_ARRAY_PROPS_TYPE, payload: { index: index, name: name } });
        } else if (index === undefined) {
            dispatch({ type: REMOVE_PROPS_TYPE, payload: { name: name } });
        }
    }
    const Onchange = async (e, element) => {
        if (element.type === SchemaTypes.file) {
            let data = await blobToBase64(e.target.files[0])
            dispatch({ type: ADD_PROPS_TYPE, payload: { fileName: e.target.files[0]?.name, name: element.name, value: data, ContentType: e.target.files[0]?.type } })
        } else {
            dispatch({ type: ADD_PROPS_TYPE, payload: { name: element.name, value: e } })
        }
    }

    const { isSuccess, isPending, error, mutate } = useMutation({
        mutationFn: async () => await onSubmit(state),
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) =>
                    query.queryKey.includes(UPDATE_ON_ACCOUNT)
            })
        },

    })

    var stausClass = (isPending || isSuccess) ? {
        position: 'relative', top: '50%', width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 10
    } : { backgroundColor: 'white', padding: 20, borderRadius: 10 }
   


    // console.log(state);
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', height: 'auto' }}>
                <TouchableOpacity style={CommonClass.AddButton} onPress={() => setModalVisible(false)}>
                    <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
                <ScrollView style={stausClass}>
                    <View>
                        {
                            isPending ?
                                <View>
                                    <LoadingSpinner size='large' />
                                </View >
                                : error ? (<View>
                                    <Text>{error}</Text>
                                </View>)
                                    : isSuccess ?
                                        (<View>
                                            <Text>Added or Updated Successfully !!</Text>
                                        </View>)
                                        :
                                        <View>
                                            <Text>Section 1: Client Basic Details</Text>
                                            {
                                                Section1.map((element, index) => {
                                                    return (
                                                        <View key={index}>
                                                            <Text style={{ marginTop: 0 }}>{element.placeholder}</Text>
                                                            <Addproperty
                                                                Onchange={Onchange}
                                                                element={element}
                                                                Upload={Upload}
                                                                state={state}
                                                            />
                                                        </View>
                                                    )
                                                })
                                            }
                                            <Divider />
                                            <Text style={CommonClass.sectionTitle}>Section 2:Add Presentation Drawing</Text>
                                            <View>
                                                {
                                                    state?.[Propertylist.PresentationDraw.name] && Object.entries(state[Propertylist.PresentationDraw.name])?.map(([key, value], index) => {
                                                        return (
                                                            <View >
                                                                <Addproperty
                                                                    Onchange={Onchange}
                                                                    element={Propertylist.PresentationDraw}
                                                                    onUpload={Upload}
                                                                    state={state}
                                                                    value={value}
                                                                    index={index}
                                                                    handleDelete={handleDelete}
                                                                />
                                                            </View>
                                                        )
                                                    })
                                                }
                                                <TouchableOpacity style={CommonClass.AddButton} onPress={() => {
                                                    dispatch({ type: ADD_ARRAY, payload: { name: Propertylist.PresentationDraw.name } })
                                                }}>
                                                    <AntDesign name="addfile" size={24} color="black" />
                                                </TouchableOpacity>
                                            </View>
                                            <Divider />
                                            <Text style={CommonClass.sectionTitle}>Section 3: Add 3d Models</Text>
                                            <View>
                                                {
                                                    state?.[Propertylist.FileModel3D.name] && Object.entries(state[Propertylist.FileModel3D.name])?.map(([key, value], index) => {
                                                        return (
                                                            <View >
                                                                <Addproperty
                                                                    Onchange={Onchange}
                                                                    element={Propertylist.FileModel3D}
                                                                    onUpload={Upload}
                                                                    state={state}
                                                                    value={value}
                                                                    index={index}
                                                                    handleDelete={handleDelete}
                                                                />
                                                            </View>
                                                        )
                                                    })
                                                }
                                                <TouchableOpacity style={CommonClass.AddButton} onPress={() => {
                                                    dispatch({ type: ADD_ARRAY, payload: { name: Propertylist.FileModel3D.name } })
                                                }}>
                                                    <AntDesign name="addfile" size={24} color="black" />
                                                </TouchableOpacity>
                                            </View>
                                            <Divider />
                                            <Text style={CommonClass.sectionTitle}>Section 4</Text>
                                            {
                                                Section4.map(element => {
                                                    return (
                                                        <View>
                                                            <Text style={{ marginTop: 0 }}>{element.placeholder}</Text>
                                                            <Addproperty
                                                                Onchange={Onchange}
                                                                element={element}
                                                                Upload={Upload}
                                                                state={state}
                                                                handleDelete={handleDelete}
                                                            />
                                                        </View>
                                                    )
                                                })
                                            }
                                            <Divider />
                                            <Text style={CommonClass.sectionTitle}>Section 5: Add RCC Drawing</Text>
                                            <View>
                                                {
                                                    state?.[Propertylist.RCCDrawing1.name] && Object.entries(state[Propertylist.RCCDrawing1.name])?.map(([key, value], index) => {
                                                        return (
                                                            <View >
                                                                <Addproperty
                                                                    Onchange={Onchange}
                                                                    element={Propertylist.RCCDrawing1}
                                                                    onUpload={Upload}
                                                                    state={state}
                                                                    value={value}
                                                                    index={index}
                                                                    handleDelete={handleDelete}
                                                                />
                                                            </View>
                                                        )
                                                    })
                                                }
                                                <TouchableOpacity style={CommonClass.AddButton} onPress={() => {
                                                    dispatch({ type: ADD_ARRAY, payload: { name: Propertylist.RCCDrawing1.name } })
                                                }}>
                                                    <AntDesign name="addfile" size={24} color="black" />
                                                </TouchableOpacity>
                                            </View>
                                            <Divider />
                                            <Text style={CommonClass.sectionTitle}>Section 5</Text>
                                            {
                                                Section5.map(element => {
                                                    let value = undefined
                                                    if (element.type !== SchemaTypes.file) {
                                                        value = state[element.name] ? state[element.name] : ""
                                                    }
                                                    return (
                                                        <View>
                                                            <Text>{element.placeholder}</Text>
                                                            <Addproperty
                                                                Onchange={Onchange}
                                                                element={element}
                                                                onUpload={Upload}
                                                                state={state}
                                                                handleDelete={handleDelete}
                                                            />
                                                        </View>
                                                    )
                                                })
                                            }
                                            <Divider />
                                            <Text style={CommonClass.sectionTitle}>Section 5:Add Slab files</Text>
                                            <View>
                                                {
                                                    state?.[Propertylist.Slab.name] && Object.entries(state[Propertylist.Slab.name])?.map(([key, value], index) => {
                                                        return (
                                                            <View style={dataview.fileContainer}>
                                                                <Addproperty
                                                                    Onchange={Onchange}
                                                                    element={Propertylist.Slab}
                                                                    onUpload={Upload}
                                                                    state={state}
                                                                    value={value}
                                                                    index={index}
                                                                    handleDelete={handleDelete}
                                                                />
                                                            </View>
                                                        )
                                                    })
                                                }
                                                <TouchableOpacity style={CommonClass.AddButton} onPress={() => {
                                                    dispatch({ type: ADD_ARRAY, payload: { name: Propertylist.Slab.name } })
                                                }}>
                                                    <AntDesign name="addfile" size={24} color="black" />
                                                </TouchableOpacity>
                                            </View>
                                            <Divider />
                                            <Text style={CommonClass.sectionTitle}>Section 6</Text>
                                            {
                                                Section6.map(element => {
                                                    let value = undefined
                                                    if (element.type !== SchemaTypes.file) {
                                                        value = state[element.name] ? state[element.name] : ""
                                                    }
                                                    return (
                                                        <View>
                                                            <Text>{element.placeholder}</Text>
                                                            <Addproperty
                                                                Onchange={Onchange}
                                                                element={element}
                                                                onUpload={Upload}
                                                                state={state}
                                                                handleDelete={handleDelete}
                                                            />
                                                        </View>
                                                    )
                                                })
                                            }
                                            <TouchableOpacity style={CommonClass.AddButton} onPress={() => mutate()}>
                                                <Text>Submit</Text>
                                            </TouchableOpacity>
                                            <Text>End</Text>
                                        </View>
                        }
                    </View>
                </ScrollView>
            </View>
        </Modal>
    )
}