import React, { Component } from 'react'
import { Image, StyleSheet, Text, View, Alert, TextInput, TouchableOpacity } from 'react-native';
import styles from '../utilities/styles'
import { Header } from '../components/header'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Button, Drawer, Avatar, Card } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'

class profile extends Component {
  state = {
    isLogin: false,
    firstName: 'Thanapat',
    lastName: 'DSA',
    email: 'in-ni-in@gafafs.xxx',
    pic: 'https://www.orthocaremedical.com/wp-content/uploads/person-icon.png'
  }
  UNSAFE_componentWillMount() {
    this.loadProfile()
    const { profile } = this.props
    console.log('====================================');
    // console.log(this.props.profile[0]);
    console.log("email:",this.props.profile[0].email);
    console.log("email:",this.props.profile[0].token);
    console.log('====================================');
    if (this.props.profile.length > 0) {
      this.setState({ isLogin: !this.state.isLogin })
    }
  }

  loadProfile = () => {
    const { profile } = this.props
    console.log("email:",this.props.profile[0].email);

    axios({
      method: 'get',
      url: `http://34.230.73.139:8888/user/${this.props.profile[0].email}`,
      headers: { 'Authorization': `Bearer ${this.props.profile[0].token}` }
    })
      .then((res) => {
        console.log("res:",res);
      })
      .catch((err) => {
        console.log("error",err);
      })

  }

  logoutPress = () => {
    const { profile } = this.props
    this.props.logout()
    this.props.push('/login')
  }
  editProfilePress = () => {
    const { profile } = this.props
    this.props.editProfile(this.props.profile[0].email, "Frist", "Last", "KenKenHo")
    // this.props.push('/editProfile')
    console.log('====================================');
    console.log(this.props.profile);
    console.log('====================================');
  }

  goToLogin = () => {
    const { push } = this.props
    push('/login')
  }
  render() {
    return (
      <View style={styles.container}>
        <Header textHeader='Profile' colorBar='#607D8B' />
        {this.state.isLogin ?
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
                      onPress={() => { this.editProfilePress() }}
                    />
                    <Drawer.Item
                      label="Logout"
                      onPress={() => { this.logoutPress() }}
                    />
                  </Drawer.Section>
                </Card.Content>
              </Card>
            </View>
          </View>

          :

          <View style={styles.body}>
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
                <Button mode="contained" onPress={() => { this.goToLogin() }}>Plese Login To See Profile</Button>
              </Card.Content>
            </Card>
          </View>
        }
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
    editProfile: (email, firstname, lastname, token) => {
      dispatch({
        type: 'EDIT_PROFILE',
        email: email,
        firstname: firstname,
        lastname: lastname,
        token: token
      })
    },
    logout: () => {
      dispatch({
        type: 'LOGOUT',
      })
    },
    push: location => {
      dispatch(push(location))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(profile)


