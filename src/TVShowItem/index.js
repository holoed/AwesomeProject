'use strict';

var Http = require('HttpClient');

var React = require('react-native');
var {
  PixelRatio,
  View,
  Text,
  ListView,
  StyleSheet,
  TouchableHighlight,
  Image
} = React;

var TVShowDetails = require('../TVShowDetails');

var TVShowItem = React.createClass({

  onPress: function() {
        this.props.navigator.push({
            title: this.props.post.title,
            component: TVShowDetails,
            passProps: { post: this.props.post, hideSideMenu: this.props.hideSideMenu },
        });
    },

  render: function() {
     return (
        <TouchableHighlight onPress={this.onPress} underlayColor="transparent">
          <View style={styles.row}>
            <Image
              source={{uri: this.props.post.poster}}
              style={{height: 272 * 1.35, width: 185 * 1.35, resizeMode: 'contain' }} />
          </View>
        </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  textContainer: {
    flex: 1,
   },
  row: {
    alignItems: 'stretch',
    flexDirection: 'row',
    padding: 2,
    backgroundColor: '#000000',
  },
});


module.exports = TVShowItem;
