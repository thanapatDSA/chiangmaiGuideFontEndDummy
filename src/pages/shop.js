import React, { Component } from 'react'
import { Image, FlatList, Text, View, Alert, TextInput, ScrollView } from 'react-native';
import styles from '../utilities/styles'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Avatar, Button, Card, Title, Paragraph, Appbar } from 'react-native-paper';
import axios from 'axios';

class shop extends Component {
  state = {
    shopProduct: [],
    shopData: []
  }

  UNSAFE_componentWillMount() {
    console.log('====================================');
    console.log("Shop props:", this.props.location.state.shop);

    console.log('====================================');
    axios.get(`https://chiangmai.thaimarket.guide/shop/${this.props.location.state.shop.id}`)
      .then(response => {
        const data = response.data.data
        console.log('====================================');
        console.log('DATA RES:', data);
        console.log('====================================');
        this.setState({ shopProduct: data.products })
        console.log('Product:', this.state.shopProduct);
      })
      .catch(err => {
        console.log('====================================');
        console.log("Error :", err);
        console.log('====================================');
      })
  }
  backToShoplists = () => {
    this.props.history.push('/menu', { index: 0 })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Appbar.Header style={{ backgroundColor: '#3F51B5' }}>
            <Appbar.BackAction
              onPress={() => { this.backToShoplists() }}
            />
            <Appbar.Content
              title="Shop"
              subtitle={this.props.location.state.shop.lang.th.name}
            />
          </Appbar.Header>
        </View>
        <View style={styles.body}>
          <ScrollView>
            <Card>
              <Card.Title title={this.props.location.state.shop.lang.th.name} subtitle={this.props.location.state.shop.category} />
              <Card.Cover source={{ uri: this.props.location.state.shop.image }} style={{ marginVertical: 3 }} />
              <Card.Content>
                <Paragraph>{this.props.location.state.shop.lang.th.description}</Paragraph>
              </Card.Content>
            </Card>
            <FlatList
              data={this.state.shopProduct}
              numColumns={2}
              renderItem={({ item }) =>
                <Card style={{ justifyContent: 'center', width: '50%', margin: 3, }}>
                  <Card.Title title={item.lang.th.name}
                    titleStyle={{
                      fontSize: 15,
                      textAlign: 'center',
                    }} />
                  <Card.Cover source={{ uri: item.image }} style={{
                    width: '100%',
                    alignContent: 'center',
                    marginVertical: 3,
                  }} />
                  <Card.Content>
                    <Paragraph>{item.lang.th.description}</Paragraph>
                  </Card.Content>
                </Card>
              }
            />
          </ScrollView>
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

export default connect(null, mapDispatchToProps)(shop)