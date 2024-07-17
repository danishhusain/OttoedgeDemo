import { ButtonContainer, TextContainer } from '@components/atoms';
import RemoteImage from '@components/atoms/RemoteImage';
import { CustomTextInput } from '@components/molecules';
import { AuthStackParamList } from '@navigations/AuthStack';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { login } from '@redux/actions/auth';
import validate from '@utils/validations';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const LoginScreen = () => {
  const [username, setUsername] = useState<string>("emilys");
  const [password, setPassword] = useState<string>("emilyspass");
  const { isLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onLogin = async () => {
    let isValid = validate({
      name: username,
      password,
    });

    if (isValid == true) {
      let res = await dispatch(login({ username, password, deviceType: Platform.OS }))
      if (res.meta.requestStatus == "rejected") {
        //@ts-ignore
        alert(res.payload.error);
      }
    } else {
      //@ts-ignore
      alert(isValid);
    }
  };

  return (
    <>
      <StatusBar backgroundColor={'#f3e8ff'} barStyle={'dark-content'} />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Hi Fix</Text>
        </View>
        <View style={styles.formContainer}>
          <TextContainer
            text={`Here To Get \n Welcome!`}
            style={styles.title} />

          <CustomTextInput
            value={username}
            placeholder="Phone Number or Email"
            style={styles.input}
            onChangeText={setUsername}
          />
          <CustomTextInput
            value={password}
            placeholder="Password"
            style={styles.input}
            keyboardType="email-address"
            onChangeText={setPassword}
          />


          <ButtonContainer
            label='Log in'
            style={styles.button}
            textStyle={styles.buttonText}
            onPress={() => onLogin()}
            isLoading={isLoading}

          />
          <TextContainer
            text='Or Sign in with'
            style={styles.orText}
          />
          <View style={styles.socialContainer}>

            <RemoteImage
              source={{ uri: 'https://img.freepik.com/premium-vector/google-logo-icon-set-google-icon-searching-icons-vector_981536-453.jpg?w=740' }}
              style={styles.socialIcon}
            />
            <RemoteImage
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png' }}
              style={styles.socialIcon}
            />
            <RemoteImage
              source={{ uri: 'https://img.freepik.com/premium-vector/new-twitter-x-logo-vector-twitter-x-sign-vector_952796-6.jpg?w=740' }}
              style={styles.socialIcon}
            />
          </View>
        </View>
      </View>
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e8ff', // Light purple background
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  headerText: {
    fontSize: 18,
    color: '#6200ea', // Purple color
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    alignItems: 'baseline',
    height: '85%',
    justifyContent: 'center',
    gap: 32,
    overflow: 'hidden'

  },
  title: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 8,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6200ea', // Purple color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
});

export default LoginScreen;
