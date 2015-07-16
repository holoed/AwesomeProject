'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  View,
  WebView
} = React;

var WebVideo = React.createClass({

  render() {
    return (

        <WebView html={'<html><head>' +
                       '    <style> ' +
                       '  html,body { ' +
                       '  min-height:100%; ' +
                       '  height:100%; ' +
                       '  margin:0; ' +
                       '  background-color:black; ' +
                       '  background-size:cover; '  +
                       ' } ' +
                       '   </style> '  +
                       '</head>' +
                       '<body><video width="100%" height="100%" src="' + this.props.post.source + '" poster="' + this.props.post.poster + '" type="video/mp4" controls="true" autoplay="true" preload="auto"></video></body></html>'}></WebView>

    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  }
});

module.exports = WebVideo;
