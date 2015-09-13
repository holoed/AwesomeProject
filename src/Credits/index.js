'use strict';

var React = require('react-native');
var { AppRegistry, StyleSheet, Text, View } = React;


var Credits = React.createClass({

  render: function() {
    return (
      <View style={styles.container}>
        <View style={{marginTop:20, justifyContent: 'space-around', padding: 20}}>
        	<Text style={styles.text}>This product uses the TMDb API but is not endorsed or certified by TMDb.</Text>
          <Text style={styles.text}>Viewport size and orientation from https://github.com/pjjanak/react-native-viewport</Text>
          <Text style={styles.text}>Side menu powered by - https://github.com/Kureev/react-native-side-menu </Text>
          <Text style={styles.text}>Powered by React Native - http://facebook.github.io/react-native/ </Text>
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

module.exports = Credits;