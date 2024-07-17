import { TextContainer, WrapperContainer } from "@components/atoms";
import CustomBanner from "@components/atoms/CustomBanner";
import ErrorComp from "@components/molecules/ErrorComp";
import HomeCategoryList from "@components/molecules/HomeCategoryList";
import HomeHeader from "@components/molecules/HomeHeader";
import HomeListHeader from "@components/molecules/HomeListHeader";
import HomeListItems from "@components/molecules/HomeListItems";
import ModalSheet, { ModalSheetRef } from "@components/molecules/ModalSheet";
import useCustomQuery from "@hooks/useCustomQuery";
import { HomeData } from "@models/HomeData";
import { HomeStackParamList } from "@navigations/MainStack";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootState } from "@redux/store";
import { moderateScale, scale } from "@utils/scaling";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { ActivityIndicator, FlatList, ScrollView, View, BackHandler, Alert } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { useSelector } from "react-redux";
import { services } from "src/db/db";

const Home = (): React.JSX.Element => {
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
  const modalSheetRef = useRef<ModalSheetRef>(null);
  const { userData, isFirstTime } = useSelector((state: RootState) => state.auth);
  const { styles } = useStyles(stylesheet);
  const {
    data: posts,
    isLoading,
    isError,
  } = useCustomQuery<HomeData | any>("/products", "?limit=150");




  useEffect(() => {
    // Add the beforeRemove event listener
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      // Check the action type
      if (e.data.action.type === 'GO_BACK') {
        // Prevent the default behavior of leaving the screen
        e.preventDefault();

        // Show a confirmation dialog
        Alert.alert(
          'Are you sure?',
          'Do you want to exit the app?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => { },
            },
            {
              text: 'OK',
              style: 'destructive',
              // Exit the app
              onPress: () => BackHandler.exitApp(),
            },
          ]
        );
      }
    });

    // Return the unsubscribe function to clean up
    return unsubscribe;
  }, [navigation]);

  const memoizedPosts = useMemo(() => {
    return posts;
  }, [posts]);

  const handleToggleSheet = useCallback(() => {
    if (modalSheetRef.current) {
      modalSheetRef.current.toggleSheet();
    }
  }, []);

  return (
    <WrapperContainer>
      <View style={{ marginHorizontal: moderateScale(20) }}>
        <HomeHeader title={userData?.firstName || 'Danish'} onPress={handleToggleSheet} />
      </View>
      <ScrollView contentContainerStyle={{}}>
        <HomeListHeader />
        <FlatList
          data={services || []}
          renderItem={(props) => (
            <HomeCategoryList {...props} navigation={navigation} />
          )}
          keyExtractor={(item, index) => String(item?.id || index)}
          ListEmptyComponent={
            isLoading ? <ActivityIndicator /> : isError ? <ErrorComp /> : <></>
          }
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        <View style={{
          height: 180,
        }}>
          <TextContainer
            isDynamicText
            text="Hi News"
            style={styles.textStyle}
          />

          <CustomBanner />
        </View>

        <FlatList
          data={memoizedPosts?.products || []}
          renderItem={(props) => (
            <HomeListItems {...props} navigation={navigation} />
          )}
          ItemSeparatorComponent={() => (
            <View style={{ height: moderateScale(20) }} />
          )}
          keyExtractor={(item, index) => String(item?.id || index)}
          ListEmptyComponent={
            isLoading ? <ActivityIndicator /> : isError ? <ErrorComp /> : <></>
          }
          scrollEnabled={false}
        />
      </ScrollView>

      {/* Bottom Modal Sheet */}
      <ModalSheet ref={modalSheetRef} />
    </WrapperContainer>
  );
};
const stylesheet = createStyleSheet((theme) => ({
  textStyle: {
    fontSize: scale(14),
    color: theme.colors.black,
    fontWeight: 'bold',
    marginLeft: moderateScale(8)
  },
}));



export default Home;






