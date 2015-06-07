'use strict';

var React = require('react-native');
var Movies = require('../Movies');
var TVShows = require('../TVShows');

var { StyleSheet, TabBarIOS, View, Text } = React;

var Engine = require('Main');

var Application = React.createClass({

  getInitialState: function() {
    return {
      movies: [],
      tvshows: [],
      loadedMovies: false,
      loadedTVShows: false,
    	selectedTab: "Movies",
      totalMoviesCount:1,
      totalTVShowsCount:1
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
    this.fetchData();
  },

  fetchData: function() {
    fetch("http://192.168.0.9:8000/Catalog")
      .then((response) => response.json())
      .then((responseData) => { 
        this.fetchMovies(responseData);
        this.fetchTVShows(responseData); })
      .done();
  },

  fetchMovies: function(responseData) {
        var videos = responseData.movies;
        var _this = this;
        for (var i = 0 ; i < videos.length; i++) {
           (function() {
               var item = videos[i]; 
               fetch("http://www.omdbapi.com/?t=" + (item.title.replace(" ", "+")) + "&y=" + item.year + "&plot=full&type=movie&r=json")
              .then((response) => response.json())
              .then((responseData) => {
                responseData.source = item.source;
                var updatedSource = _this.state.movies.concat([responseData]);
                _this.setState({
                    movies: updatedSource,
                    loadedMovies: _this.state.movies.length == videos.length - 1,
                    totalMoviesCount: videos.length
                  });   

                if (_this.state.loadedMovies) {
                  _this.setState({
                    movies : _this.state.movies,
                    loadedMovies: _this.state.loadedMovies,
                    indexMovies: _this.createIndex(_this.state.movies)
                  })
                }

              }).done(); 
            })(); 
         };
  },

  fetchTVShows: function(responseData) {
        var videos = responseData.tvshows;
        var _this = this;
        for (var i = 0 ; i < videos.length; i++) {
           (function() {
               var item = videos[i]; 
               fetch("http://www.omdbapi.com/?t=" + (item.title.replace(" ", "+")) + "&y=" + item.year + "&plot=full&type=series&r=json")
              .then((response) => response.json())
              .then((responseData) => {
                responseData.seasons = item.seasons;
                var updatedSource = _this.state.tvshows.concat([responseData]);
                _this.setState({
                    tvshows: updatedSource,
                    loadedTVShows: _this.state.tvshows.length == videos.length - 1,
                    totalTVShowsCount: videos.length
                  });   

                if (_this.state.loadedTVShows) {
                  _this.setState({
                    tvshows : _this.state.tvshows,
                    loadedTVShows: _this.state.loadedTVShows,
                    indexTVShows: _this.createIndex(_this.state.tvshows)
                  })
                }

              }).done(); 
            })(); 
         };
  },

  render: function() {
     if(!this.state.loadedMovies || !this.state.loadedTVShows){
      return (
        <View style={styles.wrapper}>
        <Text style={styles.welcome}>
          Loading { Math.round((this.state.movies.length + this.state.tvshows.length) / (this.state.totalMoviesCount + this.state.totalTVShowsCount) * 100) + '%'}
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