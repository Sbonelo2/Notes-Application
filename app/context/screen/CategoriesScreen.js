import React from "react";
import { View, Button } from "react-native";

export default function CategoriesScreen({ navigation }) {
  const categories = ["Work", "Study", "Personal"];

  return (
    <View>
      {categories.map((cat) => (
        <Button
          key={cat}
          title={cat}
          onPress={() => navigation.navigate("Notes", { category: cat })}
        />
      ))}
    </View>
  );
}
