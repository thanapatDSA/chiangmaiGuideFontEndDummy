import React, { Component } from 'react'
import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import styles from '../utilities/styles'
import { Avatar, Button, Card, Title, Paragraph, Appbar, TextInput, Portal, Dialog } from 'react-native-paper';
import DraggableFlatList from 'react-native-draggable-flatlist'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'

class tripData extends Component {

    state = {
        visibleDialog: false,
        refreshing: false,
        isShowEdit: false,
        isShowRemove: false,
        tripCancel: [],
        output: [],
        tripData: [],
        trip: {},
        tripDataId: '',
        shopData: [],
    }

    UNSAFE_componentWillMount() {
        console.log("location", this.props.history.location.state.item)
        this.setState({ trip: this.props.history.location.state.item })
        console.log("Trip", this.state.trip);

        this.loadTripData()
    }

    loadTripData = () => {
        const { profile } = this.props
        axios({
            method: 'get',
            url: `http://34.230.73.139:8888/trip/list/${this.props.history.location.state.item.id}`,
            headers: { 'Authorization': `Bearer ${this.props.profile[0].token}` }
        })
            .then((res) => {
                const dataRes = res.data
                this.setState({ tripData: res.data })
                this.setState({ shopData: [] })
                for (let index = 0; index < dataRes.length; index++) {
                    console.log("res Data Index:", dataRes[index]);
                    axios({
                        method: 'get',
                        url: `https://chiangmai.thaimarket.guide/shop/${dataRes[index].shopId}`
                    })
                        .then((shopRes) => {
                            this.state.shopData.push(
                                {
                                    id: dataRes[index].id,
                                    data: shopRes.data.data
                                }
                            )
                        })
                }
                console.log('====================================');
                console.log("shop data:", this.state.shopData);
                console.log('====================================');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    editTripData = () => {
        const { profile } = this.props
        axios({
            method: 'put',
            url: `http://34.230.73.139:8888/trip/list/edit/${this.props.history.location.state.item.id}`,
            headers: { 'Authorization': `Bearer ${this.props.profile[0].token}` },
            data: this.state.output
        })
            .then((res) => {
                console.log('====================================');
                console.log("res", res);
                console.log('====================================');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    removeTripData = (id) => {
        const { profile } = this.props
        axios({
            method: 'delete',
            url: `http://34.230.73.139:8888/trip/delete/list/${id}`,
            headers: { 'Authorization': `Bearer ${this.props.profile[0].token}` },
        })
            .then((res) => {
                console.log('====================================');
                console.log("res", res);
                console.log('====================================');
                this.setState({ tripDataId: '' })
                this.setState({ visibleDialog: false })
                this.loadTripData()
            })
            .catch((err) => {
                console.log(err);
                this.setState({ tripDataId: '' })
                this.setState({ visibleDialog: false })
            })
    }

    renderItem = ({ item, index, move, moveEnd, isActive }) => {
        return (
            <TouchableOpacity
                style={{
                    height: 85,
                    backgroundColor: isActive ? 'blue' : null,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onLongPress={move}
                onPressOut={moveEnd}
            >
                <Card style={{ width: '100%', height: "95%", }}>
                    {!this.state.isShowRemove ?
                        <Card.Title
                            left={(props) => <Avatar.Text  {...props} size={45} label={index + 1} />}
                            title={item.id}
                            subtitle={item.oreder}
                            titleStyle={{
                                fontSize: 15,
                            }} />
                        :
                        <Card.Title
                            left={(props) => <Avatar.Text  {...props} size={45} label={index + 1} />}
                            right={(props) =>
                                <Button icon="delete" color="red" onPress={() => { this.deletePress(item.id) }} />}
                            title={item.id}
                            subtitle={item.oreder}
                            titleStyle={{
                                fontSize: 15,
                            }} />
                    }
                </Card>
            </TouchableOpacity>
        )
    }

    _showDialog = () => this.setState({ visibleDialog: true });

    _hideDialog = () => this.setState({ visibleDialog: false });

    deletePress = (id) => {
        console.log("DEL");
        this.setState({ tripDataId: id })
        this.setState({ visibleDialog: true })
    }

    removePress = () => {
        this.setState({ isShowRemove: !this.state.isShowRemove })
        this.setState({ refreshing: !this.state.refreshing })
    }

    cancelEditPress = () => {
        // this.setState({ tripData: this.state.tripCancel })
        this.loadTripData()
        this.setState({ isShowEdit: !this.state.isShowEdit })
        this.setState({ isShowRemove: !this.state.isShowRemove })
    }

    editPress = () => {
        this.setState({ tripCancel: this.state.tripData })
        this.setState({ isShowEdit: !this.state.isShowEdit })
        this.setState({ isShowRemove: !this.state.isShowRemove })
    }

    savePress = () => {
        this.setState({ isShowEdit: !this.state.isShowEdit })
        this.setState({ isShowRemove: !this.state.isShowRemove })
        this.setState({ output: [] })
        this.state.tripData.map((item, index) => {
            this.state.output.push({
                id: item.id,
                oreder: index + 1
            }
            )
        }
        )
        console.log("output:", this.state.output)
        this.editTripData()
    }
    tripDataAdd = () => {
        this.props.history.push('/menu', { index: 0 })
    }

    render() {
        console.log('====================================');
        console.log("Show remove", this.state.isShowRemove);
        console.log('====================================');
        console.log("location", this.props)
        return (
            <View style={styles.container} >
                <View style={styles.header}>
                    <Appbar.Header style={{ backgroundColor: '#009688' }}>
                        <Appbar.BackAction
                            onPress={() => { this.props.history.push('/menu', { index: 1 }) }}
                        />
                        <Appbar.Content
                            title="Trip"
                        />
                    </Appbar.Header>
                </View>
                <View style={styles.body}>
                    <Card style={styles.surface}>
                        <Card.Title
                            title={this.state.trip.tripName} />
                        <Card.Content>
                            <Paragraph>รายละเอียด</Paragraph>
                        </Card.Content>
                        {!this.state.isShowEdit ?
                            <Card.Actions style={{ alignSelf: 'flex-end' }}>
                                <Button onPress={() => { this.editPress() }}>
                                    Edit
                                </Button>
                            </Card.Actions>
                            :
                            <Card.Actions style={{ alignSelf: 'flex-end' }}>
                                <Button onPress={() => { this.savePress() }}>
                                    Save
                                </Button>
                                <Button onPress={() => { this.cancelEditPress() }}>
                                    Cancel
                                </Button>
                            </Card.Actions>}
                    </Card>
                    {!this.state.isShowEdit ?
                        <ScrollView>
                            <FlatList
                                data={this.state.tripData}
                                renderItem={this.renderItem}
                                refreshing={this.state.refreshing}
                            />
                            <TouchableOpacity
                                style={{
                                    marginVertical: 3,
                                }}
                                onPress={() => { this.tripDataAdd() }}
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
                        <DraggableFlatList
                            data={this.state.tripData}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => `draggable-item-key${index}`}
                            scrollPercent={5}
                            onMoveEnd={({ data }) => { this.setState({ tripData: data }) }}
                        />}
                </View>
                <Portal>
                    <Dialog
                        visible={this.state.visibleDialog}
                        onDismiss={this._hideDialog}>
                        <Dialog.Title>Delete</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>Are you sure to delete this Shop</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => { this.removeTripData(this.state.tripDataId) }}>Yes</Button>
                            <Button onPress={this._hideDialog}>Cancel</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(tripData)