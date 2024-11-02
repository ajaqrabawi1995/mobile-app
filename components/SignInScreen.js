// components/SignInScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:3001/api/auth/signin', {
        email,
        password,
      });
      Alert.alert('Success', 'Logged in successfully!');
      // Store token, navigate to home, etc.
    } catch (error) {
      Alert.alert('Error', error.response.data.message || 'Something went wrong');
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" onChangeText={setEmail} keyboardType="email-address" />
      <TextInput placeholder="Password" onChangeText={setPassword} secureTextEntry />
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
};

export default SignInScreen;
