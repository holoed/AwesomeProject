'use strict';

var React = require('react-native');
var Movies = require('../Movies');

var { StyleSheet } = React;

var Application = React.createClass({
  render: function() {
    return (
        <Movies navigator={this.props.navigator}/>
    );
  }
});

module.exports = Application;