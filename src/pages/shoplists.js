import React, { Component } from 'react'
import { Image, FlatList, Text, View, Alert, DrawerLayoutAndroid, TouchableOpacity } from 'react-native';
import styles from '../utilities/styles'
import { Header } from '../components/header'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import axios from 'axios'
import { Avatar, Button, Card, Title, Paragraph, Drawer, Appbar, ActivityIndicator, Colors } from 'react-native-paper';
import _ from 'lodash'

const foodShop = ["ร้านอาหาร (และเครื่องดื่ม)", "อาหารไทย", "อาหารเอเชีย"]
const market = ["ร้านค้า", "ของที่ระลึก", "ศูนย์การค้า", "ตลาด", "เครื่องประดับ"]
const fashion = ["แฟชั่นสตรี", "แฟชั่นบุรุษ"]
const cafe = ["คาเฟ่และของหวาน", "ร้านอาหาร (และเครื่องดื่ม)"]
const other = ["บริการต่างๆ", "สินค้าเบ็ดเตล็ด และอื่นๆ", "เฟอร์นิเจอร์และของตกแต่งบ้าน", "ของที่ระลึก", "ต้นไม้และอุปกรณ์ทำสวน", "ของเก่า ของสะสม", "สุขภาพและความงาม"]

class shoplists extends Component {
  state = {
    shoplists: [],
    shopFilter: [],
    offset: 0,
    limit: 100,
    Refresh: false,
    active: 'ร้านค้าทั้งหมด',
    openDrwer: false,
    refreshing: false,
    isLoading: false,
  }

  UNSAFE_componentWillMount() {
    this.loadShoplist()
  }

  loadShoplist = () => {
    axios.get('https://chiangmai.thaimarket.guide/shop'
      , { params: { offset: this.state.offset, limit: this.state.limit } }
    )
      .then(response => {
        this.setState({ shoplists: response.data.data, shopFilter: response.data.data })
        console.log('====================================');
        console.log("Shop DATA:", this.state.shoplists);
        console.log('====================================');
        this.setState({ isLoading: true })
      })
      .catch(err => {
        console.log('====================================');
        console.log("shop err:", err);
        console.log('====================================');
        this.setState({ isLoading: true })
      })
  }

  allShopFilter = () => {
    this.setState({ isLoading: false })
    const shop = this.state.shoplists
    this.setState({ shopFilter: shop })
    this.setState({ Refresh: true })
    this.setState({ isLoading: true })
  }
  shopFilter = () => {
    this.setState({ isLoading: false })
    const shop = this.state.shoplists.filter(shop => {
      return _.includes(market, shop.category)
    })
    this.setState({ shopFilter: shop })
    this.setState({ Refresh: true })
    this.setState({ isLoading: true })

  }
  foodFilter = () => {
    this.setState({ isLoading: false })
    const shop = this.state.shoplists.filter(shop => {
      return _.includes(foodShop, shop.category)
    })
    this.setState({ shopFilter: shop })
    this.setState({ Refresh: true })
    this.setState({ isLoading: true })

  }
  fashionFilter = () => {
    this.setState({ isLoading: false })
    const shop = this.state.shoplists.filter(shop => {
      return _.includes(fashion, shop.category)
    })
    this.setState({ shopFilter: shop })
    this.setState({ Refresh: true })
    this.setState({ isLoading: true })

  }
  cafeFilter = () => {
    this.setState({ isLoading: false })
    const shop = this.state.shoplists.filter(shop => {
      return _.includes(cafe, shop.category)
    })
    this.setState({ shopFilter: shop })
    this.setState({ Refresh: true })
    this.setState({ isLoading: true })

  }
  otherFilter = () => {
    this.setState({ isLoading: false })
    const shop = this.state.shoplists.filter(shop => {
      return _.includes(other, shop.category)
    })
    this.setState({ shopFilter: shop })
    this.setState({ Refresh: true })
    this.setState({ isLoading: true })

  }

  navigationView = (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Drawer.Section title="หนวดหมู่">
        <Button
          mode={this.state.active !== 'ร้านค้าทั้งหมด' ? 'text' : 'contained'}
          onPress={() => { this.setState({ active: 'ร้านค้าทั้งหมด', isLoading: false }), this.allShopFilter() }}
        >
          ร้านค้าทั้งหมด
      </Button>
        <Button mode={this.state.active !== 'ร้านค้า' ? 'text' : 'contained'}
          onPress={() => { this.setState({ active: 'ร้านค้า', isLoading: false }), this.shopFilter() }}
        >
          ร้านค้า
      </Button>
        <Button mode={this.state.active !== 'แฟชั่น' ? 'text' : 'contained'}
          onPress={() => { this.setState({ active: 'แฟชั่น', isLoading: false }), this.foodFilter() }}
        >
          แฟชั่น
      </Button>
        <Button
          mode={this.state.active !== 'คาเฟ่' ? 'text' : 'contained'}
          onPress={() => { this.setState({ active: 'คาเฟ่', isLoading: false }), this.cafeFilter() }}
        >
          คาเฟ่
      </Button>
        <Button mode={this.state.active !== 'อื่นๆ' ? 'text' : 'contained'}
          onPress={() => { this.setState({ active: 'อื่นๆ', isLoading: false }), this.otherFilter() }}
        >
          อื่นๆ
      </Button>
      </Drawer.Section>
    </View>
  )

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
    console.log("shopFilter", this.state.shopFilter);

    return (
      <View style={styles.container}>
        <DrawerLayoutAndroid
          drawerWidth={200}
          drawerPosition={DrawerLayoutAndroid.positions.Right}
          renderNavigationView={() => this.navigationView}
        >
          <Appbar.Header style={{ backgroundColor: '#3F51B5' }}>
            <Appbar.Content
              title={this.state.active}
            />
            <Appbar.Action icon="filter-list" onPress={() => { this.openDrawer }} />
          </Appbar.Header>
          <View style={styles.body}>
            {!this.state.isLoading ?
              <ActivityIndicator
                style={{
                  height: "100%",
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                size='large'
                animating={true}
                color={Colors.red800} />
              :
              <FlatList
                data={this.state.shopFilter}
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
              />
            }
          </View>
        </DrawerLayoutAndroid>
      </View>
    )
  }
}


export default connect(null, { push })(shoplists)