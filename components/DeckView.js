import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { white, purple, gray, lightPurp } from '../utils/colors'
import TextButton from './TextButton'
import { removeDeck } from '../utils/api';

class DeckView extends Component {
    deleteDeck = () => {
        const { deckId } = this.props
        removeDeck(deckId)
    }
    
    render() {
        const { deck, deckId } = this.props
        return (
            <View style={[styles.container]}>
                {/* Deck Cover */}
                <View style={[styles.cardTitle, { padding: 30, marginBottom: 40 }]}>
                    <Text style={{ textAlign: "center", fontSize: 35 }}>
                        {deck.title}
                    </Text>
                    <Text style={{ fontSize: 18, color: gray, textAlign: "center" }}>
                        {deck.questions.length} cards
                    </Text>
                </View>

                {/* Deck Actions */}
                <View>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate(
                            'AddCard',
                            { deckId: deckId })}
                        style={Platform.OS === 'ios'
                            ? [styles.iosSubmitBtn, { backgroundColor: purple }]
                            : [styles.androidSubmitBtn, { backgroundColor: purple }]
                        }
                    >
                        <Text style={styles.btnText}>Add Card</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate(
                            'Quiz',
                            { deck: deck })}
                        style={Platform.OS === 'ios'
                            ? [styles.iosSubmitBtn, { backgroundColor: lightPurp }]
                            : [styles.androidSubmitBtn, { backgroundColor: lightPurp }]
                        }
                    >
                        <Text style={styles.btnText}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={{marginTop: 30}}>
                    <TextButton onPress={this.deleteDeck} style={{ margin: 20, fontSize: 15}}>
                        Delete Deck
                    </TextButton>
                </View> */}
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
        margin: 10
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
})

export default connect(mapStateToProps)(DeckView);