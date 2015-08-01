'use strict';

var React = require('react-native');
var {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  LinkingIOS,
  AlertIOS,
  ListView
} = React;

var TVShowSeasonDetails = require('../TVShowSeasonDetails');

var TVShowDetailsItem = React.createClass({

  onPress: function(post) {
        this.props.navigator.push({
            title: this.props.post.season,
            component: TVShowSeasonDetails,
            passProps: { post: this.props.post, hideSideMenu: this.props.hideSideMenu },
        });
  },

  render: function() {
     return(
          <View>
            <TouchableHighlight onPress={this.onPress}>
              <View style={styles.row}>
                <Text style={{fontSize:20}}>{this.props.post.season}</Text>
              </View>
            </TouchableHighlight>
          </View>
        );
    }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  row: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
    padding: 5,
  },
  cellImage: {
    backgroundColor: '#dddddd',
    marginTop: 100,
    height: 600,
    marginRight: 10,
    width: 410,
  },
   video: {
    backgroundColor: '#dddddd',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  buttonText: {
  fontSize: 18,
  color: 'white',
  alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#32394A',
    borderColor: '#32394A',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports = TVShowDetailsItem;
