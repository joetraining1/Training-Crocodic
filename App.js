import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './screens/Login'
import Home from './screens/Home'

const MyStack = createStackNavigator()


export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <MyStack.Navigator
          screenOptions = {{
          headerShown: false
        }}>
          <MyStack.Screen
          name = 'Login'
          component = {Login}>

          </MyStack.Screen>

          <MyStack.Screen
          name = 'Home'
          component = {Home}
          //options = {{
            //animationEnabled: false
          //}}
          >

          </MyStack.Screen>
        </MyStack.Navigator>
      </NavigationContainer>
    )
  }
}