import React, {Component} from 'react';
import BackgroundImage from "../../components/BackgroundImage";
import AppButton from "../../components/AppButton";
import {View, StyleSheet} from 'react-native';
import * as firebase from 'firebase';
import {options, Restaurant} from '../../forms/restaurant';
import t from 'tcomb-form-native';
import {Card} from "react-native-elements";
const Form = t.form.Form;
import Toast from 'react-native-simple-toast';

export default class AddRestaurant extends Component {
	constructor () {
		super();
		this.state = {
			restaurant: {
				name: '',
				address: '',
				capacity: 0,
				description: ''
			}
		};
	}

	save () {
		const validate = this.refs.form.getValue();
		if(validate) {
			let data = {};
			const key = firebase.database().ref().child('restaurants').push().key;
			data[`restaurants/${key}`] = this.state.restaurant;
			firebase.database().ref().update(data).then(() => {
				Toast.showWithGravity('Restaurante dado de alta', Toast.LONG, Toast.BOTTOM);
				this.props.navigation.navigate('ListRestaurants');
			});
		}
	}

	onChange (restaurant) {
		this.setState({restaurant});
	}

	render () {
		const {restaurant} = this.state;

		return (
			<BackgroundImage source={require('../../../assets/images/bg-auth.png')}>
				<View style={styles.container}>
					<Card title="Formulario de restaurantes">
						<View>
							<Form
								ref="form"
								type={Restaurant}
								options={options}
								value={restaurant}
								onChange={(v) => this.onChange(v)}
							/>
						</View>
						<AppButton
							bgColor="rgba(255, 38, 74, 0.9)"
							title="Dar de alta"
							action={this.save.bind(this)}
							iconName="plus"
							iconSize={30}
							iconColor="#fff"
						/>
					</Card>
				</View>
			</BackgroundImage>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'rgba(231, 228, 224, 0.8)',
		padding: 10
	}
});