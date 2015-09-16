'use strict';

var React = require('react-native');
var { PixelRatio, View, Text, ListView, StyleSheet } = React;

var Engine = require('SearchEngine');
var TimerMixin = require('react-timer-mixin');
var MovieItem = require('../MovieItem');
var SearchBar = require('../SearchBar');

var Movies = React.createClass({

  mixins: [TimerMixin],

  timeoutID: null,

  getInitialState: function() {
    return {
      filteredDataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1.title != row2.title && 
                                                                                  row1.year != row2.year })
    };
  },

  componentWillMount: function() {
    this.setState({filteredDataSource: this.state.filteredDataSource.cloneWithRows(this.props.dataSource)});
  },

  componentDidMount: function() {
    var listViewScrollView = this.refs.listview.getScrollResponder();
    listViewScrollView.scrollTo(1);
  },

  getDataSource: function(original) {
      var source = {};
      for (var i = 0; i < original.length; i++) {
           source[original[i].title] = original[i];
      }; 
      return source;
  },

  render: function() {
    return (
      this.renderListView()
    );
  },

  onSearchChange: function(event) {
    var filter = event.nativeEvent.text.toLowerCase(); 
    this.clearTimeout(this.timeoutID);
    this.timeoutID = this.setTimeout(() => this.searchMovies(filter), 5);
  },

  clearSearch: function(event) {
    this.clearTimeout(this.timeoutID);
    this.timeoutID = this.setTimeout(() => this.searchMovies(""), 5);
  },

  searchMovies: function(filter) {
    var foundMovies = []    
    if (filter != undefined && filter != "") { 
      var foundItems = Engine.searchLineNumbers(this.props.index)(filter);
      for (var i = foundItems.length - 1; i >= 0; i--) {
        foundMovies.push(this.props.dataSource[foundItems[i]]);
      };
    } else foundMovies = this.props.dataSource; 

    var filteredData = this.getDataSource(foundMovies);
    this.setState({
          filteredDataSource: this.state.filteredDataSource.cloneWithRows(filteredData)
        });
  },

  renderListView: function(){
    return(
      <View style={{ flex: 1, backgroundColor: '#232832' }}>
        <SearchBar onSearchChange={this.onSearchChange} 
                   clearSearch={this.clearSearch}
                   onFocus={() => this.refs.listview.getScrollResponder().scrollTo(0, 0)} />
        <View style={styles.separator} />
        <ListView
            ref="listview"
            contentInset={{bottom:49}}
            automaticallyAdjustContentInsets={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}           
            dataSource={this.state.filteredDataSource}
            renderRow={this.renderPostCell} />
      </View>
      
    );
  },
  renderPostCell: function(post){
    return(
      <MovieItem post={post} 
                 navigator={this.props.navigator} 
                 hideSideMenu={this.props.hideSideMenu} />
    );
  }
});

var styles = StyleSheet.create({
  list: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
});

module.exports = Movies;