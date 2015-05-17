'use strict';

var React = require('react-native');
var SideMenu = require('react-native-side-menu');
var Movies = require('../Movies');
var window = require('Dimensions').get('window');

var {
  StyleSheet,
  NavigatorIOS,
  View,
  Text,
  ScrollView,
  Image
} = React;

var Settings = React.createClass({
  render: function() {
    return (<View></View>);
  }
});

var Menu = React.createClass({

  openSettings: function(e) {
     this.props.nav().push({
            title: "Settings",
            component: Settings
        });
  },

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
        <Text style={styles.item} onPress={this.openSettings}>Settings</Text>
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
        <Movies navigator={this.props.navigator}/>
    );
  }
});

 var Navigation = React.createClass ({
  
  getNav: function() {
     return this.refs.nav;
  },

  render: function() {
    var menu = <Menu nav={this.getNav}/>;
    return (<SideMenu ref="sideMenu" menu={menu} openMenuOffset={window.width * 1 / 3}>
                 <NavigatorIOS  ref="nav"
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
             </SideMenu>);
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
    borderWidth: 1,
    borderColor: '#252C3B'
  },
  end: {
    borderColor: '#252C3B',
    borderWidth: 0.5,
    height: 0.5
  },
  beer: {
    width: 70,
    height: 70,
    margin: 10
  },
});

module.exports = Navigation;