import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import { white, gray, purple } from '../utils/colors'
import { fetchDeckList } from '../utils/api'
import { receiveDecks } from '../actions'

class DeckList extends Component {
    state = {
        ready: false,
    }

    componentDidMount() {
        const { dispatch } = this.props
        fetchDeckList()
            .then((decks) => dispatch(receiveDecks(decks)))
            .then(() => {
                this.setState(() => ({
                    ready: true
                }))
            })
    }

    render() {
        const { ready } = this.state;
        const { decks, navigation } = this.props

        if (ready === false) {
            return (
                <AppLoading />
            );
        }

        return (
            <View style={styles.container}>
                {Object.values(decks).map((deck) => {
                    const { title, questions } = deck
                    return (
                        <View style={[styles.container]}
                        key={title} >
                        <TouchableOpacity
                            onPress = {() => this.props.navigation.navigate(
                            'DeckView',
                            { deckId: title }
                        )}>
                            <View style={[styles.cardTitle]}>
                                <Text style={{fontSize: 22, textAlign: "center", marginBottom: 10, marginTop: 10}}>
                                    {title}
                                </Text>
                                <Text style={{ fontSize: 16, color: gray, textAlign: "center", marginBottom: 10 }}>
                                    {questions.length} card(s)
                                 </Text>
                            </View>
                        </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
        )
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
        borderRadius: 5,
        borderWidth: 1,
        borderColor: purple,
        margin: 10,
    }
})

function mapStateToProps(decks) {
    return {
        decks
    }
}
export default connect(mapStateToProps)(DeckList)