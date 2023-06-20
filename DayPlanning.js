import React, { useEffect,useState } from 'react';
import { View, Text ,TouchableOpacity, StyleSheet,Pressable,Image} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
const DayPlanning = ({ navigation, route }) => {
  const [mealPlan, setMealPlan] = React.useState([]);
  const [dayData, setDayData] = React.useState([]);
  const [type, setType] = React.useState("Breakfast");

  const [SelectedTabIndex, setSelectedTabIndex] = useState(0);
  useEffect(() => {
    const screenName = route?.params?.item?.name;
    navigation.setOptions({ title: screenName });
  }, [mealPlan]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      // Reset the stack's navigation history
      navigation.reset({
        index: 1,
        routes: [{ name: "MealPlanning" }],
      });
    });

    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedMealPlan = await AsyncStorage.getItem("mealPlan");
        if (storedMealPlan) {
          setMealPlan(JSON.parse(storedMealPlan));
          let _dayData = getDayData(
            route?.params?.item?.name,
            JSON.parse(storedMealPlan)
          );
          setDayData(_dayData);
        }
      } catch (error) {
        console.log("Error retrieving meal plan from AsyncStorage:", error);
      }
    };

    loadData();
  }, []);

  const getDayData = (day, data) => {
    const selectedDay = data.find((item) => item.day === day);
    return selectedDay ? selectedDay.meals : null;
  };
  const deleteMeal = (day, mealType, index) => {
    setMealPlan((prevMealPlan) => {
      const updatedMealPlan = [...prevMealPlan];
      const selectedDayIndex = updatedMealPlan.findIndex(
        (item) => item.day === day
      );

      if (selectedDayIndex !== -1) {
        const selectedDay = { ...updatedMealPlan[selectedDayIndex] };

        // Check if the mealType exists in the meals object
        if (selectedDay.meals.hasOwnProperty(mealType)) {
          const mealArray = selectedDay.meals[mealType];

          if (index >= 0 && index < mealArray.length) {
            mealArray.splice(index, 1);
            // Store the updated meal plan in AsyncStorage
            AsyncStorage.setItem(
              "mealPlan",
              JSON.stringify(updatedMealPlan)
            ).catch((error) => {
              console.log("Error storing meal plan in AsyncStorage:", error);
            });
          } else {
            console.log(`Invalid index: ${index}`);
          }
        } else {
          console.log(`Invalid meal type: ${mealType}`);
        }
      } else {
        console.log(`Invalid day: ${day}`);
      }
      let _dayData = getDayData(route.params.item.name, updatedMealPlan);
      setDayData(_dayData);
      return updatedMealPlan;
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          marginTop: 30,
          height: 60,
          borderWidth: 0.5,
          borderRadius: 15,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          paddingRight: 5,
          paddingLeft: 5,
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            width: "25%",
            height: "85%",
            backgroundColor: SelectedTabIndex == 0 ? "red" : "white",
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setSelectedTabIndex(0);
            setType("Breakfast");
          }}
        >
          <Text
            style={{
              color: SelectedTabIndex == 0 ? "#FFFFFF" : "#000",
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            Breakfast
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "25%",
            height: "85%",
            backgroundColor: SelectedTabIndex == 1 ? "red" : "white",
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setSelectedTabIndex(1);
            setType("Lunch");
          }}
        >
          <Text
            style={{
              color: SelectedTabIndex == 1 ? "#FFFFFF" : "#000",
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            Lunch
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "25%",
            height: "85%",
            backgroundColor: SelectedTabIndex == 2 ? "red" : "white",
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setSelectedTabIndex(2);
            setType("Snack");
          }}
        >
          <Text
            style={{
              color: SelectedTabIndex == 2 ? "#FFFFFF" : "#000",
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            Snack
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "25%",
            height: "85%",
            backgroundColor: SelectedTabIndex == 3 ? "red" : "white",
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            setSelectedTabIndex(3);
            setType("Dinner");
          }}
        >
          <Text
            style={{
              color: SelectedTabIndex == 3 ? "#FFFFFF" : "#000",
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            Dinner
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {dayData[type] && (
          <FlatGrid
            itemDimension={130}
            data={dayData[type]}
            style={styles.gridView}
            spacing={10}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View
                style={[styles.itemContainer, { backgroundColor: item.color }]}
              >
                <Text style={styles.itemName}>{item.meal}</Text>
                <Text style={styles.itemCode}>{item.calories}</Text>
                <TouchableOpacity
                  style={styles.DeletButton}
                  onPress={() =>
                    deleteMeal(route.params.item.name, type, index)
                  }
                >
                  <Ionicons name="trash-outline" size={24} color="red" />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 130,
        }}
      >
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Food Database")}
        >
          <Text style={styles.ButtonText}>{`Update my ${type}`} </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "red",
  },
  ButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    color: "white",
  },
  gridView: {
    marginTop: 10,
    flex: 3,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 100,
  },
  itemName: {
    fontSize: 12,
    color: "black",
    fontWeight: "300",
    fontWeight: "bold",
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "black",
  },
  itemMotivation: {
    width: 40,
    height: 40,
    paddingTop: 40,
  },
  centeredContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  DeletButton: {
    alignSelf: "flex-end",
  },
});

export default DayPlanning;