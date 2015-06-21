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

var MovieDetails = require('../MovieDetails');

var MovieItem = React.createClass({

  popAndRefresh: function() {
        this.props.navigator.replacePreviousAndPop({
            title: this.props.post.Title,
            component: MovieDetails,
            passProps: { post: this.props.post, toggleMenuBar : this.props.toggleMenuBar, popAndRefresh: this.popAndRefresh },
        });
  },

  onPress: function() {
        this.props.navigator.push({
            title: this.props.post.Title,
            component: MovieDetails,
            passProps: { post: this.props.post, toggleMenuBar : this.props.toggleMenuBar, popAndRefresh: this.popAndRefresh },
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
               <View style={{flex: 1, flexDirection: 'row'}}>
                            {(this.props.post.Season != undefined && this.props.post.Season != null) ?
                                 (<Text style={{fontSize:15, marginBottom:8}}>Season: {this.props.post.Season}</Text>) :
                                 (<View></View>)}

                            {(this.props.post.Episode != undefined && this.props.post.Episode != null) ?
                                 (<Text style={{fontSize:15, marginBottom:8, marginLeft:10}}>Episode: {this.props.post.Episode}</Text>) :
                                 (<View></View>)}
              </View>
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


module.exports = MovieItem;