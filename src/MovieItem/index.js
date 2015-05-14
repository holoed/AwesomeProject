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

var PostCell = React.createClass({

  getInitialState: function() {
      return {
        movieDetails: {},
        loaded: false
      };
    },

  componentDidMount: function() {
      this.fetchData();
    },

  fetchData: function() {
      fetch("http://www.omdbapi.com/?t=" + (this.props.post.title.replace(" ", "+")) + "&y=&plot=full&r=json")
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            movieDetails: responseData,
            loaded: true
          });
        })
        .done();
    },

  onPress: function() {
        this.props.navigator.push({
            title: this.state.title,
            component: MovieDetails,
            passProps: { movieDetails : this.state.movieDetails, 
                         post: this.props.post },
        });
    },

  render: function() {
     return (
      <View>
        <TouchableHighlight onPress={this.onPress}>
          <View style={styles.row}>
            {this.state.loaded ?
            (<Image
              source={{uri: this.state.movieDetails.Poster}}
              style={styles.cellImage}/>)
            : (<Image
              source={{uri: this.props.post["image-480x270"]}}
              style={styles.cellImage}/>)}

            <View style={styles.textContainer}>
              <Text style={styles.movieTitle} numberOfLines={2}>
                {this.state.loaded ? this.state.movieDetails.Title : this.props.post.title}
              </Text>
              <Text>
                {this.state.loaded ? this.state.movieDetails.Plot : "loading plot..."}
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


module.exports = PostCell;