import React, { Component } from 'react'
import { Image, FlatList, Text, View, Alert, ScrollView, Modal } from 'react-native';
import styles from '../utilities/styles'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Avatar, Button, Card, Title, Paragraph, Appbar, TextInput, HelperText } from 'react-native-paper';
import StarRating from 'react-native-star-rating';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Map from '../components/mapModel'
import MapView, { Marker } from 'react-native-maps'

class shop extends Component {
  state = {
    shopProduct: [],
    shopData: [],
    selectedStar: 0,
    text: '',
    isShowMap: false,
    location: {},
    user: {
      username: 'ABC'
    },
    rateing: 0,
    RateStarEmpty: false,
    comments: [{
      name: 'ToyToy',
      comment: 'AHHHHHHHHHHHHHH',
      rate: 4
    },
    {
      name: 'Toy2',
      comment: 'WoWWWWW',
      rate: 3
    },
    ]
  }

  UNSAFE_componentWillMount() {
    const rateTotal = this.state.comments.reduce((prev, rate) => { return prev + rate.rate }, 0)
    this.setState({ rateing: rateTotal / this.state.comments.length })
    console.log("rate total:", rateTotal);
    this.setState({
      location: {
        latitude: parseFloat(this.props.location.state.shop.location.latitude),
        longitude: parseFloat(this.props.location.state.shop.location.longitude)
      }
    })

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

  componentDisMount() {
    const rateTotal = this.state.comments.reduce((prev, rate) => { return prev + rate.rate }, 0)
    this.setState({ rateing: rateTotal / this.state.comments.length })
  }
  backToShoplists = () => {
    this.props.history.push('/menu', { index: this.props.location.state.index })
  }
  colorBarIndex = (index) => {
    if (index == 0) {
      return '#3F51B5' //from Shoplists Page
    } else if (index == 1) {
      return '#009688' //from Fav Page
    } else if (index == 2) {
      return '#795548' //from Map Page
    } else {
      return '#607D8B' //from profile Page
    }
  }
  onStarRatingPress = (rateing) => {
    this.setState({ selectedStar: rateing })
  }
  onSendComment = (name, text, rate) => {
    if (this.state.selectedStar == 0) {
      this.setState({ RateStarEmpty: true })
    } else {
      this.setState({
        comments: [...this.state.comments, {
          name: name,
          comment: text,
          rate: rate
        }]
      })
    }
  }
  render() {
    console.log("location:", this.state.location);

    return (

      <View style={styles.container}>
        <Modal
          visible={this.state.isShowMap}
        >
          <View style={styles.header}>
            <Appbar.Header style={{ backgroundColor: this.colorBarIndex(this.props.location.state.index) }}>
              <Appbar.BackAction
                onPress={() => { this.setState({ isShowMap: false }) }}
              />
              <Appbar.Content
                title="Map"
              />
            </Appbar.Header>
          </View>
          <View style={styles.bodyMap}>
            <View style={styles.mapContainer}>
              <MapView style={styles.map}
                initialRegion={{
                  latitude: 18.802587,
                  longitude: 98.9529,
                  latitudeDelta: 0.03,
                  longitudeDelta: 0.03,
                }} >
                <MapView.Marker
                  key={1}
                  coordinate={this.state.location}
                  title={this.props.location.state.shop.lang.th.name}
                  description={this.props.location.state.shop.category}
                >
                  <Image
                    source={require('../images/map-icons/default.png')}
                    style={{ width: 22, height: 29 }}
                  />
                </MapView.Marker>
              </MapView>
            </View>
          </View>
        </Modal>
        <View style={styles.header}>
          <Appbar.Header style={{ backgroundColor: this.colorBarIndex(this.props.location.state.index) }}>
            <Appbar.BackAction
              onPress={() => { this.backToShoplists() }}
            />
            <Appbar.Content
              title="Store"
              subtitle={this.props.location.state.shop.lang.th.name}
            />
          </Appbar.Header>
        </View>
        <View style={styles.body}>
          <ScrollView>
            <Card style={styles.surface}>
              <Card.Title
                right={(rateing) =>
                  <StarRating maxStars={5} rating={this.state.rateing} starSize={18} starStyle={{ marginRight: 10 }} fullStarColor={'#ffb819'} />
                }
                title={this.props.location.state.shop.lang.th.name} subtitle={this.props.location.state.shop.category} />
              <Card.Cover source={{ uri: this.props.location.state.shop.image }} style={{ marginVertical: 3 }} />
              <Card.Content>
                <Paragraph>{this.props.location.state.shop.lang.th.description}</Paragraph>
              </Card.Content>
              <Card.Actions style={{ alignSelf: 'flex-end' }}>
                <Button
                  onPress={() => {
                    this.setState({ isShowMap: true })
                  }}><Icon size={20} name="map-marked-alt" /> MAP</Button>
              </Card.Actions>
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

            <FlatList
              data={this.state.comments}
              renderItem={({ item }) =>
                <Card style={styles.surface}>
                  <Card.Title
                    left={(props) => <Avatar.Icon {...props} icon="person" />}
                    right={(props) =>
                      <StarRating maxStars={5} rating={item.rate} disabled={false} starSize={15} starStyle={{ marginRight: 10 }} fullStarColor={'#ffb819'} />}
                    title={item.name}
                    titleStyle={{
                      fontSize: 15,
                    }} />
                  <Card.Content>
                    <Paragraph>{item.comment}</Paragraph>
                  </Card.Content>
                </Card>
              }
            />
            <Card
              disabled={false}
              style={styles.surface}>
              <Card.Title
                left={(props) => <Avatar.Icon {...props} icon="person" />}
                right={() =>
                  <StarRating
                    maxStars={5}
                    rating={this.state.selectedStar}
                    disabled={false}
                    starSize={15}
                    starStyle={{ marginRight: 10 }}
                    fullStarColor={'#ffb819'}
                    selectedStar={(rating) => this.onStarRatingPress(rating)} />}
                title={this.state.user.username}
                titleStyle={{
                  fontSize: 15,
                }} />
              <Card.Content>
                <TextInput
                  label='Comment'
                  value={this.state.text}
                  onChangeText={text => this.setState({ text: text })}
                />
                <HelperText
                  type="error"
                  visible={(this.state.text.length >= 10) ? true : false}
                >
                  {console.log(this.state.text.length)
                  }
                  Not length more 70 characters
                </HelperText>
                <Button
                  mode="contained"
                  onPress={() => {
                    console.log("Press");

                    this.onSendComment(this.state.user.username, this.state.text, this.state.selectedStar)
                  }}>
                  SEND
                </Button>
                <HelperText
                  type="error"
                  visible={this.state.RateStarEmpty}
                >
                  Plese put some rate score
                </HelperText>
              </Card.Content>
            </Card>
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