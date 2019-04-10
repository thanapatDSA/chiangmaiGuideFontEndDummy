import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import ShoplistPage from '../pages/shoplists'
import ShopFavoritesPage from '../pages/shopfavorites'
import MapPgae from '../pages/map'
import ProfilePage from '../pages/profile'

const ShoplistRoute = () => <ShoplistPage />;

const ShopFavoritesRoute = () => <ShopFavoritesPage />;

const MapRoute = () => <MapPgae />;

const ProfileRoute = () => <ProfilePage />;

export default class MyComponent extends React.Component {
    state = {
        index: 0,
        routes: [
            { key: 'shoplists', title: 'Shop', icon: 'store', color: '#3F51B5' },
            { key: 'shopfavorites', title: 'Favorites', icon: 'star', color: '#009688' },
            { key: 'map', title: 'Map', icon: 'map', color: '#795548' },
            { key: 'profile', title: 'Profile', icon: 'person', color: '#607D8B' },
        ]
    }
    UNSAFE_componentWillMount() {
        if (this.props.location.state == undefined) {
            this.setState({ index: 0 })
        } else {
            this.setState({ index: this.props.location.state.index })
        }

    }

    _handleIndexChange = index => this.setState({ index });

    _renderScene = BottomNavigation.SceneMap({
        shoplists: ShoplistRoute,
        shopfavorites: ShopFavoritesRoute,
        map: MapRoute,
        profile: ProfileRoute
    })

    render() {
        return (
            <BottomNavigation
                navigationState={this.state}
                onIndexChange={this._handleIndexChange}
                renderScene={this._renderScene}
            />
        );
    }
}