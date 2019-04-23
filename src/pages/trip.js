import React, { Component } from 'react'
import { Image, StyleSheet, Text, View, Alert, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../utilities/styles'
import { Header } from '../components/header'
import { Button, Drawer, Avatar, Card, Title, TextInput, Dialog, Portal } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux'
import { push } from 'connected-react-router'


class trip extends Component {
  state = {
    isLogin: false,
    visibleDialog: false,
    visibleDialogEdit: false,
    editTripName: '',
    newTripName: '',
    tripName: [
      {
        id: 7,
        tripName: "ทริปอะไรไปได้หมด",
        userData: {
          id: 5,
          email: "in-in@hotmail.com",
          firstName: "Thanapat",
          lastName: "555555",
          image: null
        }
      },
      {
        id: 8,
        tripName: "ทริปอะไรไปได้หมด",
        userData: {
          id: 5,
          email: "in-in@hotmail.com",
          firstName: "Thanapat",
          lastName: "555555",
          image: null
        }
      }
    ]
  }

  UNSAFE_componentWillMount() {
    const { profile } = this.props
    if (this.props.profile.length > 0) {
      this.setState({ isLogin: !this.state.isLogin })
    }
  }

  _showDialog = () => this.setState({ visibleDialog: true });

  _hideDialog = () => this.setState({ visibleDialog: false });

  _showDialogEdit = () => this.setState({ visibleDialogEdit: true });

  _hideDialogEdit = () => this.setState({ visibleDialogEdit: false });

  tripNamePress = (tripName) => {
    const { push } = this.props
    push('/TripData', { tripName: tripName })
  }
  editTripnamePress = () => {
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
                      marginVertical: 3
                    }}
                    onPress={() => { this.tripNamePress(item.tripName) }}
                  >
                    <Card >
                      <Card.Title titleStyle={{ fontSize: 18, }}
                        title={item.tripName}
                        right={(props) =>
                          <Button onPress={() => { this.editTripnamePress() }} ><Icon name="edit" size={30} /></Button>}
                        onPress={() => {
                          this.tripNamePress(item.tripName)
                        }}
                      />
                    </Card>
                  </TouchableOpacity>
                }
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
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this._hideDialog}>Yes</Button>
              <Button onPress={this._hideDialog}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Portal>
          <Dialog
            visible={this.state.visibleDialogEdit}
            onDismiss={this._hideDialogEdit}>
            <Dialog.Title>Edit Trip Name</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label='New Trip Name'
                value={this.state.editTripName}
                onChangeText={editTripName => this.setState({ editTripName })} />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this._hideDialogEdit}>Yes</Button>
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
    profile: state.profile
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