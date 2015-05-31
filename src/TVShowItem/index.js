'use strict';

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
            title: this.props.post.Title,
            component: TVShowDetails,
            passProps: { post: this.props.post },
        });
    },

  render: function() {
     return (
      <View>
        <TouchableHighlight onPress={this.onPress}>
          <View style={styles.row}>
            <Image
              source={{uri: this.props.post.Poster}}
              style={styles.cellImage}/>
        
            <View style={styles.textContainer}>
              <Text style={styles.movieTitle} numberOfLines={2}>
                {this.props.post.Title}
              </Text>
              <Text>
                {this.props.post.Plot}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.cellBorder} />
      </View>
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
    padding: 5,
    backgroundColor: '#F5FCFF',
  },
  cellImage: {
    height: 323,
    marginRight: 10,
    width: 215,
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    // Trick to get the thinest line the device can display
    height: 1 / PixelRatio.get(),
    marginLeft: 4,
  },
  movieTitle: {
    flex: 1,
    fontSize: 25,
    fontWeight: '500',
    marginBottom: 2
  },
});


module.exports = TVShowItem;