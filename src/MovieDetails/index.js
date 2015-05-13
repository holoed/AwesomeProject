'use strict';

var React = require('react-native');
var {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight
} = React;

var Video = require('react-native-video');

var MovieVideo = React.createClass({
    render: function() {
        return ( <Video source={{uri: this.props.post.sources[0]}}
                        style={styles.video}
                        resizeMode="contain"></Video>
          
           
        );
    }  
});

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
            title: this.props.post.title,
            component: MovieVideo,
            passProps: { post : this.props.post },
        });
    },
    render: function() {
        return ( <View>
                  <TouchableHighlight 
                         onPress={this.onPress}>
                    <Image source={{uri:this.props.post["image-480x270"]}}
                           style={styles.cellImage} />
                  </TouchableHighlight>
                  <Text style={{fontWeight: 'bold', fontSize:'30'}}>{this.state.movieDetails.Title}</Text>
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
  },
   video: {
    backgroundColor: '#dddddd',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
});

module.exports = ForTouchScene;