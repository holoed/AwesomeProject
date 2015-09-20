'use strict';

var Http = require('HttpClient');

var React = require('react-native');
var {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  LinkingIOS,
  AlertIOS,
  ScrollView
} = React;

var Window = require('Dimensions').get('window');
var Viewport = require('react-native-viewport');
var VideoApplication = require('../VideoApplication');
var NativeVideo = require('../NativeVideo');
var Chromecast = require('../Chromecast');
var Triangle = require('../Triangle');


var MovieDetails = React.createClass({

    openNativeVideo: function() {
        this.props.hideSideMenu(true);
        this.props.navigator.push({
            title: this.props.post.title,
            component: NativeVideo,
            passProps: { post: this.props.post, 
                         hideSideMenu: this.props.hideSideMenu, 
                         popAndRefresh: this.props.popAndRefresh }
        });
    },

    openChromecast: function() {
        this.props.hideSideMenu(true);
        this.props.navigator.push({
            title: this.props.post.title,
            component: Chromecast,
            passProps: { post: this.props.post, 
                         hideSideMenu: this.props.hideSideMenu, 
                         popAndRefresh: this.props.popAndRefresh }
        });
    },

    players : function() {
      return  (<View>
                <VideoApplication url={this.props.post.source.replace("http", "infuse")} applicationName="Infuse" />

                <TouchableHighlight onPress={this.openChromecast} style={styles.button}>
                    <Text style={styles.buttonText}>Chromecast</Text>
                </TouchableHighlight>
              </View>)
    },

    render: function() {
           return ( <View style={{backgroundColor:'black', flex:1}}>
                    <Image style={{
                                    marginLeft:10, 
                                    marginRight:10,
                                    marginTop: 10,
                                    marginBottom: 10,
                                    flex:1,
                                    width: null,
                                    height: null,
                                    resizeMode:'contain',
                                    backgroundColor: 'transparent'
                                 }} source={{uri: this.props.post.poster}}>

                    {(this.props.post.source.toLowerCase().contains("netflix") ||
                      this.props.post.source.toLowerCase().contains("amazon") || 
                      this.props.post.source.toLowerCase().contains("youtube")) ?
                     (<View style={{flex:1}}></View>) :
                     (<View style={{    flex: 1,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      backgroundColor: 'transparent'}}>
                          <TouchableHighlight style={styles.circle} onPress={this.openNativeVideo}>
                              <Triangle/>
                          </TouchableHighlight>
                        
                     </View>)}
                    <View style={{backgroundColor:'black', opacity:0.8, padding:25, flex:1}}>
                      <Text style={{fontWeight: 'bold', fontSize:30, backgroundColor:'transparent', color:'white'}}>{this.props.post.title}</Text>
                      <Text style={{fontSize:15, backgroundColor:'transparent', color:'white'}}>{this.props.post.genre != null && this.props.post.genre.split(',').join(' ')}</Text>
                      <ScrollView  contentInset={{top: -40}} style={{paddingTop:10, paddingBottom:20, height:200}}>
                        <Text style={{color:'white'}}>{this.props.post.plot}</Text>
                      </ScrollView>
                       {
                            (this.props.post.source != undefined && this.props.post.source != null) ?
                             (<View>
                                {(this.props.post.source.toLowerCase().contains("netflix")) ?
                                 (<View><Text style={{color:'white'}}>Netflix movie available only through Safari</Text></View>) :
                                 (this.props.post.source.toLowerCase().contains("amazon")) ?
                                 (<View><Text style={{color:'white'}}>Amazon movie available only through Safari</Text></View>) :
                                 (this.props.post.source.toLowerCase().contains("youtube")) ?
                                 (<View><Text style={{color:'white'}}>YouTube movie available only through Safari</Text></View>) :
                                 this.players()}

                                 <VideoApplication url={this.props.post.source} applicationName="Safari" />

                              </View>): (<View></View>)
                          }
                    </View>
                  </Image>
                  </View>
          );
    },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 600,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  cellImage: {
    backgroundColor: 'transparent',
    marginTop: 100,
    height: 600,
    marginRight: 10,
    width: 410,
  },
  cellImageLandscape: {
    backgroundColor: 'transparent',
    marginTop: 90,
    height: 600,
    marginRight: 10,
    width: 410,
  },
   video: {
    backgroundColor: 'transparent',
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
    backgroundColor: '#32394A',
    borderColor: '#32394A',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginLeft:10,
    marginRight:10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    height: 100,
    width: 100,
    backgroundColor: '#32394A',
    borderColor: '#32394A',
    borderWidth: 1,
    borderRadius: 100/2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    opacity: 0.5
  }
});

module.exports = MovieDetails;
