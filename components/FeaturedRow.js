import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import * as Icons from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import client from "../sanity";
const FeaturedRow = ({ title, description, id }) => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `
    *[_type =='featured' && _id == $id]{
      ..., 
      restaurants[]->{
        ...,
        dishes[]->
      }
    }[0]`,
        { id }
      )
      .then((data) => {
        setRestaurants(data?.restaurants);
      });
  }, []);
  console.log(restaurants);
  return (
    <View>
      <View className="mt-4 flex-row itmes-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <Icons.ArrowRightIcon color={"#00CCBB"} size={20} />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description} </Text>
      <ScrollView
        horizontal
        // inner scroll view Style
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* Resturant Cards */}
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imaUrl={restaurant.image}
            rating={restaurant.rating}
            title={restaurant.name}
            genre={restaurant.short_description}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
