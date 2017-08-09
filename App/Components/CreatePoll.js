import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { Button } from 'react-native-elements';
import Cuisines from '../Data/Cuisines';
import Database from '../firebase/database';
import shortid from 'shortid';

export default class CreatePoll extends Component {
    static navigationOptions = {
        title: 'Create Poll',
    };
    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            id: Date.now() + shortid.generate(),
            inputs: [{ data: "", index: 0 }]
        }
        this.addOption = this.addOption.bind(this);
    }
    addOption() {
        this.setState({
            inputs: [...this.state.inputs, { data: "", index: this.state.inputs[this.state.inputs.length - 1].index + 1 }]
        })
    }
    updateOption(data, index) {
        console.log("data:", data, "index: ", index);
        this.setState({
            inputs: this.state.inputs.map((element, i) => {
                if (element.index === index) {
                    return { ...element, data }
                }
                return element
            })
        })
    }
    checkEmpty() {
        for (let i = 0, length = this.state.inputs.length; i < length; i++) {
            if (this.state.inputs[i].data === "") {
                return true
            }
        }
        return false;
    }
    submit(data) {
        if (this.checkEmpty()) {
            alert("All Fields Must Be Filled");
            return;
        }
        Database.createPoll(`${this.state.id}`, data).then((res) => {
            this.props.navigation.navigate('SharePoll', { link: `http://foodpoll.herokuapp.com/vote/${this.state.id}` })
        })
    }

    render() {
        
        const buttons = this.state.inputs.map((element, i) => {
            return (
                <View key={i}>
                    <Text style={{ color: "white", margin: 10 }}>Option {i + 1}</Text>
                    <Button
                        large
                        title={element.data === "" ? "Select Option" : element.data}
                        fontSize={20}
                        backgroundColor={'rgba(0,0,0,.5)'}
                        borderRadius={5}
                        onPress={() => this.props.navigation.navigate('FoodOptions', { cuisines: Cuisines.Cuisines , select: (data) => this.updateOption(data, i) })}
                        buttonStyle={{ marginBottom: 10 }}
                    />
                </View>
            )
        })
        return (
            <View style={{ backgroundColor: '#424242', height: '100%' }}>
                <ScrollView>
                    <View style={styles.Button}>
                        {buttons}
                        <Button
                            large
                            title="Add Option"
                            iconRight
                            icon={{ name: 'plus-square', type: 'font-awesome' }}
                            fontSize={20}
                            backgroundColor={'#29b6f6'}
                            borderRadius={5}
                            onPress={this.addOption}
                        />
                    </View>
                </ScrollView>
                <View style={styles.BottomButton}>
                    <Button
                        large
                        onPress={() => this.submit(this.state)}
                        title="Continue"
                        fontSize={20}
                        backgroundColor={'#00c853'}
                        borderRadius={5}
                        disabled={this.checkEmpty()}
                    />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    choices: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#F5FCFF',
    },
    Button: {
        justifyContent: 'center',
        marginTop: 20
    },
    BottomButton: {
        justifyContent: 'center',
        width: '100%'
    }
});

