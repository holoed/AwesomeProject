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
var NativeVideo = require('../NativeVideo');


var MovieDetails = React.createClass({

    onPress: function() {
        this.props.navigator.push({
            title: this.props.post.Title,
            component: NativeVideo,
            passProps: { post: this.props.post },
        });
    },

    render: function() {
        return ( <View style={{marginLeft:10, marginRight:10}}>
                   <View style={styles.container}>
                      <Image source={{uri:this.props.post.Poster}}
                             style={styles.cellImage} />
                      <View style={styles.rightContainer}>

                          <Text style={{fontSize:30, marginBottom:10}}>Rating: {this.props.post.imdbRating}</Text>

                          <Text style={{fontSize:15, marginBottom:10}}>{this.props.post.Rated} | {this.props.post.Runtime} | {this.props.post.Genre}</Text>

                          <Text style={{fontSize:15, marginBottom:10}}>Director: {this.props.post.Director}</Text>

                          <Text style={{fontSize:15, marginBottom:10}}>Writer: {this.props.post.Writer}</Text>

                          <Text style={{fontSize:15, marginBottom:10}}>Stars: {this.props.post.Actors}</Text>

                          <Text style={{fontSize:15, marginBottom:10}}>Released: {this.props.post.Released}</Text>

                          <VideoApplication url={this.props.post.source.replace("http", "vlc")} applicationName="VLC" />
                      
                          <VideoApplication url={this.props.post.source.replace("http", "infuse")} applicationName="Infuse" />
                      
                          <VideoApplication url={"AVPlayer://" + this.props.post.source} applicationName="AVPlayer" />

                          <VideoApplication url={this.props.post.source} applicationName="Safari" />

                          <VideoApplication url={"goodplayer://" + this.props.post.source} applicationName="Good Player" />

                          <TouchableHighlight onPress={this.onPress} style={styles.button}>
                            <Text style={styles.buttonText}>Native video</Text>
                          </TouchableHighlight>
                                               
                      </View>
                  </View>    
                  <Text/>
                  <Text style={{fontWeight: 'bold', fontSize:30}}>{this.props.post.Title}</Text>
                  <Text/>
                  <Text>{this.props.post.Plot}</Text>
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
    marginBottom: 0,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports = MovieDetails;