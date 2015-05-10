/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var Box = React.createClass({
  getInitialState: function() {
    return { number: 0 };
  },

  increaseNumber: function(event) {
    this.setState({ number: this.state.number + 1 });
  },

  decreaseNumber: function(event) {
    this.setState({ number: this.state.number - 1 });
  },

  render: function() {
    return <View>
               <Text style={styles.textElems}>{this.state.number}</Text>
               <Text style={styles.textElems} onPress={this.increaseNumber}>Increase</Text>
               <Text style={styles.textElems} onPress={this.decreaseNumber}>Decrease</Text>
           </View>
  }
});

var AwesomeProject = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Box></Box>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 80,
    textAlign: 'center',
    margin: 10,
  },
  textElems: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 50,
    margin: 10
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
