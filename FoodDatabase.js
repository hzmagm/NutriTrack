import {React,useState} from 'react';
import { View, TextInput, StyleSheet,ScrollView,Pressable,Text } from 'react-native';
import axios from 'axios';

const FoodDatabase = () => {

  const [searchInput,setSearchInput]=useState('');
  const [data,setData]=useState([]);
  const foodList = [];
  const handleSearchInputChange=(text)=>{
    setSearchInput(text);
  }

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
    } catch (error) {
      console.error(error);
    }
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
        <Text>{data ? JSON.stringify(data) : 'No data'}</Text>
      </View>
      
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
  }
  });

export default FoodDatabase;
