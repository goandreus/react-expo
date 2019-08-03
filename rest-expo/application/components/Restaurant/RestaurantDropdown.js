import React, {Component} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import PreLoader from "../PreLoader";
import * as firebase from "firebase";

export default class RestaurantDropdown extends Component {
  constructor () {
    super();
    this.state = {
      restaurants: [],
      loaded: false
    };

    this.refRestaurants = firebase.database().ref().child('restaurants');
  }
  
  componentDidMount () {
    this.refRestaurants.on('value', snapshot => {
      let restaurants = [];
      snapshot.forEach(row => {
        restaurants.push({
          value: row.key,
          label: row.val().name,
        })
      });

      this.setState({
        restaurants,
        loaded: true
      });
    });
  }
  
  render () {
    const {loaded, restaurants} = this.state;
    const {onChangeRestaurant, restaurantId} = this.props;
    
    if ( ! loaded) {
      return <PreLoader/>
    }
    
    return (
      <RNPickerSelect 
        onValueChange={(rID) => onChangeRestaurant(rID)} 
        items={restaurants}
        placeholder={{
          label: 'Selecciona un restaurante',
          value: null
        }}
        style={pickerSelectStyles}
        value={restaurantId}
      />
    );
  }
}

const pickerSelectStyles = {
  inputIOS: {
    color: 'black',
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
  },
  inputAndroid: {
    color: 'black',
  },
  placeholderColor: 'black',
  underline: { borderTopWidth: 0 },
  icon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderTopWidth: 5,
    borderTopColor: '#00000099',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
    top: 20,
    right: 15,
  },
};