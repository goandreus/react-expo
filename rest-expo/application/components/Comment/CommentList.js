import React, {Component} from 'react';
import PreLoader from "../PreLoader";
import {StyleSheet, FlatList, View} from 'react-native';
import {Card, Divider, Text} from "react-native-elements";
import * as firebase from 'firebase';
import CommentEmpty from "./CommentEmpty";
import Comment from "./Comment";

export default class CommentList extends Component {
	
	constructor (props) {
		super(props);
		this.state = {
			comments: [],
			loaded: false
		};
	}

	componentDidMount () {
		this._loadComments();
	}
	
	componentWillReceiveProps (nextProps) {
		if (this.props.restaurantId !== nextProps.restaurantId) {
			this._loadComments(nextProps.restaurantId)
		}
	}
	
	_loadComments (restaurantId = null) {
    firebase.database().ref(`comments/${restaurantId ? restaurantId : this.props.restaurantId}`)
			.on('value', snapshot => {
      let comments = [];
      snapshot.forEach(row => {
        comments.push({
          id: row.key,
          rating: row.val().rating,
          comment: row.val().comment
        });
      });
      this.setState({
        comments,
        loaded: true
      });
    })
	}

	render () {
		const {comments, loaded} = this.state;

		if( ! loaded) {
			return(<PreLoader/>);
		}

		if( ! comments.length) {
			return <CommentEmpty/>
		}

		return (
			<View style={styles.container}>
				<Text style={styles.title}>Opiniones</Text>
				<Divider style={styles.divider}/>
				<Card>
					<FlatList
						data={comments}
						renderItem={(data) => this.renderComment(data.item)}
						keyExtractor={(data) => data.id}
					/>
				</Card>
			</View>
		);
	}

	renderComment(comment) {
		return (
			<Comment comment={comment} />
		)
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		flex: 1,
		marginTop: 10,
		marginBottom: 10
	},
	title: {
		fontSize: 22,
		color: 'white',
		textAlign: 'center'
	},
	divider: {
		backgroundColor: 'red',
	}
});