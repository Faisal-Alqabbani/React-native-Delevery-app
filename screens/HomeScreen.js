import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Icons from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";
const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type =='featured']{
      ..., 
      restaurants[]->{
        ...,
        dishes[]->
      }
    }`
      )
      .then((data) => {
        setFeaturedCategories(data);
        console.log(data);
      });
  }, []);
  return (
    <SafeAreaView className="bg-white pt-5">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-7 w-7 bg-gray-300 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now </Text>
          <Text className="font-bold text-xl">
            Current Location <Icons.ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <Icons.UserIcon size={20} color="#00CCBB" />
      </View>
      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        {/* View Something */}
        <View className="flex-row space-x-2 bg-gray-200 p-3 flex-1">
          <Icons.SearchIcon color="gray" size={20} />
          <TextInput
            placeholder="Resturant and Consine"
            keyboardType="default"
          />
        </View>
        <Icons.AdjustmentsIcon color="#00CCBB" />
      </View>

      {/* Body Container */}
      <ScrollView
        className="bg-gray-200 flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Categories  */}
        <Categories />
        {/* Featured fow component */}
        {featuredCategories?.map((item) => (
          <FeaturedRow
            key={item._id}
            id={item._id}
            title={item.name}
            description={item.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
