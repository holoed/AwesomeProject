'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  View,
  WebView
} = React;

var VideoPlayer = require('react-native-videoplayer');

var WebVideo = React.createClass({

  componentWillUnmount: function() {
    this.props.hideSideMenu(false);
  },

  render: function() {
   return <View style={styles.container}>
            <VideoPlayer style={styles.video} url={this.props.post.source}/>
          </View>
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  video: {
    position: 'absolute',
    top: 40, left: 0, right: 0, bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  }
});

module.exports = WebVideo;
