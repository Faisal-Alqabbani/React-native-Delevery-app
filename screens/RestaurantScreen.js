import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LocationMarkerIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "react-native-heroicons/outline";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { selectedBasketItem } from "../features/basketSlice";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const {
    params: {
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
    },
  } = useRoute();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setRestaurant({
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
      })
    );
  }, []);
  const items = useSelector(selectedBasketItem);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <>
      <BasketIcon />

      <ScrollView>
        <View className="relative">
          <Image
            source={{ uri: urlFor(imaUrl).url() }}
            className="w-full h-56 bg-gray-300 p-4"
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-10 left-5 bg-gray-200 rounded-full p-1"
          >
            <ArrowLeftIcon size={20} color="#00ccbb" />
          </TouchableOpacity>
        </View>
        {/* section two */}
        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row space-x-1 items-center">
                <StarIcon color="green" opacity={0.5} size={22} />
                <Text className="text-xs text-gray-500 ">
                  <Text className="text-green-500">{rating}</Text> . {genre}
                </Text>
              </View>

              <View className="flex-row space-x-1 items-center">
                <LocationMarkerIcon color="green" opacity={0.5} size={22} />
                <Text className="text-xs text-gray-500 ">
                  <Text className="text-green-500">NearBy .</Text> {address}
                </Text>
              </View>
            </View>
            {/* something that we want to do */}
            <Text className="text-gray-500 mt-2  pb-4">
              {short_description}{" "}
            </Text>
          </View>

          <TouchableOpacity className="flex-row space-x-2 items-center border-y border-gray-300 p-2">
            <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
            <Text className="pl-2 flex-1 text-md font-bold">
              Have a food allergy
            </Text>
            <ChevronRightIcon color="#00CCBB" />
          </TouchableOpacity>
        </View>
        {/* another view started here */}
        <View className={items.length > 0 && `pb-36`}>
          <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
          {/* Desh row */}
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
