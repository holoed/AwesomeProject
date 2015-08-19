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
    this.setState({ subscription: DeviceEventEmitter.addListener('DeviceListChanged', this._deviceListChangedHandler) });
    NativeModules.ChromecastManager.startScan();
  },

  componentWillUnmount: function() {
    this.state.subscription.remove();
    this.setState({ subscription: null });
    NativeModules.ChromecastManager.stopScan();
  },

  _deviceListChangedHandler: function (data) {
    console.log(data);
    this.setState({ devices: data.Devices })
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
    var _this = this;
    setTimeout(function () {
      NativeModules.ChromecastManager.castVideo(
        _this.props.source,
        _this.props.title,
        _this.props.plot,
        _this.props.poster)
      }, 5000);
  },

  render: function() {
    return (
      <View style={styles.container}>
           {(this.state.devices.map((d, i) =>
               (<TouchableHighlight onPress={() => this.castVideo(d)} style={styles.button}>
                    <Text style={styles.buttonText}>Cast to {d}</Text>
               </TouchableHighlight>)))}
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
