import React from 'react';
import {
    Alert,
    KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Platform,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class App extends React.Component {
  state = {
    username: '',
    password: '',
  };

  async componentDidMount(){
    const userData = await AsyncStorage.getItem('USER_DATA')

    if (userData != undefined) {
        this.props.navigation.replace('Home')
    }
  }

  render() {
    return (
      <SafeAreaView
        style={{
          backgroundColor: 'rgb(235, 235, 255)',
          flex: 1,
        }}>
        <KeyboardAvoidingView
          behavior = {Platform.OS == 'ios' ? 'padding' : undefined}
          style={{
            flex: 1,
          }}>
          <ScrollView
            contentContainerStyle={{
              alignItems: 'center',
              flexGrow: 1,
              justifyContent: 'center',
            }}
            keyboardShouldPersistTaps = 'always'
            style={{
              flex: 1,
            }}>
            <Text
              style={{
                fontSize: 36,
                fontWeight: 'bold',
              }}>
              Food Order
            </Text>

            <TextInput
            autoCapitalize = 'none'
            returnKeyType = 'next'
              onChangeText={newValue => {
                this.setState({username: newValue});
              }}
              onSubmitEditing = {() => {
                  this.passwordInput.focus()
              }}
              placeholder={'Username'}
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                fontSize: 18,
                marginTop: 50,
                padding: 10,
                width: '85%',
              }}></TextInput>

            <TextInput
            
              onChangeText={newValue => {
                this.setState({password: newValue});
              }}
              placeholder={'Password'}
              secureTextEntry={true}
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                fontSize: 18,
                marginTop: 20,
                padding: 10,
                width: '85%',
              }}></TextInput>

            <Pressable
              disabled={this.state.username == '' || this.state.password == ''}
              onPress={() => {
                this.submitLogin();
              }}
              style={{
                alignItems: 'center',
                backgroundColor:
                  this.state.username == '' || this.state.password == ''
                    ? 'gray'
                    : 'green',
                borderRadius: 10,
                marginTop: 40,
                padding: 10,
                width: '85%',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                Login
              </Text>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  submitLogin() {
    // this

    const formData = new FormData()

    formData.append('username', this.state.username)
    formData.append('password', this.state.password)

    const baseURL = 'https://neptune.crocodic.net/crocodic-training-api/public/api/v1'

    fetch(
        baseURL + '/login',
        {
            method: 'POST',
            headers: {
                'Accept': 'applcation/json',
                'Content-Type': 'multipart/form-data'
            },
            body: formData
        }
    )
    .then(response => response.json())
    .then(async(responseJSON) => {
        if (responseJSON.status == 200) {
            await AsyncStorage.setItem('USER_DATA', JSON.stringify(responseJSON.data))

            this.props.navigator.replace('Home')
        } else {
            Alert.alert('Salah Informasi', responseJSON.message)
        }
    })
    .catch(err => {
      console.log(err)
    })
  }
};
