import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { lightPurp, darkBlue, blue, skyBlue, lavender, green, red, white } from '../utils/colors'


const NoCards = () => (
    <View style={styles.noCards}>
        <Text style={styles.noCardsText}>No question cards to display!</Text>
    </View>
);

const ResultScreen = (props) => (
    <View style={styles.resultCard}>
        <Text style={styles.resultCardText}>Total questions answered: {props.totalAnswered}</Text>
        <Text style={styles.resultCardText}>Correct Answers: {props.correct}</Text>

        <View style={styles.btnView}>
            <TouchableOpacity
                style={[styles.btnStyle, {backgroundColor: darkBlue}]}
                onPress={props.restart}
            >
                <Text style={{color: white}}>Restart</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.btnStyle, {backgroundColor: darkBlue}]}
                onPress={props.goBack}
            >
                <Text style={{color: white}}>Go Back</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const ShowQuestionOrAnswer = (props) => (
    <TouchableWithoutFeedback onPress={props.toggle}>
        <View>
            {
                props.current == 'question'
                    ? <Text style={{fontStyle: "italic"}}>Show Answer</Text>
                    : <Text style={{fontStyle: "italic"}}>Show Question</Text>
            }
        </View>
    </TouchableWithoutFeedback>
)

class Quiz extends Component {
    state = {
        currentQuestion: 0,
        correctAnswers: 0,
        show: 'question',
        showResults: false
    };

    showQuestionOrAnswer = () => {
        const show = (this.state.show) === 'question'
            ? 'answer'
            : 'question'

        this.setState({ show });
    }

    showQuestionOnCardChange =() => {
        let show = this.state.show;
        if(show === 'answer'){
            show = 'question'
        }
        return show;
    }

    userAnswered(answer) {
        let show = this.showQuestionOnCardChange()

        if (answer === 'correct') {
            this.setState({ correctAnswers: this.state.correctAnswers + 1 ,
                show
            });
        }

        if (this.state.currentQuestion === this.props.questions.length - 1) {
            this.setState({ showResults: true, show });
        } else {
            this.setState({ currentQuestion: this.state.currentQuestion + 1 ,
                show
            });
        }
    }

    restartQuiz = () => {
        this.setState({
            currentQuestion: 0,
            correctAnswers: 0,
            show: 'question',
            showResults: false
        });

        /* clearLocalNotification()
            .then(setLocalNotification) */
    }

    goBack = () => {
        this.props.navigation.dispatch(NavigationActions.back());
    }

    render() {
        if (this.props.questions.length === 0) {
            return <NoCards />
        }

        if (this.state.showResults) {
            return (
                <ResultScreen
                    totalAnswered={this.props.questions.length}
                    correct={this.state.correctAnswers}
                    restart={this.restartQuiz}
                    goBack={this.goBack}
                />
            );
        }

        const showingCard = this.props.questions[this.state.currentQuestion];

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.quizProgress}>
                    <Text>Card {this.state.currentQuestion + 1}/{this.props.questions.length}</Text>
                </View>

                <View style={styles.quizCard}>
                    {
                        this.state.show == 'question'
                            ? <Text style={styles.questionText}>{showingCard.question}</Text>
                            : <Text style={styles.answerText}>{showingCard.answer}</Text>
                    }

                    <ShowQuestionOrAnswer
                        toggle={this.showQuestionOrAnswer}
                        current={this.state.show}
                    />
                    <View style={styles.btnView}>
                        <TouchableOpacity
                            style={[styles.btnStyle, {backgroundColor: green}]}
                            onPress={() => this.userAnswered('correct')}
                        >
                            <Text>Correct</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.btnStyle, {backgroundColor: red}]}
                            onPress={() => this.userAnswered('incorrect')}
                        >
                            <Text>Incorrect</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    noCards: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noCardsText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    resultCardText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    quizProgress: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 8,
        backgroundColor: lightPurp
    },
    quizCard: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 25,
        padding: 25,
        backgroundColor: lavender,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowRadius: 6,
        shadowOpacity: 1,
        elevation: 3
    },
    resultCard: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 25,
        padding: 25,
        backgroundColor: skyBlue,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowRadius: 6,
        shadowOpacity: 1,
        elevation: 3
    },
    questionText: {
        fontSize: 22,
        marginBottom: 5,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    answerText: {
        fontSize: 26,
        marginBottom: 5,
        fontWeight: 'bold',
        textAlign: 'center',
        color: blue
    },
    btnStyle: {
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 10,
        marginRight: 10
    },
    btnView: {
        flexDirection: "row",
        justifyContent: "space-around",
    }
});

function mapStateToProps(state, { navigation }) {
    return { questions: navigation.state.params.deck.questions };
}

export default connect(mapStateToProps)(Quiz);