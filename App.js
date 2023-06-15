import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';

import FoodDatabase from './FoodDatabase';
import MealPlanning from './MealPlanning';
import HealthGoals from './HealthGoals';
import DayPlanning from './DayPlanning';

const Tab= createBottomTabNavigator();
const Stack = createStackNavigator();

function MealPlanningStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MealPlanning" component={MealPlanning} options={{ headerShown: false }} />
      <Stack.Screen name="DayPlanning" component={DayPlanning} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown : true,
            tabBarStyle: {  
              backgroundColor: 'white',
              position: 'absolute',
              bottom:40,
              marginHorizontal:20,
              height: 60,
              borderRadius:50,
              shadowColor:"#000",
              shadowOpacity:0.10,
              shadowOffset:{
                width:10,
                height:10
              }
             },
          }}
        >
        <Tab.Screen 
        name={"Health Goals"} 
        component={HealthGoals}
        options={{
          tabBarShowLabel:false,
          tabBarLabel: 'Health Goals',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="heart" color={focused ? 'red':'black'} size={40} position={'absolute'} top={'35%'}/>
          ),
        }}>
        </Tab.Screen>
        <Tab.Screen 
        name={"Food Database"} 
        component={FoodDatabase}
        options={{
          tabBarShowLabel:false,
          tabBarLabel: 'Food Database',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="database" color={focused ? 'red':'black'} size={40} position={'absolute'} top={'35%'} />
          ),
        }}
        ></Tab.Screen>
        <Tab.Screen 
        name={"Meal Planning"} 
        component={MealPlanningStack}
        options={{
          tabBarShowLabel:false,
          tabBarLabel: 'Meal Planning',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="food-apple-outline" color={focused ? 'red':'black'} size={40} position={'absolute'} top={'35%'}/>
          ),
        }}
        ></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

