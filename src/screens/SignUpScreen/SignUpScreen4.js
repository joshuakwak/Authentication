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
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const gender = ['Male', 'Female', 'Rather not say'];
const SignUpScreen4 = () => {
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = React.useState(false);
  const [birthdate, setBirthdate] = React.useState(new Date());
  const [birthdateString, setBirthdateString] = React.useState('');
  const [genderError, setGenderError] = React.useState(false);
  const [birthdateError, setBirthdateError] = React.useState(false);

  const onRegisterPressed = async data => {
    if (loading) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate('SignUp5');
    }, 1000);
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
          <Text style={styles.title}>Enter your nickname</Text>
          <CustomInput
            name="nickname"
            control={control}
            placeholder="Nickname"
            rules={{
              required: 'Nickname is required',
              minLength: {
                value: 3,
                message: 'Nickname should be at least 3 characters long',
              },
            }}
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

export default SignUpScreen4;
