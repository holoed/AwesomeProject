'use strict';

var Http = require('HttpClient');

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
            title: this.props.post.title,
            component: MovieDetails,
            passProps: { post: this.props.post, hideSideMenu: this.props.hideSideMenu, popAndRefresh: this.popAndRefresh },
        });
  },

  onPress: function() {
        this.props.navigator.push({
            title: this.props.post.title,
            component: MovieDetails,
            passProps: { post: this.props.post, hideSideMenu: this.props.hideSideMenu, popAndRefresh: this.popAndRefresh },
        });
    },

  render: function() {
     return (
        <TouchableHighlight onPress={this.onPress}>
          <View style={styles.row}>
            <Image
              source={{uri: this.props.post.poster}}
              style={{height: 1024 / 3.1, width: 768 / 3.1 }}/>

              { (this.props.post.episode != undefined) ?
            (<View style={styles.textContainer}>    
              <Text style={styles.movieTitle} numberOfLines={2}>   
                {this.props.post.title}    
              </Text>    
               <View style={{flex: 1, flexDirection: 'row'}}>    
                            {(this.props.post.season != undefined && this.props.post.season != null) ?   
                                 (<Text style={{fontSize:15, marginBottom:8}}>Season: {this.props.post.season}</Text>) :   
                                 (<View></View>)}    
   
                            {(this.props.post.episode != undefined && this.props.post.episode != null) ?   
                                 (<Text style={{fontSize:15, marginBottom:8, marginLeft:10}}>Episode: {this.props.post.episode}</Text>) :    
                                 (<View></View>)}    
              </View>    
              <Text>   
                {this.props.post.plot}   
              </Text>    
            </View>) : (<View/>)}
          </View>
        </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    padding: 10
   },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 2
  },
  movieTitle: {   
    flex: 1,   
    fontSize: 25,    
    fontWeight: '500',   
    marginBottom: 2    
  },
});


module.exports = MovieItem;
