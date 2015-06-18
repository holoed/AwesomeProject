'use strict';

var React = require('react-native');
var Rx = require('rx');
var Movies = require('../Movies');
var TVShows = require('../TVShows');
var Utils = require('../Utils');

var { AsyncStorage, StyleSheet, TabBarIOS, View, Text } = React;

var Engine = require('SearchEngine');

var STORAGE_KEY = '@MyMoviesState:key';

var SETTINGS_KEY = '@MyMoviesSettings:key';

var Application = React.createClass({

  //TODO: Remove duplication with Settings. Move defaults to config file.
  defaultSettings : { "SourceURL": "http://192.168.0.12:8005/Top500.json" },

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
           source.push(items[i].Title + " " + 
                       items[i].Genre + " " +
                       items[i].Actors + " " + 
                       items[i].Director);
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
  },

  fetchData: function() {
    var _this = this;
    Rx.Observable.fromPromise(AsyncStorage.getItem(SETTINGS_KEY))
    .select(settings => 
      (settings == null) ? _this.defaultSettings : JSON.parse(settings))
    .selectMany(settings =>
    Rx.Observable.fromPromise(fetch(settings.SourceURL).then((response) => response.json())), (sett, res) => res)
    .selectMany(responseData => {
      console.log("loading " + responseData.movies.length + " movies");
      return responseData.movies.map(function (movie) { 
         return _this.fetchMovie(movie).select(function (data) { 
          data.source = movie.source; 
          return data; 
        })
       }).sequence();
    }, (rs, movies) => [rs, movies])
    .doAction((p) => { 
      console.log("loaded movies.");
      var movies_result = p[1];
      _this.setState({ movies: movies_result, 
                       indexMovies: _this.createIndex(movies_result), 
                       loadedMovies: true }); 
    }).select(p => p[0])

    .selectMany(responseData => {
      console.log("loading " + responseData.tvshows.length + " tvshows");
      return responseData.tvshows.map(function (tvshow) { 
         return _this.fetchTVShow(tvshow).selectMany(function (data) { 
          return tvshow.seasons.map(function (season) {
            return season.episodes.map(function (episode) {
              return _this.fetchEpisode(episode).select(function (episodeData) {
                episodeData.source = episode.source;
                return episodeData;
              })
            }).sequence()
          }).sequence()
        }, (rs, tvshow) => [rs, tvshow])
       }).sequence();
    }, (rs, tvshows) => [rs, tvshows])
    .doAction((p) => { 
      console.log("loaded tv shows.");

      var tvshows_result = p[1].map(xs => {
        xs[0].seasons = xs[1].map(function(x) { 
          x.sort((a, b) => parseInt(a.Episode) - parseInt(b.Episode));
          return { season: "Season " + x[0].Season, episodes: x }; 
        });
        xs[0].seasons.sort((a, b) => parseInt(a.Season) - parseInt(b.Season));
        return xs[0];
      });

      _this.setState({ tvshows: tvshows_result, 
                       indexTVShows: _this.createIndex(tvshows_result), 
                       loadedTVShows: true }); 
    }).select(p => p[0])
    .doAction((_) => _this.saveState())
    .subscribe();
  },

  saveState : function() {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.state))
      .then(() => console.log('Saved state to disk.'))
      .catch((error) => console.log('Error saving state to disk: ' + error.message))
      .done();
  },

  fetchMovie: function(movie) {
      return Rx.Observable.fromPromise(
        fetch("http://www.omdbapi.com/?t=" + (movie.title.replace(" ", "+")) + "&y=" + movie.year + "&plot=full&type=movie&r=json")
              .then((response) => response.json()));
  },  

  fetchTVShow: function(tvshow) {
      return Rx.Observable.fromPromise(
        fetch("http://www.omdbapi.com/?t=" + (tvshow.title.replace(" ", "+")) + "&y=" + tvshow.year + "&plot=full&type=series&r=json")
              .then((response) => response.json()));
  }, 

  fetchEpisode: function(item) {
      return Rx.Observable.fromPromise(fetch("http://www.omdbapi.com/?t=" + (item.series.replace(" ", "+")) + "&Season=" + item.season + "&Episode=" + item.episode + "&plot=full&type=series&r=json")
              .then((response) => response.json()));
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