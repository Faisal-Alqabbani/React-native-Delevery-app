import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectedRestaurant } from "../features/restaurantSlice";
import { useMemo, useState } from "react";
import {
  removeFromBasket,
  selectBasketTotal,
  selectedBasketItem,
} from "../features/basketSlice";
import { XCircleIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectedRestaurant);
  const items = useSelector(selectedBasketItem);
  const totalBasket = useSelector(selectBasketTotal);
  const [groupedItemsInBasket, setGroupItmesInBasket] = useState([]);
  const dispatch = useDispatch();

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupItmesInBasket(groupedItems);
  }, [items]);
  console.log(groupedItemsInBasket);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color="#00CCBB" height={50} width={50} />
          </TouchableOpacity>
        </View>
        {/* Delivery section  */}
        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            className="h-7 w-7 bg-white-300 p-4 rounded-full"
          />
          <Text className="flex-1"> Deliver in 50-70 Mintues</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>
        {/* ScrollView */}
        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#00CCBB]">{items.length} X</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">
                <Text>${items[0]?.price}</Text>
              </Text>
              <TouchableOpacity>
                <Text
                  className="text-[#00CCBB] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">${totalBasket}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delevery Fee</Text>
            <Text className="text-gray-400">$5.99</Text>
          </View>

          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="font-extrabold">${totalBasket + 5.99}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("PreparingOrderScreen")}
            className="rounded-lg bg-[#00CCBB] p-4"
          >
            <Text className="text-center text-white text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
