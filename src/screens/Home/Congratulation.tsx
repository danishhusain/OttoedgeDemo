// import { ButtonContainer, TextContainer } from '@components/atoms';
// import { HomeStackParamList } from '@navigations/MainStack';
// import { NavigationProp, useNavigation } from '@react-navigation/native';
// import { useDispatch } from '@redux/hooks';
// import { changeFirstTime } from '@redux/reducers/auth';
// import React from 'react';
// import { View, Image, StyleSheet } from 'react-native';

// const Congratulation = () => {
//     const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
//     const dispatch = useDispatch();


//     return (
//         <View style={styles.container}>
//             <Image
//                 source={{ uri: 'https://img.freepik.com/free-vector/welcome-concept-illustration_114360-27447.jpg?t=st=1721213058~exp=1721216658~hmac=700523195cc2eab448abfaa0ab78a6f1c21c643d7998f52292a9a0e58cb86c33&w=740' }}
//                 style={styles.image}
//                 resizeMode='center'
//             />
//             <View style={styles.textContainer}>
//                 <TextContainer
//                     text={`Welcome Smitty`}
//                     style={styles.welcomeText}
//                 />
//                 <TextContainer
//                     text={` Have some problem today?\n Don't worry, now you are part of Hi Service. Let's us help you.`}
//                     style={styles.subtitle}
//                 />
//             </View>
//             <ButtonContainer
//                 label='Back to Home'
//                 style={styles.button}
//                 textStyle={styles.buttonText}
//                 onPress={() => {
//                     navigation.navigate("Home"),
//                         dispatch(changeFirstTime(false))
//                 }}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     image: {
//         width: '90%', // Adjust as needed
//         height: 200, // Adjust as needed
//         marginBottom: 40,
//         marginTop: 200
//     },
//     textContainer: {
//         alignItems: 'center',
//         marginBottom: 40,
//     },
//     welcomeText: {
//         fontSize: 24,
//         color: '#000',
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     subtitle: {
//         fontSize: 16,
//         color: '#999',
//         textAlign: 'center',
//         paddingHorizontal: 20,
//         alignSelf: 'center'


//     },
//     button: {
//         backgroundColor: '#6200ea', // Purple color
//         paddingVertical: 15,
//         paddingHorizontal: 30,
//         borderRadius: 8,
//         width: '85%',
//         alignItems: 'center',
//         marginTop: 'auto',
//         marginBottom: 40,
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
// });

// export default Congratulation;







////////////
import { ButtonContainer, TextContainer } from '@components/atoms';
import { HomeStackParamList } from '@navigations/MainStack';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch } from '@redux/hooks';
import { changeFirstTime } from '@redux/reducers/auth';
import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

const Congratulation = () => {
    const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
    const dispatch = useDispatch();

    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity
    const bounceAnim = useRef(new Animated.Value(1)).current; // Initial value for button bounce

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
        <View style={styles.container}>
            <Animated.Image
                source={{ uri: 'https://img.freepik.com/free-vector/welcome-concept-illustration_114360-27447.jpg?t=st=1721213058~exp=1721216658~hmac=700523195cc2eab448abfaa0ab78a6f1c21c643d7998f52292a9a0e58cb86c33&w=740' }}
                style={[styles.image, { opacity: fadeAnim }]}
                resizeMode='center'
            />
            <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
                <TextContainer
                    text={`Welcome Smitty`}
                    style={styles.welcomeText}
                />
                <TextContainer
                    text={` Have some problem today?\n Don't worry, now you are part of Hi Service. Let's us help you.`}
                    style={styles.subtitle}
                />
            </Animated.View>
            <Animated.View style={[styles.buttonWrapper, { transform: [{ scale: bounceAnim }] }]}>
                <ButtonContainer
                    label='Back to Home'
                    style={styles.button}
                    textStyle={styles.buttonText}
                    onPress={() => {
                        navigation.navigate("Home"),
                            dispatch(changeFirstTime(false))
                    }}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '90%', // Adjust as needed
        height: 200, // Adjust as needed
        marginBottom: 40,
        marginTop: 200
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    welcomeText: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        paddingHorizontal: 20,
        alignSelf: 'center'
    },
    buttonWrapper: {
        marginTop: 'auto',
        marginBottom: 40,
        width: '75%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#6200ea', // Purple color
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Congratulation;
