import React, {useEffect, useState} from 'react';
import {View, Text, Alert, Image} from 'react-native';
import {Auth, Storage} from 'aws-amplify';
const index = () => {
  const [user, setUser] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [file, setFile] = useState(undefined);
  const [fileName, setFileName] = useState('');
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

  useEffect(async () => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        console.log('username = ' + user.attributes.given_name);
        setUser(user.attributes.given_name);
      })
      .catch(err => console.log(err));
    Storage.list('') // for listing ALL files without prefix, pass '' instead
      .then(result => console.log(result))
      .catch(err => console.log(err));
    await Storage.get('avatar.png')
      .then(res => {
        console.log(res);
        setFileUrl(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 24, alignSelf: 'center', fontWeight: 'bold'}}>
        Hello, {user}
      </Text>
      <Image
        source={{uri: fileUrl}}
        style={{width: 100, height: 100, borderWidth: 1, borderRadius: 200}}
      />
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
