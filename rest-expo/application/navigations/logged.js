import React from 'react';
import RestaurantsScreen from "../screens/Restaurants/Restaurants";
import AddRestaurantScreen from "../screens/Restaurants/AddRestaurant";
import LogoutScreen from "../screens/Logout";
import DetailRestaurantScreen from "../screens/Restaurants/DetailRestaurant";
import EditRestaurantScreen from "../screens/Restaurants/EditRestaurant";
import ReviewsRestaurant from "../screens/Restaurants/ReviewsRestaurant";

import ProfileScreen from "../screens/Profile";

import {createDrawerNavigator, createStackNavigator, createAppContainer} from "react-navigation";
import Icon from 'react-native-vector-icons/FontAwesome';

const navigationOptions = {
	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor: 'rgba(200, 38, 74, 1)',
		},
		headerTitleStyle: {
			textAlign: 'center',
			alignSelf: 'center',
			fontSize: 20,
			color: '#fff',
			fontWeight: 'bold',
			flex: 1
		}
	}
};

const leftIcon = (navigation, icon) => <Icon
	name={icon}
	style={{marginLeft: 20}}
	size={20}
	color="white"
	onPress={() => navigation.openDrawer()}
/>;

const rightIcon = (navigation, icon) => <Icon
	name={icon}
	style={{marginLeft: 20}}
	size={30}
	color="white"
	onPress={() => navigation.navigate('ListRestaurants')}
/>;

const restaurantsScreenStack = createStackNavigator(
	{
		ListRestaurants: {
			screen: RestaurantsScreen,
			navigationOptions: ({navigation}) => ({
				...navigationOptions,
				title: 'Restaurantes',
				headerLeft: leftIcon(navigation, 'bars')
			})
		},
		AddRestaurant: {
			screen: AddRestaurantScreen,
			navigationOptions: ({navigation}) => ({
				title: 'Añadir restaurante',
				headerRight: rightIcon(navigation, 'home'),
				headerLeft: leftIcon(navigation, 'bars'),
			})
		},
		DetailRestaurant: {
			screen: DetailRestaurantScreen,
			navigationOptions: ({navigation}) => ({
				title: 'Detalle del restaurante',
				headerRight: rightIcon(navigation, 'home'),
				headerLeft: leftIcon(navigation, 'bars'),
			})
		},
		EditRestaurant: {
			screen: EditRestaurantScreen,
			navigationOptions: ({ navigation }) => ({
				title: 'Editar restaurante',  // Title to appear in status bar
				headerRight: rightIcon(navigation, 'home'),
			})
		},
	},
	navigationOptions
);

const profileScreenStack = createStackNavigator(
	{
		ProfileScreen: {
			screen: ProfileScreen,
			navigationOptions: ({ navigation }) => ({
				title: 'Perfil',
				headerLeft: leftIcon(navigation, 'bars'),
				headerRight: rightIcon(navigation, 'home'),
			})
		}
	},
	navigationOptions
);

const logoutScreenStack = createStackNavigator({
  LogoutScreen: {
    screen: LogoutScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Cerrar sesión'
    })
  }
});

const reviewsRestaurantScreenStack = createStackNavigator(
	{
		ReviewsRestaurant: {
			screen: ReviewsRestaurant,
			navigationOptions: ({ navigation }) => ({
				title: 'Valoraciones',
        headerRight: rightIcon(navigation, 'home'),
        headerLeft: leftIcon(navigation, 'bars'),
			})
		}
	},
	navigationOptions
);

const RootStack = createDrawerNavigator(
	{
		RestaurantsScreen: {
			screen: restaurantsScreenStack,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: 'Restaurantes',
        drawerIcon: ({tintColor}) => (<Icon name="home" size={30} style={{color: tintColor}} />),
      })
		},
    ReviewsRestaurantScreen: {
      screen: reviewsRestaurantScreenStack,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: 'Valoraciones',
        drawerIcon: ({tintColor}) => (<Icon name="comments" size={30} style={{color: tintColor}} />),
      })
    },
		ProfileScreen: {
			screen: profileScreenStack,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: 'Perfil',
        drawerIcon: ({tintColor}) => (<Icon name="user" size={30} style={{color: tintColor}} />),
      })
		},
		LogoutScreen: {
			screen: logoutScreenStack,
      navigationOptions: ({ navigation }) => ({
        drawerLabel: 'Cerrar sesión',
        drawerIcon: ({tintColor}) => (<Icon name="sign-out" size={30} style={{color: tintColor}} />),
      })
		}
	},
	{
		drawerBackgroundColor : 'rgba(128, 35, 60, 0.7)',
		contentOptions: {
			activeTintColor: 'white',
			activeBackgroundColor : 'transparent',
			inactiveTintColor : 'white',
			itemsContainerStyle: {
				marginVertical: 0,
			}
		},
    defaultNavigationOptions: navigationOptions
	}
)

export default createAppContainer(RootStack)