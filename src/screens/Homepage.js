import React, { useState } from 'react';
import { View, Button, Text, TouchableOpacity } from 'react-native';
import { endpoints } from '../Endpoints/endpoints';
import { ProjectModal } from '../GenericComponent/ProjectModal';
import { SafeAreaView } from 'react-native-web';
import { CommonClass } from '../styles/Commonclass';

const ProjectDetailsModal = ({ navigation, route }) => {
  const { data } = route?.params;
  const [modalVisible, setModalVisible] = useState(false);

  const Modal1Bkcall = async (state) => {
    let data = await endpoints.Account.create(state);
    return data;
  };
  console.log("homepage");
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity style={CommonClass.AddButton} onPress={() => setModalVisible(!modalVisible)}>
        <Text>Add new Project</Text>
      </TouchableOpacity>
      <TouchableOpacity style={CommonClass.AddButton} onPress={() =>
        navigation.navigate('Users')
      } >
        <Text>Users</Text>
      </TouchableOpacity>
      <TouchableOpacity style={CommonClass.AddButton} onPress={() =>
        navigation.navigate('Projects')
      }  >
        <Text>Projects</Text>
      </TouchableOpacity>
      {
        modalVisible ?
          <ProjectModal
            init={{}}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            onSubmit={Modal1Bkcall}
          />
          : <View></View>
      }

    </View>
  );
};

export default ProjectDetailsModal;
