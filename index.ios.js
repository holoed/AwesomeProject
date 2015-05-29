'use strict';

var React = require('react-native');
var { AppRegistry } = React;

var navigation = require('./src/Navigation');

AppRegistry.registerComponent('MyMovies', () => navigation);