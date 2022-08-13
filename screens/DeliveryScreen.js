import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectedRestaurant } from "../features/restaurantSlice";
import { XIcon } from "react-native-heroicons/outline";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";
const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectedRestaurant);

  return (
    <View className="bg-[#00CCBB] flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XIcon size={30} color="#fff" />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Order Help</Text>
        </View>
        {/* new view */}
        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between items-center ">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">45-55 Minutes</Text>
            </View>
            <Image
              source={{
                uri: "https://i.makeagif.com/media/4-30-2016/Ea64mQ.gif",
              }}
              className="h-20 w-20"
            />
          </View>
          <Progress.Bar size={30} color="#00CCBB" indeterminate={true} />
          <Text className="mt-3 text-gray-400">
            Your Order at {restaurant.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>
      {/* Map View */}
      <MapView
        initialRegion={{
          latitude: 24.774265,
          longitude: 46.738586,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-10 z-10"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: 24.774265,
            longitude: 46.738586,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#00CCBB"
        />
      </MapView>
      {/* Footer diriver infromation */}
      <SafeAreaView></SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
