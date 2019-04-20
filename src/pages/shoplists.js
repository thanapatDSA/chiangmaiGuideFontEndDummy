import React, { Component } from 'react'
import { Image, FlatList, Text, View, Alert, TextInput, TouchableOpacity } from 'react-native';
import styles from '../utilities/styles'
import { Header } from '../components/header'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import axios from 'axios'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

class shoplists extends Component {
  state = {
    shoplists: [],
    offset: 0,
    limit: 20,
    Refresh: false
  }

  UNSAFE_componentWillMount() {
    this.loadShoplist()
  }
  loadShoplist = () => {
    axios.get('https://chiangmai.thaimarket.guide/shop'
      , { params: { offset: this.state.offset, limit: this.state.limit } }
    )
      .then(response => {
        this.setState({ shoplists: [...this.state.shoplists, ...response.data.data] })
        console.log('====================================');
        console.log("Shop DATA:", this.state.shoplists);
        console.log('====================================');
        this.setState({ Refresh: false })
      })
      .catch(err => {
        console.log('====================================');
        console.log("shop err:", err);
        console.log('====================================');
        this.setState({ Refresh: false })
      })
  }

  loadShoplistMore = () => {
    if (this.state.offset === 100) {
      this.setState({ Refresh: false })
    } else {
      this.setState({
        offset: this.state.offset + this.state.limit,
        Refresh: true
      }, () => {
        this.loadShoplist()
      })
    }

  }

  goToShop = (item) => {
    const { push } = this.props
    push('/shop', { shop: item, index: 0 })
  }
  render() {
    return (
      <View style={styles.container}>
        <Header textHeader='Shoplists' colorBar='#3F51B5' />
        <View style={styles.body}>
          <FlatList
            data={this.state.shoplists}
            renderItem={({ item }) =>
              <Card
                style={styles.avatar}
                onPress={() => { this.goToShop(item) }}>
                <Card.Cover source={{ uri: item.image }} />
                <Card.Content style={styles.card}>
                  <Title>{item.lang.th.name}</Title>
                  <Paragraph>{item.category}</Paragraph>
                  <Paragraph
                    numberOfLines={2}
                  >{item.lang.th.description}</Paragraph>
                </Card.Content>
              </Card>
            }
            refreshing={this.state.Refresh}
            onRefresh={this.state.Refresh}
            onEndReached={this.loadShoplistMore}
            onEndThreshold={0}
          />
        </View>
      </View>
    )
  }
}


export default connect(null, { push })(shoplists)