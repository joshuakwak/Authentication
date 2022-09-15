import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignInScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import {Auth, Hub} from 'aws-amplify';
import SignUpScreen1 from '../screens/SignUpScreen/SignUpScreen1';
import SignUpScreen2 from '../screens/SignUpScreen/SignUpScreen2';
import SignUpScreen3 from '../screens/SignUpScreen/SignUpScreen3';
import SignUpScreen4 from '../screens/SignUpScreen/SignUpScreen4';
import SignUpScreen5 from '../screens/SignUpScreen/SignUpScreen5';
import SignUpScreen6 from '../screens/SignUpScreen/SignUpScreen6';
import SignUpScreen7 from '../screens/SignUpScreen/SignUpScreen7';
import SignUpScreen8 from '../screens/SignUpScreen/SignUpScreen8';
import Amplify from 'aws-amplify';
import {AmplifyProvider} from '@aws-amplify/ui-react';
import awsconfig from '../aws-exports';
import Login from '../components/Login';
Amplify.configure(awsconfig);
const Stack = createNativeStackNavigator();

// const Navigation = () => {
//   const [user, setUser] = useState(undefined);

//   const checkUser = async () => {
//     try {
//       const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
//       setUser(authUser);
//     } catch (e) {
//       setUser(null);
//     }
//   };

//   useEffect(() => {
//     checkUser();
//   }, []);

//   useEffect(() => {
//     const listener = data => {
//       if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
//         checkUser();
//       }
//     };

//     Hub.listen('auth', listener);
//     return () => Hub.remove('auth', listener);
//   }, []);

//   if (user === undefined) {
//     return (
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <ActivityIndicator size={60} color="purple" />
//       </View>
//     );
//   }
//   return <Login />;
//   // return (

//   //   <AmplifyProvider>
//   //     <Login />
//   //     {/* <NavigationContainer>
//   //       <Stack.Navigator screenOptions={{headerShown: false}}>
//   //         {user ? (
//   //           <Stack.Screen name="Home" component={HomeScreen} />
//   //         ) : (
//   //           <>
//   //             <Stack.Screen name="SignIn" component={SignInScreen} />
//   //             <Stack.Screen name="SignUp1" component={SignUpScreen1} />
//   //             <Stack.Screen name="SignUp2" component={SignUpScreen2} />
//   //             <Stack.Screen name="SignUp3" component={SignUpScreen3} />
//   //             <Stack.Screen name="SignUp4" component={SignUpScreen4} />
//   //             <Stack.Screen name="SignUp5" component={SignUpScreen5} />
//   //             <Stack.Screen name="SignUp6" component={SignUpScreen6} />
//   //             <Stack.Screen name="SignUp7" component={SignUpScreen7} />
//   //             <Stack.Screen name="SignUp8" component={SignUpScreen8} />
//   //             <Stack.Screen
//   //               name="ConfirmEmail"
//   //               component={ConfirmEmailScreen}
//   //             />
//   //             <Stack.Screen
//   //               name="ForgotPassword"
//   //               component={ForgotPasswordScreen}
//   //             />
//   //             <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
//   //           </>
//   //         )}
//   //       </Stack.Navigator>
//   //     </NavigationContainer> */}
//   //   </AmplifyProvider>
//   // );
// };

export default Navigation;
