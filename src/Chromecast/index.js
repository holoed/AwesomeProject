'use strict';

var Http = require('HttpClient');
var Viewport = require('react-native-viewport');

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

  componentWillMount: function () {
    var _this = this;
    Viewport.getDimensions(function (args) {
      if (args.orientation == 5 || args.orientation == 6) return;
      if (args.orientation == 1 || args.orientation == 2)
        _this.setState({ orientation: 'portrait' });
      else if (args.orientation == 3 || args.orientation == 4)
        _this.setState({ orientation: 'landscape' });
    });

    Viewport.addEventListener(Viewport.events.DEVICE_DIMENSIONS_EVENT, function(args) {
      if (args.orientation == 5 || args.orientation == 6) return;
      if (args.orientation == 1 || args.orientation == 2)
        _this.setState({ orientation: 'portrait' });
      else if (args.orientation == 3 || args.orientation == 4)
        _this.setState({ orientation: 'landscape' });
    });
  },


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
    this.setState({ dataSource: data.Devices })
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
    return {
      orientation: null,
      dataSource: [],
      currentPosition: 0,
      duration: 0
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
    this.setState({currentPosition: value})
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

  toHHMMSS: function (secs) {
      var sec_num = parseInt(secs, 10); // don't forget the second param
      var hours   = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);

      if (hours   < 10) {hours   = "0"+hours;}
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      var time    = hours+':'+minutes+':'+seconds;
      return time;
  },

  renderPortrait: function() {
    var _this = this;
    return (
   
           <Image source={{uri: this.props.post.poster}} style={{backgroundColor:'transparent', height: 1024, width: 768 }}>
             <View style={{backgroundColor:'black', opacity: 0.9, height: 1024}}>
                <View style={{ flexDirection:'row', display: 'flex' }}>  
                   <Image source={{uri: this.props.post.poster}}
                                 style={styles.cellImage} />
                   <View style={{ flexDirection:'column', alignItems: 'center', marginTop: 100 }}>
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
                     <Text style={{fontSize:25, marginTop: 50, marginBottom: 20, color: 'white' }}>Device List</Text>
                      {this.state.dataSource.map((d) => (<TouchableHighlight onPress={() => this.connectToDevice(d)} style={styles.button}>
                                            <Text style={styles.buttonText}>{d}</Text>
                                         </TouchableHighlight>))}
                   </View>
                </View>
                <View style={{ flexDirection:'row', display: 'flex' }}>
                  <Text style={{ marginTop: 50, marginRight: 10, marginLeft: 10, color:'white' }}>{this.toHHMMSS(this.state.currentPosition)}</Text>
                  <SliderIOS style={{ width: 600, marginTop: 40, marginBottom: 40 }} onValueChange={this.seekToTime} maximumValue={this.state.duration} value={this.state.currentPosition} />
                  <Text style={{ marginTop: 50, marginRight: 10, marginLeft: 10, color:'white' }}>{this.toHHMMSS(this.state.duration)}</Text>
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
           </Image>
    
    );
  },

  renderLandscape: function() {
    var _this = this;
    return (
   
              <Image source={{uri: this.props.post.poster}} style={{backgroundColor:'transparent', height: 768, width: 1024 }}>
                <View style={{backgroundColor:'black', opacity: 0.9, height: 768}}>
                  <View style={{ flexDirection:'row', display: 'flex', justifyContent:'space-between' }}>  
                     <Image source={{uri: this.props.post.poster}}
                                   style={styles.cellImage} />
                     <View style={{flexDirection:'column', alignItems: 'center', marginTop: 100 }}>
                      <TouchableHighlight onPress={this.castVideo} style={styles.button}>
                        <Text style={styles.buttonText}>
                          Cast Video
                        </Text>
                      </TouchableHighlight>
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
                      <TouchableHighlight onPress={this.disconnect} style={[styles.button, {backgroundColor: 'darkred'}]}>
                        <Text style={styles.buttonText}>
                          Disconnect
                        </Text>
                      </TouchableHighlight>
                       <Text style={{ fontSize:25, marginTop:50, marginBottom: 20, color:'white' }}>Device List</Text>
                        {this.state.dataSource.map((d) => (<TouchableHighlight onPress={() => this.connectToDevice(d)} style={styles.button}>
                                              <Text style={styles.buttonText}>{d}</Text>
                                           </TouchableHighlight>))}
                     </View>
                  </View>
                  <View style={{ flexDirection:'row', display: 'flex' }}>
                    <Text style={{ marginTop: 30, marginRight: 10, marginLeft: 10, color:'white' }}>{this.toHHMMSS(this.state.currentPosition)}</Text>
                    <SliderIOS style={{ width: 850, marginTop: 20, marginBottom: 20 }} onValueChange={this.seekToTime} maximumValue={this.state.duration} value={this.state.currentPosition} />
                    <Text style={{ marginTop: 30, marginRight: 10, marginLeft: 10, color:'white' }}>{this.toHHMMSS(this.state.duration)}</Text>
                  </View>
               </View>
           </Image>
    
    );
  },

  render: function() {
     if (this.state.orientation == 'portrait')
        return this.renderPortrait();
     else
        return this.renderLandscape();
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

