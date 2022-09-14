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
import {useNavigation, useRoute} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';
import AsyncStorage from '@react-native-async-storage/async-storage';
const storagekey_email = 'storagekey_email';
const storagekey_password = 'storagekey_password';
const storagekey_repeatpassword = 'storagekey_repeatpassword';
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen1 = () => {
  const [route_params, setRouteParams] = useState({
    email: '',
    password: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    gender: '',
    birthdate: '',
    country: '',
    state: '',
    city: '',
    nickname: '',
    profile_picture: '',
    mobile_number: '',
    mobile_number_formatted: '',
  });
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeat_password, setRepeatPassword] = useState('');
  const onRegisterPressed = async data => {
    if (loading) {
      return;
    }

    setLoading(true);
    saveData(
      data.email ? data.email : email,
      data.password ? data.password : password,
      data.repeat_password ? data.repeat_password : repeat_password,
    );
    // const {username, password, email, given_name} = data;
    // const response = await Auth.signUp({
    //   username,
    //   password,
    //   attributes: {email, given_name, family_name},
    // })
    //   .then(res => {
    //     navigation.navigate('ConfirmEmail', {username});
    //   })
    //   .catch(error => {
    //     Alert.alert('Oops...', error.message);
    //   });
    setLoading(false);
    navigation.navigate('SignUp2');
  };

  const saveData = async (email, password, repeat_password) => {
    try {
      await AsyncStorage.setItem(storagekey_email, email);
      await AsyncStorage.setItem(storagekey_password, password);
      await AsyncStorage.setItem(storagekey_repeatpassword, repeat_password);
      console.log('email and password saved');
    } catch (e) {
      console.log('Failed to save the data to the storage');
    }
  };

  React.useEffect(async () => {
    try {
      const email = await AsyncStorage.getItem(storagekey_email);
      const pword = await AsyncStorage.getItem(storagekey_password);
      const rpword = await AsyncStorage.getItem(storagekey_repeatpassword);
      if (email !== null) {
        setEmail(email);
      }
      if (pword !== null) {
        setPassword(pword);
      }
      if (pword !== null) {
        setRepeatPassword(rpword);
      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  }, []);

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
          <Text style={styles.title}>Enter your email and password</Text>

          <CustomInput
            defValue={email}
            name="email"
            control={control}
            placeholder="Email"
            rules={{
              pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
            }}
            onChangeText={value => setEmail(value)}
          />
          <CustomInput
            defValue={password}
            isPassword={true}
            name="password"
            control={control}
            placeholder="Password"
            secureTextEntry
            rules={{
              minLength: {
                value: 8,
                message: 'Password should be at least 8 characters long',
              },
            }}
            onChangeText={value => setPassword(value)}
          />
          <CustomInput
            defValue={repeat_password}
            isPassword={true}
            name="password-repeat"
            control={control}
            placeholder="Repeat Password"
            secureTextEntry
            rules={{
              validate: value => value === pwd || 'Password do not match',
            }}
            onChangeText={value => setRepeatPassword(value)}
          />

          <CustomButton text="Next" onPress={handleSubmit(onRegisterPressed)} />

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

export default SignUpScreen1;
