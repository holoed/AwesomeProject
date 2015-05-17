'use strict';

var React = require('react-native');
var SideMenu = require('react-native-side-menu');
var PostsView = require('../Movies');
//var Icon = require('FAKIconImage');
var window = require('Dimensions').get('window');

var {
  StyleSheet,
  NavigatorIOS,
  View,
  Text,
  ScrollView,
  Image
} = React;

var Menu = React.createClass({
  render: function() {
    return (
      <ScrollView style={styles.menu}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{
              uri: 'http://pickaface.net/includes/themes/clean/img/slide2.png'
            }}/>
          <Text style={{ position: 'absolute', left: 70, top: 20, color:'white' }}>Edmondo Pentangelo</Text>
        </View>

        <Text style={styles.end}/>
        <Text style={styles.item}>Settings</Text>
        <Text style={styles.item}>About</Text>
        <Text style={styles.item}>Contacts</Text>
        <Text style={styles.item}>Credits</Text>
        <Text style={styles.end}/>
      </ScrollView>
    );
  }
});

var Application = React.createClass({
  render: function() {
  
    return (
        <PostsView navigator={this.props.navigator}/>
    );
  }
});

 var navigation = React.createClass ({
  
  render: function() {

    var img = (<Image
            style={styles.avatar}
            source={{
              uri: 'http://pickaface.net/includes/themes/clean/img/slide2.png'
            }}/>)

    var menu = <Menu navigator={this.refs.navigator}/>;
    return (
  <SideMenu ref="sideMenu" menu={menu} openMenuOffset={window.width * 1 / 3}>
       
      <NavigatorIOS
            barTintColor= '#46629D'
            tintColor= '#ffffff'
            titleTextColor= '#ffffff'
            style={styles.container}
            initialRoute={{
              leftButtonIcon: require('image!navicon-round'),
              onLeftButtonPress: () => this.refs.sideMenu.toggleMenu() ,
              component: Application,
              title: 'Movies',
      }}/>
   </SideMenu>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  menu: {
    flex: 1,
    backgroundColor: '#32394A',
    padding: 0,
    width: window.width,
    height: window.height
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
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
    fontSize: 18,
    fontWeight: '300',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft:10,
    color: 'white',
    borderWidth: 1
  },
  end: {
    borderWidth: 0.5,
    height: 0.5
  },
  beer: {
    width: 70,
    height: 70,
    margin: 10
  },
});

module.exports = navigation;