/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import Navigation from './src/navigation';
import Amplify from 'aws-amplify';
import config from './src/aws-exports';
import {withAuthenticator, AmplifyTheme} from 'aws-amplify-react-native';
Amplify.configure(config);

const App = () => {
  // Auth.signOut();
  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});

const signUpConfig = {
  header: 'My Customized Sign Up',
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 1,
      type: 'string',
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 2,
      type: 'password',
    },
    {
      label: 'Confirm Password',
      key: 'confirm_password',
      required: true,
      displayOrder: 3,
      type: 'password',
    },
    {
      label: 'First Name',
      key: 'given_name',
      required: true,
      displayOrder: 4,
      type: 'string',
    },
    {
      label: 'Middle Name',
      key: 'middle_name',
      required: true,
      displayOrder: 5,
      type: 'string',
    },
    {
      label: 'Last Name',
      key: 'family_name',
      required: true,
      displayOrder: 6,
      type: 'string',
    },
    {
      label: 'Nickname',
      key: 'nickname',
      required: true,
      displayOrder: 7,
      type: 'string',
    },
    {
      label: 'Profile Picture',
      key: 'picture',
      required: true,
      displayOrder: 8,
      type: 'picture',
    },
    {
      label: 'Gender',
      key: 'gender',
      required: true,
      displayOrder: 9,
    },
    {
      label: 'Birthdate',
      key: 'birthdate',
      required: true,
      displayOrder: 10,
    },
    {
      label: 'Address',
      key: 'address',
      required: true,
      displayOrder: 11,
    },
  ],
};

// export default withAuthenticator(App, {signUpConfig});
export default App;
