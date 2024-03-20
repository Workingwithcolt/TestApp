import DateTimePicker from "@react-native-community/datetimepicker"
import { useState } from "react"
import { getDateString } from "../helper/helper"
import { View, Text, Button, TouchableOpacity } from "react-native"
import { CommonClass } from "../styles/Commonclass"
import { Fontisto } from '@expo/vector-icons';

export const GenericDatePicker = ({ value, Onchange, element }) => {
    const [show, setShow] = useState(false)
    return (
        <View>
            <TouchableOpacity style={CommonClass.AddButton} onPress={() => setShow(true)}>
                <Fontisto name="date" size={24} color="black" />
            </TouchableOpacity>
            {
                show &&
                <DateTimePicker
                    value={value}
                    mode='date'
                    nativeID={element.name}
                    is24Hour={true}
                    onChange={(e) => {
                        Onchange(e.nativeEvent.timestamp, element)
                        setShow(false)
                    }
                    }
                />}
            <Text style={{ textAlign: 'center', backgroundColor: 'skyblue', padding: 5 }}>{getDateString(value) || "select Date"}</Text>
        </View>
    )
}