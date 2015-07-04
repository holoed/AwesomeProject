'use strict';

var React = require('react-native');
var { AppRegistry, StyleSheet, Text, View, TouchableHighlight, AsyncStorage, TextInput } = React;

var SETTINGS_KEY = '@MyMoviesSettings:key';

var WithLabel = React.createClass({
  render: function() {
    return (
      <View style={styles.labelContainer}>
        <View style={styles.label}>
          <Text>{this.props.label}</Text>
        </View>
        {this.props.children}
      </View>
    );
  }
});

var Settings = React.createClass({

  defaultSettings : { SourceURL: "http://holoed.github.io/top500.json" },

  getInitialState: function() {
  	return this.defaultSettings;
  },

  componentWillMount: function() {
  	var _this = this;
  	 AsyncStorage.getItem(SETTINGS_KEY)
  	  .then((value) => JSON.parse(value))
      .then((value) => {
        if (value !== null) {
            console.log("Settings loaded from disk");
             _this.setState(value);
          } else {
            console.log("Loading settings default");
        }
      })
      .catch((error) => {
        console.log("An error occurred while attempting to load settings from dist: " + error)
       })
      .done();
  },

  onPress: function () {
      AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(this.state))
      .then(() => console.log('Saved movies and tv-shows url to disk.'))
      .catch((error) => console.log('Error saving movies and tv-shows url to disk: ' + error.message))
      .done();
      this.props.nav().popToTop();
      this.props.refresh.onNext({});
  },

  render: function() {
    return (
      <View style={styles.container}>
      	<WithLabel label="Source URL">
        	<TextInput value={this.state.SourceURL} style={styles.textbox} onChangeText={(text) => this.setState({SourceURL: text})}></TextInput>
        </WithLabel>
        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }
});


var styles = StyleSheet.create({
   textbox: {
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#0f0f0f',
    flex: 1,
    fontSize: 20,
    padding: 10,
    marginBottom: 15
  },
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#32394A',
    borderColor: '#32394A',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
    labelContainer: {
    marginVertical: 2,
    flex: 1,
  },
   label: {
    marginRight: 10,
    paddingTop: 2,
    paddingBottom: 10
  },
});

module.exports = Settings;