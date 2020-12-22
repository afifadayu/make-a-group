import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Logo from '../assets/adaptive-icon.png';
import axios from 'axios';

export default function Login( {navigation} ) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [placeholderColor, setPlaceholderColor] = useState('#d4d4d4');

  const signIn = async (email, password) => {
    // console.log(email, password)
    try {
      const {data} = await axios({
        method: 'POST',
        url: 'http://bta70.omindtech.id/api/tentor/login',
        data:{
          email: email,
          password: password
        }
      });
      await AsyncStorage.setItem('USER_TOKEN', data.data.token_access);
      navigation.reset({
        index: 0,
        routes: [{ name: 'MakeGroup' }],
      });

    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <View style={styles.container}> 
      <Image style={styles.logo} source={Logo}/>
      <Text style={styles.title}>
        Login
      </Text>
      <View style={styles.padding}>
        <TextInput
          style={styles.textInputStyling}
          onChangeText={email => setEmail(email)}
          value={email}
          placeholder="Email"
          placeholderTextColor={placeholderColor} />
      </View>

      <View style={styles.padding}>
        <TextInput
          style={styles.textInputStyling}
          onChangeText={password => setPassword(password)}
          value={password}
          placeholder="Password"
          placeholderTextColor={placeholderColor}
          secureTextEntry={true}/>
      </View>
      
      <View style={styles.padding}>
        <TouchableOpacity style={styles.button} onPress={ () => signIn(email, password)}>
          <Text style={styles.color}>Login</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 150,
    height: '8%',
  },
  title: {
    fontSize: 25,
    color: '#1f99d3',
    fontWeight: '500'
  },
  textInputStyling: {
    height: 40,
    width: 280,
    padding: 10,
    paddingStart: 15,
    borderRadius: 5,
    color: '#000000',
    backgroundColor: '#f4f4f4'
  },
  padding:{
    paddingTop: 20
  },
  button: {
    height: 40,
    width: 280,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: "#1f99d3"
  },
  color: {
    color: '#fdfdfd'
  }
});
