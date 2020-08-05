import React, {Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './container/Home';
import More from './container/More';
import Movie from './container/Movie';

import { init, Geolocation } from 'react-native-amap-geolocation'
import { PermissionsAndroid } from 'react-native'

const Stack = createStackNavigator();

class App extends Component{

    componentDidMount(): void {
        // this.getGeo();
    }

    async getGeo() {
        await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]);

        await init({
            // ios: "9bd6c82e77583020a73ef1af59d0c759",
            android: "11ecc0fcb5c9d144be8e6ce67d76f035"
        });

        Geolocation.getCurrentPosition((geo) => {
            console.log(geo)
        }, (e) => {
            console.log(e)
        })
    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" headerMode='none'>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="More" component={More} />
                    <Stack.Screen name="Movie" component={Movie} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default App;
