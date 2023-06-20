import {React,useState} from 'react';

import { View, TextInput, StyleSheet,ScrollView,Pressable,Text, TouchableOpacity, FlatList, Alert, SafeAreaView } from 'react-native';

import axios from 'axios';
import { Modal } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';

let mealPlan= {
  "Monday":{
    "Breakfast": [],
    "Lunch": [],
    "Snack": [],
    "Dinner": []
  },
  "Tuesday":{
    "Breakfast": [],
    "Lunch": [],
    "Snack": [],
    "Dinner": []
  },
  "Wednesday":{
    "Breakfast": [],
    "Lunch": [],
    "Snack": [],
    "Dinner": []
  },
  "Thursday":{
    "Breakfast": [],
    "Lunch": [],
    "Snack": [],
    "Dinner": []
  },
  "Friday":{
    "Breakfast": [],
    "Lunch": [],
    "Snack": [],
    "Dinner": []
  },
  "Saturday":{
    "Breakfast": [],
    "Lunch": [],
    "Snack": [],
    "Dinner": []
  },
  "Sunday":{
    "Breakfast": [],
    "Lunch": [],
    "Snack": [],
    "Dinner": []
  }
};



const FoodDatabase = (navigation) => {

  const [isVisible, setIsVisible]=useState(false);
  const [searchInput,setSearchInput]=useState('');
  const [data,setData]=useState([]);
  const [selectedItem,setSelectedItem]=useState(null);
  const [day,setDay]=useState("");
  const [meal,setMeal]=useState("");
  const [quantity,setQuantity]=useState(0);
  const foodList = [];
  const handleSearchInputChange=(text)=>{
    setSearchInput(text);
  }
  const mealArray=["Breakfast", "Lunch", "Dinner", "Snack"];
  const days=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const fetchData = async () => {
    try {
      const result = await axios.get(
        `https://trackapi.nutritionix.com/v2/search/instant?query=${searchInput}`, 
        {
          headers: {
            'x-app-id': '4159ca4b',
            'x-app-key': 'b07d4d82251acddd2f2d99c0daa449ca	', 
          },
        },
      );
      
      setData(extractData(result.data));
      console.log(result.data);
    } catch (error) {
      console.warn(error);
    }
    };

  /*const selectItem = (item) => {
    setSelectedItem(item);
    console.log("Item pressed");
    setIsVisible(true);
    console.log(isVisible);
  };*/

   const closeModal = () => {
    setIsVisible(false);
  };

  const confirmForm = async () => {
    console.log("Start ConfirmForm");
    try {
      console.log("Start try getPlan");
      const planStringGet = await AsyncStorage.getItem('plan');
      console.log(planStringGet);
      // weird, should be != or !==
      if(planStringGet == null){
        console.log("Parsing");
        //const json = JSON.parse(planStringGet)
        mealPlan = JSON.parse(planStringGet)
        console.log("End try getPlan");
      }
    } 
    catch(error) {
      console.log("Get plan Error");
      console.warn(error);
      
    }
    console.log("Start form verif");
    if(!quantity || !day || !meal){
      Alert.alert('Validation Error', 'Please fill in all the fields.');
    }
    else if(quantity <1){
      Alert.alert('Validation Error', 'Please choose a valid quantity.');
    }
    console.log("end form verif");

    console.log("Start loop");
    console.log(day);
    console.log(meal);
    console.log(mealPlan);
    for(let i = 0; i < quantity; i++){
      mealPlan[day][meal].push(selectedItem);
    }
    console.log("end loop");

    try {
      const planStringSet = JSON.stringify(mealPlan);
      await AsyncStorage.setItem('plan', planStringSet);
    } 
    catch (error) {
      console.log("Set plan Error");
      console.warn(error);
      return;
    }
    console.log(mealPlan["Friday"]["Breakfast"][0]);
    console.log(selectedItem);    
    console.log("End ConfirmForm");

  };

  

  const extractData = (data) => {
    const categories = ['branded', 'self'];
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
      <TouchableOpacity style = {styles.item} onPress={() => {setSelectedItem({"name":item.foodName,"calories":item.calories}); setIsVisible(true);}} key={index}>
        <Text>{item.foodName}</Text>
        <Text>{item.calories} cal</Text>
      </TouchableOpacity>
    );

  return (
    <SafeAreaView style={{flex: 1}} keyboardShouldPersistTaps='handled' >
      <View style={styles.container}>
      <TextInput style={styles.input} placeholder='Enter your Search item...' onChangeText={handleSearchInputChange} ></TextInput>
        <Pressable style={styles.button} onPress={fetchData}>
              <Text style={styles.ButtonText} > Search </Text>
        </Pressable>
        
        <FlatList
          numColumns={2}
          style={{
            marginTop: 20,
            flex: 1,
            marginBottom: 80
          }}
          //numColumns={2}
          contentContainerStyle={{ paddingBottom: 80 }}
          data={data}
          renderItem={renderFoodItem}
          keyExtractor={(item) => item.id}
          //ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
 
      </View>

      <Modal style={styles.modal} visible={isVisible}>

        <Text>Modal hehe</Text>

        <TextInput value ={quantity.toString()} style={styles.input} keyboardType='numeric' maxLength={2}  placeholder='Quantity' onChangeText ={(text) => {setQuantity(text)}}/>


        <Text>Meal</Text>

        <SelectDropdown
          data={mealArray}
          value ={meal}
          onSelect={(selectedItem) => {
            setMeal(selectedItem);
          }}
        />

        <Text>Day</Text>

        <SelectDropdown
          data={days}
          value ={day}
          onSelect={(selectedItem) => {
            setDay(selectedItem);
          }}
          
        />  
        <View>

          <Pressable style={styles.button} onPress={closeModal}>
            <Text style={styles.ButtonText} > Close </Text>
          </Pressable>

          <Pressable style={styles.button} onPress={confirmForm}>
            <Text style={styles.ButtonText} > Confirm </Text>
          </Pressable>


        </View>


      </Modal>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    paddingTop:50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input:{

    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: 150,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'red'
  },
  ButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    color: 'white',
  },
  item: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    padding: 2,
    margin: 2,
    width: "45%"
    
  },
  modal: {
    justifyContent: 'center',  
    alignItems: 'center',   
    backgroundColor : "white",   
    height: 600 ,
    borderRadius:10,    
    marginTop: 80,
    marginHorizontal:10

  }
  });

export default FoodDatabase;
