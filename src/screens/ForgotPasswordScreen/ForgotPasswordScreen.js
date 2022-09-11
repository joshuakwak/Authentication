import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import Amplify, {Auth} from 'aws-amplify';
const ForgotPasswordScreen = () => {
  const {control, handleSubmit} = useForm();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const onSendPressed = async data => {
    if (loading) {
      return;
    }

    setLoading(true);
    const {username} = data;
    const response = await Auth.forgotPassword(data.username)
      .then(res => {
        navigation.navigate('NewPassword', {username});
      })
      .catch(error => {
        Alert.alert('Oops...', error.message);
      });

    setLoading(false);
    // console.warn(data);
    // navigation.navigate('NewPassword');
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text style={styles.title}>Reset your password</Text>

          <CustomInput
            name="username"
            control={control}
            placeholder="Username"
            rules={{
              required: 'Username is required',
            }}
          />

          <CustomButton text="Send" onPress={handleSubmit(onSendPressed)} />

          <CustomButton
            text="Back to Sign in"
            onPress={onSignInPress}
            type="TERTIARY"
          />
        </View>
      </ScrollView>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size={60} color="purple" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#77777750',
  },
});

export default ForgotPasswordScreen;
