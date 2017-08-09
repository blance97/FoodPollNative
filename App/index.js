import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import { Button } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import * as firebase from "firebase";

import CreatePoll from './Components/CreatePoll';
import EnterLink from './Components/EnterLink';
import FoodOptions from './Components/FoodOptions';
import SharePoll from './Components/SharePoll';
import Voting from './Components/Voting';
import Response from './Components/Response';
import SuggestedPlaces from './Components/SuggestedPlaces';
import DetailedPlace from './Components/DetailedPlace';

export default class App extends Component {
    static navigationOptions = {
        header: null
    };
    componentWillMount() {
        console.log(this.state);
        if (!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyCpOKNd2Ik3OgRAryOqTXvK8dpi9m76PdE",
                authDomain: "poised-rock-154320.firebaseapp.com",
                databaseURL: "https://poised-rock-154320.firebaseio.com",
                projectId: "poised-rock-154320"
            })
        }
        firebase.auth().signInAnonymously().catch((error) => {
            // Handle Errors here.
            let err = {
                code: error.code,
                message: error.message
            }
            console.log(err);
        });
    }
    render() {
        return (
            <View style={{ backgroundColor: '#424242', height: '100%' }}>
                <View>
                    <Image
                        style={styles.photo}
                        source={require('./logo.jpg')}
                    />
                </View>
                <Text style={styles.title}>Food Poll</Text>
                <Button
                    large
                    buttonStyle={{ marginTop: 75, margin: 10 }}
                    backgroundColor='#f05545'
                    title='Create Poll'
                    onPress={() => this.props.navigation.navigate('CreatePoll')}
                    iconRight
                    color='black'
                    fontWeight='bold'
                    icon={{ name: 'bar-chart', type: 'font-awesome' }} />
                <Button
                    large
                    icon={{ name: 'arrow-circle-o-right', type: 'font-awesome' }}
                    title='Enter Existing Link'
                    backgroundColor='#f05545'
                    color='black'
                    iconRight
                    fontWeight='bold'
                    buttonStyle={{ margin: 10 }}
                    onPress={() => this.props.navigation.navigate('EnterLink')}
                />

                <Button
                    large
                    icon={{ name: 'external-link', type: 'font-awesome' }}
                    title='Go To Web App'
                    backgroundColor='#f05545'
                    color='black'
                    iconRight
                    fontWeight='bold'
                    buttonStyle={{ margin: 10 }}
                />
            </View>
        );
    }
}

const Router = StackNavigator({
    Home: { screen: App },
    CreatePoll: { screen: CreatePoll },
    EnterLink: { screen: EnterLink },
    FoodOptions: { screen: FoodOptions },
    SharePoll: { screen: SharePoll },
    Vote: { screen: Voting },
    Response: { screen: Response },
    SuggestedPlaces: { screen: SuggestedPlaces },
    DetailedPlace: { screen: DetailedPlace }
});

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "Helvetica",
        textAlign: 'center'
    },
    photo: {
        marginTop: 20,
        width: '100%',
        height: 200
    },
    choices: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#F5FCFF',
    },
});

AppRegistry.registerComponent('FoodPollNative', () => Router);
