import React, { Component } from 'react'
import styles from '../utilities/styles'
import { Image, StyleSheet, Text, View, Modal, TextInput, TouchableOpacity } from 'react-native';
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import MapView, { Marker } from 'react-native-maps'

export const mapModal = ({ coordinates, title, category }) => {
    return (
        <MapView style={styles.map}
            initialRegion={{
                latitude: 18.802587,
                longitude: 98.9529,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03,
            }} >
            <MapView.Marker
                key={1}
                coordinate={coordinates}
                title={title}
                description={category}
            >
                <Image
                    source={require('../images/map-icons/default.png')}
                    style={{ width: 22, height: 29 }}
                />
            </MapView.Marker>
        </MapView>
    )
}


export default connect(null, { push })(Component)