'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image
} = React;


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

var styles = StyleSheet.create({
  menu: {
    flex: 1,
    backgroundColor: '#32394A',
    padding: 0,
    width: window.width,
    height: window.height
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
});

module.exports = Menu;