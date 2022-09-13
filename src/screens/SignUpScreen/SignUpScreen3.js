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
const SignUpScreen3 = () => {
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
      navigation.navigate('SignUp4');
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
          <Text style={styles.title}>Enter your address</Text>
          <SelectDropdown
            defaultButtonText="Country"
            buttonStyle={{
              borderWidth: 1,
              borderColor: '#e8e8e8',
              backgroundColor: 'white',
              borderRadius: 5,
              marginVertical: 5,
              width: '100%',
              flex: 1,
              justifyContent: 'flex-start',
            }}
            buttonTextStyle={{
              fontSize: 12,
              textAlign: 'left',
              textAlignVertical: 'center',
              color: 'gray',
            }}
            data={gender}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />
          <SelectDropdown
            defaultButtonText="State"
            buttonStyle={{
              borderWidth: 1,
              borderColor: '#e8e8e8',
              backgroundColor: 'white',
              borderRadius: 5,
              marginVertical: 5,
              width: '100%',
              flex: 1,
              justifyContent: 'flex-start',
            }}
            buttonTextStyle={{
              fontSize: 12,
              textAlign: 'left',
              textAlignVertical: 'center',
              color: 'gray',
            }}
            data={gender}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />
          <SelectDropdown
            defaultButtonText="City"
            buttonStyle={{
              borderWidth: 1,
              borderColor: '#e8e8e8',
              backgroundColor: 'white',
              borderRadius: 5,
              marginVertical: 5,
              width: '100%',
              flex: 1,
              justifyContent: 'flex-start',
            }}
            buttonTextStyle={{
              fontSize: 12,
              textAlign: 'left',
              textAlignVertical: 'center',
              color: 'gray',
            }}
            data={gender}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
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

export default SignUpScreen3;
