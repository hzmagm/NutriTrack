import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  SafeAreaView,
} from "react-native";
import { FlatGrid } from "react-native-super-grid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const MealPlanning = ({ navigation }) => {
  const [mealPlan, setMealPlan] = React.useState([]);
  const isFocused = useIsFocused();

  const [items, setItems] = React.useState([
    {
      name: "Monday",
      code: "#1abc9c",
      calorise: "kcal",
      motivation: "Hustle",
      image: require("./assets/set1.png"),
    },
    {
      name: "Tuesday",
      code: "#2ecc71",
      calorise: "kcal",
      motivation: "Tenacious",
      image: require("./assets/set2.png"),
    },
    {
      name: "Wednesday",
      code: "#3498db",
      calorise: "kcal",
      motivation: "Warrior",
      image: require("./assets/set3.png"),
    },
    {
      name: "Thursday",
      code: "#9b59b6",
      calorise: "kcal",
      motivation: "Thrive",
      image: require("./assets/set4.png"),
    },
    {
      name: "Friday",
      code: "#34495e",
      calorise: "kcal",
      motivation: "Fearless",
      image: require("./assets/set5.png"),
    },
    {
      name: "Saturday",
      code: "#16a085",
      calorise: "kcal",
      motivation: "Strength",
      image: require("./assets/set6.png"),
    },
    {
      name: "Sunday",
      code: "#27ae60",
      calorise: "kcal",
      motivation: "Power",
      image: require("./assets/set7.png"),
    },
  ]);

  useEffect(() => {
    if (isFocused) {
      const loadData = async () => {
        try {
          const storedMealPlan = await AsyncStorage.getItem("mealPlan");
          if (storedMealPlan) {
            setMealPlan(JSON.parse(storedMealPlan));
          }
        } catch (error) {
          console.log("Error retrieving meal plan from AsyncStorage:", error);
        }
      };

      loadData();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatGrid
        itemDimension={130}
        data={items}
        style={styles.gridView}
        spacing={10}
        renderItem={({ item }) => {
          const dayData = mealPlan.find((day) => day.day === item.name);

          const totalCalories = dayData
            ? Object.values(dayData.meals).reduce((sum, meals) => {
                return (
                  sum +
                  meals.reduce((mealSum, meal) => mealSum + meal.calories, 0)
                );
              }, 0)
            : 0;

          return (
            <Pressable
              style={[styles.itemContainer, { backgroundColor: item.code }]}
              onPress={() => navigation.navigate("DayPlanning", { item })}
            >
              <View style={styles.centeredContainer}>
                <Image source={item.image} style={{ height: 40, width: 40 }} />
              </View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCode}>
                {totalCalories} {item.calorise}
              </Text>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 3,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: "black",
    fontWeight: "600",
    fontWeight: "bold",
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "black",
  },
  itemMotivation: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MealPlanning;
