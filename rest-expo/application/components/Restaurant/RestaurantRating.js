import React, {Component} from 'react';
import {Rating, Text} from "react-native-elements";
import * as firebase from 'firebase';
import {View} from "react-native";

export default class RestaurantRating extends Component {
	constructor (props) {
		super(props);
		this.state = {
			rating: 0
		};
		const {restaurantId} = props;
		this.commentsRef = firebase.database().ref(`comments/${restaurantId}`);
	}

	componentDidMount () {
		this.commentsRef.on("child_added", snapshot => {
			this.commentsRef.on("value", snap => {
				let comments = [];
				snap.forEach(row => {
					comments.push(parseInt(row.val().rating));
				});

				this.setState({
					rating: comments.reduce((previous, current) => previous + current, 0) / comments.length
				});

				this.refs.rating.setCurrentRating(
					comments.reduce((previous, current) => previous + current, 0) / comments.length
				);
			})
		});
	}

	render () {
		const {rating} = this.state;
		return (
			<View>
				<Rating
					ref="rating"
					imageSize={20}
					readonly
					startingValue={rating}
				/>
			</View>
		)
	}
}