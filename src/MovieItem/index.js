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

var MovieDetails = require('../MovieDetails');

var MovieItem = React.createClass({

  popAndRefresh: function() {
        this.props.navigator.replacePreviousAndPop({
            title: this.props.post.title,
            component: MovieDetails,
            passProps: { post: this.props.post, hideSideMenu: this.props.hideSideMenu, popAndRefresh: this.popAndRefresh },
        });
  },

  onPress: function() {
        this.props.navigator.push({
            title: this.props.post.title,
            component: MovieDetails,
            passProps: { post: this.props.post, hideSideMenu: this.props.hideSideMenu, popAndRefresh: this.popAndRefresh },
        });
    },

  render: function() {
     return (
        <TouchableHighlight onPress={this.onPress}>
          <View style={styles.row}>
            <Image
              source={{uri: this.props.post.poster}}
              style={{height: 1024 / 3.1, width: 768 / 3.1 }}/>
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
    alignItems: 'center',
    flexDirection: 'row',
    padding: 2,
    backgroundColor: '#000000',
  }
});


module.exports = MovieItem;
