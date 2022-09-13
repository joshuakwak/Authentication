import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  isPassword,
}) => {
  const [hidePassword, setPasswordVisibility] = React.useState(secureTextEntry);
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              styles.container,
              {borderColor: error ? 'red' : '#e8e8e8'},
            ]}>
            <View style={{flex: 4}}>
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={hidePassword}
              />
            </View>
            {isPassword && (
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setPasswordVisibility(!hidePassword);
                  }}>
                  <View>
                    <Icon
                      style={{color: '#313131'}}
                      name={hidePassword ? 'eye-off' : 'eye'}
                      size={20}
                      color="#fff"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
          {error && (
            <Text style={{color: 'red', alignSelf: 'stretch'}}>
              {error.message || 'Error'}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
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
  input: {},
});

export default CustomInput;
