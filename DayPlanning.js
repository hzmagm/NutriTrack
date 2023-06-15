import React, { useEffect,useState } from 'react';
import { View, Text ,TouchableOpacity, StyleSheet,Pressable} from 'react-native';

const DayPlanning = ({ navigation,route }) => {

  useEffect(() => {
    const screenName = route.params.item.name;
    navigation.setOptions({ title: screenName });
  }, []);

  const { item } = route.params;

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
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>Breakfast meals</Text>
        </View>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Pressable style={styles.button}>
              <Text style={styles.ButtonText} > update my breakfast </Text>
            </Pressable>
        </View>
      </View>
      ):(
      SelectedTabIndex == 1 ? 
      (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>Lunch meals</Text>
        </View>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Pressable style={styles.button}>
              <Text style={styles.ButtonText} > update my Lunch </Text>
            </Pressable>
        </View>
      </View>
      ):(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>Dinner meals</Text>
        </View>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
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
  }
  });

export default DayPlanning;
