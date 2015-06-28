'use strict';

var React = require('react-native');
var Rx = require('rx');
var Movies = require('../Movies');
var TVShows = require('../TVShows');
var Utils = require('../Utils');

var { AsyncStorage, StyleSheet, TabBarIOS, View, Text } = React;

var Engine = require('SearchEngine');
var Loader = require('MetadataLoader');

var STORAGE_KEY = '@MyMoviesState:key';

var SETTINGS_KEY = '@MyMoviesSettings:key';

var Application = React.createClass({

  //TODO: Remove duplication with Settings. Move defaults to config file.
  defaultSettings : { "SourceURL": "http://holoed.github.io/top500.json" },

  getInitialState: function() {
    return {
      movies: [],
      tvshows: [],
      loadedMovies: false,
      loadedTVShows: false,
    	selectedTab: "Movies",
    };
  },

  createIndex: function(items) {
      var source = [];
      for (var i = 0; i < items.length; i++) {
           source.push(items[i].title + " " + 
                       items[i].genre + " " +
                       items[i].actors + " " + 
                       items[i].director);
      }; 
      return Engine.createIndex(source);
  },

  componentDidMount: function() {
    var _this = this;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => {
        if (value !== null) {
            var saved_state = JSON.parse(value);
            saved_state.indexMovies = _this.createIndex(saved_state.movies);
            saved_state.indexTVShows = _this.createIndex(saved_state.tvshows);
            this.setState(saved_state);
            console.log("State loaded from disk");
          } else {
            console.log("Loading state from web");
            _this.fetchData();
        }
      })
      .catch((error) => {
        console.log("An error occurred while attempting to load state from dist: " + error)
        _this.fetchData();
      })
      .done();
    this.props.refresh.doAction(_ => { 
      _this.setState(_this.getInitialState());
      _this.fetchData(); }).subscribe();
  },

  fetchData: function() {
    var _this = this;
    Rx.Observable.fromPromise(AsyncStorage.getItem(SETTINGS_KEY))
    .select(settings => 
      (settings == null) ? _this.defaultSettings : JSON.parse(settings))
    .subscribe((settings) => {
        Loader.getState(settings.SourceURL)(function (data) {
          console.log("loaded " + data.movies.length + " movies");
          console.log("loaded " + data.tvshows.length + " tvshows");
          var newState = {
             movies: data.movies,
             tvshows: data.tvshows,
             indexMovies: _this.createIndex(data.movies),
             indexTVShows: _this.createIndex(data.tvshows),
             loadedMovies: true,
             loadedTVShows: true
          };
          _this.setState (newState);
          _this.saveState();
        })
    });
  },

  saveState : function() {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.state))
      .then(() => console.log('Saved state to disk.'))
      .catch((error) => console.log('Error saving state to disk: ' + error.message))
      .done();
  },


  render: function() {
     if(!this.state.loadedMovies || !this.state.loadedTVShows){
      return (
        <View style={styles.wrapper}>
        <Text style={styles.welcome}>
          Loading Movies and TV Shows...
        </Text>
      </View>
      );
    }

    return (
    <TabBarIOS>
         <TabBarIOS.Item 
         	selected={this.state.selectedTab == "Movies"} 
         	title="Movies" 
         	icon={require('image!ios7-film-outline-small')}
         	onPress={() => {
            this.setState({
              selectedTab: 'Movies',
            });
          }}>
        	   <Movies navigator={this.props.navigator} toggleMenuBar={this.props.toggleMenuBar} dataSource={this.state.movies} index={this.state.indexMovies} />
        </TabBarIOS.Item>
         <TabBarIOS.Item 
         	selected={this.state.selectedTab == "TV Shows"} 
         	title="TV Shows" 
         	icon={require('image!ios7-monitor-tab')}
         	onPress={() => {
            this.setState({
              selectedTab: 'TV Shows',
            });
          }}>
        	   <TVShows navigator={this.props.navigator} toggleMenuBar={this.props.toggleMenuBar} dataSource={this.state.tvshows} index={this.state.indexTVShows} />
        </TabBarIOS.Item>
     </TabBarIOS>
        
    );
  }
});

var styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

module.exports = Application;