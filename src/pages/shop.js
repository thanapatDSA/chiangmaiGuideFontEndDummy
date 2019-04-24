import React, { Component } from 'react'
import { Image, FlatList, Text, View, Alert, ScrollView, Modal } from 'react-native';
import styles from '../utilities/styles'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Avatar, Button, Card, Drawer, Paragraph, Appbar, TextInput, HelperText, Dialog, Portal } from 'react-native-paper';
import StarRating from 'react-native-star-rating';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Map from '../components/mapModel'
import MapView, { Marker } from 'react-native-maps'

class shop extends Component {
  state = {
    isShowYes: false,
    isLogin: false,
    refreshing: false,
    TripNameSelectId: '',
    TripNameSelect: '',
    visibleDialog: false,
    shopProduct: [],
    shopData: [],
    selectedStar: 0,
    text: '',
    isShowMap: false,
    location: {},
    user: '',
    rateing: 0,
    RateStarEmpty: false,
    comments: [],
    tripName: [],
    isCheckComment: false,
    idUser: '',
    visibleEditDialog: false,
    editReview: '',
    commentId: '',
    visibleRemoveDialog: false,
  }

  UNSAFE_componentWillMount() {
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

    const { profile } = this.props
    if (this.props.profile.length > 0) {
      this.setState({ isLogin: !this.state.isLogin })
    }

    this.loadShopReview()
    this.setState({
      user: this.props.profile[0].firstname,
      idUser: this.props.profile[0].id
    })
  }

  calStar = () => {
    this.setState({ rateing: this.state.comments.reduce((prev, rateing) => { return prev + rateing.rateing }, 0) / this.state.comments.length })
  }

  loadShopReview = () => {
    const { profile, ipreducer } = this.props
    axios({
      method: 'get',
      url: `${this.props.ipreducer.ip}/review/shopId/${this.props.location.state.shop.id}`,
    })
      .then((res) => {
        this.setState({ comments: res.data })
        console.log("comments:", this.state.comments);
        this.calStar()
      })
      .catch((err) => {
        console.log("error", err);
      })
  }



