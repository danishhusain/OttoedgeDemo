import { ButtonContainer, TextContainer } from '@components/atoms';
import { HomeStackParamList } from '@navigations/MainStack';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, StatusBar, Animated } from 'react-native';

const Onboarding = () => {
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();

  const slideAnim = useRef(new Animated.Value(-500)).current; // Initial value for slide-in from top
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for fade-in
  const bounceAnim = useRef(new Animated.Value(1)).current; // Initial value for button bounce


  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  useEffect(() => {
    Animated.spring(bounceAnim, {
      toValue: 1.2,
      friction: 2,
      useNativeDriver: true,
    }).start();
  }, [bounceAnim]);

  return (
    <>
      <StatusBar backgroundColor={'#6c0cf5'} barStyle={'light-content'} />
      <View style={styles.container}>
        <Animated.View style={[styles.logoContainer, { transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.logo}>
            <TextContainer
              text='hi'
              style={styles.logoText}
            />
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim }}>
          <TextContainer
            text='Have a problem that you can solve?'
            style={styles.title}
          />
          <TextContainer
            text="Don't worry, let's get started."
            style={styles.subtitle}
          />
        </Animated.View>

        <Animated.View style={[styles.buttonWrapper, { transform: [{ scale: bounceAnim }] }]}>
          <ButtonContainer
            label='Get Started'
            style={styles.button}
            textStyle={styles.buttonText}
            onPress={() => navigation.navigate("Login")}
          />
        </Animated.View>
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6c0cf5',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    paddingHorizontal: 30
  },
  logoText: {
    fontSize: 40,
    color: '#6200ea', // Purple text color
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
    marginHorizontal: 20,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 40,
    width: '80%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '90%',
  },
  buttonText: {
    color: '#6200ea', // Purple text color
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Onboarding;








////////////////
// import { ButtonContainer, TextContainer } from '@components/atoms';
// import { HomeStackParamList } from '@navigations/MainStack';
// import { NavigationProp, useNavigation } from '@react-navigation/native';
// import React, { useEffect, useRef } from 'react';
// import { View, StyleSheet, StatusBar, Animated } from 'react-native';

// const Onboarding = () => {
//   const navigation = useNavigation<NavigationProp<HomeStackParamList>>();

//   const slideAnim = useRef(new Animated.Value(-500)).current; // Initial value for slide-in from top
//   const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for fade-in
//   const bounceAnim = useRef(new Animated.Value(1)).current; // Initial value for button bounce

//   useEffect(() => {
//     Animated.timing(slideAnim, {
//       toValue: 0,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();
//   }, [slideAnim]);

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();
//   }, [fadeAnim]);

//   useEffect(() => {
//     Animated.spring(bounceAnim, {
//       toValue: 1.2,
//       friction: 2,
//       useNativeDriver: true,
//     }).start();
//   }, [bounceAnim]);

//   return (
//     <>
//       <StatusBar backgroundColor={'#6c0cf5'} barStyle={'light-content'} />
//       <View style={styles.container}>
//         <Animated.View style={[styles.logoContainer, { transform: [{ translateY: slideAnim }] }]}>
//           <View style={styles.logo}>
//             <TextContainer
//               text='hi'
//               style={styles.logoText}
//             />
//           </View>
//         </Animated.View>

//         <Animated.View style={{ opacity: fadeAnim }}>
//           <TextContainer
//             text='Have a problem that you can solve?'
//             style={styles.title}
//           />
//           <TextContainer
//             text="Don't worry, let's get started."
//             style={styles.subtitle}
//           />
//         </Animated.View>

//         <Animated.View style={[styles.buttonWrapper, { transform: [{ scale: bounceAnim }] }]}>
//           <ButtonContainer
//             label='Get Started'
//             style={styles.button}
//             textStyle={styles.buttonText}
//             onPress={() => navigation.navigate("Login")}
//           />
//         </Animated.View>
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#6c0cf5',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 20
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   logo: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//     paddingHorizontal: 30
//   },
//   logoText: {
//     fontSize: 40,
//     color: '#6200ea', // Purple text color
//     fontWeight: 'bold',
//   },
//   title: {
//     fontSize: 24,
//     color: 'white',
//     textAlign: 'center',
//     marginHorizontal: 20,
//   },
//   subtitle: {
//     fontSize: 18,
//     color: 'white',
//     textAlign: 'center',
//     marginBottom: 40,
//     marginHorizontal: 20,
//   },
//   buttonWrapper: {
//     position: 'absolute',
//     bottom: 40,
//     width: '100%',
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: 'white',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 8,
//     width: '90%',
//   },
//   buttonText: {
//     color: '#6200ea', // Purple text color
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default Onboarding;

