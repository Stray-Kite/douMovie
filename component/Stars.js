import React from 'react';
import {Icon, Text, View} from 'native-base';
import {StyleSheet} from 'react-native';

function Stars({ score }) {
    return (
        <Text style={styles.score}>
            {score}
            <View style={{height: 20}}>
                <View style={styles.score_all}>
                    <Icon name="star" type="AntDesign" style={styles.score_bottom} />
                    <Icon name="star" type="AntDesign" style={styles.score_bottom} />
                    <Icon name="star" type="AntDesign" style={styles.score_bottom} />
                    <Icon name="star" type="AntDesign" style={styles.score_bottom} />
                    <Icon name="star" type="AntDesign" style={styles.score_bottom} />
                </View>
                <View style={styles.score_all}>
                    {
                        new Array(Math.round(score)).fill('1').map((item, index) => (
                            <Icon key={index} name="star" type="AntDesign" style={styles.score_top} />
                        ))
                    }
                </View>
            </View>
        </Text>
    )
}

const styles = StyleSheet.create({
    score: {
        color: 'red',
        fontSize: 25,
    },
    score_all: {
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    score_bottom: {
        fontSize: 20,
        color: '#d0d0d0',
    },
    score_top: {
        fontSize: 20,
        color: 'orange',
    }
});

export default Stars;
