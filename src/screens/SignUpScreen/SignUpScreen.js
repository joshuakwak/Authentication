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
import {Auth} from 'aws-amplify';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const onRegisterPressed = async data => {
    if (loading) {
      return;
    }

    setLoading(true);

    const {username, password, email, name} = data;
    const response = await Auth.signUp({
      username,
      password,
      attributes: {email, name, preferred_username: username},
    })
      .then(res => {
        navigation.navigate('ConfirmEmail', {username});
      })
      .catch(error => {
        Alert.alert('Oops...', error.message);
      });
    setLoading(false);
    // navigation.navigate('ConfirmEmail');
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
  };

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
  };

  return (
    <View style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text style={styles.title}>Create an account</Text>

          <CustomInput
            name="name"
            control={control}
            placeholder="Name"
            rules={{
              required: 'Name is required',
              minLength: {
                value: 3,
                message: 'Name should be at least 3 characters long',
              },
              maxLength: {
                value: 24,
                message: 'Name should be max 24 characters long',
              },
            }}
          />

          <CustomInput
            name="username"
            control={control}
            placeholder="Username"
            rules={{
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username should be at least 3 characters long',
              },
              maxLength: {
                value: 24,
                message: 'Username should be max 24 characters long',
              },
            }}
          />
          <CustomInput
            name="email"
            control={control}
            placeholder="Email"
            rules={{
              required: 'Email is required',
              pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
            }}
          />
          <CustomInput
            isPassword={true}
            name="password"
            control={control}
            placeholder="Password"
            secureTextEntry
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password should be at least 8 characters long',
              },
            }}
          />
          <CustomInput
            isPassword={true}
            name="password-repeat"
            control={control}
            placeholder="Repeat Password"
            secureTextEntry
            rules={{
              validate: value => value === pwd || 'Password do not match',
            }}
          />

          <CustomButton
            text="Register"
            onPress={handleSubmit(onRegisterPressed)}
          />

          <Text style={styles.text}>
            By registering, you confirm that you accept our{' '}
            <Text style={styles.link} onPress={onTermsOfUsePressed}>
              Terms of Use
            </Text>{' '}
            and{' '}
            <Text style={styles.link} onPress={onPrivacyPressed}>
              Privacy Policy
            </Text>
          </Text>

          {/* <SocialSignInButtons /> */}

          <CustomButton
            text="Already have an account? Sign in"
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

export default SignUpScreen;
