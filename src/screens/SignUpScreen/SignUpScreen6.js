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
import PhoneInput from 'react-native-phone-number-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
const storagekey_mobile = 'storagekey_mobile';
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const gender = ['Male', 'Female', 'Rather not say'];
const SignUpScreen6 = () => {
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const phoneInput = React.useRef();
  const [formattedValue, setFormattedValue] = React.useState('');
  const [phoneValue, setPhoneValue] = React.useState('');
  const onRegisterPressed = async data => {
    if (loading) {
      return;
    }

    setLoading(true);
    saveData(formattedValue);
    fetchOTP(formattedValue);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const fetchOTP = async mobile => {
    setLoading(true);
    const message = 'Your verification code is 123456';
    try {
      const response = await fetch(
        'https://www.isms.com.my/isms_send_all_id.php?un=sgarcia&pwd=SBGpass123&dstno=' +
          mobile +
          '&msg=' +
          message +
          '&type=1&sendid=DOXCHECK&agreedterm=YES',
        {method: 'POST'},
      )
        .then(res => {
          console.log(res.status);
        })
        .catch(err => {
          console.log(err.message);
        });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const saveData = async mobile => {
    try {
      if (mobile == '') {
        alert('Mobile Number is required.');
        return;
      }
      await AsyncStorage.setItem(storagekey_mobile, mobile);
      console.log('data saved');
      navigation.navigate('SignUp7');
    } catch (e) {
      console.log(e.message);
      console.log('Failed to save the data to the storage');
    }
  };

  React.useEffect(async () => {
    try {
      const mobile = await AsyncStorage.getItem(storagekey_mobile);
      if (mobile !== null) {
        setPhoneValue(mobile);
      }
      console.log(mobile);
    } catch (e) {
      s;
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
          <Text style={styles.title}>Enter your phone number</Text>

          <PhoneInput
            defaultValue={phoneValue}
            ref={phoneInput}
            placeholder="Mobile Number"
            defaultCode="PH"
            layout="first"
            onChangeText={
              value => {
                setPhoneValue(value);
              } //setting the formData to the value input of the textfield
            }
            onChangeFormattedText={text => {
              setFormattedValue(text);
              // setFormData({
              //   ...formData,
              //   mobile_number_formatted: text,
              // });
            }}
            getCallingCode={code => {
              //setPhoneCode(code);
            }}
            containerStyle={{
              backgroundColor: '#FFF',
              borderColor: '#e8e8e8',
              borderWidth: 1,
              borderRadius: 5,
              width: '100%',
            }}
            textContainerStyle={{
              backgroundColor: '#FFF',
              borderRadius: 5,
              borderBottomStartRadius: 1,
              borderTopStartRadius: 1,
              borderColor: '#e8e8e8',
              borderLeftWidth: 1,
            }}
            textInputStyle={{
              fontSize: 16,
              color: '#000',
              padding: 1,
            }}
            codeTextStyle={{
              fontSize: 16,
              color: '#000',
              padding: 4,
              paddingBottom: 5,
            }}
            withDarkTheme={true}
            withShadow
            autoFocus
          />
          <CustomButton text="Next" onPress={handleSubmit(onRegisterPressed)} />
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
});

export default SignUpScreen6;
