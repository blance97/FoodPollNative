import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import PropTypes from 'prop-types';

export default class Bar extends Component {
    constructor(props) {
        super(props);
    }
    percentageChanger(percentage) {
        let color;
        console.log(percentage);
        if (percentage > 0 && percentage < 25) {
            color = '#c62828'
        } else if (percentage >= 25 && percentage < 50) {
            color = '#fbc02d';
        } else if (percentage >= 50 && percentage < 75) {
            color = '#ffeb3b';
        } else if (percentage >= 75) {
            color = '#66bb6a';
        } else {
            color = 'gray';
        }

        return ({
            width: percentage === 0 ? `${5}%` : `${percentage}%`,
            height: 30,
            borderRadius: 4,
            backgroundColor: color
        })
    }
    render() {
        return (
            <View>
                <Text style={{ color: "white", margin: 5 }}>{this.props.label + ` (${this.props.percentage.toFixed(2)})%`}</Text>
                <View style={this.percentageChanger(this.props.percentage)} />
            </View>
        )
    }
}
Bar.propTypes = {
    label: PropTypes.string.isRequired,
    percentage: PropTypes.number.isRequired
};