'use strict';

var React = require('react-native');
var {
  View,
  Text,
} = React;

var ForTouchScene = React.createClass({
    render: function() {
        return (
            <View>
                <Text>You came here from the TouchableHighlight!</Text>
            </View>
        );
    }
});

module.exports = ForTouchScene;