/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Image,Text, Dimensions,PanResponder,View,Animated} from 'react-native';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

 const SCREEN_HEIGHT = Dimensions.get("window").height 
 const SCREEN_WIDTH = Dimensions.get("window").width

const Users = [
{ id: "11",uri : require("./src/assets/profile.jpg")},
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
 
]

export default class App extends Component {
  constructor(){
    super()

    this.position = new Animated.ValueXY()
    this.state = {
      currentIndex : 0
    }

    this.rotate = this.position.x.interpolate({
      inputRange : [-SCREEN_WIDTH/2,0,SCREEN_WIDTH/2],
      outputRange : ["-10deg","0deg","10deg"],
      extrapolate : "clamp"
    })

    this.rotateAndTranslate = {
      transform : [
        { rotate : this.rotate},
        ...this.position.getTranslateTransform()
      ]
    }

    this.likeOpacity = this.position.x.interpolate({
      inputRange : [-SCREEN_WIDTH/2,0,SCREEN_WIDTH/2],
      outputRange : [0,0,1],
      extrapolate : "clamp"
    })

    this.dislikeOpacity = this.position.x.interpolate({
      inputRange : [-SCREEN_WIDTH/2,0,SCREEN_WIDTH/2],
      outputRange : [1,0,0],
      extrapolate : "clamp"
    })

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange : [-SCREEN_WIDTH/2,0,SCREEN_WIDTH/2],
      outputRange : [1,0,1],
      extrapolate : "clamp"
    })

    this.nextCardScale = this.position.x.interpolate({
      inputRange : [-SCREEN_WIDTH/2,0,SCREEN_WIDTH/2],
      outputRange : [1,0.5,0],
      extrapolate : "clamp"
    })
  }

  componentWillMount(){
    this.PanResponder = PanResponder.create(
       {
          onStartShouldSetPanResponder : (evt,gestureState) =>true,
          onPanResponderMove : (evt,gestureState) => {
            this.position.setValue ({x: gestureState.dx , y : gestureState.dy})

          },

          onPanResponderRelease:(evt,gestureState) => {

            if (gestureState.dx > 120){
              Animated.spring(this.position,{toValue : {x:SCREEN_WIDTH+100,y:gestureState.dy}}).start( ()=> {
                this.setState({currentIndex : this.state.currentIndex+1},()=>{
                  this.position.setValue({x:0,y:0})
                })
              }

              )
            }
            else if (gestureState.dx < -120) {
              Animated.spring(this.position,{toValue : {x: -SCREEN_WIDTH-100,y:gestureState.dy}}).start( ()=> {
                this.setState({currentIndex : this.state.currentIndex+1},()=>{
                  this.position.setValue({x:0,y:0})
                })
              }

              )
            } else {
              Animated.spring(this.position, {toValue : {x:0,y:0}, friction : 4 }
                ).start
            }

          }

       })
  }

  renderUsers = () => {

    return Users.map((item,index) => {
      if (index < this.state.currentIndex) {
        return null
      }
      else if (index == this.state.currentIndex) {

        return (
          <Animated.View 
           {...this.PanResponder.panHandlers}
          key ={item.id} style = {[this.rotateAndTranslate, {height : SCREEN_HEIGHT - 120,width : SCREEN_WIDTH,padding: 10,position: "absolute"}]}>
               
               <Animated.View style = {{ opacity:this.likeOpacity,transform:[{rotate:"-30deg"}], position: "absolute",top : 50,left : 40, zIndex : 1000}}> 
                 <Text style={ {borderWidth : 1 , borderColor : "green",color : "green",fontSize : 32 , fontWeight : "800",padding : 10}}>LIKE</Text>
               </Animated.View>

               <Animated.View style = {{ opacity:this.dislikeOpacity, transform:[{rotate:"30deg"}], position: "absolute",top : 50,right : 40, zIndex : 1000}}> 
                 <Text style={ {borderWidth : 1 , borderColor : "red",color : "red",fontSize : 32 , fontWeight : "800",padding : 10}}>NOPE</Text>
               </Animated.View>


               <Image  style = {{flex : 1,height : null,width : null , borderRadius : 20, resizeMode : "cover" }} source = {item.uri} />
  
  
              </Animated.View>

        )
      }

      else {
        return (
          <Animated.View 
           
          key ={item.id} style = {[{opacity:this.nextCardOpacity, transform : [{scale: this.nextCardScale}]},{height : SCREEN_HEIGHT - 120,width : SCREEN_WIDTH,padding: 10,position: "absolute"}]}>
               
               <Animated.View style = {{ opacity:this.likeOpacity,transform:[{rotate:"-30deg"}], position: "absolute",top : 50,left : 40, zIndex : 1000}}> 
                 <Text style={ {borderWidth : 1 , borderColor : "green",color : "green",fontSize : 32 , fontWeight : "800",padding : 10}}>LIKE</Text>
               </Animated.View>

               <Animated.View style = {{ opacity:this.dislikeOpacity, transform:[{rotate:"30deg"}], position: "absolute",top : 50,right : 40, zIndex : 1000}}> 
                 <Text style={ {borderWidth : 1 , borderColor : "red",color : "red",fontSize : 32 , fontWeight : "800",padding : 10}}>NOPE</Text>
               </Animated.View>

               <Image  style = {{flex : 1,height : null,width : null , borderRadius : 20, resizeMode : "cover" }} source = {item.uri} />
  
  
              </Animated.View>
        )
  
      }

      
    }).reverse()

  }

  render() {
    return (
      <View style={{flex : 1 ,backgroundColor : "white" }}>
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
