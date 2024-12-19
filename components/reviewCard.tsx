import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { AirbnbRating } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'

const MediaCard = ({
	icon, // Name of the MaterialIcons icon
	title,
	description,
	initialRating = 3,
	globalRating = 4.5 // Global rating by other users
}) => {
	const [rating, setRating] = useState(initialRating)

	return (
		<View style={styles.card}>
			<View style={styles.header}>
				<MaterialIcons name={icon} size={32} color="#4A90E2" />
				<Text style={styles.title}>{title}</Text>
				<View style={styles.globalRatingContainer}>
					<Text style={styles.globalRating}>{globalRating.toFixed(1)}</Text>
				</View>
			</View>
			<Text style={styles.description}>{description}</Text>

			<View style={styles.ratingContainer}>
				<Text style={styles.ratingLabel}>Your Rating:</Text>
				<AirbnbRating defaultRating={rating} size={20} showRating={false} onFinishRating={(value) => setRating(value)} />
				<Text style={styles.currentRating}>{rating}/5</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 15,
		margin: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 5,
		elevation: 5
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 10
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginLeft: 10
	},
	globalRatingContainer: {
		backgroundColor: '#FFD700',
		borderRadius: 5,
		paddingHorizontal: 8,
		paddingVertical: 2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	globalRating: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#fff'
	},
	description: {
		fontSize: 14,
		color: '#555',
		marginBottom: 10
	},
	ratingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10
	},
	ratingLabel: {
		fontSize: 16,
		marginRight: 10
	},
	currentRating: {
		fontSize: 16,
		marginLeft: 10,
		fontWeight: 'bold'
	}
})

export default MediaCard
