import React, { useEffect,useState } from 'react';
import { View, Text ,TouchableOpacity, StyleSheet,Pressable,Image} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { Ionicons } from '@expo/vector-icons';

const DayPlanning = ({ navigation,route }) => {

  useEffect(() => {
    const screenName = route.params.item.name;
    navigation.setOptions({ title: screenName });
  }, []);

  const { item } = route.params;

  const [items, setItems] = React.useState([
    { name: 'Spicy Mango Chicken', code: '#1abc9c' ,calorise: '400 kcal',motivation : 'Hustle',image : 'https://www.kasandbox.org/programming-images/avatars/purple-pi.png'},
    { name: 'Cheesy Garlic Breadsticks', code: '#2ecc71' ,calorise: '400 kcal',motivation : 'Tenacious',image : 'https://www.kasandbox.org/programming-images/avatars/mr-pants.png' },
    { name: 'BBQ Pulled Pork Sandwich', code: '#3498db' ,calorise: ' 400 kcal',motivation : 'Warrior' ,image : 'https://www.kasandbox.org/programming-images/avatars/mr-pants-purple.png'},
    { name: 'Creamy Mushroom Risotto', code: '#9b59b6' ,calorise: '400 kcal',motivation : 'Thrive' ,image : 'https://www.kasandbox.org/programming-images/avatars/mr-pants-green.png'},
    { name: 'Teriyaki Salmon Bowl', code: '#34495e' ,calorise: '400 kcal',motivation : 'Fearless' ,image : 'https://www.kasandbox.org/programming-images/avatars/marcimus-red.png'},
    { name: 'Greek Salad with Feta Cheese', code: '#16a085' ,calorise: '400 kcal',motivation : 'Strength',image : 'https://www.kasandbox.org/programming-images/avatars/marcimus-orange.png' },
    { name: 'Cajun Shrimp Pasta', code: '#27ae60' ,calorise: '400 kcal',motivation : 'Power' ,image : 'https://www.kasandbox.org/programming-images/avatars/spunky-sam.png'},
  ]);

  const handleDeleteItem=(name)=>{
    const updatedItems = items.filter((item) => item.name !== name);
    setItems(updatedItems);
  }

  const [SelectedTabIndex,setSelectedTabIndex]=useState(0);
  return (
    <View style={{flex:1}}>
      <View style={{
        width:'90%',
        alignSelf:'center',
        marginTop:30,
        height:60,
        borderWidth:0.5,
        borderRadius:15,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',
        paddingRight:5,
        paddingLeft:5,
        justifyContent:'center'
      }}>
        <TouchableOpacity style={{
          width:'33%',
          height:'85%',
          backgroundColor:SelectedTabIndex==0 ? 'red':'white',
          borderRadius:15,
          justifyContent:'center',
          alignItems:'center'
          }} onPress={()=>{setSelectedTabIndex(0)}}>
            <Text style={{color:SelectedTabIndex==0 ?'#FFFFFF':'#000',fontSize:15,fontWeight:700}}>Breakfast</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          width:'33%',
          height:'85%',
          backgroundColor: SelectedTabIndex==1 ? 'red':'white',
          borderRadius:15,
          justifyContent:'center',
          alignItems:'center'
          }} 
          onPress={()=>{setSelectedTabIndex(1)}}
          >
            <Text style={{color:SelectedTabIndex==1 ?'#FFFFFF':'#000',fontSize:15,fontWeight:700}}>Lunch</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
          width:'33%',
          height:'85%',
          backgroundColor:SelectedTabIndex==2 ? 'red':'white',
          borderRadius:15,
          justifyContent:'center',
          alignItems:'center'
          }}          
          onPress={()=>{setSelectedTabIndex(2)}}
          >
            <Text style={{color:SelectedTabIndex==2 ?'#FFFFFF':'#000',fontSize:15,fontWeight:700}}>Dinner</Text>
        </TouchableOpacity>
      </View>
      {SelectedTabIndex==0 ? 
      (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
       <FlatGrid
    itemDimension={130}
    data={items}
    style={styles.gridView}
    spacing={10}
    showsVerticalScrollIndicator={false}
    renderItem={({ item }) => (
        <View style={[styles.itemContainer, { backgroundColor: item.code }]} >
           
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCode}>{item.calorise}</Text>
            <TouchableOpacity
            style={styles.DeletButton}
            onPress={() => handleDeleteItem(item.name)}
            >
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        </View>
    )}
  />
        <View style={{justifyContent:'center',alignItems:'center',paddingBottom:130}}>
            <Pressable style={styles.button}>
              <Text style={styles.ButtonText} > update my dinner </Text>
            </Pressable>
        </View>
      </View>
      ):(
      SelectedTabIndex == 1 ? 
      (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
       <FlatGrid
    itemDimension={130}
    data={items}
    style={styles.gridView}
    spacing={10}
    showsVerticalScrollIndicator={false}
    renderItem={({ item }) => (
        <View style={[styles.itemContainer, { backgroundColor: item.code }]} >
           
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCode}>{item.calorise}</Text>
            <TouchableOpacity
            style={styles.DeletButton}
            onPress={() => handleDeleteItem(item.name)}
            >
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        </View>
    )}
  />
        <View style={{justifyContent:'center',alignItems:'center',paddingBottom:130}}>
            <Pressable style={styles.button}>
              <Text style={styles.ButtonText} > update my dinner </Text>
            </Pressable>
        </View>
      </View>
      ):(
      <View style={{flex:8,justifyContent:'center',alignItems:'center'}}>
       <FlatGrid
    itemDimension={130}
    data={items}
    style={styles.gridView}
    spacing={10}
    showsVerticalScrollIndicator={false}
    renderItem={({ item }) => (
        <View style={[styles.itemContainer, { backgroundColor: item.code }]} >
           
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCode}>{item.calorise}</Text>
            <TouchableOpacity
            style={styles.DeletButton}
            onPress={() => handleDeleteItem(item.name)}
            >
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        </View>
    )}
  />
        <View style={{justifyContent:'center',alignItems:'center',paddingBottom:130}}>
            <Pressable style={styles.button}>
              <Text style={styles.ButtonText} > update my dinner </Text>
            </Pressable>
        </View>
      </View>
      ))}

    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: 'red',
  },
  ButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    color: 'white',
  },
  gridView: {
    marginTop: 10,
    flex: 3,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 100,
  },
  itemName: {
    fontSize: 12,
    color: 'black',
    fontWeight: '300',
    fontWeight: 'bold',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: 'black',
  },
  itemMotivation:{
    width:40,
    height:40,
    paddingTop:40
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  DeletButton:{
    marginLeft:90
  }
  });

export default DayPlanning;
