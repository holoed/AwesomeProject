'use strict';

var React = require('react-native');
var { PixelRatio, View, Text, ListView, StyleSheet } = React;

var MovieItem = require('../MovieItem');

var TVShowSeasonDetails = React.createClass({

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

  fetchData: function() {
     for (var i = 0 ; i < this.props.post.episodes.length; i++) {
           var _this = this;
           (function() {
               var item = _this.props.post.episodes[i]; 
               console.log(item);
               fetch("http://www.omdbapi.com/?t=" + (item.series.replace(" ", "+")) + "&Season=" + item.season + "&Episode=" + item.episode + "&plot=full&type=series&r=json")
              .then((response) => response.json())
              .then((responseData) => {
                responseData.source = item.source;
                var updatedSource = _this.state.dataSource.concat([responseData]);
                _this.setState({
                    dataSource: updatedSource,
                    filteredDataSource: _this.state.filteredDataSource.cloneWithRows(_this.getDataSource(updatedSource)),
                    loaded: _this.state.dataSource.length == _this.props.post.episodes.length - 1
                  });   
              }).done(); 
            })(); 
         };
  },
  render: function() {
    if(!this.state.loaded){
      return (
        <View style={styles.wrapper}>
        <Text style={styles.welcome}>
          Loading episodes ...
        </Text>
      </View>
      );
    }
    return (
      this.renderListView()
    );
  },

  renderListView: function(){
    return(
      <View style={{ flex: 1, marginTop:60 }}>  
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
      <MovieItem post={post} navigator={this.props.navigator} toggleMenuBar={this.props.toggleMenuBar}/>
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

module.exports = TVShowSeasonDetails;