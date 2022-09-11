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
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import Amplify, {Auth} from 'aws-amplify';
const NewPasswordScreen = () => {
  const route = useRoute();
  const {control, handleSubmit, watch} = useForm({
    defaultValues: {username: route.params.username},
  });
  const username = watch('username');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const onSubmitPressed = async data => {
    if (loading) {
      return;
    }

    setLoading(true);

    const response = await Auth.forgotPasswordSubmit(
      data.username,
      data.code,
      data.password,
    )
      .then(res => {
        Alert.alert(
          //This is title
          'Success',
          //This is body text
          'Your password has been changed successfully.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('SignIn'),
            },
          ],
          {cancelable: false},
        );
      })
      .catch(error => {
        Alert.alert('Oops...', error.message);
      });

    setLoading(false);
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <Text style={styles.title}>Reset your password</Text>

          <CustomInput
            placeholder="Username"
            name="username"
            control={control}
            rules={{required: 'Username is required'}}
          />

          <CustomInput
            placeholder="Code"
            name="code"
            control={control}
            rules={{required: 'Code is required'}}
          />

          <CustomInput
            placeholder="Enter your new password"
            name="password"
            control={control}
            secureTextEntry
            rules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password should be at least 8 characters long.',
              },
            }}
          />

          <CustomButton text="Submit" onPress={handleSubmit(onSubmitPressed)} />

          <CustomButton
            text="Back to Sign in"
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

export default NewPasswordScreen;
