import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    AsyncStorage,
    TouchableWithoutFeedback
} from 'react-native';
import Database from '../firebase/database';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import { CheckBox, Divider, Button } from 'react-native-elements';

export default class Voting extends Component {
    static navigationOptions = {
        title: 'Select Preference',
    };
    constructor(props) {
        super(props);
        this.state = {
            choices: [],
            peoplePreferences: [],
            selected: -1,
            name: "",
            disableButton: false
        }
    }

    componentDidMount() {
        this.validator();
        let data = Database.getVotingItems(this.props.navigation.state.params.id).then((res) => {
            let r = res.val();
            this.setState({ choices: r.inputs })
        }).catch((err) => {
            console.log(err);
        });

    }

    insertPreference(text) {
        let newPP = [];
        newPP.push({ data: text, index: 0 });
        this.setState({
            peoplePreferences: newPP
        })
    }

    validator() {
        const checker = AsyncStorage.getItem(`VotedFor(${this.props.navigation.state.params.id})`).then((checker) => {
            console.log(checker);
            if (this.state.selected === -1 || checker === this.props.navigation.state.params.id || this.state.name === "") {
                this.setState({ disableButton: true });
            } else {
                this.setState({ disableButton: false });
            }
        })
    }

    onChangeCheckbox(i) {
        this.setState({ selected: i }, () => {
            this.validator();
        });
    }

    async submit() {
        try {
            await AsyncStorage.setItem(`VotedFor(${this.props.navigation.state.params.id})`, this.props.navigation.state.params.id);
        } catch (error) {
            console.log("error saving data: ", error);
        }
        const peoplePreferences = { name: this.state.name, preferences: this.state.peoplePreferences, votedFor: this.state.choices[this.state.selected].data }
        console.log({ data: { peoplePreferences } });
        Database.submitVote(this.props.navigation.state.params.id, peoplePreferences);
        this.props.navigation.navigate('Response', { id: this.props.navigation.state.params.id })
    }

    render() {
        let itemsToVote = []
        if (this.state.choices) {
            itemsToVote = this.state.choices.map((element, i) => {
                return (
                    <CheckBox
                        key={i}
                        title={element.data}
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        containerStyle={{ backgroundColor: "#607d8b" }}
                        textStyle={{ color: 'white' }}
                        onPress={() => { this.onChangeCheckbox(i) }}
                        checked={this.state.selected === i}
                    />
                );
            })
        }
        return (
            <View style={{ backgroundColor: '#424242', height: '100%' }}>
                <KeyboardAwareScrollView>
                    <TouchableWithoutFeedback onPress={dismissKeyboard}>
                        <View>

                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.title}>Enter Name</Text>
                                <TextInput
                                    style={{ borderRadius: 5, marginTop: 10, fontSize: 20, height: 40, width: '90%', backgroundColor: 'white', }}
                                    placeholder="Your Name"
                                    maxLength={15}
                                    onChangeText={(name) => { this.setState({ name }), this.validator() }}
                                />
                            </View>
                            <View style={styles.height}>
                                <Text style={styles.title}>Select Food Item</Text>
                                <ScrollView>
                                    {this.state.choices && itemsToVote}
                                </ScrollView>
                                <Divider style={{ backgroundColor: "black", height: 2 }} />
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.title}>Enter Preferences</Text>
                                <TextInput
                                    multiline
                                    style={{ borderRadius: 10, marginTop: 10, fontSize: 20, height: 70, width: '90%', backgroundColor: 'white', }}
                                    placeholder="Enter Preference"
                                    onChangeText={(text) => this.insertPreference(text)}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAwareScrollView>
                <View style={styles.BottomButton}>
                    <Button
                        large
                        onPress={() => this.submit()}
                        title="Continue"
                        fontSize={20}
                        backgroundColor={'#00c853'}
                        borderRadius={5}
                        disabled={this.state.disableButton}
                    />
                </View>


            </View>
        )
    }
}
const styles = StyleSheet.create({
    list: {
        maxHeight: '50%'
    },
    title: {
        marginTop: '5%',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    BottomButton: {
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%'
    }
});
