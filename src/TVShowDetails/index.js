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
  ListView,
  ScrollView
} = React;

var Window = require('Dimensions').get('window');
var Viewport = require('react-native-viewport');
var TVShowDetailsItem = require('../TVShowDetailsItem');

var TVShowDetails = React.createClass({

   getInitialState: function() {
    return { orientation: null };
  },


  componentWillMount: function () {
      var _this = this;
      Viewport.getDimensions(function (args) {
        if (args.orientation == 5 || args.orientation == 6) return;
        if (args.orientation == 1 || args.orientation == 2)
          _this.setState({ orientation: 'portrait' });
        else if (args.orientation == 3 || args.orientation == 4)
          _this.setState({ orientation: 'landscape' });
      });


      Viewport.addEventListener(Viewport.events.DEVICE_DIMENSIONS_EVENT, function(args) {
        if (args.orientation == 5 || args.orientation == 6) return;
        if (args.orientation == 1 || args.orientation == 2)
          _this.setState({ orientation: 'portrait' });
        else if (args.orientation == 3 || args.orientation == 4)
          _this.setState({ orientation: 'landscape' });
      });
  },

  getDataSource: function() {
    var dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2 });
    return dataSource.cloneWithRows(this.props.post.seasons);
  },
  
  render: function() {
      if (this.state.orientation == 'portrait') return this.renderPortrait(); 
      if (this.state.orientation == 'landscape') return this.renderLandscape();
       if (Window.width > Window.height) return this.renderLandscape();
      return this.renderPortrait();
  },

  renderPortrait: function() {
        return ( <View style={{marginLeft:10, marginRight:10}}>
                   <View style={styles.container}>
                      <Image source={{uri:this.props.post.poster}}
                             style={styles.cellImage} />
                      <View style={styles.rightContainer}>

                          <Text style={{fontSize:30, marginBottom:10}}>Rating: {this.props.post.popularity}</Text>

                          <Text style={{fontSize:15, marginBottom:10}}>{this.props.post.rated} | {this.props.post.runtime} | {this.props.post.genre}</Text>

                          <Text style={{fontSize:15, marginBottom:10}}>Stars: {this.props.post.actors}</Text>

                          <Text style={{fontSize:15, marginBottom:10}}>Released: {this.props.post.year}</Text>

                          
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
                  <Text style={{fontWeight: 'bold', fontSize:30}}>{this.props.post.title}</Text>
                  <ScrollView  contentInset={{top: -40}} style={{paddingTop:10, paddingBottom:10}}>
                      <Text>{this.props.post.plot}</Text>
                    </ScrollView>
                </View>          
        );
  },

  renderLandscape: function() {
        return ( <View style={{marginLeft:10, marginRight:10}}>
                   <View style={styles.container}>
                      <Image source={{uri:this.props.post.poster}}
                             style={styles.cellImage} />
                      <View style={styles.rightContainer}>

                          <Text style={{fontWeight: 'bold', fontSize:30, marginBottom:6 }}>{this.props.post.title}</Text>

                          <Text style={{fontSize:20, marginBottom:6}}>Rating: {this.props.post.imdbRating}</Text>

                          <Text style={{fontSize:15, marginBottom:6}}>{this.props.post.rated} | {this.props.post.runtime} | {this.props.post.genre}</Text>

                          <Text style={{fontSize:15, marginBottom:6}}>Stars: {this.props.post.actors}</Text>

                          <Text style={{fontSize:15, marginBottom:6}}>Released: {this.props.post.year}</Text>

             
                          <ScrollView  contentInset={{top: -40}} style={{paddingTop:10, paddingBottom:10}}>
                              <Text style={{marginBottom:5}}>{this.props.post.plot}</Text>
                          </ScrollView>

                          <ListView
                            automaticallyAdjustContentInsets={false}
                            keyboardDismissMode="onDrag"
                            keyboardShouldPersistTaps={true}
                            showsVerticalScrollIndicator={false}
                            dataSource={this.getDataSource()}
                            renderRow={this.renderPostCell}
                            style={{marginBottom:80, marginTop:20, backgroundColor: 'transparent'}} />                 
                      </View>
                  </View>           
                </View>          
        );
  },
  
  renderPostCell: function(post){
    return(
      <TVShowDetailsItem post={post} navigator={this.props.navigator} toggleMenuBar={this.props.toggleMenuBar} />
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