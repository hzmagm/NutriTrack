import {React,useState} from 'react';

import { View, TextInput, StyleSheet,ScrollView,Pressable,Text, TouchableOpacity } from 'react-native';

import axios from 'axios';
import { Modal } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import SelectDropdown from 'react-native-select-dropdown'

const FoodDatabase = () => {

  const [isVisible, setIsVisible]=useState(false);
  const [searchInput,setSearchInput]=useState('');
  const [data,setData]=useState([]);
  const [selectedItem,setSelectedItem]=useState(null);
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
      console.error(error);
    }
    };

  const selectItem = (item) => {
    setSelectedItem(item);
    console.log("Item pressed");
    setIsVisible(true);
    console.log(isVisible);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  const confirmItem = () => {
    
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

  return (
    <ScrollView keyboardShouldPersistTaps='handled' >
      <View style={styles.container}>
      <TextInput style={styles.input} placeholder='Enter your Search item...' onChangeText={handleSearchInputChange} ></TextInput>
        <Pressable style={styles.button} onPress={fetchData}>
              <Text style={styles.ButtonText} > Search </Text>
        </Pressable>
        <Text>{data ? data.length: "0"}</Text>
        {data.map((item, index) => (
          <TouchableOpacity style = {styles.item} onPress={(item) => selectItem(item)} key={index}>
            <Text >{item.foodName}</Text>
            <Text>{item.calories} cal</Text>
          </TouchableOpacity>
        ))}
        <Text>{data ? JSON.stringify(data) : 'No data'}</Text>
        
      </View>

      <Modal style={styles.modal} visible={isVisible}>

        <Text>Modal hehe</Text>

        <TextInput style={styles.input} keyboardType='numeric' placeholder='Quantity'/>


        <Text>Meal</Text>

        <SelectDropdown
          data={mealArray}
          /*onSelect={(selectedItem) => {
            handleHealthGoalChange(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem
          }}*/
        />

        <Text>Day</Text>

        <SelectDropdown
          data={days}
          /*onSelect={(selectedItem) => {
            handleHealthGoalChange(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem) => {
            return selectedItem
          }}*/
/>

        {/*<Picker
        //selectedValue={selectedValue}
        //onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Breakfast" value="Breakfast" />
          <Picker.Item label="Lunch" value="Lunch" />
          <Picker.Item label="Dinner" value="Dinner" />
          <Picker.Item label="Snack" value="Snack" />
        </Picker>*/}

        <View>

        <Pressable style={styles.button} onPress={closeModal}>
          <Text style={styles.ButtonText} > Close </Text>
        </Pressable>

        <Pressable style={styles.button} onPress={confirmItem}>
          <Text style={styles.ButtonText} > Confirm </Text>
        </Pressable>


        </View>


      </Modal>
      
    </ScrollView>
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
