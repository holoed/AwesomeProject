'use strict';

var React = require('react-native');
var {
  View,
  StyleSheet,
  TextInput,
  Image
} = React;

var SearchBar = React.createClass({
  render: function() {
    return (
      <View style={styles.searchBar}>
        <Image source={require('image!ios7-search-tab')} />
        <TextInput
          clearButtonMode="always"
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

var styles = StyleSheet.create({
  searchBar: {
    marginTop: 45,
    padding: 3,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#F5FCFF'
  },
  searchBarInput: {
    fontSize: 20,
    flex: 1,
    height: 30,
  }
});

module.exports = SearchBar;