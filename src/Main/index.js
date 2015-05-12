'use strict';

var React = require('react-native');
var PostsView = require('../Movies');

var {
  StyleSheet,
  NavigatorIOS,
  View,
  Text
} = React;

 var navigation = React.createClass ({
  render: function() {
    return (
      <NavigatorIOS
            style={styles.container}
            initialRoute={{
              component: PostsView,
              title: 'Movies',
      }}/>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

module.exports = navigation;