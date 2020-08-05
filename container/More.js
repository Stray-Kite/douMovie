import React, {Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import {
    Container, Header, Button, Left,
    Right, Body, Text, Icon, Segment,
    List, ListItem, Tabs, Tab, View,
    Badge,
} from 'native-base';
import MoreList from '../component/MoreList';


class More extends Component{
    constructor(props) {
        super(props);
        this.state = {
            active: 'more_movie',
            // inShowTitle: '',
            inShowList: [],

            // comingSoonTitle: '',
            comingSoonList: [],
            loading: true,
        }
    }

    handleClick(to) {
        this.setState({
            active: to,
        })
    }

    componentDidMount(): void {
        let that = this;
        setTimeout(() => {
            this.setState({
                loading: true,
            });
            Promise.all([
                that.getData('in_theaters', 'inShow'),
                that.getData('coming_soon', 'comingSoon')
            ]);
            that.setState({
                loading: false
            })
        }, 1000)
    }

    getData(uri, other) {
        let url = 'https://api.douban.com/v2/movie/' + uri + '?apikey=0df993c66c0c636e29ecbb5344252a4a';
        fetch(url).then(res => res.json()).then(data => {
            this.setState({
                // [other + 'Title']: data.title,
                [other + 'List']: data.subjects,
            })
        }).catch(e => {
            console.log(e);
        });
    }

    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <Container>
                <Header rounded iosBarStyle='#FF9999' androidStatusBarColor='#FF9999' style={{backgroundColor: '#FF9999'}} transparent>
                    <Left>
                        <Button transparent>
                            <Icon name="arrow-back" onPress={() => this.props.navigation.goBack()} />
                        </Button>
                    </Left>
                    <Body>
                        <Segment style={{backgroundColor: 'rgba(255, 51, 51, 0)'}}>
                            <Button first active={this.state.active === 'more_movie'} onPress={this.handleClick.bind(this, 'more_movie')}>
                                <Text>电影</Text>
                            </Button>
                            <Button last active={this.state.active === 'theater'} onPress={this.handleClick.bind(this, 'theater')}>
                                <Text>附近影院</Text>
                            </Button>
                        </Segment>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name="search" />
                        </Button>
                    </Right>
                </Header>
                {
                    this.state.active === 'more_movie' ?
                        (
                            <Tabs>
                                <Tab heading='正在热映'
                                     tabStyle={{backgroundColor: '#FF9999'}}
                                     activeTabStyle={{backgroundColor: '#FF9999'}}
                                     textStyle={{color: '#E0E0E0'}}
                                >
                                    {
                                        this.state.loading ?
                                            <View style={{flex: 1, justifyContent: 'center'}}>
                                                <ActivityIndicator size="large" color="rgba(255,51,51,0.4)" />
                                            </View>
                                            :
                                            <MoreList List={this.state.inShowList} navigation={this.props.navigation} />
                                    }
                                </Tab>
                                <Tab heading='即将上映'
                                     tabStyle={{backgroundColor: '#FF9999'}}
                                     activeTabStyle={{backgroundColor: '#FF9999'}}
                                     textStyle={{color: '#E0E0E0'}}
                                >
                                    {
                                        this.state.loading ?
                                            <View style={{flex: 1, justifyContent: 'center'}}>
                                                <ActivityIndicator size="large" color="rgba(255,51,51,0.4)" />
                                            </View>
                                            :
                                            <MoreList List={this.state.comingSoonList} navigation={this.props.navigation} />
                                    }
                                </Tab>
                            </Tabs>
                        ) :
                        (
                            <ScrollView>
                                <List>
                                    <ListItem noIndent>
                                        <Body>
                                            <Text>国泰电影院</Text>
                                            <Text note>北京市昌平区国泰影城</Text>
                                            <Text note numberOfLines={1}>
                                                <Badge style={styles.theater_badge}>
                                                    <Text>退票</Text>
                                                </Badge>
                                                <Text> </Text>
                                                <Badge style={styles.theater_badge}>
                                                    <Text>改签</Text>
                                                </Badge>
                                                <Text> </Text>
                                                <Badge style={styles.theater_badge}>
                                                    <Text>观影小食</Text>
                                                </Badge>
                                            </Text>
                                        </Body>
                                        <Right>
                                            <Text>19.9元起</Text>
                                            <Text note>1.2km</Text>
                                            <Text note> </Text>
                                            <Text note> </Text>
                                        </Right>
                                    </ListItem>
                                </List>
                            </ScrollView>

                        )
                }
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    theater_badge: {
        backgroundColor: 'rgba(255, 51, 51, 0.4)',
    }
})

export default More;
