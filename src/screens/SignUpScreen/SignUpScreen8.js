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
const SignUpScreen8 = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const onRegisterPressed = async data => {
    if (loading) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate('SignUp8');
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
            <Text style={styles.subContentText}>Nickname</Text>
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
            <Text style={styles.subContentText}>Name</Text>
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
            <Text style={styles.subContentText}>Email Address</Text>
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
            <Text style={styles.subContentText}>Email Address</Text>
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
            <Text style={styles.subContentText}>Birthdate</Text>
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
            <Text style={styles.subContentText}>Gender</Text>
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
            <Text style={styles.subContentText}>Address</Text>
          </View>

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
    color: '#c0c0c0',
    textAlign: 'left',
    fontSize: 20,
  },
});

export default SignUpScreen8;
