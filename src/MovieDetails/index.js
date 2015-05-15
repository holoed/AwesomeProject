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

var VideoApplication = require('../VideoApplication');

var MovieDetails = React.createClass({

    render: function() {
        return ( <View style={{marginLeft:10, marginRight:10}}>
                   <View style={styles.container}>
                      <Image source={{uri:this.props.movieDetails.Poster}}
                             style={styles.cellImage} />
                      <View style={styles.rightContainer}>

                          <VideoApplication url={this.props.post.sources[0].replace("http", "vlc")} applicationName="VLC" />
                      
                          <VideoApplication url={this.props.post.sources[0].replace("http", "infuse")} applicationName="Infuse" />
                      
                          <VideoApplication url={this.props.post.sources[0]} applicationName="Safari" />

                          <VideoApplication url={"goodplayer://" + this.props.post.sources[0]} applicationName="Good Player" />
                                               
                      </View>
                  </View>    
                  <Text/>
                  <Text style={{fontWeight: 'bold', fontSize:30}}>{this.props.movieDetails.Title}</Text>
                  <Text/>
                  <Text>{this.props.movieDetails.Plot}</Text>
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
    backgroundColor: '#32394A',
    borderColor: '#32394A',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports = MovieDetails;