import React, {Component} from 'react';
import { NavigationActions } from 'react-navigation';
import {ScrollView} from "react-native";

import BackgroundImage from "../../components/BackgroundImage";
import Restaurant from "../../components/Restaurant/Restaurant";
import CommentForm from "../../components/Comment/CommentForm";
import CommentList from "../../components/Comment/CommentList";

export default class DetailRestaurant extends Component {
	constructor (props) {
		super(props);
		const {params} = props.navigation.state;
		this.state = {
			restaurant: params.restaurant
		};
	}

	editRestaurant () {
		const navigateAction = NavigationActions.navigate({
			routeName: 'EditRestaurant',
			params: {restaurant: this.state.restaurant}
		});
		this.props.navigation.dispatch(navigateAction);
	}

	goHome () {
		const navigateAction = NavigationActions.navigate({
			routeName: 'ListRestaurants',
		});
		this.props.navigation.dispatch(navigateAction);
	}

	render () {
		const {restaurant} = this.state;
		return (
			<BackgroundImage source={require('../../../assets/images/bg-auth.png')}>
				<ScrollView>

					<Restaurant
						goHome={this.goHome.bind(this)}
						editRestaurant={this.editRestaurant.bind(this)}
						restaurant={restaurant}
					/>

					<CommentForm restaurantId={restaurant.id} />

					<CommentList restaurantId={restaurant.id} />
				</ScrollView>
			</BackgroundImage>
		)
	}
}