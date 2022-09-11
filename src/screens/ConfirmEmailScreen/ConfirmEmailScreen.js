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
import {useRoute} from '@react-navigation/native';
import Amplify, {Auth} from 'aws-amplify';
const ConfirmEmailScreen = () => {
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const {control, handleSubmit, watch} = useForm({
    defaultValues: {username: route.params.username},
  });

  const username = watch('username');

  const navigation = useNavigation();

  const onConfirmPressed = async data => {
    if (loading) {
      return;
    }

    setLoading(true);

    const response = await Auth.confirmSignUp(data.username, data.code)
      .then(res => {
        Alert.alert('Success', 'Registered Successfully.', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('SignIn');
            },
          },
        ]);
      })
      .catch(error => {
        Alert.alert('Oops...', error.message);
      });

    setLoading(false);
    // console.warn(data);
    // navigation.navigate('Home');
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const onResendPress = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    const response = await Auth.resendSignUp(username)
      .then(res => {
        Alert.alert('Success', 'Code was resent to your email.');
      })
      .catch(error => {
        Alert.alert('Oops...', error.message);
      });

    setLoading(false);
  };

  return (
    <View style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text style={styles.title}>Confirm your email</Text>

          <CustomInput
            name="username"
            control={control}
            placeholder="Username"
            rules={{
              required: 'Username is required',
            }}
          />

          <CustomInput
            name="code"
            control={control}
            placeholder="Enter your confirmation code"
            rules={{
              required: 'Confirmation code is required',
            }}
          />

          <CustomButton
            text="Confirm"
            onPress={handleSubmit(onConfirmPressed)}
          />

          <CustomButton
            text="Resend code"
            onPress={onResendPress}
            type="SECONDARY"
          />

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

export default ConfirmEmailScreen;
