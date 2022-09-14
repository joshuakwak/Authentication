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
import {useNavigation, useRoute} from '@react-navigation/core';
import {set, useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
const storagekey_country = 'storagekey_country';
const storagekey_state = 'storagekey_state';
const storagekey_city = 'storagekey_city';
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const gender = ['Male', 'Female', 'Rather not say'];
const SignUpScreen3 = () => {
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const navigation = useNavigation();
  const route = useRoute();
  const [countries, setCountries] = React.useState([]);
  const [states, setStates] = React.useState([]);
  const [cities, setCities] = React.useState([]);
  const [selectedCountry, setSelectedCountry] = React.useState('');
  const [selectedState, setSelectedState] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [imageUri, setImageUri] = React.useState('');
  const fetchCountries = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'http://184.73.77.248:82/api/XDApp/GetCountry',
      );
      const json = await response.json();
      const country_names = [];
      json.map(item => {
        console.log(item.country_name);
        country_names.push(item.country_name);
      });
      const PH = country_names.indexOf('Philippines');
      country_names.unshift(country_names.splice(PH, 1)[0]);
      setCountries(country_names);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const fetchStates = async country => {
    setLoading(true);
    try {
      console.log('fetch states');
      const response = await fetch(
        'http://184.73.77.248:82/api/XDApp/GetState?country=' + country,
        {method: 'POST'},
      );
      const json = await response.json();
      const state_names = [];
      json.map(item => {
        console.log(item.state_name);
        state_names.push(item.state_name);
      });
      state_names.sort();
      setStates(state_names);
      console.log(state_names);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const fetchCities = async state => {
    setLoading(true);
    try {
      const response = await fetch(
        'http://184.73.77.248:82/api/XDApp/GetCities?state=' + state,
        {method: 'POST'},
      );
      const json = await response.json();
      const city_names = [];
      json.map(item => {
        console.log(item.city_name);
        city_names.push(item.city_name);
      });
      city_names.sort();
      setCities(city_names);
      console.log(cities);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const saveData = async (country, state, city) => {
    try {
      if (country == '') {
        alert('Country is required.');
        return;
      }
      if (state == '') {
        alert('State is required.');
        return;
      }
      if (city == '') {
        alert('City is required.');
        return;
      }
      await AsyncStorage.setItem(storagekey_country, country);
      await AsyncStorage.setItem(storagekey_state, state);
      await AsyncStorage.setItem(storagekey_city, city);
      console.log('data saved');

      navigation.navigate('SignUp4');
    } catch (e) {
      console.log(e.message());
      console.log('Failed to save the data to the storage');
    }
  };

  React.useEffect(async () => {
    // try {
    //   const country = await AsyncStorage.getItem(storagekey_country);
    //   const state = await AsyncStorage.getItem(storagekey_state);
    //   const city = await AsyncStorage.getItem(storagekey_city);
    //   if (country !== null) {
    //     fetchCountries();
    //     setSelectedCountry(country);
    //   }
    //   if (state !== null) {
    //     fetchStates(selectedCountry);
    //     setSelectedState(state);
    //   }
    //   if (city !== null) {
    //     fetchCities(selectedState);
    //     setSelectedCity(city);
    //   }
    // } catch (e) {
    //   alert('Failed to fetch the input from storage');
    // }
    fetchCountries();
  }, []);

  const onRegisterPressed = async data => {
    if (loading) {
      return;
    }

    setLoading(true);
    saveData(selectedCountry, selectedState, selectedCity);
    setTimeout(() => {
      setLoading(false);
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
            defaultButtonText={
              selectedCountry ? selectedCountry : 'Select Country'
            }
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
            data={countries}
            onSelect={(selectedItem, index) => {
              setSelectedCountry(selectedItem);
              fetchStates(selectedItem);
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
            defaultValue={states[states.indexOf(selectedState)]}
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
            data={states}
            onSelect={(selectedItem, index) => {
              setSelectedState(selectedItem);
              fetchCities(selectedItem);
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
            defaultValue={cities[cities.indexOf(selectedCity)]}
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
            data={cities}
            onSelect={(selectedItem, index) => {
              setSelectedCity(selectedItem);
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
