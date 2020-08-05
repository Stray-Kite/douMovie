import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Video from 'react-native-video-controls';

class VideoPlayPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            videoUrl: this.props.url,
            videoPoster: this.props.poster,
            showVideoCover: true,
            showVideoControl: false,
            isPlaying: false,
            currentTime: 0,
            duration: 0,
            playFromBeginning: false,
        }
    }

    renderVideo() {
        const { videoUrl, videoPoster, isPlaying } = this.state;
        return (
                <Video
                    ref={ref => this.videoPlayer = ref}
                    source={{uri: videoUrl}}
                    resizeMode='contain'
                    progressUpdateInterval={100.0}
                    rate={1.0}
                    playWhenInactive={false}
                    playInBackground={false}
                    paused={!isPlaying}
                    poster={videoPoster}
                    posterResizeMode="cover"
                    disableBack
                    disableFullscreen
                    onLoad={this.onLoaded}
                    onProgress={this.onProgressChanged}
                    onEnd={this.onPlayEnd}
                    // onEnterFullscreen={this._onLayout}
                    style={styles.videoStyle}
                />

        )
    }

    onLoaded = (data) => {
        this.setState({
            duration: data.duration,
        })
    };

    onProgressChanged = (data) => {
        if (this.state.isPlaying) {
            this.setState({
                currentTime: data.currentTime,
            })
        }
    };

    onPlayEnd= () => {
        this.setState({
            currentTime: 0,
            isPlaying: false,
            playFromBeginning: true,
        })
    };

    render() {
        return (
            <View style={{height: 220}}>
                {this.renderVideo()}
            </View>
        );
    }
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
   videoStyle: {
       width: '100%',
       height: 220,
   }
});

export default VideoPlayPage;
