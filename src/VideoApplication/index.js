'use strict';

var React = require('react-native');
var {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  LinkingIOS,
  AlertIOS
} = React;

var VideoApplication = React.createClass({

    getInitialState: function() {
      return {
        supported : false
      };
    },

    componentDidMount: function() {
      LinkingIOS.canOpenURL(this.props.url, (supported) => {
            this.setState({ supported: supported })
      });
    },

    openIn: function() {
        LinkingIOS.canOpenURL(this.props.url, (supported) => {
          if (!supported) {
            AlertIOS.alert('Can\'t handle url: ' + this.props.url);
          } else {
            LinkingIOS.openURL(this.props.url);
          }
        });
    },
    render: function() {
        if (this.state.supported) 
          return  (<TouchableHighlight onPress={this.openIn} style={styles.button}>
                      <Text style={styles.buttonText}>{this.props.applicationName}</Text>
                  </TouchableHighlight>);
        else return <View/>;           
    }
});

var styles = StyleSheet.create({
  buttonText: {
  fontSize: 18,
  color: 'white',
  alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports = VideoApplication;