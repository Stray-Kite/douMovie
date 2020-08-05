import React from 'react';
import { Body, Left, ListItem, Text, Thumbnail } from 'native-base';
import { StyleSheet } from 'react-native';

function SearchItem({id, image, title, director, navigation}) {
    return (
        <ListItem avatar
                  onPress={
                      navigation.navigate('Movie', {
                          id: id,
                      })
                  }>
            <Left>
                <Thumbnail style={styles.thumbnail} source={{uri: image}}/>
            </Left>
            <Body>
                <Text>{title}</Text>
                <Text numberOfLines={1} note>导演: {director}</Text>
            </Body>
        </ListItem>
    );
}

const styles = StyleSheet.create({
    thumbnail: {
        height: 45,
        width: 45,
    }
});

export default SearchItem;
