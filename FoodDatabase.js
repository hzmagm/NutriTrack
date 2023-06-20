import { React, useState, useEffect } from "react";

import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import randomColor from "randomcolor";
import axios from "axios";
import { Modal } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
const FoodDatabase = () => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [day, setDay] = useState("");
  const [meal, setMeal] = useState("");
  const [quantity, setQuantity] = useState(0);

  const foodList = [];

  // Create an array to store meal data for each day of the week
  const [mealPlan, setMealPlan] = useState([
    {
      day: "Monday",
      meals: { Breakfast: [], Lunch: [], Dinner: [], Snack: [] },
    },
    {
      day: "Tuesday",
      meals: { Breakfast: [], Lunch: [], Dinner: [], Snack: [] },
    },
    {
      day: "Wednesday",
      meals: { Breakfast: [], Lunch: [], Dinner: [], Snack: [] },
    },
    {
      day: "Thursday",
      meals: { Breakfast: [], Lunch: [], Dinner: [], Snack: [] },
    },
    {
      day: "Friday",
      meals: { Breakfast: [], Lunch: [], Dinner: [], Snack: [] },
    },
    {
      day: "Saturday",
      meals: { Breakfast: [], Lunch: [], Dinner: [], Snack: [] },
    },
    {
      day: "Sunday",
      meals: { Breakfast: [], Lunch: [], Dinner: [], Snack: [] },
    },
  ]);

  const handleSearchInputChange = (text) => {
    setSearchInput(text);
  };
  const mealArray = ["Breakfast", "Lunch", "Dinner", "Snack"];
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const fetchData = async () => {
    try {
      const result = await axios.get(
        `https://trackapi.nutritionix.com/v2/search/instant?query=${searchInput}`,
        {
          headers: {
            "x-app-id": "4159ca4b",
            "x-app-key": "b07d4d82251acddd2f2d99c0daa449ca	",
          },
        }
      );

      setData(extractData(result.data));
      // console.log("data....", result.data);
    } catch (error) {
      console.warn(error);
    }
  };

  const addMeal = (day, mealType, meal) => {
    setMealPlan((prevMealPlan) => {
      const updatedMealPlan = [...prevMealPlan];
      const selectedDayIndex = updatedMealPlan.findIndex(
        (item) => item.day === day
      );

      if (selectedDayIndex !== -1) {
        const selectedDay = { ...updatedMealPlan[selectedDayIndex] };
        selectedDay.meals[mealType].push(meal);
        updatedMealPlan[selectedDayIndex] = selectedDay;
        console.log(`Added "${meal}" to ${mealType} on ${day}`);
        AsyncStorage.setItem("mealPlan", JSON.stringify(updatedMealPlan)).catch(
          (error) => {
            console.log("Error storing meal plan in AsyncStorage:", error);
          }
        );
      } else {
        console.log(`Invalid day: ${day}`);
      }

      return updatedMealPlan;
    });
    setDay("");
    setMeal("");
    setQuantity("");
    setIsVisible(false);
  };

  const closeModal = () => {
    setIsVisible(false);
    setDay("");
    setMeal("");
    setQuantity("");
  };
  const confirmForm = async () => {
    let _data = {
      meal: selectedItem.name,
      calories: selectedItem.calories,
      color: randomColor(),
      quantity: quantity,
    };

    if (!quantity || !day || !meal) {
      Alert.alert("Validation Error", "Please fill in all the fields.");
      return;
    } else if (quantity < 1) {
      Alert.alert("Validation Error", "Please choose a valid quantity.");
      return;
    }

    addMeal(day, meal, _data); 
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
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
      return unsubscribe;
    });
  }, [navigation]);

  const extractData = (data) => {
    const categories = ["branded", "self"];
    categories.forEach((category) => {
      if (data[category]) {
        data[category].forEach((item) => {
          if (item.food_name && item.nf_calories) {
            foodList.push({
              foodName: item.food_name,
              calories: item.nf_calories,
            });
          }
        });
      }
    });
    return foodList;
  };

  const renderFoodItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        setSelectedItem({ name: item.foodName, calories: item.calories });
        setIsVisible(true);
      }}
      key={index.toString()}
    >
      <Text 
        style={styles.itemText}>
        {item.foodName}
      </Text>
      
      <Text style={styles.itemText}>{item.calories} cal</Text>
    </TouchableOpacity>
  );

  return (

    <SafeAreaView style={{flex: 1}} keyboardShouldPersistTaps='handled' >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter your Search item..."
          onChangeText={handleSearchInputChange}
          value={searchInput.toString()}
        ></TextInput>
        <Pressable style={styles.button} onPress={fetchData}>
          <Text style={styles.ButtonText}> Search </Text>
        </Pressable>

        <FlatList

          numColumns={2}
          style={{
            marginTop: 10,
            flex: 1,
            marginBottom: 80
          }}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={data}
          nestedScrollEnabled
          renderItem={renderFoodItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
      
      <Modal style={styles.modal} visible={isVisible}>
        <View style={styles.modalView}>
          <Text style={styles.textModal}>Quantity</Text>
          <TextInput
            value={quantity.toString()}
            style={styles.input}
            keyboardType="numeric"
            maxLength={2}
            placeholder="Quantity"
            onChangeText={(text) => {
              setQuantity(text);
            }}
          />

          <Text style={styles.textModal}>Meal</Text>

          <SelectDropdown
            data={mealArray}
            buttonStyle={styles.dropDown}
            value={meal}
            onSelect={(selectedItem) => {
              setMeal(selectedItem);
            }}
            /*buttonTextAfterSelection={(selectedItem) => {
            return selectedItem
          }}*/
          />

          <Text style={styles.textModal}>Day</Text>

          <SelectDropdown
            data={days}
            value={day}
            buttonStyle={styles.dropDown}
            onSelect={(selectedItem) => {
              setDay(selectedItem);
            }}
            
          />
          <View style={styles.btnView}>
            <Pressable style={[styles.button, {backgroundColor:"#B0B0B0"}]} onPress={closeModal}>
              <Text style={styles.ButtonText}> Close </Text>
            </Pressable>

            <Pressable style={styles.button} onPress={confirmForm}>
              <Text style={styles.ButtonText}> Confirm </Text>
            </Pressable>
          </View>

        </View>
      </Modal>

      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: 120,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "red",
    marginVertical: 10,
  },
  ButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    color: "white",
  },
  item: {
    
    borderRadius: 5,
    padding: 5,
    backgroundColor:"#FFD2D2",

    margin: 2,
    width: "45%"
    
  },

  itemText: {
    fontWeight:"bold"
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 40,
  },
  modalView: {
    paddingTop :10,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 9,
  },
  textModal: {
    marginVertical: 5,
    fontWeight: "bold",
  },
  btnView: {
    flexDirection: "row",
    width: "90%",
    marginHorizontal: 10,
    marginVertical: 15,
    justifyContent:"space-around"
  },
});

export default FoodDatabase;
