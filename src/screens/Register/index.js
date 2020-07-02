import React from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert, AsyncStorage } from 'react-native'
import {Button} from 'native-base'
import User from '../Login/User';
import firebase from "../../config/firebase";


export default class Register extends React.Component {
  state = {
    phone: '',
    name: '',
    email: '',
    password: ''
  }

  handleChange = key => val => {
    this.setState({
      [key] : val
    })
  }

  componentDidMount(){
    AsyncStorage.getItem('userData').then(val => {
      if (val) {
        this.setState({
          phone: val
        })
        this.props.navigation.navigate('Login');
      } else {
        this.props.navigation.navigate('Register');
      }

      console.log('data', val)
    })
  }

  submitForm = async () => {
    if (this.state.email.length < 4) {
       Alert.alert('Error, Email must be more than 4 characters and have @ symbol')
    } else if(this.state.password.length < 8){
      Alert.alert('Error, Password must be more than 8 characters')
    } else if(this.state.phone.length < 10) {
       Alert.alert('Error, Phone must be more than 10 characters')
    } else if(this.state.name.length < 4){
       Alert.alert('Error, Name must be more than 4 characters')
    } else {
      console.log('email', this.state.email);
      User.email = this.state.email;
      User.name = this.state.name;
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(({ user }) => {
          console.log("user", user); 
          let userf = firebase.auth().currentUser;
          userf.updateProfile({
            displayName: this.state.name,
          });
          firebase
            .database()
            .ref("user/" + user.uid)
            .set({
              name: this.state.name,
              phone: this.state.phone
            });
        });
      this.props.navigation.navigate("Login");

    }
  }

  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.title}>Here To Get Welcomed !</Text>

         <TextInput 
          placeholder="Name" 
          style={styles.input}
          value={this.state.name}
          onChangeText={this.handleChange('name')}
        />




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

            <TextInput 
          placeholder="Phone" 
          keyboardType="number-pad"
          style={styles.input}
          value={this.state.phone}
          onChangeText={this.handleChange('phone')}
        />

       
        <TouchableOpacity onPress={this.submitForm} style={styles.wrapper}>
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>


             <Text style={{ color: '#0098DB', fontFamily: "Airbnb Cereal App",  marginLeft: -35, marginTop: 20}}>You already have an account,</Text>
        <Button transparent style={{marginLeft: 200, marginTop: -35}} onPress={() => this.props.navigation.navigate('Login')}>
        <Text style={{ color: '#0098DB', fontFamily: "Airbnb Cereal App", textDecorationLine:'underline' }}>Sign In</Text>
        </Button>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  input: {
    padding: 25,
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