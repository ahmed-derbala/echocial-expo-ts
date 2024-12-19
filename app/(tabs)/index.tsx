import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TextInput, Modal, Pressable, TouchableOpacity } from 'react-native'
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

const HomeScreen = () => {
	const [modalVisible, setModalVisible] = useState(false)
	const [username, setUsername] = useState('')
	const [url, setUrl] = useState('')
	const [rating, setRating] = useState(3)
	const [description, setDescription] = useState('')
	const [cardsData, setCardsData] = useState([])

	useEffect(() => {
		const fetchCardsData = async () => {
			try {
				const response = await fetch('http://192.168.1.15:5001/reviews/find', {
					method: 'POST'
				}) // Replace with actual API URL
				const data = await response.json()
				setCardsData(data)
			} catch (error) {
				console.error('Error fetching cards data:', error)
			}
		}

		fetchCardsData()
	}, [])

	const handleCreateReview = () => {
		// Handle the review creation logic
		setModalVisible(false)
		console.log({ username, url, rating, description })
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				{cardsData.map((card, index) => (
					<MediaCard key={index} icon={card.icon} title={card.title} description={card.description} initialRating={card.initialRating} globalRating={card.globalRating} />
				))}
			</ScrollView>

			<TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
				<MaterialIcons name="add" size={32} color="#fff" />
			</TouchableOpacity>

			<Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
				<View style={styles.modalContainer}>
					<View style={styles.modalContent}>
						<Text style={styles.modalTitle}>Create a Review</Text>

						<TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />

						<TextInput style={styles.input} placeholder="Image/Video URL" value={url} onChangeText={setUrl} />

						<AirbnbRating defaultRating={rating} size={20} showRating onFinishRating={setRating} />

						<TextInput style={[styles.input, styles.textArea]} placeholder="Description" value={description} onChangeText={setDescription} multiline />

						<View style={styles.modalActions}>
							<Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(false)}>
								<Text style={styles.buttonText}>Cancel</Text>
							</Pressable>
							<Pressable style={[styles.button, styles.buttonSubmit]} onPress={handleCreateReview}>
								<Text style={styles.buttonText}>Submit</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5'
	},
	scrollContainer: {
		padding: 10
	},
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
	},
	fab: {
		position: 'absolute',
		bottom: 20,
		right: 20,
		backgroundColor: '#4A90E2',
		width: 60,
		height: 60,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 5
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	},
	modalContent: {
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 20,
		width: '90%'
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 15
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		padding: 10,
		marginBottom: 15,
		fontSize: 16
	},
	textArea: {
		height: 80,
		textAlignVertical: 'top'
	},
	modalActions: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	button: {
		padding: 10,
		borderRadius: 5,
		alignItems: 'center',
		flex: 1,
		marginHorizontal: 5
	},
	buttonClose: {
		backgroundColor: '#ccc'
	},
	buttonSubmit: {
		backgroundColor: '#4A90E2'
	},
	buttonText: {
		color: '#fff',
		fontWeight: 'bold'
	}
})

export default HomeScreen
