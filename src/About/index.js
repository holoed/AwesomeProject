'use strict';

var React = require('react-native');
var { AppRegistry, StyleSheet, Text, View } = React;


var About = React.createClass({

  render: function() {
    return (
      <View style={styles.container}>
        <View style={{marginTop:20, justifyContent: 'space-around', padding: 20}}>
        	<Text style={styles.text}>Application designed and implemented by Gattaca Limited.</Text>
        </View>
      </View>
    );
  }
});


var styles = StyleSheet.create({
  container: {
    height:1024,
    backgroundColor: '#32394A'
  },
  text: {
    color:'white',
    fontSize: 24,
    margin:30
  }
});

module.exports = About;