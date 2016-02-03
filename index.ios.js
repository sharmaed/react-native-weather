/* 
* Weather App Android / iOS
* sharmaed.com

Left to do:
Import API
Get Data - Ensure OpenWeather is imported in this file
Layout Component - Add Temp, City, Description Text fields
Style - the bitch

*/

var React = require('react-native');
var Api = require('./src/api');

var {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  MapView
} = React;


var Weather = React.createClass({
  getInitialState: function() {
    return{
      pin: {
        latitude: 37.77837020090763,
        longitude: -122.4193014674311
      },
      city: '',
      desc: '',
      temp: '',
      tempMin: '',
      tempMax: ''
    }
  },
  render: function() {

    return <View 
    style = {styles.container}
    >
      <MapView 
      annotations= {[this.state.pin]}
      onRegionChangeComplete= {this.onRegionChangeComplete}
      style = {styles.map}
      >
      </MapView>
      <View style = {styles.footer}>
        <Text style = {styles.temp}>{this.state.temp}</Text>
        <Text style = {styles.city}>{this.state.city}</Text>
        <View style = {[styles.descRangeRow, this.borderColor('blue')]}>
          <View style = {[styles.descView, this.borderColor('red')]}>
            <Text style = {styles.desc}>{this.state.desc}</Text>    
          </View>
          <View style = {[styles.tempRangeView, this.borderColor('green')]}>
            <Text style = {styles.range}>{this.state.tempMin} - {this.state.tempMax}</Text>
          </View>
        </View>
      </View>
    </View>
  },
  onRegionChangeComplete: function(region) {
    this.setState({
      pin: {
        longitude: region.longitude,
        latitude: region.latitude
      }
    });
    Api(region.latitude, region.longitude)
      .then((data) => {
        this.setState(data);
      }); 
  },
  borderColor: function(color) {
    return {
      borderColor: color,
      borderWidth: 0

    }
  }
});

var styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFA'
  },
  map : {
    flex: 3
  },
  footer: {
    flex: 1,
    alignItems: 'stretch',
    paddingLeft: 40
  },
  temp: {
    color: '#424242',
    fontWeight: '100',
    fontSize: 48,
    fontFamily: 'HelveticaNeue-Light',
    marginTop: 15
  },
  city: {
    color: '#757575',
    fontWeight: '100',
    fontSize: 36,
    fontFamily: 'HelveticaNeue-Light'

  },
  desc: {
    color: '#BDBDBD',
    fontWeight: '100',
    fontSize: 28,
    fontFamily: 'HelveticaNeue-Light'
  },
  descRangeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  descView: {

  },
  tempRangeView: {
    paddingRight: 40

  },
  range: {
    color: '#BDBDBD',
    fontWeight: '100',
    fontSize: 28,
    fontFamily: 'HelveticaNeue-Light'    
  }
});

AppRegistry.registerComponent('weather', () => Weather);