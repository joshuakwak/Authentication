import React from 'react';
import {View, Text, Alert} from 'react-native';
import {Auth} from 'aws-amplify';

const index = () => {
  const signOut = () => {
    Alert.alert(
      //This is title
      'Sign out?',
      //This is body text
      'Are you sure you want to sign out?',
      [
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => Auth.signOut()},
      ],
      {cancelable: false},
      //on clicking out side, Alert will not dismiss
    );
  };

  return (
    <View style={{flex: 1}}>
      <Text style={{fontSize: 24, alignSelf: 'center'}}>Home, sweet home</Text>
      <Text
        onPress={signOut}
        style={{
          width: '100%',
          textAlign: 'center',
          color: 'red',
          marginTop: 'auto',
          marginVertical: 20,
          fontSize: 20,
        }}>
        Sign out
      </Text>
    </View>
  );
};

export default index;
