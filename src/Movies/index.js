'use strict';

var React = require('react-native');
var {
  PixelRatio,
  View,
  Text,
  ListView,
  StyleSheet,
  TouchableHighlight,
  Image,
  TextInput
} = React;

var TimerMixin = require('react-timer-mixin');

var SearchBar = React.createClass({
  render: function() {
    return (
      <View style={styles.searchBar}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onChange={this.props.onSearchChange}
          placeholder="Search a movie..."
          onFocus={this.props.onFocus}
          style={styles.searchBarInput} />
      </View>
    );
  }
});

var MovieItem = require('../MovieItem');

var Movies = React.createClass({

  mixins: [TimerMixin],

  timeoutID: null,

  getInitialState: function() {
    return {
      dataSource: [],
      filteredDataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2 }),
      loaded: false
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },
  getDataSource: function(original) {
      var source = {};
      for (var i = 0; i < original.length; i++) {
           source[original[i].title] = original[i];
      }; 
      return source;
  },

  fetchData: function() {
    fetch("http://192.168.0.9:8000/Catalog")
      .then((response) => response.json())
      .then((responseData) => {
        var original = responseData.categories[0].videos;
        this.setState({
          dataSource: original,
          filteredDataSource: this.state.filteredDataSource.cloneWithRows(this.getDataSource(original)),
          loaded: true
        });
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
    var filteredData = this.getDataSource(this.state.dataSource.filter(item => item.title.toLowerCase().indexOf(filter) > -1));
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
  searchBar: {
    marginTop: 64,
    padding: 3,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBarInput: {
    fontSize: 15,
    flex: 1,
    height: 30,
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
});


module.exports = Movies;