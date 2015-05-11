'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Text,
  View,
} = React;

var navigation = require('./src/Main');



AppRegistry.registerComponent('AwesomeProject', () => navigation);