  addReview = (text, rate) => {
    const { profile, ipreducer } = this.props
    axios({
      method: 'post',
      url: `${this.props.ipreducer.ip}/review/add/${this.props.profile[0].id}`,
      headers: { 'Authorization': `Bearer ${this.props.profile[0].token}` },
      data: {
        shopId: this.props.location.state.shop.id,
        rateing: rate,
        comment: text
      }
    })
      .then((res) => {
        console.log("addReview:", res);
        this.setState({ text: '' })
        this.loadShopReview()
      })
      .catch((err) => {
        console.log("error", err);
      })
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
      })
      .catch((err) => {
        console.log("error", err);
      })
  }


  _showDialog = () => this.setState({ visibleDialog: true });

  _hideDialog = () => this.setState({ visibleDialog: false, TripNameSelect: '', TripNameSelectId: '' });

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




  onSendComment = (text, rate) => {
    if (this.state.selectedStar == 0) {
      this.setState({ RateStarEmpty: true })
    } else {
      this.addReview(text, rate)
      console.log(text, rate);

    }
  }


  editPress = (id, comment) => {
    this.setState({ commentId: id, editReview: comment, visibleEditDialog: true })
  }


  editReview = () => {

    const { profile, ipreducer } = this.props
    axios({
      method: 'put',
      url: `${this.props.ipreducer.ip}/review/edit/${this.state.commentId}`,
      headers: { 'Authorization': `Bearer ${this.props.profile[0].token}` },
      data: {
        shopId: this.props.location.state.shop.id,
        rateing: this.state.selectedStar,
        comment: this.state.editReview
      }
    })
      .then((res) => {
        console.log("Review:", res);
        this.setState({ selectedStar: 0, commentId: '', editReview: '' })
        this.loadShopReview()
        this.setState({ visibleEditDialog: false })
      })
      .catch((err) => {
        console.log("error", err);
        this.setState({ selectedStar: 0, commentId: '', editReview: '' })
        this.setState({ visibleEditDialog: false })
      })

  }


  removePress = (id) => {
    this.setState({ commentId: id, visibleRemoveDialog: true })
  }

  removeReview = () => {
    const { profile, ipreducer } = this.props
    axios({
      method: 'delete',
      url: `${this.props.ipreducer.ip}/review/delete/${this.state.commentId}`,
      headers: { 'Authorization': `Bearer ${this.props.profile[0].token}` },
    })
      .then((res) => {
        console.log("Review:", res);
        this.setState({ selectedStar: 0, commentId: '' })
        this.loadShopReview()
        this.setState({ visibleRemoveDialog: false, isCheckComment: !this.state.isCheckComment })
      })
      .catch((err) => {
        console.log("error", err);
        this.setState({ selectedStar: 0, commentId: '' })
        this.setState({ visibleRemoveDialog: false })
      })
  }


  _hideDialogEdit = () => this.setState({ visibleEditDialog: false });
  _hideDialogRemove = () => this.setState({ visibleRemoveDialog: false });

  addToTrip = (shopId, id) => {
    // console.log("tripName", tripName, id);
    const { profile, ipreducer } = this.props
    axios({
      method: 'post',
      url: `${this.props.ipreducer.ip}/trip/list/${id}`,
      headers: { 'Authorization': `Bearer ${this.props.profile[0].token}` },
      data: {
        shopId: shopId,
        shopName: this.props.location.state.shop.lang.th.name,
        shopCategory: this.props.location.state.shop.category,
        oreder: id
      }
    })
      .then((res) => {
        console.log("data:", this.state.tripName);
        this.setState({ visibleDialog: false, TripNameSelect: '', TripNameSelectId: '' })
      })
      .catch((err) => {
        console.log("error", err);
        this.setState({ visibleDialog: false, TripNameSelect: '', TripNameSelectId: '' })
      })


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
                  disabled={!this.state.isLogin}
                  onPress={() => {
                    this.loadTripName(),
                      this.setState({ visibleDialog: true })
                  }}>
                  <Icon size={18} name="bookmark" />  Add to trip
                   </Button>
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
                      <StarRating maxStars={5} rating={item.rateing} disabled={false} starSize={15} starStyle={{ marginRight: 10 }} fullStarColor={'#ffb819'} />}
                    title={item.userData.firstName}
                    titleStyle={{
                      fontSize: 15,
                    }} />
                  <Card.Content>
                    <Paragraph>{item.comment}</Paragraph>
                  </Card.Content>

                  {item.userData.id === this.state.idUser ?
                    <Card.Actions style={{ alignSelf: 'flex-end' }}>
                      <Button onPress={() => {
                        this.editPress(item.id, item.comment)
                      }}>
                        edit
                    </Button>
                      <Button onPress={() => {
                        this.removePress(item.id)
                      }}>
                        remove
                    </Button >
                      {this.setState({ isCheckComment: true, selectedStar: item.rateing })}
                    </Card.Actions>

                    :
                    <Card.Content></Card.Content>


                  }

                </Card>
              }
            />



            {this.state.isLogin ?

              <View>
                {!this.state.isCheckComment ?
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
                      title={this.state.user}
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
                        visible={(this.state.text.length >= 70) ? true : false}
                      >
                        {console.log(this.state.text.length)
                        }
                        Not length more 70 characters
              </HelperText>
                      <Button
                        mode="contained"
                        onPress={() => {
                          console.log("Press");
                          this.onSendComment(this.state.text, this.state.selectedStar)
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


                  :

                  <View />


                }
              </View>
              :
              <Card style={{
                height: 50,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Card.Content>
                  <Button onPress={() => { this.props.history.push('/login') }}>Plese Login To Review</Button>
                </Card.Content>
              </Card>
            }

          </ScrollView>
        </View>
        <Portal>
          <Dialog
            visible={this.state.visibleDialog}
            onDismiss={this._hideDialog}>
            <Dialog.Title>Select Trip</Dialog.Title>
            <Dialog.Content>
              <Drawer.Section>
                <FlatList
                  data={this.state.tripName}
                  renderItem={({ item }) =>
                    <Drawer.Item
                      label={item.tripName}
                      active={item.id === this.state.TripNameSelectId ? true : false}
                      onPress={() => {
                        this.setState({ TripNameSelectId: item.id }),
                          this.setState({ TripNameSelect: item.tripName }),
                          this.setState({ refreshing: !this.state.refreshing })
                      }}
                    >{console.log(item.id === this.state.TripNameSelectId ? true : false)}</Drawer.Item>
                  }
                  refreshing={this.state.refreshing}
                />
              </Drawer.Section>
            </Dialog.Content>
            <Dialog.Actions>
              <Button disabled={this.state.TripNameSelectId !== '' ? false : true}
                onPress={() => { this.addToTrip(this.props.location.state.shop.id, this.state.TripNameSelectId) }}>
                Yes</Button>
              <Button onPress={this._hideDialog}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Portal>
          <Dialog
            visible={this.state.visibleEditDialog}
            onDismiss={this._hideDialogEdit}>
            <Dialog.Title>Edit</Dialog.Title>
            <Dialog.Content>
              <StarRating
                maxStars={5}
                rating={this.state.selectedStar}
                disabled={false}
                starSize={30}
                starStyle={{ marginRight: 5 }}
                fullStarColor={'#ffb819'}
                selectedStar={(rating) => this.onStarRatingPress(rating)} />
              <Text> </Text>
              <TextInput
                label='Someting new'
                value={this.state.editReview}
                onChangeText={editReview => this.setState({ editReview })} />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => { this.editReview() }}>Yes</Button>
              <Button onPress={this._hideDialogEdit}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Portal>
          <Dialog
            visible={this.state.visibleRemoveDialog}
            onDismiss={this._hideDialogRemove}>
            <Dialog.Title>Delete</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Are you sure to delete this review</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => { this.removeReview() }}>Yes</Button>
              <Button onPress={this._hideDialogRemove}>Cancel</Button>
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
    push: location => {
      dispatch(push(location))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(shop)