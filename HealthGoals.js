import { useState } from 'react';
import React from 'react';
import { View, Text } from 'react-native';
import { TextInput,Pressable,StyleSheet  } from 'react-native';
import {Picker} from '@react-native-picker/picker';

const HealthGoals = () => {
  const [age,setAge]=useState('');
  const [gender,setGender]=useState('');
  const [height,setHeight]=useState('');
  const [weight,setWeight]=useState('');
  const [activityLevel,setActivityLevel]=useState('');
  const [healthGoal,setHealthGoal]=useState('');
  const [isValidtedForm,setIsValidatedForm] = useState(false);

  const handleAgeChange= (text)=>{
    setAge(text);
    validateEntries();
  }

  const handleGenderChange= (text)=>{
    setGender(text);
    validateEntries();
  }

  const handleHeightChange= (text)=>{
    setHeight(text);
    validateEntries();
  }

  const handleWeightChange= (text)=>{
    setWeight(text);
    validateEntries();
  }

  const handleActivityLevelChange= (text)=>{
    setActivityLevel(text);
    validateEntries();
  }

  const handleHealthGoalChange= (text)=>{
    setHealthGoal(text);
    validateEntries();
  }

  const handleCalculate = () =>{
    console.log(isValidtedForm);
  }
  const validateEntries = () =>{
    if(age && gender && height && weight && activityLevel && healthGoal){
        setIsValidatedForm(true);
    }
    else{
      setIsValidatedForm(false);
    }
}
  return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.InputName}>Age </Text>
          <TextInput style={styles.input} value={age} onChangeText={handleAgeChange}></TextInput>
          <Text style={styles.InputName}>Gender </Text>
          <TextInput style={styles.input} value={gender} onChangeText={handleGenderChange}></TextInput>
          <Text style={styles.InputName}>Height </Text>
          <TextInput style={styles.input} value={height} onChangeText={handleHeightChange}></TextInput>
          <Text style={styles.InputName}>Weight </Text>
          <TextInput style={styles.input} value={weight} onChangeText={handleWeightChange}></TextInput>
          <Text style={styles.InputName}>Activity level </Text>
          <Picker style={styles.input} selectedValue={activityLevel} onValueChange={handleActivityLevelChange}>
                  <Picker.Item label="sedentary" value="light" />
                  <Picker.Item label="light exercise" value="moderate" />
                  <Picker.Item label="heavy exercise" value="heavy" />
                  <Picker.Item label="extra active" value="extra" />
          </Picker>
          <Text style={styles.InputName}>Health goal </Text>
          <TextInput style={styles.input} value={healthGoal} onChangeText={handleHealthGoalChange}></TextInput>
        </View>
        <View style={styles.form}>
          <Pressable style={styles.button} onPress={handleCalculate} disabled={!isValidtedForm}>
            <Text style={styles.ButtonText}> calculate </Text>
          </Pressable>
        </View>
    </View>
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
    backgroundColor: 'red',
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
