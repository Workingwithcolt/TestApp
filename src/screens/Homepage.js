import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { UPDATE_ON_USER, endpoints } from '../Endpoints/endpoints';
import { ProjectModal } from '../GenericComponent/ProjectModal';
import { CommonClass } from '../styles/Commonclass';
import { Card, Text } from 'react-native-paper';
import { NODATA } from '../helper/extrapropertise';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../GenericComponent/LoadingSpinneer';
import { StripePayments } from '../GenericComponent/StripePayment';

const ProjectDetailsModal = ({ navigation, route }) => {
  const { user, token } = route?.params;
  const [modalVisible, setModalVisible] = useState(false);

  const getUser = async () => {
    return await endpoints.Users.getOne(user._id, null, null, null)
  }

  var { data, isLoading, error } = useQuery({ queryKey: [UPDATE_ON_USER], queryFn: async () => await getUser() });

  if (isLoading) {
    return (
      <View  >
        <LoadingSpinner />
      </View >
    )
  }

  if (error) {
    return (
      <View >
        <Text>Something went wrong</Text>
      </View>
    )
  }

  const getAccountData = async (state) => {
    await endpoints.Users.update(null, state, { _id: state._id })
    return state._id;
  }


  if (data) {
    return (
      <StripePayments>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 3 }}>
            <Text style={CommonClass.Texttitle}>Profile Information</Text>
            <TouchableOpacity style={CommonClass.AddButton} onPress={() => navigation.navigate('login')}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
          <Card style={{ width: "100%", padding: 5, margin: 3 }}>
            <Card.Content style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 4 }}>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text variant="bodyMedium" style={CommonClass.TextKey}>username</Text>
                <Text variant="bodyMedium" style={CommonClass.Textvalue}> {data.username || NODATA}</Text>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text variant="bodyMedium" style={CommonClass.TextKey}>email</Text>
                <Text variant="bodyMedium" style={CommonClass.Textvalue}> {data.email || NODATA}</Text>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text variant="bodyMedium" style={CommonClass.TextKey}>Age</Text>
                <Text variant="bodyMedium" style={CommonClass.Textvalue}> {data.age || NODATA}</Text>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text variant="bodyMedium" style={CommonClass.TextKey}>Address</Text>
                <Text variant="bodyMedium" style={CommonClass.Textvalue}> {data.address || NODATA}</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <TouchableOpacity style={CommonClass.AddButton} onPress={() => setModalVisible(!modalVisible)}>
                <Text>update User</Text>
              </TouchableOpacity>
              <TouchableOpacity style={CommonClass.AddButton} onPress={() => navigation.navigate('payment', {
                user: user,
                token: token
              })}>
                <Text>Donate to One Life</Text>
              </TouchableOpacity>
            </Card.Actions>
          </Card>
          {
            modalVisible && Object.keys(user).length > 0 ?
              <ProjectModal
                init={user}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                onSubmit={getAccountData}
              />
              : <View></View>
          }
        </View>
      </StripePayments>
    );
  };

}

export default ProjectDetailsModal;
