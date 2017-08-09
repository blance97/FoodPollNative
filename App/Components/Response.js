import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView
} from 'react-native';
import Database from '../firebase/database';
import { Button, Divider } from 'react-native-elements';
import { Table, TableWraper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Bar from './shapes/bar';

export default class Response extends Component {
    static navigationOptions = {
        title: 'Response',
    };
    constructor(props) {
        super(props);
        this.state = {
            foodVotes: [],
            preferences: {},
            total: 1,
        }
        Database.listen(this.props.navigation.state.params.id, (res) => {
            console.log(res.val());
            incomeData = res.val();
            this.setState({ foodVotes: incomeData.inputs, preferences: incomeData.peoplePreferences, total: Object.keys(incomeData.peoplePreferences).length })
        })
    }
    formatPreferences(prefArray) {
        if (!prefArray || prefArray === 0) {
            return;
        }
        let builder = "";
        prefArray.forEach((element, i) => {
            builder += element.data
            i !== prefArray.length - 1 ? builder += ", " : null;
        })
        return builder;
    }
    getVotes(data) {
        let number = 0;
        Object.keys(this.state.preferences).forEach((key, i) => {
            if (this.state.preferences[key].votedFor === data) {
                number++;
            }
        });
        return number;
    }

    render() {
        const votes = this.state.foodVotes.map((element, i) => {
            return (
                <View key={i}>
                    <Bar percentage={(this.getVotes(element.data) / this.state.total) * 100} label={element.data} />
                </View>
            )
        })
        const preferences = Object.keys(this.state.preferences).reduce((acc, key, i) => {
            let arr = []
            arr.push(this.state.preferences[key].name, this.formatPreferences(this.state.preferences[key].preferences), this.state.preferences[key].votedFor)
            acc.push(arr);
            return acc;
        }, [])
        const tableHead = ['Person', 'Preferences', 'Voted For'];
        const tableData = preferences;
        return (
            <View style={{ backgroundColor: '#424242', height: '100%' }}>
                <ScrollView>
                    {votes}
                    <Button
                        buttonStyle={{ marginTop: 20 }}
                        large
                        title="Suggested Places"
                        fontSize={20}
                        onPress={() => {
                            this.props.navigation.navigate('SuggestedPlaces', {
                                keywords: this.state.foodVotes.map((element) => {
                                    return element.data
                                })
                            })
                        }}
                        iconRight
                        icon={{ name: 'cutlery', type: 'font-awesome' }}
                        backgroundColor={'#757575'}
                        borderRadius={5}
                    />
                    <View style={{ justifyContent: 'center', marginTop: 10 }}>
                        <Table>
                            <Row data={tableHead} style={styles.head} textStyle={styles.text} />
                            <Rows data={tableData} style={styles.row} textStyle={styles.text} />
                        </Table>
                    </View>
                </ScrollView>
                <View style={styles.BottomButton}>
                    <Button
                        large
                        onPress={() => { this.props.navigation.navigate('Home'), Database.detachListener(this.props.navigation.state.params.id); }}
                        title="Home"
                        fontSize={20}
                        backgroundColor={'#f05545'}
                        borderRadius={5}
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    head: { height: 40, backgroundColor: '#80cbc4' },
    text: { marginLeft: 5, color: 'white' },
    row: { height: 30 },
    title: {
        marginTop: '20%',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    BottomButton: {
        justifyContent: 'center',
        width: '100%'
    }
});
