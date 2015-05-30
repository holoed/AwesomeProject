'use strict';

var React = require('react-native');
var SideMenu = require('react-native-side-menu');
var Application = require('../Application');
var Menu = require('../Menu');
var window = require('Dimensions').get('window');

var { StyleSheet, NavigatorIOS } = React;

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
                                  title: 'Movies & TV Shows',
                          }}/>
             </SideMenu>);
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  }
});

module.exports = Navigation;