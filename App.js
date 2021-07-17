import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';

export default class App extends React.Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    return (
      <SafeAreaView
        style={{
          backgroundColor: 'rgb(235, 235, 255)',
          flex: 1,
        }}>
        <KeyboardAvoidingView
          style={{
            flex: 1,
          }}>
          <ScrollView
            contentContainerStyle={{
              alignItems: 'center',
              flexGrow: 1,
              justifyContent: 'center',
            }}
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
              onChangeText={newValue => {
                this.setState({username: newValue});
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
    alert('Custom Function');
  }
};
