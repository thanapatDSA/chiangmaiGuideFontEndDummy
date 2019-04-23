import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bodyprofilepage: {
    flex: 2,
    alignItems: 'center',
  },
  body: {
    flex: 11.5,
    width: '90%',
    textAlign: 'center',
    margin: 20,
  },
  welcome: {
    fontSize: 18,
    marginVertical: 10
  },
  button: {
    marginVertical: 5
  },
  avatar: {
    marginVertical: 5,
    alignItems: 'center',
    alignContent: 'center'
  },
  header: {
    flex: 1
  },
  card: {
    marginVertical: 5
  },
  bodyMap: {
    flex: 9.8,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    // flex: 11.5,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  surface: {
    marginVertical: 5
  },
  bodyRegister: {
    flex: 8.5,
    width: '90%',
    textAlign: 'center',
    margin: 20,
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
})