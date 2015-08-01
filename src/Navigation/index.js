'use strict';

var React = require('react-native');
var SideMenu = require('react-native-side-menu');
var Application = require('../Application');
var Menu = require('../Menu');
var window = require('Dimensions').get('window');
var Rx = require('rx');

var { StyleSheet, NavigatorIOS } = React;

var Navigation = React.createClass ({

  refresh: new Rx.Subject(),

  getInitialState: function() {
    return { hideMenu: false, isMenuEnabled: true };
  },

  getNav: function() {
     return this.refs.nav;
  },

  getSideMenu: function() {
     return this.refs.sideMenu;
  },

  hideSideMenu: function(hide) {
    this.setState({ isMenuEnabled: !hide });
  },

  render: function() {
    var menu = <Menu nav={this.getNav} sideMenu={this.getSideMenu} refresh={this.refresh}/>;
    return (<SideMenu ref="sideMenu" menu={menu} openMenuOffset={window.width * 1 / 5} isMenuEnabled={this.state.isMenuEnabled}>
                 <NavigatorIOS  ref="nav"
                                barTintColor= '#46629D'
                                tintColor= '#ffffff'
                                navigationBarHidden={this.state.hideMenu}
                                titleTextColor= '#ffffff'
                                style={styles.container}
                                initialRoute={{
                                  leftButtonIcon: require('image!navicon-round'),
                                  onLeftButtonPress: () => this.refs.sideMenu.toggleMenu() ,
                                  component: Application,
                                  title: 'Movies & TV Shows',
                                  passProps: { refresh: this.refresh, hideSideMenu: this.hideSideMenu }
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
