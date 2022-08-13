import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import sanity from "../sanity";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanity
      .fetch(
        `
    *[_type == "category"]
    `
      )
      .then((data) => {
        console.log(data);
        setCategories(data);
      });
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {categories?.map((category) => (
        <CategoryCard
          key={category._id}
          imgURL={category.image}
          title={category.name}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
