import React, { Component } from 'react'
import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../utilities/styles'
import { Button, TextInput, HelperText, Avatar, Appbar, Card, Drawe, Snackbar } from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import axios from 'axios'

class editProfile extends Component {
  state = {
    firstname: '',
    lastname: '',
    visible: false,
  }
  editPress = (firstname, lastname) => {
    const { profile, ipreducer } = this.props
    axios({
      method: 'put',
      url: `${this.props.ipreducer.ip}/user/edit/${this.props.profile[0].id}`,
      headers: { 'Authorization': `Bearer ${this.props.profile[0].token}` },
      data: {
        firstName: firstname,
        lastName: lastname
      }
    })
      .then(() => {
        this.backToProfile()
      })
      .catch((err) => {
        this.setState({ visible: true })
        console.log(err)
      })

  }
  backToProfile = () => {
    this.props.history.push('/menu', { index: 3 })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Appbar.Header style={{ backgroundColor: '#607D8B' }}>
            <Appbar.BackAction
              onPress={() => { this.backToProfile() }}
            />
            <Appbar.Content
              title="Edit Profile"
            />
          </Appbar.Header>
        </View>
        <View style={styles.bodyRegister}>
          <ScrollView>
            <TextInput
              mode="outlined"
              label="First name"
              value={this.state.firstname}
              onChangeText={firstname => this.setState({ firstname })} />
            <HelperText>
            </HelperText>
            <TextInput
              mode="outlined"
              label="Last name"
              value={this.state.lastname}
              onChangeText={lastname => this.setState({ lastname })} />
            <HelperText>
            </HelperText>
            <Button style={styles.button} mode="contained" onPress={() => this.editPress(this.state.firstname, this.state.lastname)}>
              Edit
          </Button>
          </ScrollView>
        </View>
        <Snackbar
          visible={this.state.visible}
          onDismiss={() => this.setState({ visible: false })}
          action={{
            label: 'Undo',
            onPress: () => {
              this.setState({ visible: false })
            },
          }}
        >
          Error to edit profile
        </Snackbar>
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
    push: location => {
      dispatch(push(location))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(editProfile)