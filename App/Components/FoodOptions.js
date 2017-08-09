import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity
} from 'react-native';
import { Button, Divider, SearchBar } from 'react-native-elements';


export default class FoodOptions extends Component {
    static navigationOptions = {
        title: 'Select Food Option',
    };
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
        this.state = {
            cuisines: this.props.navigation.state.params.cuisines
        }
    }

    renderRow(rowData) {
        const { goBack } = this.props.navigation;
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.state.params.select(rowData)
                    goBack();
                }}
                style={{ height: 50, backgroundColor: 'white' }}
            >
                <Text style={styles.title}>{rowData}</Text>
            </TouchableOpacity>
        )
    }
    filter(text) {
        filteredList = [];
        this.props.navigation.state.params.cuisines.slice(0).forEach((foodType) => {
            if (foodType.toUpperCase().startsWith(text.toUpperCase())) {
                filteredList.push(foodType);
            }
        })
        this.setState({ cuisines: filteredList });
    }

    render() {
        return (
            <View style={{ backgroundColor: '#424242', flex: 1 }}>
                <SearchBar
                    onChangeText={(text) => this.filter(text)}
                    placeholder='Filter...' />
                <ListView
                    dataSource={this.ds.cloneWithRows(this.state.cuisines)}
                    renderRow={(rowData) => this.renderRow(rowData)}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                    enableEmptySections
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    title: {
        fontWeight: "200",
        marginTop: 10,
        fontSize: 20
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    }
})

