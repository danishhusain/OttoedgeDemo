import { TextContainer } from "@components/atoms";
import RemoteImage from "@components/atoms/RemoteImage";
import { ProductsData } from "@models/HomeData";
import { HomeStackParamList } from "@navigations/MainStack";
import { NavigationProp } from "@react-navigation/native";
import { moderateScale, scale, } from "@utils/scaling";
import React, { memo } from "react";
import { Pressable, View, Text } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface HomeListItemsProps {
  item: ProductsData;
  navigation: NavigationProp<HomeStackParamList>;
}

const HomeCategoryList: React.FC<HomeListItemsProps> = memo(
  ({ item, navigation }) => {
    const { styles } = useStyles(stylesheet);
    return (
      <Pressable
        style={[styles.container, {
          backgroundColor: item?.id == '1' ? '#6c0cf5' : '#FFF',
        }]}
        onPress={() =>
          navigation.navigate("PostDetails", { productId: item.id })
        }
      >
        <RemoteImage
          source={{ uri: item.thumbnail }}
          style={styles.profileImage}
        />
        <TextContainer
          isDynamicText
          text={item.name}
          style={[styles.title, { color: item?.id == '1' ? '#fff' : '#6c0cf5' }]}
          numberOfLines={2}
        />
      </Pressable>
    );
  }
);

const stylesheet = createStyleSheet((theme) => ({
  container: {
    height: moderateScale(150),
    width: moderateScale(100),
    marginHorizontal: moderateScale(8),
    borderRadius: moderateScale(16),
    marginBottom: moderateScale(8),
    padding: 10,
    elevation:4
  },
  profileImage: {
    width: moderateScale(90),
    height: moderateScale(90),
    backgroundColor: theme.colors.grey,
    borderRadius: moderateScale(16),
    alignSelf: 'center',
  },
  title: {
    fontSize: scale(14),
    textAlign: 'center',
    fontWeight:'700'
  }
}));

export default HomeCategoryList;
