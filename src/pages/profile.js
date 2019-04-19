import React, { Component } from 'react'
import { Image, StyleSheet, Text, View, Alert, TextInput, TouchableOpacity } from 'react-native';
import styles from '../utilities/styles'
import { Header } from '../components/header'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Button, Drawer, Avatar, Card } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
class profile extends Component {
  state = {
    firstName: 'Thanapat',
    lastName: 'DSA',
    email: 'in-ni-in@gafafs.xxx',
    pic: 'https://www.orthocaremedical.com/wp-content/uploads/person-icon.png'
  }
  render() {
    return (
      <View style={styles.container}>
        <Header textHeader='Profile' colorBar='#607D8B' />

        <View style={styles.body}>
          <View style={{ flex: 1 }}>
            <Card>
              <Card.Content style={{ height: '90%' }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                    <Avatar.Image style={styles.avatar} size={100} source={{ uri: this.state.pic }} />
                  </View>
                  <View style={{ flex: 2, marginLeft: 10, top: 7 }}>
                    <Text style={styles.welcome} ><Icon name={'user'} size={25} />  {this.state.firstName}  {this.state.lastName}</Text>
                    <Text style={styles.welcome} ><Icon name={'envelope'} size={25} />  {this.state.email} </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          </View>
          <View style={{ flex: 2.2 }}>
            <Card>
              <Card.Content>
                <Drawer.Section>
                  <Drawer.Item
                    label="Edit Profile"
                    onPress={() => { this.props.push('/editProfile') }}
                  />
                  <Drawer.Item
                    label="Change Password"
                    onPress={() => { this.props.push('/changePassword') }}
                  />
                  <Drawer.Item
                    label="Logout"
                    onPress={() => { this.props.push('/login') }}
                  />
                </Drawer.Section>
              </Card.Content>
            </Card>
          </View>
        </View>
      </View>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    push: location => {
      dispatch(push(location))
    }
  }
}


export default connect(null, mapDispatchToProps)(profile)


