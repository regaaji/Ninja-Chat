import React from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert, AsyncStorage, Image, ScrollView } from 'react-native'
import {Button} from 'native-base'
import User from './User';
import firebase from "../../config/firebase";
 
export default class Login extends React.Component {
  state = {
    id_user: '',
    email: '',
    password: ''
  }

  handleChange = key => val => {
    this.setState({
      [key] : val
    })
  }

  componentDidMount(){
    AsyncStorage.getItem('uid').then(val => {
      if (val) {
        this.setState({
          id_user: val
        })
        this.props.navigation.navigate('Home');
      } else {
        this.props.navigation.navigate('Login');
      }

      console.log('data', val)
    })
  }

  submitForm = async () => {
     
    if (this.state.email.length < 4) {
      Alert.alert('Error, Wrong email')
    } else if(this.state.password.length < 8){
      Alert.alert('Error, Password must be more than 8 characters')
    } else {

          await firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.password)
          .then(async result => {
            console.log("result", result.user);

             // User.email = this.state.email;
              //User.password = this.state.password;
             User.name = result.user.displayName;
             User.id_user = result.user.uid;

            AsyncStorage.setItem("name", result.user.displayName)
            AsyncStorage.setItem("uid", result.user.uid)
           // firebase.database().ref('user/', User.name).set({name: this.state.name})
            this.props.navigation.navigate('Home');
            
          });

        // await AsyncStorage.setItem('uid', this.state.phone)
        //  User.phone = this.state.phone;
        // this.props.navigation.navigate('Home');
    } 
  }

  render() {
    return (
   
      <View style={styles.container}>
        <Text style={styles.title}>Here To Get Welcomed !</Text>
        <TextInput 
          placeholder="Email" 
          keyboardType="email-address"
          style={styles.input}
          value={this.state.email}
          onChangeText={this.handleChange('email')}
          />
        <TextInput 
          placeholder="Password" 
           secureTextEntry
          style={styles.input}
          value={this.state.password}
          onChangeText={this.handleChange('password')}
          />
        <TouchableOpacity onPress={this.submitForm} style={styles.wrapper}>
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>


        <Text style={{ color: '#0098DB', fontFamily: "Airbnb Cereal App",  marginLeft: -30, marginTop: 20}}>You don't have an account,</Text>
        <Button transparent style={{marginLeft: 190, marginTop: -35}} onPress={() => this.props.navigation.navigate('Register')}>
        <Text style={{ color: '#0098DB', fontFamily: "Airbnb Cereal App", textDecorationLine:'underline' }}>Sign Up</Text>
        </Button>

      </View>
  
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#0098DB',
    width: '90%',
    marginBottom: 15,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  btnText: {
    fontSize: 15, 
    fontWeight: 'bold', 
    color: 'white', 
    textTransform: 'uppercase', 
    textAlign: 'center'
  },
    btnText1: {
    fontSize: 12, 
    paddingTop: 10,
    color: 'black', 
    textAlign: 'center'
  },
  wrapper: {
    backgroundColor: '#0098DB', borderRadius: 25, padding: 10, width: '90%', marginTop: 40
  },
  title: {
    fontSize: 40, 
     marginLeft: 18,
    marginBottom: 30,
    color: '#0098DB'
  }
 
})