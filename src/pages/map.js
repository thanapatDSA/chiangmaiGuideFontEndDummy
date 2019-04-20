import React, { Component } from 'react'
import { Image, FlatList, Text, View, Alert, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import styles from '../utilities/styles'
import { Header } from '../components/header'
import axios from 'axios'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

class map extends Component {
  state = {
    shoplists: [],
    location: []
  }
  UNSAFE_componentWillMount() {
    axios.get('https://chiangmai.thaimarket.guide/shop'
      , { params: { offset: 0, limit: 100 } }
    )
      .then(response => {
        this.setState({ shoplists: response.data.data })
        for (let index = 0; index < response.data.data.length; index++) {
          // console.log("Shop DATA:", this.state.shoplists[index].category)
          this.setState({
            location: [...this.state.location, {
              title: response.data.data[index].lang.th.name,
              coordinates: {
                latitude: parseFloat(response.data.data[index].location.latitude),
                longitude: parseFloat(response.data.data[index].location.longitude)
              }
            }]
          })
        }
      })
      .catch(err => {
        console.log('====================================');
        console.log("shop err:", err);
        console.log('====================================');
      })
  }

  goToShop = (item) => {
    const { push } = this.props
    push('/shop', { shop: item, index: 2 })
  }

  mapIcon = (category) => {
    if (category === 'ร้านค้า') {
      return require('../images/map-icons/retail-stores.png')
    } else if (category === 'ตลาด') {
      return require('../images/map-icons/retail-stores.png')
    } else if (category === 'ศูนย์การค้า') {
      return require('../images/map-icons/shopping.png')
    } else if (category === 'ร้านอาหาร (และเครื่องดื่ม)') {
      return require('../images/map-icons/restaurants.png')
    } else if (category === 'อาหารไทย') {
      return require('../images/map-icons/restaurants.png')
    } else if (category === 'อาหารเอเชีย') {
      return require('../images/map-icons/restaurants.png')
    } else if (category === 'คาเฟ่และของหวาน') {
      return require('../images/map-icons/coffee-n-tea.png')
    } else if (category === 'เครื่องประดับ') {
      return require('../images/map-icons/matrimonial.png')
    } else if (category === 'บริการต่างๆ') { 
      return require('../images/map-icons/community.png')
    } else if (category === 'สินค้าเบ็ดเตล็ด และอื่นๆ') {
      return require('../images/map-icons/exhibitions.png')
    } else if (category === 'ของที่ระลึก') {
      return require('../images/map-icons/exhibitions.png')
    } else if (category === 'เฟอร์นิเจอร์และของตกแต่งบ้าน') {
      return require('../images/map-icons/furniture-stores.png')
    } else if (category === 'ต้นไม้และอุปกรณ์ทำสวน') {
      return require('../images/map-icons/furniture-stores.png')
    } else if (category === 'ของเก่า ของสะสม') {
      return require('../images/map-icons/manufacturing.png')
    } else if (category === 'สุขภาพและความงาม') {
      return require('../images/map-icons/medical.png')
    } else if (category === 'แฟชั่นสตรี') {
      return require('../images/map-icons/fashion.png')
    } else if (category === 'แฟชั่นบุรุษ') {
      return require('../images/map-icons/fashion.png')
    } else {
      return require('../images/map-icons/default.png')
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Header textHeader='Map' colorBar='#795548' />
        <View style={styles.bodyMap}>
          <View style={styles.mapContainer}>
            <MapView style={styles.map}
              initialRegion={{
                latitude: 18.802587,
                longitude: 98.9529,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03,
              }} >
              {this.state.location.map((marker, index) => (
                <MapView.Marker
                  key={index}
                  coordinate={marker.coordinates}
                  title={marker.title}
                  description={this.state.shoplists[index].category}
                  onCalloutPress={() => { this.goToShop(this.state.shoplists[index]) }}
                >
                  <Image
                    source={this.mapIcon(this.state.shoplists[index].category)}
                    style={{ width: 22, height: 29 }}
                  />
                </MapView.Marker>
              ))}
            </MapView>
          </View>
        </View>
      </View>
    )
  }
}

export default connect(null, { push })(map)