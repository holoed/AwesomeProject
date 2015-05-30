'use strict';

var React = require('react-native');
var {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  LinkingIOS,
  AlertIOS,
  ListView
} = React;

var TVShowDetailsItem = require('../TVShowDetailsItem');

var TVShowDetails = React.createClass({

  getDataSource: function() {
    var dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2 });
    return dataSource.cloneWithRows(this.props.post.seasons);
  },
  
  render: function() {
        return ( <View style={{marginLeft:10, marginRight:10}}>
                   <View style={styles.container}>
                      <Image source={{uri:this.props.post.Poster}}
                             style={styles.cellImage} />
                      <View style={styles.rightContainer}>

                          <Text style={{fontSize:30, marginBottom:10}}>Rating: {this.props.post.imdbRating}</Text>

                          <Text style={{fontSize:15, marginBottom:10}}>{this.props.post.Rated} | {this.props.post.Runtime} | {this.props.post.Genre}</Text>

                          <Text style={{fontSize:15, marginBottom:10}}>Stars: {this.props.post.Actors}</Text>

                          <Text style={{fontSize:15, marginBottom:10}}>Released: {this.props.post.Released}</Text>

                          <Text style={{fontSize:15, marginBottom:10}}>Years: {this.props.post.Year}</Text>
                          
                          <ListView
                            automaticallyAdjustContentInsets={false}
                            keyboardDismissMode="onDrag"
                            keyboardShouldPersistTaps={true}
                            showsVerticalScrollIndicator={false}
                            dataSource={this.getDataSource()}
                            renderRow={this.renderPostCell}
                            style={{marginBottom:100, marginTop:20, backgroundColor: 'transparent'}} />                 
                      </View>
                  </View>    
                  <Text/>
                  <Text style={{fontWeight: 'bold', fontSize:30}}>{this.props.post.Title}</Text>
                  <Text/>
                  <Text>{this.props.post.Plot}</Text>
                </View>          
        );
    },
  
  renderPostCell: function(post){
    return(
      <TVShowDetailsItem post={post} navigator={this.props.navigator}/>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  row: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
    padding: 5,
  },
  cellImage: {
    backgroundColor: '#dddddd',
    marginTop: 100,
    height: 600,
    marginRight: 10,
    width: 410,
  },
   video: {
    backgroundColor: '#dddddd',
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
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#32394A',
    borderColor: '#32394A',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports = TVShowDetails;