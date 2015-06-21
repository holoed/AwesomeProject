'use strict';

var React = require('react-native');

var { AsyncStorage, StyleSheet, View, Text, ScrollView, Image } = React;

var window = require('Dimensions').get('window');

var Settings = require('../Settings');

//TODO: Move to common location
var STORAGE_KEY = '@MyMoviesState:key';

var Menu = React.createClass({

  openSettings: function(e) { 
       this.props.sideMenu().toggleMenu();
       this.props.nav().popToTop();
       this.props.nav().push({
              title: "Settings",
              component: Settings,
              passProps: { nav: this.props.nav, refresh: this.props.refresh }
          });
  },

  goHome: function(e) { 
      this.props.sideMenu().toggleMenu();
      this.props.nav().popToTop();
  },

  render: function() {
    return (
      <ScrollView style={styles.menu}>
          <View style={styles.avatarContainer}>
           
          </View>
          <Text style={styles.end}/>
           <Text style={styles.item} onPress={this.goHome}>Home</Text>
          <Text style={styles.item} onPress={this.openSettings}>Settings</Text>
          <Text style={styles.item}>About</Text>
          <Text style={styles.item}>Credits</Text>
          <Text style={styles.end}/>
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  menu: {
    flex: 1,
    backgroundColor: '#32394A',
    padding: 0,
    paddingTop: 20,
    width: 1024,
    height: 1024
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1
  },
  item: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft:10,
    color: 'white',
    borderWidth: 1,
    borderColor: '#252C3B'
  },
  end: {
    borderColor: '#252C3B',
    borderWidth: 0.5,
    height: 0.5
  },
});

module.exports = Menu;