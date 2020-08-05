import React from 'react';
import { SectionList, FlatList, Image, StyleSheet, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Body, Card, CardItem, Text, ListItem, Left, Right, Icon } from 'native-base';

function MovieListHorizon({movie, navigation}) {
    const ItemList = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('Movie', {
                    id: item.id,
            });
        }}>
            <Card style={[{ elevation: 2 }, styles.item]}>
                <CardItem cardBody>
                    <Image style={{ height: 150, flex: 1 }} source={{uri: item.images.medium}} />
                </CardItem>
                <CardItem>
                    <Body>
                        <Text numberOfLines={1}>{item.title}</Text>
                        <Text note>电影评分: {(item.rating.stars / 10).toFixed(1)}</Text>
                    </Body>
                </CardItem>
            </Card>
        </TouchableOpacity>
    );
    const renderItem = ({ item }) => (
        <FlatList
            data={item}
            style={{marginLeft: 15, marginRight: 15}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={ItemList}
            initialNumToRender={4}
            keyExtractor={item => item.id}
        />
    );


    return (
        <SafeAreaView style={styles.container}>
            <SectionList
                sections={movie}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                renderSectionHeader={({ section: { title } }) => (
                    <ListItem noIndent>
                        <Left>
                            <Text>{title.slice(0, 7)}</Text>
                        </Left>
                        <Right>
                            <Icon type="Feather" name="more-horizontal" onPress={() => navigation.navigate('More')}/>
                        </Right>
                    </ListItem>
                )}
                style={styles.list}
                initialNumToRender={4}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },
    item: {
        width: 150,
        backgroundColor: '#f9c2ff',
    },
    list: {
    }
});

export default MovieListHorizon;
