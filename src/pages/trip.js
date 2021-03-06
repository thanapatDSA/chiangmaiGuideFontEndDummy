import React, { Component } from 'react'
import { Image, StyleSheet, Text, View, Alert, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../utilities/styles'
import { Header } from '../components/header'
import { Button, Drawer, Avatar, Card, Title, TextInput, Dialog, Portal } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import axios from 'axios'
import { thisTypeAnnotation } from '@babel/types';
import { Link } from 'react-router-native'
import { ipReducers } from '../reducers/IpAddressReducers';

class trip extends Component {
  state = {
    refreshing: false,
    isLogin: false,
    visibleDialog: false,
    visibleDialogEdit: false,
    editTripName: '',
    newTripName: '',
    tripNameId: '',
    tripName: [],
    tripDescription: ''
  }


  UNSAFE_componentWillMount() {
    console.log("trip props", this.props)
    const { profile } = this.props
    if (this.props.profile.length > 0) {
      this.setState({ isLogin: !this.state.isLogin })
      this.loadTripName()
    }

  }

  loadTripName = () => {
    const { profile, ipreducer } = this.props
    axios({
      method: 'get',
      url: `${this.props.ipreducer.ip}/trip/${this.props.profile[0].id}`,
      headers: { 'Authorization': `Bearer ${this.props.profile[0].token}` }
    })
      .then((res) => {
        this.setState({ tripName: res.data })
        console.log("data:", this.state.tripName);
        this.setState({ refreshing: !this.state.refreshing })

      })
      .catch((err) => {
        console.log("error", err);
      })
  }

  addNewTrip = () => {
    const { profile, ipreducer } = this.props
    axios({
      method: 'post',
      url: `${this.props.ipreducer.ip}/trip/${this.props.profile[0].id}`,
      headers: { 'Authorization': `Bearer ${this.props.profile[0].token}` },
      data: {
        tripName: this.state.newTripName,
        tripDescription: this.state.tripDescription
      }
    })
      .then((res) => {
        console.log("data:", res.data);
        this.setState({ tripDescription: '' })
        this.setState({ visibleDialog: false });
        this.loadTripName()
      })
      .catch((err) => {
        console.log("error", err);
        this.setState({ tripDescription: '' })
        this.setState({ visibleDialog: false });
      })
  }

  editTripName = (id) => {
    const { profile, ipreducer } = this.props
    axios({
      method: 'put',
      url: `${this.props.ipreducer.ip}/trip/edit/${id}`,
      headers: { 'Authorization': `Bearer ${this.props.profile[0].token}` },
      data: {
        tripName: this.state.editTripName,
        tripDescription: this.state.tripDescription
      }
    })
      .then((res) => {
        console.log("data:", res.data);
        this.setState({ visibleDialogEdit: false });
        this.setState({ tripNameId: '', tripDescription: '' })
        this.loadTripName()
      })
      .catch((err) => {
        console.log("error", err);
        this.setState({ tripNameId: '', tripDescription: '' })
        this.setState({ visibleDialogEdit: false });
      })
  }

  deleteTrip = (id) => {
    const { profile, ipreducer } = this.props
    axios({
      method: 'delete',
      url: `${this.props.ipreducer.ip}/trip/delete/${id}`,
      headers: { 'Authorization': `Bearer ${this.props.profile[0].token}` },
    })
      .then((res) => {
        console.log("delete:", res);
        this.setState({ visibleDialogEdit: false });
        this.setState({ tripNameId: '', tripDescription: '' })
        this.loadTripName()
      })
      .catch((err) => {
        console.log("error", err);
        this.setState({ tripNameId: '', tripDescription: '' })
        this.setState({ visibleDialogEdit: false });
      })
  }

  _showDialog = () => this.setState({ visibleDialog: true });

  _hideDialog = () => this.setState({ visibleDialog: false });

  _showDialogEdit = () => this.setState({ visibleDialogEdit: true });

  _hideDialogEdit = () => this.setState({ visibleDialogEdit: false });

  tripNamePress = (trip) => {
    this.props.history.push('/TripData', { tripData: trip })
  }
  editTripnamePress = (id) => {
    this.setState({ tripNameId: id })
    this.setState({ visibleDialogEdit: true })
  }

  tripNameAddPress = () => {
    this.setState({ visibleDialog: true })
  }


  goToLogin = () => {
    const { push } = this.props
    push('/login')
  }
  render() {
    return (
      <View style={styles.container}>
        <Header textHeader='Trip' colorBar='#009688' />
        <View style={styles.body}>
          {this.state.isLogin ?
            <ScrollView>
              <Card style={{ marginVertical: 5 }}>
                <Card.Cover
                  source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Content style={{ top: 5 }}>
                  <Title>My Trip </Title>
                </Card.Content>
              </Card>
              <FlatList
                data={this.state.tripName}
                renderItem={({ item }) =>
                  <TouchableOpacity
                    style={{
                      marginVertical: 3,
                    }}>
                    <Link
                      to={{
                        pathname: "/TripData",
                        search: "?sort=name",
                        hash: "#the-hash",
                        state: { item: item }
                      }}
                    >
                      <Card >
                        <Card.Title titleStyle={{ fontSize: 18, }}
                          title={item.tripName}
                          subtitle={item.tripDescription}
                          right={(props) =>
                            <Button onPress={() => { this.editTripnamePress(item.id) }} ><Icon name="edit" size={30} /></Button>}
                          onPress={() => {
                            this.tripNamePress(item.tripName)
                          }}
                        />
                      </Card>

                    </Link>
                  </TouchableOpacity>
                }
                refreshing={this.state.refreshing}
              />
              <TouchableOpacity
                style={{
                  marginVertical: 3,
                }}
                onPress={() => { this.tripNameAddPress() }}
              >
                <Card style={{
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Card.Content>
                    <Text><Icon name="plus" size={20} />ADD</Text>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            </ScrollView>

            :

            <Card style={{
              height: "100%",
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Card.Content style={{
                height: "100%",
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Button mode="contained" onPress={() => { this.goToLogin() }}>Plese Login To Use My Trip</Button>
              </Card.Content>
            </Card>

          }

        </View>
        <Portal>
          <Dialog
            visible={this.state.visibleDialog}
            onDismiss={this._hideDialog}>
            <Dialog.Title>Add New Trip</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label='Trip Name'
                value={this.state.newTripName}
                onChangeText={newTripName => this.setState({ newTripName })} />
              <TextInput
                label='Description'
                value={this.state.tripDescription}
                onChangeText={tripDescription => this.setState({ tripDescription })} />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => { this.addNewTrip() }}>Yes</Button>
              <Button onPress={this._hideDialog}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Portal>
          <Dialog
            visible={this.state.visibleDialogEdit}
            onDismiss={this._hideDialogEdit}>
            <Dialog.Title>Edit</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label='Trip Name'
                value={this.state.editTripName}
                onChangeText={editTripName => this.setState({ editTripName })} />
              <TextInput
                label='Description'
                value={this.state.tripDescription}
                onChangeText={tripDescription => this.setState({ tripDescription })} />
            </Dialog.Content>
            <Button color="red" mode="contained" onPress={() => { this.deleteTrip(this.state.tripNameId) }} ><Icon name="trash-o" color="white" size={20} /> DELETE </Button>
            <Dialog.Actions>
              <Button onPress={() => { this.editTripName(this.state.tripNameId) }}>Yes</Button>
              <Button onPress={this._hideDialogEdit}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    ipreducer: state.ipreducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProfile: (email, firstname, lastname, token) => {
      dispatch({
        type: 'ADD_PROFILE',
        email: email,
        firstname: firstname,
        lastname: lastname,
        token: token
      })
    },
    push: location => {
      dispatch(push(location))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(trip)