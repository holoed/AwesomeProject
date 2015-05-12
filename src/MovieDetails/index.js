'use strict';

var React = require('react-native');
var {
  View,
  Text,
  Image,
  StyleSheet
} = React;

var ForTouchScene = React.createClass({
    getInitialState: function() {
      return {
        movieDetails: {},
        loaded: false,
      };
    },
    componentDidMount: function() {
      this.fetchData();
    },
    fetchData: function() {
      fetch("http://www.omdbapi.com/?t=" + (this.props.post.title.replace(" ", "+")) + "&y=&plot=short&r=json")
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({
            movieDetails: responseData,
            loaded: true
          });
        })
        .done();
    },
    render: function() {
        return (
            <View>
                <Image
              source={{uri:this.props.post["image-480x270"]}}
              style={styles.cellImage}/>
                <Text>{this.props.post.title}</Text>
                <Text>{this.state.movieDetails.Plot}</Text>
            </View>
        );
    }
});

var styles = StyleSheet.create({
  cellImage: {
    backgroundColor: '#dddddd',
    marginTop: 100,
    height: 300,
    marginRight: 10,
    width: 210,
  }
});

module.exports = ForTouchScene;