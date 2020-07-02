import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Splash, Home, Profile, Login, Register, Chat, Friends, DetailFriends, MyProfile}  from '../screens';
const Stack = createStackNavigator(); 

function Router() {
  return (
    <Stack.Navigator >
      <Stack.Screen 
        name="Splash" 
        component={Splash}
        options={{
          headerShown: false
        }} 
      />

       <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{
          headerShown: false
        }}
      />


      <Stack.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{
          headerShown: false
        }}
      />

       <Stack.Screen 
        name="Register" 
        component={Register} 
        options={{
          headerShown: false
        }}
      />
    

      <Stack.Screen 
        name="Chat" 
        component={Chat} 
        options={{
          headerShown: false
        }}
      />

       <Stack.Screen 
        name="Friends" 
        component={Friends} 
        options={{
          headerShown: false
        }}
      />

       <Stack.Screen 
        name="DetailFriends" 
        component={DetailFriends} 
        options={{
          headerShown: false
        }}
      />

       <Stack.Screen 
        name="MyProfile" 
        component={MyProfile} 
        options={{
          headerShown: false
        }}
      />
     
    </Stack.Navigator>
  );
}

export default Router;