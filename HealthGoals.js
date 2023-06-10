import { useState } from 'react';
import React from 'react';
import { View, Text } from 'react-native';
import { TextInput,Pressable,StyleSheet,ScrollView,Alert   } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'

const activityLevelArray = ["sedentary", "light exercise", "heavy exercise"," moderate exercise", "extra active"]
const healthGoalArray = ["weight loss", "weight maintenance", "weight gain"]
const genderArray=["Male", "Female"]

const HealthGoals = () => {
  const [age,setAge]=useState('');
  const [gender,setGender]=useState('');
  const [height,setHeight]=useState('');
  const [weight,setWeight]=useState('');
  const [activityLevel,setActivityLevel]=useState('');
  const [healthGoal,setHealthGoal]=useState('');

  const handleAgeChange= (text)=>{
    setAge(text);
  }

  const handleHeightChange= (text)=>{
    const formattedText = text.replace(/,/g, ".");
    const parsedHeight = parseFloat(formattedText);
    setHeight(parsedHeight);
  }

  const handleWeightChange= (text)=>{
    const formattedText = text.replace(/,/g, ".");
    const parsedWeight = parseFloat(formattedText);
    setWeight(parsedWeight);
  }

  const handleActivityLevelChange= (text)=>{
    setActivityLevel(text);
  }

  const handleHealthGoalChange= (text)=>{
    setHealthGoal(text);
  }

  const handleGenderChange= (text)=>{
    setGender(text);
  }

  const handleCalculate = () =>{
    BMR=0;
    if(!(age && height && weight && gender && activityLevel && healthGoal)){
      Alert.alert('Validation Error', 'Please fill in all the fields.');
    }else{
      if(gender=="Male"){
        BMR = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age ;
      }else if(gender=="Female"){
        BMR = 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age ;
     }
     if(activityLevel=="sedentary"){
      BMR=BMR*1.2;
     }else if(activityLevel=="light exercise"){
      BMR=BMR*1.375;
     }else if(activityLevel=="moderate exercise"){
      BMR=BMR*1.55;
     }else if(activityLevel=="heavy exercise"){
      BMR=BMR*1.725;
     }else if(activityLevel=="extra active"){
      BMR=BMR*1.9;
     }
     if(healthGoal=="weight loss"){
        BMR = BMR-BMR * 0.1 ;
     }else if(healthGoal=="weight gain"){
        BMR = BMR+BMR * 0.1 ;
     }
     Alert.alert('Validation Error', BMR);
    }
  }

  return (
<ScrollView keyboardShouldPersistTaps='handled' scrollEnabled={false}>
      <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.InputName} >Age </Text>
                <TextInput style={styles.input} onChangeText ={handleAgeChange} inputMode="numeric"></TextInput>
                <Text style={styles.InputName}>Height </Text>
                <TextInput style={styles.input} onChangeText ={handleHeightChange} keyboardType="decimal-pad"></TextInput>
                <Text style={styles.InputName}>Weight </Text>
                <TextInput style={styles.input} onChangeText ={handleWeightChange} keyboardType="decimal-pad"></TextInput>
                <Text style={styles.InputName}>Gender </Text>
                <SelectDropdown
                  data={genderArray}
                  onSelect={(selectedItem) => {
                    handleGenderChange(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem) => {
                    return selectedItem
                  }}
                />
                <Text style={styles.InputName}>Health goal </Text>
                <SelectDropdown
                  data={healthGoalArray}
                  onSelect={(selectedItem) => {
                    handleHealthGoalChange(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem) => {
                    return selectedItem
                  }}
                />
                <Text style={styles.InputName}>Activity level</Text>
                <SelectDropdown
                  data={activityLevelArray}
                  onSelect={(selectedItem) => {
                    handleActivityLevelChange(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem) => {
                    return selectedItem
                  }}
                />
            </View>
          <View style={styles.form}>
            <Pressable style={styles.button} onPress={handleCalculate} >
              <Text style={styles.ButtonText}> calculate </Text>
            </Pressable>
          </View>
      </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100
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
  inputPicker:{
    width: 200,
    height: 50,
    borderColor: 'red',
    marginBottom: 100,
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
  form : {
    paddingTop:30,
  },
  InputName: {
    backgroundColor: 'red',
    borderRadius: 10,
    width: 100,
    borderRadius:5,
    fontWeight: 'bold',
    color:'white',
    overflow:"hidden",
  }
  });

export default HealthGoals;
