'use strict';

var React = require('react-native');
var {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  LinkingIOS,
  AlertIOS
} = React;

var Video = require('react-native-video');
var VideoApplication = require('../VideoApplication');

var MovieVideo = React.createClass({
    render: function() {
        return ( <Video source={{uri: this.props.post.sources[0], isNetwork: true}}
                        style={styles.video}
                        resizeMode="contain"></Video>
          
           
        );
    }  
});

var MovieDetails = React.createClass({

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
    
    openInEmbedded: function() {
        this.props.navigator.push({
            title: this.props.post.title,
            component: MovieVideo,
            passProps: { post : this.props.post },
        });
    },
    render: function() {
        return ( <View style={{marginLeft:10, marginRight:10}}>
                   <View style={styles.container}>
                      <Image source={{uri:this.state.movieDetails.Poster}}
                             style={styles.cellImage} />
                      <View style={styles.rightContainer}>

                          <VideoApplication url={this.props.post.sources[0].replace("http", "vlc")} applicationName="VLC" />
                      
                          <VideoApplication url={this.props.post.sources[0].replace("http", "infuse")} applicationName="Infuse" />
                      
                          <VideoApplication url={this.props.post.sources[0]} applicationName="Safari" />

                          <VideoApplication url={"goodplayer://" + this.props.post.sources[0]} applicationName="Good Player" />
                      
                          <TouchableHighlight onPress={this.openInEmbedded} style={styles.button}>
                            <Text style={styles.buttonText}>Internal</Text>
                          </TouchableHighlight>
                          
                      </View>
                  </View>    
                  <Text/>
                  <Text style={{fontWeight: 'bold', fontSize:'30'}}>{this.state.movieDetails.Title}</Text>
                  <Text/>
                  <Text>{this.state.movieDetails.Plot}</Text>
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
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports = MovieDetails;