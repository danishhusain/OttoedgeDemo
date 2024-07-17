//DOwn To UP
import React, { useEffect, useRef } from "react";
import {
  Animated,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import HeaderComp from "@components/molecules/HeaderComp";
import ErrorComp from "@components/molecules/ErrorComp";
import Loader from "@components/molecules/Loader";
import useCustomQuery from "@hooks/useCustomQuery";
import { ProductsData } from "@models/HomeData";
import { UnistylesRuntime, useStyles } from "react-native-unistyles";
import { ButtonContainer, ImageContainer, TextContainer, WrapperContainer } from "@components/atoms";
import imagePath from "@constants/imagePath";
import stylesheet from "./styles";
import { moderateScale, scale, width } from "@utils/scaling";

const PostDetails = ({ route }: any): React.JSX.Element => {
  const slideAnim = useRef(new Animated.Value(500)).current; // Initial value for slide-in from the bottom

  const {
    data: posts,
    isLoading,
    isError,
  } = useCustomQuery<ProductsData>("/products", `/${route.params.productId}`);

  const { styles } = useStyles(stylesheet);
  const { theme } = useStyles();
  const isDarkMode = UnistylesRuntime.themeName === "dark";

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  if (isLoading) return <Loader />;
  if (isError) return <ErrorComp />;

  return (
    <WrapperContainer isSafeAreaView={false}>
      <ScrollView
        style={{
          backgroundColor: theme.colors.background,
          overflow: "visible",
        }}
      >
        <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
          <ImageBackground
            resizeMode="stretch"
            source={{ uri: posts?.thumbnail }}
            style={styles.imageStyle}
          >
            <SafeAreaView>
              <HeaderComp />
            </SafeAreaView>
          </ImageBackground>

          <View
            style={[
              styles.containerView,
              { backgroundColor: theme.colors.background },
            ]}
          >
            <View
              style={{
                ...styles.headerLine,
                backgroundColor: theme.colors.opacity50,
              }}
            />

            <View style={styles.rectangleBox}>
              <View style={{ width: width / 2 }}>
                <TextContainer text="FOLLOW_US" style={styles.followUs} />
                <TextContainer
                  isDynamicText
                  text="Over 35k Happy Customers"
                  style={{ color: theme.colors.white }}
                />
              </View>
              <ButtonContainer
                label="FOLLOW"
                style={styles.btnStyle}
                textStyle={styles.btnTextStyle}
              />
            </View>

            <View style={styles.likeCommentView}>
              <View style={styles.flexView}>
                <ImageContainer
                  source={imagePath.icLike}
                  style={{
                    resizeMode: "contain",
                    marginRight: moderateScale(8),
                  }}
                />
                <TextContainer
                  isDynamicText
                  style={{ fontSize: scale(12) }}
                  text="25.3k LIKES"
                />
              </View>
              <View style={{ ...styles.flexView, flex: 0.4 }}>
                <ImageContainer
                  source={imagePath.icComment}
                  style={{
                    resizeMode: "contain",
                    marginRight: moderateScale(8),
                  }}
                />
                <TextContainer
                  isDynamicText
                  style={{ fontSize: scale(12) }}
                  text="2.1k COMMENTS"
                />
              </View>

              <ButtonContainer
                label="ADD_COMMENTS"
                style={{
                  ...styles.btnStyle,
                  backgroundColor: isDarkMode
                    ? theme.colors.white
                    : theme.colors.black,
                  paddingHorizontal: moderateScale(10),
                }}
                textStyle={{
                  ...styles.btnTextStyle,
                  color: isDarkMode ? theme.colors.black : theme.colors.white,
                  fontSize: scale(10),
                }}
              />
            </View>

            <View
              style={{
                ...styles.headerLine,
                backgroundColor: theme.colors.grey,
                width: "100%",
                height: moderateScale(1),
              }}
            />

            <TextContainer
              isDynamicText
              style={{ color: theme.colors.blue }}
              text={posts?.brand || ""}
            />
            <TextContainer
              isDynamicText
              style={styles.headerTextStyle}
              text={posts?.title || ""}
            />
            <TextContainer
              isDynamicText
              style={styles.descTextStyle}
              text={posts?.description || ""}
            />
          </View>
        </Animated.View>
      </ScrollView>
    </WrapperContainer>
  );
};
export default PostDetails;










////////Zoom
// import React, { useEffect, useRef } from "react";
// import {
//   Animated,
//   ImageBackground,
//   SafeAreaView,
//   ScrollView,
//   View,
// } from "react-native";
// import HeaderComp from "@components/molecules/HeaderComp";
// import ErrorComp from "@components/molecules/ErrorComp";
// import Loader from "@components/molecules/Loader";
// import useCustomQuery from "@hooks/useCustomQuery";
// import { ProductsData } from "@models/HomeData";
// import { UnistylesRuntime, useStyles } from "react-native-unistyles";
// import { ButtonContainer, ImageContainer, TextContainer, WrapperContainer } from "@components/atoms";
// import imagePath from "@constants/imagePath";
// import stylesheet from "./styles";
// import { moderateScale, scale, width } from "@utils/scaling";

// const PostDetails = ({ route }: any): React.JSX.Element => {
//   const scaleAnim = useRef(new Animated.Value(0)).current; // Initial value for scale

//   const {
//     data: posts,
//     isLoading,
//     isError,
//   } = useCustomQuery<ProductsData>("/products", `/${route.params.productId}`);

//   const { styles } = useStyles(stylesheet);
//   const { theme } = useStyles();
//   const isDarkMode = UnistylesRuntime.themeName === "dark";

//   useEffect(() => {
//     Animated.timing(scaleAnim, {
//       toValue: 1,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();
//   }, [scaleAnim]);

//   const scaleInterpolate = scaleAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0.8, 1],
//   });

//   if (isLoading) return <Loader />;
//   if (isError) return <ErrorComp />;

//   return (
//     <WrapperContainer isSafeAreaView={false}>
//       <ScrollView
//         style={{
//           backgroundColor: theme.colors.background,
//           overflow: "visible",
//         }}
//       >
//         <Animated.View style={{ transform: [{ scale: scaleInterpolate }] }}>
//           <ImageBackground
//             resizeMode="stretch"
//             source={{ uri: posts?.thumbnail }}
//             style={styles.imageStyle}
//           >
//             <SafeAreaView>
//               <HeaderComp />
//             </SafeAreaView>
//           </ImageBackground>

//           <View
//             style={[
//               styles.containerView,
//               { backgroundColor: theme.colors.background },
//             ]}
//           >
//             <View
//               style={{
//                 ...styles.headerLine,
//                 backgroundColor: theme.colors.opacity50,
//               }}
//             />

//             <View style={styles.rectangleBox}>
//               <View style={{ width: width / 2 }}>
//                 <TextContainer text="FOLLOW_US" style={styles.followUs} />
//                 <TextContainer
//                   isDynamicText
//                   text="Over 35k Happy Customers"
//                   style={{ color: theme.colors.white }}
//                 />
//               </View>
//               <ButtonContainer
//                 label="FOLLOW"
//                 style={styles.btnStyle}
//                 textStyle={styles.btnTextStyle}
//               />
//             </View>

//             <View style={styles.likeCommentView}>
//               <View style={styles.flexView}>
//                 <ImageContainer
//                   source={imagePath.icLike}
//                   style={{
//                     resizeMode: "contain",
//                     marginRight: moderateScale(8),
//                   }}
//                 />
//                 <TextContainer
//                   isDynamicText
//                   style={{ fontSize: scale(12) }}
//                   text="25.3k LIKES"
//                 />
//               </View>
//               <View style={{ ...styles.flexView, flex: 0.4 }}>
//                 <ImageContainer
//                   source={imagePath.icComment}
//                   style={{
//                     resizeMode: "contain",
//                     marginRight: moderateScale(8),
//                   }}
//                 />
//                 <TextContainer
//                   isDynamicText
//                   style={{ fontSize: scale(12) }}
//                   text="2.1k COMMENTS"
//                 />
//               </View>

//               <ButtonContainer
//                 label="ADD_COMMENTS"
//                 style={{
//                   ...styles.btnStyle,
//                   backgroundColor: isDarkMode
//                     ? theme.colors.white
//                     : theme.colors.black,
//                   paddingHorizontal: moderateScale(10),
//                 }}
//                 textStyle={{
//                   ...styles.btnTextStyle,
//                   color: isDarkMode ? theme.colors.black : theme.colors.white,
//                   fontSize: scale(10),
//                 }}
//               />
//             </View>

//             <View
//               style={{
//                 ...styles.headerLine,
//                 backgroundColor: theme.colors.grey,
//                 width: "100%",
//                 height: moderateScale(1),
//               }}
//             />

//             <TextContainer
//               isDynamicText
//               style={{ color: theme.colors.blue }}
//               text={posts?.brand || ""}
//             />
//             <TextContainer
//               isDynamicText
//               style={styles.headerTextStyle}
//               text={posts?.title || ""}
//             />
//             <TextContainer
//               isDynamicText
//               style={styles.descTextStyle}
//               text={posts?.description || ""}
//             />
//           </View>
//         </Animated.View>
//       </ScrollView>
//     </WrapperContainer>
//   );
// };
// export default PostDetails;
