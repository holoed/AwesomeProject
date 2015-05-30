'use strict';

var React = require('react-native');
var Movies = require('../Movies');

var { StyleSheet, TabBarIOS, View } = React;

var Application = React.createClass({

  getInitialState: function() {
    return {
    	selectedTab: "Movies"
    };
  },

  _renderContent: function() {
    return (
      <Movies navigator={this.props.navigator}/>
    );
  },


  render: function() {
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
        	   {this._renderContent()}
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
        	   <View></View>
        </TabBarIOS.Item>
     </TabBarIOS>
        
    );
  }
});

module.exports = Application;