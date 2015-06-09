'use strict';

var React = require('react-native');
var Rx = require('rx');
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
    var _this = this;
    Rx.Observable.fromPromise(fetch("http://192.168.0.9:8000/Catalog").then((response) => response.json()))
    .selectMany(responseData => {
      return _this.sequence(responseData.movies.map(function (movie) { 
         return _this.fetchMovie(movie).select(function (data) { 
          data.source = movie.source; 
          return data; 
        })
       }));
    }, (rs, movies) => [rs, movies])
    .doAction((p) => { 
      console.log("loaded movies.");
      _this.setState({ movies: p[1], loadedMovies: true }); 
    }).select(p => p[0])

    .selectMany(responseData => {
      return _this.sequence(responseData.tvshows.map(function (tvshow) { 
         return _this.fetchTVShow(tvshow).selectMany(function (data) { 
          return _this.sequence(tvshow.seasons.map(function (season) {
            return _this.sequence(season.episodes.map(function (episode) {
              return _this.fetchEpisode(episode).select(function (episodeData) {
                episodeData.source = episode.source;
                return episodeData;
              })
            }))
          }))
        }, (rs, tvshow) => [rs, tvshow])
       }));
    }, (rs, tvshows) => [rs, tvshows])
    .doAction((p) => { 
      console.log("loaded tv shows.");
      _this.setState({ tvshows: p[1].map(xs => {
        xs[0].seasons = xs[1].map(function(x) { return { season: "Season " + x[0].Season, episodes: x }; });
        return xs[0];
      }), loadedTVShows: true }); 
    }).select(p => p[0])

    .subscribe();


  },

  // [Observable a] -> Observable [a]
  sequence: function(xs, reportProgress) {
    if (xs.length == 0) { 
      return Rx.Observable.returnValue([]);
    }
    return Rx.Observable.create((obs) => {
      var count = 0
      var data = [];
      var disposables = new Rx.CompositeDisposable();
      for (var i = 0; i <   xs.length; i++) {
          disposables.add(xs[i].take(1).subscribe((x) => { 
            data.push(x);
            count++; 
            if (count == xs.length) {
             obs.onNext(data);
             obs.onCompleted();
           }
          }, er => obs.onError(er), () => {}));
      };
      return disposables;
    });
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