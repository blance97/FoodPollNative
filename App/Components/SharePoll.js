import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Clipboard
} from 'react-native';
import { Button } from 'react-native-elements';

export default class CreatePoll extends Component {
    static navigationOptions = {
        title: 'Share Poll',
    };
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={{ backgroundColor: '#424242', height: '100%' }}>
                <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: 'center', color: 'white', marginTop: 10 }}>Share Link</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        editable={false}
                        multiline={true}
                        value={this.props.navigation.state.params.link}
                    />
                </View>

                <Button
                    large
                    title="Copy"
                    iconRight
                    icon={{ name: 'clipboard', type: 'font-awesome' }}
                    fontSize={20}
                    backgroundColor={'grey'}
                    borderRadius={5}
                    onPress={Clipboard.setString(this.props.navigation.state.params.link)}
                />
                <View style={styles.BottomButton}>
                    <Button
                        large
                        onPress={() => this.props.navigation.navigate('Vote', { id: this.props.navigation.state.params.link.split("/")[4] })}
                        title="Continue"
                        fontSize={20}
                        backgroundColor={'#00c853'}
                        borderRadius={5}
                    />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    inputContainer: {
        margin: 10,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        height: 70
    },
    input: {
        height: 70,
        fontSize: 20,
        backgroundColor: '#ffffff',
        paddingLeft: 15,
        paddingRight: 15
    },
    BottomButton: {
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%'
    }
});

