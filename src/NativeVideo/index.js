'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AlertIOS,
} = React;

var Video = require('react-native-video');

var VideoPlayer = React.createClass({

  componentWillMount() {
     this.props.toggleMenuBar(true);
  },

  getInitialState() {
    return {
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0,
    }
  },

  onLoad(data) {
    this.setState({duration: data.duration});
  },

  onProgress(data) {
    this.setState({currentTime: data.currentTime});
  },

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    } else {
      return 0;
    }
  },

  render() {
    var flexCompleted = this.getCurrentTimePercentage() * 100;
    var flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {this.setState({paused: !this.state.paused})}}>
          <Video source={{uri: this.props.post.source}}
                 style={styles.video}
                 rate={this.state.rate}
                 paused={this.state.paused}
                 volume={this.state.volume}
                 muted={this.state.muted}
                 resizeMode={this.state.resizeMode}
                 onLoad={this.onLoad}
                 onProgress={this.onProgress}
                 onEnd={() => { AlertIOS.alert('Done!') }}
                 repeat={false} />
        </TouchableOpacity>

        <View style={styles.controls}>
          <View style={styles.generalControls}>
            {(this.state.paused) ?
             (<View style={styles.resizeModeControl}>
               <TouchableOpacity onPress={() => {
                    this.setState({paused: true});
                    this.props.toggleMenuBar(false);
                    this.props.popAndRefresh();
                     }}>
                <Text style={styles.exitControlOption}>
                  Exit
                </Text>
              </TouchableOpacity>
            </View>) : (<View></View>)}
          </View>

          <View style={styles.trackingControls}>
            {(this.state.paused) ?
             (<View style={styles.progress}>
              <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]} />
              <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]} />
            </View>) : (<View></View>)}
          </View>
        </View>
      </View>
    );
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: 'transparent',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: "white",
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  exitControlOption: {
    alignSelf: 'center',
    fontSize: 18,
    color: "white",
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 19,
  },
});


module.exports = VideoPlayer;
