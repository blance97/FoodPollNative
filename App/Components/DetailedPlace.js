import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    ListView
} from 'react-native';
import { Card, Divider } from 'react-native-elements';

export default class DetailedPlace extends Component {
    static navigationOptions = {
        title: 'Details',
    };
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
        this.state = {
            loading: true,
            info: {}
        }
    }
    componentDidMount() {
        fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${this.props.navigation.state.params.detailedID}&key=AIzaSyCpOKNd2Ik3OgRAryOqTXvK8dpi9m76PdE`)
            .then((res) => res.json())
            .then((resJSON) => this.setState({
                info: resJSON,
                loading: false
            }))
    }
    render() {
        const details = this.state.info.result;
        console.log(details);
        return (
            <View style={{ backgroundColor: '#424242', height: '100%' }}>
                <ActivityIndicator
                    animating={this.state.loading}
                    style={[styles.loading, { height: 80 }]}
                    size="large"
                />
                {!this.state.loading && <Card title={details.name}>
                    {
                        <View>
                            <View style={styles.subHead}>
                                <Text style={{ fontSize: 12, fontStyle: "italic" }}>{details.formatted_address}</Text>
                                <Text style={{ marginTop: 5 }}>{details.formatted_phone_number}</Text>
                            </View>
                            <Divider style={{ backgroundColor: "black", margin: 5 }} />
                            <View>
                                <Text style={{ margin: 5, fontWeight: "bold", textAlign: "center" }}>Info</Text>
                                <Text style={{ marginTop: 5 }}>Distance: {this.props.navigation.state.params.distance} mi</Text>
                                <Text style={{ marginTop: 5 }}>Rating: {details.rating}</Text>
                                <Text style={{ marginTop: 5 }}>Price Level:{this.props.navigation.state.params.priceLvl}</Text>
                                <Text style={{ marginTop: 5 }}>Status: {details.opening_hours.open_now === true ? "Open" : "Closed"}</Text>
                            </View>
                            <Divider style={{ backgroundColor: "black", margin: 5 }} />
                            <View>
                                <View style={styles.subHead}>
                                    <Text style={{ margin: 5, fontWeight: "bold" }}>Weekly Hours</Text>
                                </View>
                                <ListView
                                    dataSource={this.ds.cloneWithRows(details.opening_hours.weekday_text)}
                                    renderRow={(data) => <Text>{`\u2022 ${data}`}</Text>}
                                />
                            </View>
                            <Divider style={{ backgroundColor: "black", margin: 5 }} />
                            <Text style={{ marginTop: 5 }}>Website: {details.website}</Text>
                        </View>
                    }
                </Card>}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    subHead: {
        alignItems: "center",
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
