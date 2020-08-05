import React, {Component } from 'react';
import {
    StyleSheet,
} from 'react-native';
import {
    Container, Header, Title, Content, Button,
    Left, Right, Body, Text, Icon, Input,
    List, View, Badge, ListItem, Thumbnail,
} from 'native-base';
import MovieListHorizon from '../component/MovieListHorizon';
import SearchItem from '../component/SearchItem';

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            comingSoon: [],
            inShow: [],
            new: [],

            showSearch: false,
            searchKey: '',
            searchCount: 0,
            resultList: [],
        };
    }
    componentDidMount(): void {
        Promise.all([
            this.getDataNew('coming_soon', 'comingSoon'),
            this.getDataNew('in_theaters', 'inShow'),
            this.getDataNew('new_movies', 'new')
        ])
    }

    // 这个功能用不了，因为豆瓣A把这个API个禁掉了...，这里只是写一写表示有这个功能
    handleSearch(key) {
        this.setState({
            showSearch: true
        });
        // let url = 'https://api.douban.com/v2/movie/search?q=' + key + '&start=0&count=10&apikey=0df993c66c0c636e29ecbb5344252a4a';
        // fetch(url).then(res => res.json()).then(data => {
        //     this.setState({
        //         searchCount: data.count,
        //         resultList: data.subjects,
        //     })
        // }).catch(e => {
        //     console.log(e);
        // });
    }

    getDataNew(uri, key) {
        let url = 'https://api.douban.com/v2/movie/' + uri + '?apikey=0df993c66c0c636e29ecbb5344252a4a';
        fetch(url).then(res => res.json()).then(data => {
            let itemCon = [];
            let item = {title: data.title, data: [data.subjects]};
            itemCon.push(item);
            this.setState({
                [key]: itemCon,
            })
            // console.log(this.state[key])
            // console.log(itemCon)
        }).catch(e => {
            console.log(e);
        });
    }

    render() {
        const { showSearch, searchCount, searchKey, resultList } = this.state;
        const { navigation } = this.props;
        return (
            <Container>
                <Header rounded iosBarStyle='#FF9999' androidStatusBarColor='#FF9999' style={{backgroundColor: '#FF9999'}} transparent>
                    <Left>
                        <Button transparent
                                onPress={() => this.setState({
                                    showSearch: false
                                })}
                        >
                            <Icon name='home' type='AntDesign' />
                        </Button>
                    </Left>
                    <Body>
                        <Input placeholder="输入电影名字搜索"
                               placeholderTextColor='#d0d0d0'
                               style={{color: 'white'}}
                               onChangeText={(text)=>{
                                   this.setState({searchKey:text});
                               }}
                        />
                    </Body>
                    <Right>
                        <Button transparent
                                onPress={this.handleSearch.bind(this, searchKey)}
                        >
                            <Icon name={'search'} />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    {
                        showSearch ? (
                            <View>
                                <List>
                                    <ListItem itemDivider>
                                        <Text>热门搜索</Text>
                                    </ListItem>
                                    <ListItem>
                                        <View style={styles.hot_search}>
                                            <Badge success>
                                                <Text>抵达之谜</Text>
                                            </Badge>
                                            <Badge success>
                                                <Text>战狼</Text>
                                            </Badge>
                                            <Badge success>
                                                <Text>蜘蛛侠</Text>
                                            </Badge>
                                            <Badge success>
                                                <Text>叶问</Text>
                                            </Badge>
                                            <Badge success>
                                                <Text>海绵宝宝</Text>
                                            </Badge>
                                        </View>
                                    </ListItem>
                                    <ListItem itemDivider>
                                        <Text>搜索结果</Text>
                                    </ListItem>
                                    {
                                        searchCount !== 0 ? (
                                            resultList.map(item => (
                                                <SearchItem id={item.id}
                                                            title={item.title}
                                                            image={item.images.medium}
                                                            director={item.directors[0].name}
                                                            navigation={navigation}
                                                />
                                            ))
                                        ) : (
                                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                                <Text note>看起来什么都没有哦，换个关键词吧！</Text>
                                            </View>
                                        )
                                    }
                                </List>
                            </View>
                        ) : (
                            <View>
                                <MovieListHorizon movie={this.state.comingSoon} navigation={this.props.navigation} />
                                <MovieListHorizon movie={this.state.inShow} navigation={this.props.navigation} />
                                <MovieListHorizon movie={this.state.new} navigation={this.props.navigation} />
                            </View>
                        )
                    }
                </Content>
            </Container>
        );
    }

}

const styles = StyleSheet.create({
    item: {
        width: 150,
        backgroundColor: '#f9c2ff',
    },
    hot_search: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
    }
});

export default Home;
