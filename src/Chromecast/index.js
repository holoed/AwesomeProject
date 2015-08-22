'use strict';

var Http = require('HttpClient');;

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  View,
  ListView,
  NativeModules,
  DeviceEventEmitter,
  SliderIOS
} = React;

var { ChromecastManager } = NativeModules;

var Chromecast = React.createClass({

  componentDidMount: function() {
    this.setState({ listChangedSubscription: DeviceEventEmitter.addListener('DeviceListChanged', this._deviceListChangedHandler),
                    mediaStatusUpdatedSubscription: DeviceEventEmitter.addListener('MediaStatusUpdated', this._mediaStatusUpdatedHandler) });
    
    ChromecastManager.startScan();
  },

  componentWillUnmount: function() {
    this.props.hideSideMenu(false);
    this.state.listChangedSubscription.remove();
    this.state.mediaStatusUpdatedSubscription.remove();
    ChromecastManager.stopScan();
  },

  _deviceListChangedHandler: function (data) {
    console.log(data);
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(data.Devices) })
  },

  _mediaStatusUpdatedHandler: function (data) {
    console.log(data);
    if (data.Url != this.props.post.source) {
      ChromecastManager.stop();
    } else {
      this.setState({ duration: data.Duration });
    }
  },
 
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows([]),
    };
  },

  connectToDevice: function(deviceName) {
    ChromecastManager.connectToDevice(deviceName);
    this.setState({ connected: true });
    this.startObservingStreamPosition();
  },

  disconnect: function() {
    ChromecastManager.disconnect();
    this.setState({ connected: false });
    this.stopObserviceStreamPosition();
  },

  castVideo: function() {
    if (this.state.connected) {
      ChromecastManager.castVideo(
        this.props.post.source,
        this.props.post.title,
        this.props.post.plot,
        this.props.post.poster);
    }
  },

  play: function() {
    ChromecastManager.play();
  },

  pause: function() {
    ChromecastManager.pause();
  },

  seekToTime: function(value) {
    ChromecastManager.seekToTime(value);
  },

  startObservingStreamPosition: function() {
    var _this = this;
    this.stopObserviceStreamPosition();
    this.setState({ positionSubscription: setInterval(() => {
        ChromecastManager.getStreamPosition(pos => {
            console.log(pos);
            _this.setState({ currentPosition: pos });
        });
    }, 1000) });
  },

  stopObserviceStreamPosition: function() {
    if (this.state.positionSubscription != null) {
      clearInterval(this.state.positionSubscription);
      this.setState({ positionSubscription: null });
    }
  },

  render: function() {
    var _this = this;
    return (
   
           <View style={{flexDirection:'column', alignItems: 'center' }}>
              <View style={{ flexDirection:'row', display: 'flex' }}>  
                 <Image source={{uri: this.props.post.poster + "?time=" + Http.lastDownloadDate.getTime() }}
                               style={styles.cellImage} />
                 <View style={{flexDirection:'column', alignItems: 'center' }}>
                   <Text style={{fontSize:25, marginTop: 100}}>Device List</Text>
                   <ListView style={{height: 500}}
                     dataSource={this.state.dataSource}
                     renderRow={(d) => (<TouchableHighlight onPress={() => this.connectToDevice(d)} style={styles.button}>
                                          <Text style={styles.buttonText}>{d}</Text>
                                       </TouchableHighlight>)}>
                   </ListView>
                 </View>
              </View>
              <SliderIOS style={{ width: 700, marginTop: 40, marginBottom: 40 }} onValueChange={this.seekToTime} maximumValue={this.state.duration} value={this.state.currentPosition} />
              <View style={{ flexDirection:'row', display: 'flex' }}>
                <TouchableHighlight onPress={this.play} style={styles.button}>
                  <Text style={styles.buttonText}>
                    Play
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.pause} style={styles.button}>
                  <Text style={styles.buttonText}>
                    Pause
                  </Text>
                </TouchableHighlight>
              </View>
              <View style={{ flexDirection:'row', display: 'flex' }}>
                <TouchableHighlight onPress={this.castVideo} style={styles.button}>
                  <Text style={styles.buttonText}>
                    Cast Video
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.disconnect} style={[styles.button, {backgroundColor: 'darkred'}]}>
                  <Text style={styles.buttonText}>
                    Disconnect
                  </Text>
                </TouchableHighlight>
              </View>
           </View>
    
    );
  }
});

var WithLabel = React.createClass({
  render: function() {
    return (
      <View style={styles.labelContainer}>
        <View style={styles.label}>
          <Text>{this.props.label}</Text>
        </View>
        {this.props.children}
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 13,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  default: {
    width: 250,
    height: 26,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    flex: 1,
    fontSize: 13,
    padding: 4,
  },
  label: {
    width: 115,
    marginRight: 10,
    paddingTop: 2,
  },
  text: {
    color: '#ffffff',
    fontFamily: '.HelveticaNeueInterface-MediumP4',
    fontSize: 17,
    margin: 10,
    width: 220,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    width: 308,
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#32394A',
    borderColor: '#32394A',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginLeft:10,
    marginRight:10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
    },
  cellImage: {
    backgroundColor: '#dddddd',
    marginTop: 100,
    height: 600,
    marginRight: 10,
    width: 410,
  }
});

module.exports = Chromecast;

