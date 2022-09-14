import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
/* Icons Import  */
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Octicon from 'react-native-vector-icons/Octicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
/* Icons Import  */
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import OTPInputView from '@twotalltotems/react-native-otp-input';

import AsyncStorage from '@react-native-async-storage/async-storage';
const storagekey_email = 'storagekey_email';
const storagekey_password = 'storagekey_password';
const storagekey_repeatpassword = 'storagekey_repeatpassword';
const storagekey_first_name = 'storagekey_first_name';
const storagekey_middle_name = 'storagekey_middle_name';
const storagekey_last_name = 'storagekey_last_name';
const storagekey_gender = 'storagekey_gender';
const storagekey_birthdate = 'storagekey_birthdate';
const storagekey_country = 'storagekey_country';
const storagekey_state = 'storagekey_state';
const storagekey_city = 'storagekey_city';
const storagekey_nickname = 'storagekey_nickname';
const storagekey_picture = 'storagekey_picture';
const storagekey_mobile = 'storagekey_mobile';

const SignUpScreen8 = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = React.useState('');
  const [middle_name, setMiddleName] = React.useState('');
  const [last_name, setLastName] = React.useState('');
  const [gender, setGender] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [nickname, setNickname] = useState('');
  const [picture, setPicture] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const onRegisterPressed = async data => {
    if (loading) {
      return;
    }

    setLoading(true);

    const response = await Auth.signUp({
      username: email,
      password: password,
      attributes: {
        email: email,
        given_name: first_name,
        middle_name: middle_name,
        family_name: last_name,
        gender: gender,
        birthdate: birthdate,
        address: address,
        nickname: nickname,
        picture: picture,
        phone_number: mobile,
      },
    })
      .then(res => {
        setLoading(false);
        clearStorage();
        Alert.alert(
          'Registered Successfully',
          'Please check your email for verification code.',
          [
            {
              text: 'OK',
              onPress: navigation.navigate('ConfirmEmail', {username: email}),
            },
          ],
          {cancelable: false},
        );
      })
      .catch(error => {
        setLoading(false);
        Alert.alert('Oops...', error.message);
      });

    setTimeout(() => {}, 1000);
  };

  React.useEffect(async () => {
    try {
      const email = await AsyncStorage.getItem(storagekey_email);
      if (email !== null) {
        setEmail(email);
      }
      const password = await AsyncStorage.getItem(storagekey_password);
      if (password !== null) {
        setPassword(password);
      }
      const fname = await AsyncStorage.getItem(storagekey_first_name);
      if (fname !== null) {
        setFirstName(fname);
      }
      const mname = await AsyncStorage.getItem(storagekey_middle_name);
      if (mname !== null) {
        setMiddleName(mname);
      }
      const lname = await AsyncStorage.getItem(storagekey_last_name);
      if (lname !== null) {
        setLastName(lname);
      }
      const gender = await AsyncStorage.getItem(storagekey_gender);
      if (gender !== null) {
        setGender(gender);
      }
      const birthdate = await AsyncStorage.getItem(storagekey_birthdate);
      if (birthdate !== null) {
        setBirthdate(birthdate);
      }
      const country = await AsyncStorage.getItem(storagekey_country);
      if (country !== null) {
        setCountry(country);
      }
      const state = await AsyncStorage.getItem(storagekey_state);
      if (state !== null) {
        setState(state);
      }
      const city = await AsyncStorage.getItem(storagekey_city);
      if (city !== null) {
        setCity(city);
        setAddress(city + ', ' + state + ', ' + country);
      }
      const nick = await AsyncStorage.getItem(storagekey_nickname);
      if (nick !== null) {
        setNickname(nick);
      }
      const mobile = await AsyncStorage.getItem(storagekey_mobile);
      if (mobile !== null) {
        setMobile(mobile);
      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  }, []);

  const clearStorage = async () => {
    try {
      await AsyncStorage.removeItem(storagekey_email);
      await AsyncStorage.removeItem(storagekey_password);
      await AsyncStorage.removeItem(storagekey_repeatpassword);
      await AsyncStorage.removeItem(storagekey_first_name);
      await AsyncStorage.removeItem(storagekey_middle_name);
      await AsyncStorage.removeItem(storagekey_last_name);
      await AsyncStorage.removeItem(storagekey_gender);
      await AsyncStorage.removeItem(storagekey_birthdate);
      await AsyncStorage.removeItem(storagekey_country);
      await AsyncStorage.removeItem(storagekey_state);
      await AsyncStorage.removeItem(storagekey_city);
      await AsyncStorage.removeItem(storagekey_nickname);
      await AsyncStorage.removeItem(storagekey_picture);
      await AsyncStorage.removeItem(storagekey_mobile);
      return true;
    } catch (exception) {
      return false;
    }
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
          <Text style={styles.title}>Summary</Text>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: '100%',
              paddingVertical: 10,
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
              marginBottom: 10,
            }}>
            <Text style={styles.contentText}>Nickname</Text>
            <Text style={styles.subContentText}>{nickname}</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: '100%',
              paddingVertical: 10,
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
              marginBottom: 10,
            }}>
            <Text style={styles.contentText}>Name</Text>
            <Text style={styles.subContentText}>
              {first_name + ' ' + middle_name + ' ' + last_name}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: '100%',
              paddingVertical: 10,
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
              marginBottom: 10,
            }}>
            <Text style={styles.contentText}>Email Address</Text>
            <Text style={styles.subContentText}>{email}</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: '100%',
              paddingVertical: 10,
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
              marginBottom: 10,
            }}>
            <Text style={styles.contentText}>Mobile Number</Text>
            <Text style={styles.subContentText}>{mobile}</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: '100%',
              paddingVertical: 10,
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
              marginBottom: 10,
            }}>
            <Text style={styles.contentText}>Birthdate</Text>
            <Text style={styles.subContentText}>{birthdate}</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: '100%',
              paddingVertical: 10,
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
              marginBottom: 10,
            }}>
            <Text style={styles.contentText}>Gender</Text>
            <Text style={styles.subContentText}>{gender}</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: '100%',
              paddingVertical: 10,
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
              marginBottom: 10,
            }}>
            <Text style={styles.contentText}>Address</Text>
            <Text style={styles.subContentText}>
              {city + ', ' + state + ', ' + country}
            </Text>
          </View>
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
          <CustomButton text="Submit" onPress={onRegisterPressed} />
          {/* <CustomButton
            text="Already have an account? Sign in"
            onPress={onSignInPress}
            type="TERTIARY"
          /> */}
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
  container: {
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  borderStyleBase: {
    width: 50,
    height: 50,
    borderRadius: 10,
    color: 'white',
    fontSize: 30,
  },

  borderStyleHighLighted: {
    backgroundColor: '#202020',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  contentText: {
    color: '#000',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subContentText: {
    color: '#000000',
    textAlign: 'left',
    fontSize: 20,
  },
});

export default SignUpScreen8;
