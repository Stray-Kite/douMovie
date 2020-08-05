import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Body, Left, List, ListItem, Text, Thumbnail } from 'native-base';

class MoreList extends Component{
    constructor(props) {
        super(props);
    }

    renderItem = ({item}) => (
        <List>
                <ListItem thumbnail onPress={() => {
                    this.props.navigation.navigate('Movie', {
                        id: item.id,
                    });
                }}>
                    <Left>
                        <Thumbnail square source={{uri: item.images.medium}}
                                   style={{height: 130, width: 100, marginLeft: -12}}/>
                    </Left>
                    <Body>
                        <Text>{item.title}</Text>
                        <Text note numberOfLines={1}>{item.year}</Text>
                        <Text note numberOfLines={1}>评分: {(item.rating.stars / 10).toFixed(1)}</Text>
                        <Text note numberOfLines={1}>导演: {item.directors[0].name}</Text>
                        {
                            item.casts.length !== 0 ? (
                                    <Text note numberOfLines={1}>演员:
                                        {
                                            item.casts.map((cast) => ' ' + cast.name)
                                        }
                                    </Text>
                                ) :
                                (
                                    <Text note numberOfLines={1}>演员: 暂无</Text>
                                )
                        }
                    </Body>
                </ListItem>
        </List>
    );

    render() {
        return (
            <FlatList
                data={this.props.List}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
            />
        );
    }
}

export default MoreList;
