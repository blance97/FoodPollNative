import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ActivityIndicator,
    Platform
} from 'react-native';
import { List, ListItem } from 'react-native-elements'


export default class SuggestedPlaces extends Component {
    static navigationOptions = {
        title: 'Suggested Places',
    };
    constructor(props) {
        super(props);
        console.log(this.props.navigation.state.params.keywords)
        this.state = {
            SuggestedPlaces: {},
            initPos: {},
            loading: true
        }
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.props.navigation.state.params.keywords.forEach((element) => {
                    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?opennow&location=${position.coords.latitude},${position.coords.longitude}&radius=24140.2&type=restaurant&keyword=${element}{&key=AIzaSyCpOKNd2Ik3OgRAryOqTXvK8dpi9m76PdE`)
                        .then((res) => res.json())
                        .then((resJSON) => this.setState({ initPos: { lat: position.coords.latitude, long: position.coords.longitude }, SuggestedPlaces: { ...this.state.SuggestedPlaces, [element]: resJSON.results.slice(0, 3) } }));
                })
            });
        (error) => alert(error.message),
            { enableHighAccuracy: Platform.OS === 'ios' ? true : false, timeout: 20000, maximumAge: 1000 }
    }

    renderPrice(price_level) {
        if (price_level) {
            let i = 0;
            let builder = "";
            while (i < price_level) {
                builder += "$"
                i++;
            }
            return builder;
        }
        return "Unknown $";
    }
    getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 3959; // Radius of the earth in m
        var dLat = this.deg2rad(lat2 - lat1);  // this.deg2rad below
        var dLon = this.deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in m
        return d.toFixed(2);
    }
    deg2rad(deg) {
        return deg * (Math.PI / 180)
    }
    render() {
        console.log(this.state);
        const places = Object.keys(this.state.SuggestedPlaces).map((element, i) => {
            return (
                <List key={i} containerStyle={{ marginTop: 0 }}>
                    <Text style={{ backgroundColor: "white", textAlign: "center", fontWeight: "bold" }}>{element}</Text>
                    <View style={{
                        flex: 1,
                        height: StyleSheet.hairlineWidth,
                        backgroundColor: '#8E8E8E'
                    }} />
                    {
                        this.state.SuggestedPlaces[element].map((item, j) => {
                            let dist = this.getDistanceFromLatLonInKm(this.state.initPos.lat, this.state.initPos.long, item.geometry.location.lat, item.geometry.location.lng)
                            let priceLvl = this.renderPrice(item.price_level);
                            return (
                                < ListItem
                                    roundAvatar
                                    key={j}
                                    title={`${item.name}(${priceLvl})`}
                                    subtitle={<View style={{ flex: 1, flexDirection: "column", marginLeft: 10 }}>
                                        <Text>{`Rating: ${item.rating} | ${dist} mi`}</Text>
                                        <Text>{item.vicinity}</Text>
                                    </View>}
                                    onPress={() => {
                                        this.props.navigation.navigate('DetailedPlace', { detailedID: item.place_id, distance: dist, priceLvl })
                                    }}
                                    underlayColor='rgba(0,0,0,0.5)'
                                    avatar={{ uri: item.icon }}
                                />
                            )
                        })
                    }
                </List>
            )
            if (i === Object.keys(this.state.SuggestedPlaces).length - 1) {
                this.setState({ loading: false })
            }
        })
        return (
            <View style={{ backgroundColor: '#424242', flex: 1 }}>
                <ActivityIndicator
                    animating={this.state.SuggestedPlaces.length === 0}
                    style={[styles.loading, { height: 80 }]}
                    size="large"
                />
                {this.state.SuggestedPlaces.length !== 0 && <ScrollView>
                    {places}
                </ScrollView>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
