import React from 'react';
import {StyleSheet, Image, Text, View, ImageBackground} from 'react-native';

export default function Login() {
  return (
    <View style={styles.Login}>
      <View style={styles.Frame426}>
        <Text style={styles.Txt268}>Sign In</Text>
        <View style={styles.Textfield}>
          <View style={styles.Inputgroup}>
            <View style={styles.Input}>
              <Text style={styles.Txt781}>Username</Text>
            </View>
          </View>
        </View>
        <View style={styles.Textfield}>
          <View style={styles.Inputgroup1}>
            <View style={styles.Input}>
              <Text style={styles.Txt781}>Password</Text>
            </View>
          </View>
        </View>
        <View style={styles.Button}>
          <Text style={styles.Txt763}>Forgot Password?</Text>
        </View>
        <View style={styles.Button1}>
          <Text style={styles.Txt676}>Login</Text>
        </View>
        <View style={styles.Frame428}>
          <Text style={styles.Txt315}>or</Text>
          <Image
            style={styles.Frame}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/62wl68amhlh-1%3A276?alt=media&token=d2f9899d-64a9-45ce-b13c-7f2cb7c053e5',
            }}
          />
          <Text style={styles.Txt181}>Login using fingerprint</Text>
        </View>
        <View style={styles.Frame427}>
          <Text style={styles.Txt618}>Don’t have an account?</Text>
          <View style={styles.Button2}>
            <Text style={styles.Txt606}>Sign Up</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Login: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 43,
    paddingBottom: 62,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 15,
    backgroundColor: 'rgba(28,28,28,1)',
    width: 428,
    height: 926,
  },
  Frame426: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 114,
    paddingBottom: 27.7,
    paddingLeft: 0,
    paddingRight: 0,
  },
  Txt268: {
    fontSize: 36,
    fontFamily: 'Inter, sans-serif',
    fontWeight: '700',
    lineHeight: 54,
    color: 'rgba(255, 255, 255, 1)',
    textAlign: 'center',
    justifyContent: 'center',
    width: 347,
    marginBottom: 42,
    textTransform: 'uppercase',
  },
  Textfield: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 29,
    width: 346,
  },
  Inputgroup: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 10,
    width: 346,
  },
  Input: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgba(112,112,112,1)',
    width: 346,
  },
  Txt781: {
    fontSize: 20,
    fontFamily: 'Inter, sans-serif',
    fontWeight: '400',
    lineHeight: 30,
    color: 'rgba(128,128,128,1)',
    width: 315,
  },

  Textfield: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 29,
    width: 346,
  },
  Inputgroup1: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 346,
  },
  Input: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgba(112,112,112,1)',
    width: 346,
  },
  Txt781: {
    fontSize: 20,
    fontFamily: 'Inter, sans-serif',
    fontWeight: '400',
    lineHeight: 30,
    color: 'rgba(128,128,128,1)',
    width: 315,
  },

  Button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 29,
    borderRadius: 8,
    width: 346,
    height: 30,
  },
  Txt763: {
    fontSize: 20,
    fontFamily: 'Inter, sans-serif',
    fontWeight: '700',
    lineHeight: 30,
    color: 'rgba(173,130,0,1)',
    textAlign: 'right',
    justifyContent: 'flex-end',
    width: 327,
    height: 31,
  },

  Button1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 14,
    paddingRight: 14,
    marginBottom: 29,
    borderRadius: 20,
    backgroundColor: 'rgba(83,26,137,1)',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgba(0,0,0,0)',
    width: 346,
  },
  Txt676: {
    fontSize: 20,
    fontFamily: 'Inter, sans-serif',
    fontWeight: '700',
    lineHeight: 30,
    color: 'rgba(255, 255, 255, 1)',
  },

  Frame428: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 10,
    marginBottom: 59,
    width: 346,
  },
  Txt315: {
    fontSize: 20,
    fontFamily: 'Inter, sans-serif',
    fontWeight: '400',
    lineHeight: 30,
    color: 'rgba(91,89,89,1)',
    marginBottom: 29,
  },
  Frame: {
    width: 86.7,
    height: 86.7,
    marginBottom: 29,
  },
  Txt181: {
    fontSize: 20,
    fontFamily: 'Inter, sans-serif',
    fontWeight: '400',
    lineHeight: 30,
    color: 'rgba(91,89,89,1)',
  },

  Frame427: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 346,
  },
  Txt618: {
    fontSize: 20,
    fontFamily: 'Inter, sans-serif',
    fontWeight: '400',
    lineHeight: 30,
    color: 'rgba(255, 255, 255, 1)',
  },
  Button2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 8,
  },
  Txt606: {
    fontSize: 20,
    fontFamily: 'Inter, sans-serif',
    fontWeight: '700',
    lineHeight: 30,
    color: 'rgba(173,130,0,1)',
  },
});
