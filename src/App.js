/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Router from './router';



const App = () => {
  return (
       <NavigationContainer>
        <Router />
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
