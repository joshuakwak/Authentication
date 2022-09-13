import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Logo from '../../../assets/images/reactnativeicon.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import Amplify, {Auth} from 'aws-amplify';

const SignInScreen = () => {
  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSignInPressed = async data => {
    if (loading) {
      return;
    }

    setLoading(true);

    const response = await Auth.signIn(data.username, data.password)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        Alert.alert('Oops...', error.message);
      });

    setLoading(false);
    // console.log(data);
    // // validate user
    // navigation.navigate('Home');
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignUpPress = () => {
    navigation.navigate('SignUp1');
  };

  return (
    <View style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Image
            source={Logo}
            style={[styles.logo, {height: height * 0.3}]}
            resizeMode="contain"
          />

          <CustomInput
            name="username"
            placeholder="Username"
            control={control}
            rules={{required: 'Username is required'}}
          />

          <CustomInput
            isPassword={true}
            name="password"
            placeholder="Password"
            secureTextEntry
            control={control}
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password should be minimum 8 characters long',
              },
            }}
          />

          <CustomButton
            text={loading ? 'Loading...' : 'Sign In'}
            onPress={handleSubmit(onSignInPressed)}
          />

          <CustomButton
            text="Forgot password?"
            onPress={onForgotPasswordPressed}
            type="TERTIARY"
          />

          {/* <SocialSignInButtons /> */}

          <CustomButton
            text="Don't have an account? Create one"
            onPress={onSignUpPress}
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
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
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

export default SignInScreen;
