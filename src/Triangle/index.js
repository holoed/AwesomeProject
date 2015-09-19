'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text
} = React;

var Triangle = React.createClass({  
	setNativeProps: function(nativeProps) {
    	this._root.setNativeProps(nativeProps);
  	},

	render: function() {    
		return (      
			<View ref={component => this._root = component} {...this.props} 
			      style={[styles.triangle, this.props.style]}><Text></Text></View>    
			)  
	}})  

var styles = StyleSheet.create({

	triangle: {    
		width: 0,    
		height: 0,    
		backgroundColor: 'transparent',    
		borderStyle: 'solid',    
		borderLeftWidth: 25,    
		borderRightWidth: 25,    
		borderBottomWidth: 50,    
		borderLeftColor: 'transparent',    
		borderRightColor: 'transparent',    
		borderBottomColor: 'white',
		transform: [
	      {rotate: '90deg'}
	    ]
	}

});

module.exports = Triangle;