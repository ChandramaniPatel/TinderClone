/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Image,Text, Dimensions, View,Animated} from 'react-native';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

 const SCREEN_HEIGHT = Dimensions.get("window").height
 const SCREEN_WIDTH = Dimensions.get("window").width

const Users = [
 { id: "1",uri : require("./src/assets/red.jpg")},
 { id: "2",uri : require("./src/assets/redp.jpg")},
 { id: "3",uri : require("./src/assets/repu.jpg")},
 { id: "4",uri : require("./src/assets/tf2.jpg")},
 { id: "5",uri : require("./src/assets/swr.jpg")},
 { id: "6",uri : require("./src/assets/snp.jpg")},
 { id: "7",uri : require("./src/assets/sn.jpg")},
 { id: "8",uri : require("./src/assets/swt.jpg")},
 { id: "9",uri : require("./src/assets/inspired.jpg")},
 { id: "10",uri : require("./src/assets/Fearless.jpg")},
 { id: "11",uri : require("./src/assets/profile.jpg")},
]

export default class App extends Component {

  renderUsers = () => {

    return Users.map((item,index) => {

      return (
        <Animated.View style = {{height : SCREEN_HEIGHT - 120,width : SCREEN_WIDTH,padding: 10}}>
             
             <Image  style = {{flex : 1,height : null,width : null , borderRadius : 20, resizeMode : "cover" }} source = {item.uri} />


            </Animated.View>
      )



    })

  }

  render() {
    return (
      <View style={{flex : 1 }}>
          <View style = {{height : 60}}> 

          </View>

          <View style={{flex : 1 }}>
            
            {this.renderUsers()}

          </View>

          <View style = {{height : 60}}> 

          </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
