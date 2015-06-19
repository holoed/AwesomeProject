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

var Window = require('Dimensions').get('window');
var Viewport = require('react-native-viewport');
var VideoApplication = require('../VideoApplication');
var NativeVideo = require('../NativeVideo');


var MovieDetails = React.createClass({

    getInitialState: function() {
      return { orientation: null };
    },

    componentWillMount: function () {
      var _this = this;
      Viewport.getDimensions(function (args) {
        if (args.orientation == 5 || args.orientation == 6) return;
        if (args.orientation == 1 || args.orientation == 2)
          _this.setState({ orientation: 'portrait' });
        else if (args.orientation == 3 || args.orientation == 4)
          _this.setState({ orientation: 'landscape' });
      });

      Viewport.addEventListener(Viewport.events.DEVICE_DIMENSIONS_EVENT, function(args) {
        if (args.orientation == 5 || args.orientation == 6) return;
        if (args.orientation == 1 || args.orientation == 2)
          _this.setState({ orientation: 'portrait' });
        else if (args.orientation == 3 || args.orientation == 4)
          _this.setState({ orientation: 'landscape' });
      });
    },

    onPress: function() {
        this.props.navigator.push({
            title: this.props.post.Title,
            component: NativeVideo,
            passProps: { post: this.props.post, toggleMenuBar : this.props.toggleMenuBar, popAndRefresh: this.props.popAndRefresh },
        });
    },

    render: function() {
        if (this.state.orientation == 'portrait') return this.renderPortrait();  
        if (this.state.orientation == 'landscape') return this.renderLandscape();
        if (Window.width > Window.height) return this.renderLandscape();
        return this.renderPortrait();
    },

    renderPortrait: function() {
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

                            {
                              (this.props.post.source != undefined && this.props.post.source != null) ?
                               (<View>
                                          <VideoApplication url={this.props.post.source.replace("http", "vlc")} applicationName="VLC" />
                                      
                                          <VideoApplication url={this.props.post.source.replace("http", "infuse")} applicationName="Infuse" />
                                      
                                          <VideoApplication url={"AVPlayer://" + this.props.post.source} applicationName="AVPlayer" />

                                          <VideoApplication url={this.props.post.source} applicationName="Safari" />

                                          <VideoApplication url={"goodplayer://" + this.props.post.source} applicationName="Good Player" />

                                          <TouchableHighlight onPress={this.onPress} style={styles.button}>
                                            <Text style={styles.buttonText}>Native video</Text>
                                          </TouchableHighlight>
                                        </View>): (<View></View>)
                          
                          }
                                                 
                        </View>
                    </View>    
                    <Text/>
                    <Text style={{fontWeight: 'bold', fontSize:30}}>{this.props.post.Title}</Text>
                    <Text/>
                    <Text>{this.props.post.Plot}</Text>
                  </View>          
          );
    },

    renderLandscape: function() {
          return ( <View style={{marginLeft:10, marginRight:10}}>
                     <View style={styles.container}>
                        <Image source={{uri:this.props.post.Poster}}
                               style={styles.cellImageLandscape} />
                        <View style={styles.rightContainer}>

                            <Text style={{fontWeight: 'bold', fontSize:25, marginTop:20, marginBottom:8}}>{this.props.post.Title}</Text>

                            <Text style={{fontSize:20, marginBottom:8}}>Rating: {this.props.post.imdbRating}</Text>

                            <Text style={{fontSize:15, marginBottom:8}}>{this.props.post.Rated} | {this.props.post.Runtime} | {this.props.post.Genre}</Text>

                            <Text style={{fontSize:15, marginBottom:8}}>Director: {this.props.post.Director}</Text>

                            <Text style={{fontSize:15, marginBottom:8}}>Writer: {this.props.post.Writer}</Text>

                            <Text style={{fontSize:15, marginBottom:8}}>Stars: {this.props.post.Actors}</Text>

                            <Text style={{fontSize:15, marginBottom:8}}>Released: {this.props.post.Released}</Text>

                            <Text style={{marginBottom:5}}>{this.props.post.Plot}</Text>  

                            <View style={{flex: 1, flexDirection: 'row'}}>  
                              <VideoApplication style={{width:100}} url={this.props.post.source.replace("http", "vlc")} applicationName="VLC" />                          
                              <VideoApplication style={{width:100}} url={this.props.post.source.replace("http", "infuse")} applicationName="Infuse" />
                            </View>

                            <View style={{flex: 1, flexDirection: 'row'}}>  
                              <VideoApplication style={{width:100}} url={"AVPlayer://" + this.props.post.source} applicationName="AVPlayer" />
                              <VideoApplication style={{width:100}} url={this.props.post.source} applicationName="Safari" />
                            </View>

                            <View style={{flex: 1, flexDirection: 'row'}}>  
                              <VideoApplication style={{width:100}} url={"goodplayer://" + this.props.post.source} applicationName="Good Player" />
                              <TouchableHighlight onPress={this.onPress} style={styles.button}>
                                <Text style={styles.buttonText}>Native video</Text>
                              </TouchableHighlight>    
                            </View>
          
                        </View>
                    </View>    
                  </View>          
          );
    },
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
  cellImageLandscape: {
    backgroundColor: '#dddddd',
    marginTop: 90,
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
    marginLeft:10,
    marginRight:10,
    justifyContent: 'center'
  }
});

module.exports = MovieDetails;