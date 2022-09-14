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
  BackHandler,
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation, useRoute} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
const storagekey_first_name = 'storagekey_first_name';
const storagekey_middle_name = 'storagekey_middle_name';
const storagekey_last_name = 'storagekey_last_name';
const storagekey_gender = 'storagekey_gender';
const storagekey_birthdate = 'storagekey_birthdate';
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const gender = ['Male', 'Female', 'Rather not say'];
const SignUpScreen2 = () => {
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = React.useState(false);
  const [birthdate, setBirthdate] = React.useState(new Date());
  const [birthdateString, setBirthdateString] = React.useState('');
  const [genderError, setGenderError] = React.useState(false);
  const [birthdateError, setBirthdateError] = React.useState(false);
  const [genderValue, setGenderValue] = React.useState('');
  const [first_name, setFirstName] = React.useState('');
  const [middle_name, setMiddleName] = React.useState('');
  const [last_name, setLastName] = React.useState('');

  const onRegisterPressed = async data => {
    if (loading) {
      return;
    }

    setLoading(true);
    saveData(
      data.first_name ? data.first_name : first_name,
      data.middle_name ? data.middle_name : middle_name,
      data.last_name ? data.last_name : last_name,
      genderValue,
      birthdateString,
    );
    setLoading(false);
  };

  const saveData = async (
    first_name,
    middle_name,
    last_name,
    gender,
    birthdate,
  ) => {
    try {
      if (first_name == '') {
        alert('First Name is required.');
        return;
      }
      if (last_name == '') {
        alert('Last Name is required.');
        return;
      }
      if (!middle_name) {
        middle_name = '';
      }
      if (gender == '') {
        alert('Gender is required.');
        return;
      }
      if (birthdate == '') {
        alert('Birthdate is required.');
        return;
      }
      await AsyncStorage.setItem(storagekey_first_name, first_name);
      await AsyncStorage.setItem(storagekey_middle_name, middle_name);
      await AsyncStorage.setItem(storagekey_last_name, last_name);
      await AsyncStorage.setItem(storagekey_gender, gender);
      await AsyncStorage.setItem(storagekey_birthdate, birthdate);
      console.log('data saved');

      navigation.navigate('SignUp3');
    } catch (e) {
      console.log(e.message);
      console.log('Failed to save the data to the storage');
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

  React.useEffect(async () => {
    try {
      const fname = await AsyncStorage.getItem(storagekey_first_name);
      const mname = await AsyncStorage.getItem(storagekey_middle_name);
      const lname = await AsyncStorage.getItem(storagekey_last_name);
      const gender = await AsyncStorage.getItem(storagekey_gender);
      const bdate = await AsyncStorage.getItem(storagekey_birthdate);
      if (fname !== null) {
        setFirstName(fname);
      }
      if (mname !== null) {
        setMiddleName(mname);
      }
      if (lname !== null) {
        setLastName(lname);
      }
      if (gender !== null) {
        setGenderValue(gender);
      }
      if (bdate !== null) {
        setBirthdateString(bdate);
      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  }, []);

  return (
    <View style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text style={styles.title}>Enter your personal details</Text>

          <CustomInput
            defValue={first_name}
            name="first_name"
            control={control}
            placeholder="First name"
            rules={{
              minLength: {
                value: 3,
                message: 'First Name should be at least 3 characters long',
              },
              maxLength: {
                value: 24,
                message: 'First Name should be max 24 characters long',
              },
            }}
            onChangeText={value => setFirstName(value)}
          />

          <CustomInput
            defValue={middle_name}
            name="middle_name"
            control={control}
            placeholder="Middle name"
            rules={{
              minLength: {
                value: 3,
                message: 'Middle Name should be at least 3 characters long',
              },
              maxLength: {
                value: 24,
                message: 'Middle Name should be max 24 characters long',
              },
            }}
            onChangeText={value => setMiddleName(value)}
          />

          <CustomInput
            defValue={last_name}
            name="last_name"
            control={control}
            placeholder="Last name"
            rules={{
              minLength: {
                value: 3,
                message: 'Last Name should be at least 3 characters long',
              },
              maxLength: {
                value: 24,
                message: 'Last Name should be max 24 characters long',
              },
            }}
            onChangeText={value => setLastName(value)}
          />

          <SelectDropdown
            defaultValue={genderValue}
            defaultButtonText="Gender"
            buttonStyle={{
              borderWidth: 1,
              borderColor: genderError ? 'red' : '#e8e8e8',
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
              setGenderValue(selectedItem);
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
          {genderError && (
            <Text style={{color: 'red', alignSelf: 'stretch'}}>
              {'Gender is required.' || 'Error'}
            </Text>
          )}
          <TouchableOpacity
            onPress={() => {
              setDatePickerOpen(true);
            }}>
            <View
              style={[
                styles.container,
                {borderColor: birthdateError ? 'red' : '#e8e8e8'},
              ]}>
              <View style={{flex: 4}}>
                <TextInput
                  placeholder={'Birthdate'}
                  style={{color: '#000'}}
                  editable={false}
                  value={birthdateString}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <View>
                  <Icon
                    style={{color: '#313131'}}
                    name={'calendar'}
                    size={20}
                    color="#fff"
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <DatePicker
            modal
            mode="date"
            placeholder="Birthdate"
            format="YYYY-MM-DD"
            minimumDate={new Date('1900')}
            maximumDate={new Date()}
            open={datePickerOpen}
            date={birthdate}
            onConfirm={date => {
              setDatePickerOpen(false);
              setBirthdate(date);
              setBirthdateString(Moment(date).format('MMM DD, yyyy'));
            }}
            onCancel={() => {
              setDatePickerOpen(false);
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

export default SignUpScreen2;
