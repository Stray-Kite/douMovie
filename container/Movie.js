import React, {Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    Image,
    Dimensions,
} from 'react-native';
import {
    Container, Header, Content, Button,
    Left, Right, Body, Text, Icon, View,
    Card, CardItem,
} from 'native-base';
import VideoPlayPage from '../component/VideoPlayPage';
import Stars from '../component/Stars';

const {width, height} = Dimensions.get('window');
const contentHeight = height-81;

class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieUrl: '',
            moviePoster: '',
            title: '',
            duration: 0,
            ratingsCount: 0,
            stars: 0,
            pubdate: '',
            genres: [],
            summary: '',
            coverPic: '',
        }
    }

    componentDidMount(): void {
        this.getMovieById(this.props.route.params.id);
        // this.getMovieById('30170546');
    }


    getMovieById(id) {
        let url = 'https://api.douban.com/v2/movie/subject/' + id + '?apikey=0df993c66c0c636e29ecbb5344252a4a';
        fetch(url).then(res => res.json()).then(data => {
            this.setState({
                movieUrl: data.blooper_urls[0],
                moviePoster: data.photos[0].thumb,
                title: data.title,
                duration: data.durations,
                ratingsCount: data.ratings_count,
                stars: data.rating.stars,
                pubdate: data.mainland_pubdate,
                genres: data.genres,
                summary: data.summary,
                coverPic: data.images.medium
            })
        }).catch(e => {
            console.log(e);
        });
    }

    render(): React.ReactElement<any> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const { movieUrl, moviePoster, title, duration, ratingsCount, stars, pubdate, genres, summary, coverPic } = this.state;
        return (
            <Container>
                <Header rounded iosBarStyle='#FF9999' androidStatusBarColor='#FF9999' style={{backgroundColor: '#FF9999'}} transparent>
                    <Left>
                        <Button transparent>
                            <Icon name="arrow-back" onPress={() => this.props.navigation.goBack()} />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{color: 'white'}}>电影详情</Text>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    {
                        movieUrl !== '' && (
                            <View style={{height: contentHeight}}>
                                <View style={{height: 220}}>
                                    <VideoPlayPage url={movieUrl} poster={moviePoster} />
                                </View>
                                <ScrollView>
                                    <View>
                                        <View style={styles.movie_card}>
                                            <View style={styles.movie_pic_container}>
                                                <Image
                                                    style={styles.movie_pic}
                                                    source={{ uri: coverPic }}
                                                />
                                            </View>
                                            <View style={styles.movie_detail}>
                                                <Text>{title}</Text>
                                                <Stars score={(stars / 10).toFixed(1)} />
                                                <Text note>
                                                    {genres.join('/')}  <Text note>{duration}</Text>
                                                </Text>
                                                <Text note>{pubdate}在大陆上映</Text>
                                                <Text note>{ratingsCount}人评价</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.movie_btn}>
                                        <Button rounded style={{backgroundColor: '#FF9999'}} onPress={() => {}}>
                                            <Icon name='heart' type='AntDesign' />
                                            <Text>想看</Text>
                                        </Button>
                                        <Button rounded info onPress={() => {}}>
                                            <Icon name='star' type='AntDesign' />
                                            <Text>看过</Text>
                                        </Button>
                                    </View>
                                    <View>
                                        <Card>
                                            <CardItem bordered>
                                                <Body>
                                                    <Text style={{textAlign: 'justify'}}>
                                                        {summary}
                                                    </Text>
                                                </Body>
                                            </CardItem>
                                        </Card>
                                    </View>
                                </ScrollView>
                            </View>
                        )
                    }
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    movie_card: {
        height: 140,
        flexDirection: 'row',
        alignItems: 'center',
    },
    movie_pic_container: {
        width: 100,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    movie_pic: {
        height: 135,
        width: 90,
        resizeMode: 'cover',
    },
    movie_detail: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
    },
    movie_btn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});

export default Movie;
