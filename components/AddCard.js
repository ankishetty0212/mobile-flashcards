import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white, purple, lightPurp } from '../utils/colors'
import { addCardToDeck } from '../utils/api'
import {  addCard } from '../actions'


class AddCard extends Component {
    state = {
        question: '',
        answer: ''
    }

    onSubmit = () => {
        const card = {
            question: this.state.question,
            answer: this.state.answer
        }
        console.log('card: ',card)

        this.props.dispatch(addCard(this.props.deck, card))

        addCardToDeck(this.props.deckId, card)

        this.props.navigation.navigate(
            'DeckView',
            { deckId: this.props.deckId })
    }

    render() {
        const { deckId, deck } = this.props
        return (
            <View style={[styles.container]}>

                {/* Deck Cover */}
                <View style={[styles.cardTitle,]}>
                    <Text style={{ textAlign: "center", fontSize: 35, color: white}}>
                        {deck.title}
                    </Text>
                </View>
                <View>
                    <Text style={{ textAlign: "center", fontSize: 25 }}>
                        Add Card
                    </Text>
                </View>

                <TextInput
                    style={[styles.spacing, styles.inputStyle]}
                    placeholder="Question"
                    value={this.state.question}
                    onChangeText={question => this.setState({question})}
                />

                <TextInput
                    style={[styles.spacing, styles.inputStyle]}
                    placeholder="Answer"
                    value={this.state.answer}
                    onChangeText={answer => this.setState({answer})}
                />

                <TouchableOpacity
                    onPress={this.onSubmit}
                    style={Platform.OS === 'ios'
                        ? [styles.iosSubmitBtn, { backgroundColor: purple }]
                        : [styles.androidSubmitBtn, { backgroundColor: purple }]
                    }
                >
                    <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps(state, { navigation }) {
    const { deckId } = navigation.state.params
    return {
        deckId,
        deck: state[deckId]
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 30,
        marginRight: 30
    },
    cardTitle: {
        padding: 2,
        margin: 10,
        alignItems: "stretch",
        backgroundColor: lightPurp
    },
    iosSubmitBtn: {
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40
    },
    androidSubmitBtn: {
        flexDirection: "row",
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        marginBottom: 20,
        marginTop: 20,
        borderRadius: 2,
        height: 45,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    btnText: {
        color: white,
        fontSize: 20,
        textAlign: "center"
    },
    spacing: {
        paddingBottom: 20, 
        paddingTop: 20,
        marginBottom: 20,
        marginTop: 20
    },
    inputStyle: {
        fontSize: 25, 
        textAlign: "center", 
        borderColor: purple, 
        borderWidth: 1

    }
})

export default connect(mapStateToProps)(AddCard)