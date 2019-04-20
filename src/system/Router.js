import React, { Component } from 'react';
import { Route, NativeRouter, Switch, Redirect } from 'react-router-native'
import { Provider } from 'react-redux'
import { Provider as PaperProvider } from 'react-native-paper'
import { store, history } from './AppStore'
import { ConnectedRouter } from 'connected-react-router'

import LoginPage from '../pages/login'
import ShoplistPage from '../pages/shoplists'
import ShopPage from '../pages/shop'
import MapPage from '../pages/map'
import ProfilePage from '../pages/profile'
import MenuPage from '../components/menu'
import RegisterPage from '../pages/register'
import EditProfilePage from '../pages/editProfile'


export default class Router extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PaperProvider>
          <ConnectedRouter history={history}>
            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/shoplists" component={ShoplistPage} />
              <Route exact path="/shop" component={ShopPage} />
              <Route exact path="/map" component={MapPage} />
              <Route exact path="/profile" component={ProfilePage} />
              <Route exact path="/menu" component={MenuPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/editProfile" component={EditProfilePage} />
              <Redirect to='/menu' />
            </Switch>
          </ConnectedRouter>
        </PaperProvider>
      </Provider>
    )
  }
}
