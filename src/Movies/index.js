'use strict';

var React = require('react-native');
var { PixelRatio, View, Text, ListView, StyleSheet } = React;

var Engine = require('Main');
var TimerMixin = require('react-timer-mixin');
var MovieItem = require('../MovieItem');
var SearchBar = require('../SearchBar');

var Movies = React.createClass({

  mixins: [TimerMixin],

  timeoutID: null,

  getInitialState: function() {
    return {
      dataSource: [],
      filteredDataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1.Title != row2.Title && 
                                                                                  row1.Year != row2.Year }),
      loaded: false
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },
  getDataSource: function(original) {
      var source = {};
      for (var i = 0; i < original.length; i++) {
           source[original[i].Title] = original[i];
      }; 
      return source;
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

  fetchData: function() {
    fetch("http://192.168.0.9:8000/Catalog")
      .then((response) => response.json())
      .then((responseData) => {
        var videos = responseData.categories[0].videos;
        var _this = this;
        for (var i = 0 ; i < videos.length; i++) {
           (function() {
               var item = videos[i]; 
               fetch("http://www.omdbapi.com/?t=" + (item.title.replace(" ", "+")) + "&y=" + item.year + "&plot=full&type=movie&r=json")
              .then((response) => response.json())
              .then((responseData) => {
                responseData.sources = item.sources;
                var updatedSource = _this.state.dataSource.concat([responseData]);
                _this.setState({
                    dataSource: updatedSource,
                    filteredDataSource: _this.state.filteredDataSource.cloneWithRows(_this.getDataSource(updatedSource)),
                    loaded: _this.state.dataSource.length == videos.length - 1
                  });   

                if (_this.state.loaded) {
                  _this.setState({
                    dataSource : _this.state.dataSource,
                    filteredDataSource: _this.state.filteredDataSource,
                    loaded: _this.state.loaded,
                    index: _this.createIndex(_this.state.dataSource)
                  })
                }

              }).done(); 
            })(); 
         };
      })
      .done();
  },
  render: function() {
    if(!this.state.loaded){
      return (
        <View style={styles.wrapper}>
        <Text style={styles.welcome}>
          Loading movies list ...
        </Text>
      </View>
      );
    }
    return (
      this.renderListView()
    );
  },
  onSearchChange: function(event) {
    var filter = event.nativeEvent.text.toLowerCase(); 
    this.clearTimeout(this.timeoutID);
    this.timeoutID = this.setTimeout(() => this.searchMovies(filter), 100);
  },


  searchMovies: function(filter) {

    var foundMovies = []    
    if (filter != undefined && filter != "") { 
      var foundItems = Engine.search(this.state.index)(filter);
      for (var i = foundItems.length - 1; i >= 0; i--) {
        foundMovies.push(this.state.dataSource[foundItems[i] - 1]);
      };
    } else foundMovies = this.state.dataSource; 

    var filteredData = this.getDataSource(foundMovies);
    this.setState({
          dataSource: this.state.dataSource,
          filteredDataSource: this.state.filteredDataSource.cloneWithRows(filteredData),
          loaded: this.state.loaded,
        });
  },


  renderListView: function(){
    return(
      <View style={{ flex: 1 }}>
        <SearchBar onSearchChange={this.onSearchChange}
          onFocus={() => this.refs.listview.getScrollResponder().scrollTo(0, 0)} />
        <View style={styles.separator} />
        <ListView
            ref="listview"
            automaticallyAdjustContentInsets={false}
            keyboardDismissMode="onDrag"
            keyboardShouldPersistTaps={true}
            showsVerticalScrollIndicator={false}
            dataSource={this.state.filteredDataSource}
            renderRow={this.renderPostCell}
            style={styles.postsListView}/>
      </View>
      
    );
  },
  renderPostCell: function(post){
    return(
      <MovieItem post={post} navigator={this.props.navigator}/>
    );
  }
});

var styles = StyleSheet.create({
  textContainer: {
    flex: 1,
   },
   container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6EF',
  },
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
  postsListView:{
    backgroundColor: 'transparent',
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  cellImage: {
    backgroundColor: '#dddddd',
    height: 143,
    marginRight: 10,
    width: 110,
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    // Trick to get the thinest line the device can display
    height: 1 / PixelRatio.get(),
    marginLeft: 4,
  },
  movieTitle: {
    flex: 1,
    fontSize: 25,
    fontWeight: '500',
    marginBottom: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
});


module.exports = Movies;