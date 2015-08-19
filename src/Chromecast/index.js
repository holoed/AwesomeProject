'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  ScrollView,
  NativeModules,
  DeviceEventEmitter
} = React;

var Chromecast = React.createClass({

  componentDidMount: function() {
    this.setState({ listChangedSubscription: DeviceEventEmitter.addListener('DeviceListChanged', this._deviceListChangedHandler),
                    deviceConnectedSubscription: DeviceEventEmitter.addListener('DeviceConnected', this._deviceConnectedHandler) });
    NativeModules.ChromecastManager.startScan();
  },

  componentWillUnmount: function() {
    this.state.listChangedSubscription.remove();
    this.state.deviceConnectedSubscription.remove();
    this.setState({ listChangedSubscription: null,
                    deviceConnectedSubscription: null });
    NativeModules.ChromecastManager.stopScan();
  },

  _deviceListChangedHandler: function (data) {
    console.log(data);
    this.setState({ devices: data.Devices })
  },

  _deviceConnectedHandler: function (data) {
    console.log(data);
    NativeModules.ChromecastManager.castVideo(
      this.props.source,
      this.props.title,
      this.props.plot,
      this.props.poster);
  },

  getInitialState: function() {
    return { devices: [] };
  },

  connectToDevice: function(deviceName) {
    NativeModules.ChromecastManager.connectToDevice(deviceName);
  },

  disconnect: function() {
    NativeModules.ChromecastManager.disconnect();
  },

  castVideo: function(deviceName) {
    this.connectToDevice(deviceName);
  },

  render: function() {
    return (
      <View style={styles.container}>
           {(this.state.devices.map((d, i) =>
               (<TouchableHighlight onPress={() => this.castVideo(d)} style={styles.button}>
                    <Text style={styles.buttonText}>Cast to {d}</Text>
               </TouchableHighlight>)))}
           {(this.state.devices.length > 0) ?
             (<TouchableHighlight onPress={this.disconnect} style={[styles.button, {backgroundColor: 'darkred'}]}>
                  <Text style={[styles.buttonText, {color: 'white'}]}>Disconnect</Text>
             </TouchableHighlight>) :
             (<View></View>)}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  buttonText: {
  fontSize: 18,
  color: 'white',
  alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    backgroundColor: '#32394A',
    borderColor: '#32394A',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    marginLeft:10,
    marginRight:10,
    justifyContent: 'center'
  }
});

module.exports = Chromecast
