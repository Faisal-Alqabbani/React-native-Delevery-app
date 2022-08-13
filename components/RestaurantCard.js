import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import * as Icons from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";
const RestaurantCard = (props) => {
  const {
    id,
    imaUrl,
    rating,
    title,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat,
  } = props;

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="bg-white mr-3 shadow"
      onPress={() => {
        navigation.navigate("Restaurant", {
          id,
          imaUrl,
          rating,
          title,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        });
      }}
    >
      <Image source={{ uri: urlFor(imaUrl).url() }} className="h-36 w-64" />
      <View className="px-2 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <Icons.StarIcon color="green" opacity={0.5} size={22} />
          <Text className="text-xs text-gray-500 ">
            <Text className="text-green-500">{rating} </Text>. {genre}
          </Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <Icons.LocationMarkerIcon color="gray" opacity={1} size={22} />
          <Text className="text-xs text-gray-500">NearBy . {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
