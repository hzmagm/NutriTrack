import React from 'react';
import { View, Text,StyleSheet, Pressable } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';


const MealPlanning = ({ navigation }) => {

  const [items, setItems] = React.useState([
    { name: 'Monday', code: '#1abc9c' ,calorise: 'kcal',motivation : 'Hustle'},
    { name: 'Tuesday', code: '#2ecc71' ,calorise: 'kcal',motivation : 'Tenacious' },
    { name: 'Wednesday', code: '#3498db' ,calorise: 'kcal',motivation : 'Warrior' },
    { name: 'Thursday', code: '#9b59b6' ,calorise: 'kcal',motivation : 'Thrive' },
    { name: 'Friday', code: '#34495e' ,calorise: 'kcal',motivation : 'Fearless' },
    { name: 'Saturday', code: '#16a085' ,calorise: 'kcal',motivation : 'Strength' },
    { name: 'Sunday', code: '#27ae60' ,calorise: 'kcal',motivation : 'Power' },
  ]);

  return (
    <FlatGrid
    itemDimension={130}
    data={items}
    style={styles.gridView}
    spacing={10}
    renderItem={({ item }) => (
        <Pressable style={[styles.itemContainer, { backgroundColor: item.code }]} onPress={() => navigation.navigate('DayPlanning',{item})}>
            <View style={styles.centeredContainer}>
              <Text style={styles.itemMotivation}>{item.motivation}</Text>
            </View>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCode}>{item.calorise}</Text>
        </Pressable>
    )}
  />
  );
};

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 3,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
    fontWeight: 'bold',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: 'black',
  },
  itemMotivation:{
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MealPlanning;
