'use strict';

var React = require('react-native');
var Movies = require('../Movies');
var TVShows = require('../TVShows');

var { StyleSheet, TabBarIOS, View } = React;

var Application = React.createClass({

  getInitialState: function() {
    return {
    	selectedTab: "Movies"
    };
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
        	   <Movies navigator={this.props.navigator} toggleMenuBar={this.props.toggleMenuBar}/>
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
        	   <TVShows navigator={this.props.navigator} toggleMenuBar={this.props.toggleMenuBar}/>
        </TabBarIOS.Item>
     </TabBarIOS>
        
    );
  }
});

module.exports = Application;