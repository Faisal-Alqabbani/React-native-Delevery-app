import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { urlFor } from "../sanity";
import {
  MinusCircleIcon,
  PlusCircleIcon,
} from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsWithId,
  selectedBasketItem,
} from "../features/basketSlice";

const DishRow = (props) => {
  const { id, name, description, image, price } = props;
  const [isPressed, setIsPressed] = useState(false);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const dispatch = useDispatch();
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, image, price }));
  };

  const removeItemFromBasket = () => {
    if (items.length <= 0) return;
    dispatch(removeFromBasket({ id }));
  };
  return (
    <>
      <TouchableOpacity
        className={`border bg-white border-gray-200 p-2 ${
          isPressed && "border-b-0"
        }`}
        onPress={() => setIsPressed(!isPressed)}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <View className="flex-1 pr-2">
              <Text clsasName="text-lg mb-1">{name}</Text>
              <Text className="text-gray-400">{description}</Text>
              <Text className="text-gray-400 mt-2">{price}$</Text>
            </View>
          </View>
          <View>
            <Image
              style={{ borderWidth: 1, borderColor: "#F3F3F4" }}
              className="w-20 h-20 bg-gray-400 p-4"
              source={{ uri: urlFor(image).url() }}
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity
              onPress={removeItemFromBasket}
              disabled={items.length === 0}
            >
              <MinusCircleIcon
                color={items.length === 0 ? "gray" : "#00CCBB"}
                size={40}
              />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon color="#00CCBB" size={40} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
