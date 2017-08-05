import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Clipboard,
    AsyncStorage
} from 'react-native';
import Database from '../firebase/database';
import { Button } from 'react-native-elements';

export default class EnterLink extends Component {
    static navigationOptions = {
        title: 'Enter Link',
    };
    constructor(props) {
        super(props);
        this.state = {
            link: ""
        }
    }
    validateLink(link) {
        if (link[2] === "foodpoll.herokuapp.com" && link[3] === "vote") {
            return true;
        } else {
            return false;
        }
    }

    continue(link) {
        if (this.validateLink(link)) {
            const checker = AsyncStorage.getItem(`VotedFor(${link[4]})`).then((checker) => {
                if (checker === link[4]) {
                    this.props.navigation.navigate('Response', { id: link[4] })
                } else {
                    this.props.navigation.navigate('Vote', { id: link[4] })
                }
            })

        } else {
            alert("Invalid Link");
        }
    }
    render() {
        console.log(this.state.link.split("/"))
        return (
            <View style={{
                backgroundColor: '#424242', height: '100%'
            }}>
                <View style={styles.EnterLink}>
                    <Text style={styles.title}>Enter Link</Text>
                    <TextInput
                        style={{ marginTop: 10, fontSize: 20, height: 50, width: '90%', backgroundColor: 'white', }}
                        placeholder="Enter Poll Link..."
                        onChangeText={(text) => this.setState({ link: text })}
                    />
                </View>
                <View style={styles.BottomButton}>
                    <Button
                        large
                        onPress={() => this.continue(this.state.link.split("/"))}
                        title="Continue"
                        fontSize={20}
                        backgroundColor={'#00c853'}
                        borderRadius={5}
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    EnterLink: {
        alignItems: 'center',
    },
    title: {
        marginTop: '20%',
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
