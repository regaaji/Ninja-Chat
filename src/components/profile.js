import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, ImageBackground, AsyncStorage, TextInput } from 'react-native'
import { Icon, ListItem, Left, Body, Text } from 'native-base'
import User from '../Login/User';
import firebase from "../../config/firebase";

export default class Profile extends Component {

    constructor(props) {
    super(props);
    this.state = {
        id_user: '',
        name: User.name,

    };
        //console.log('kamper', this.props.route.params.namechat)
  }

    componentDidMount(){
    AsyncStorage.getItem('uid').then(row => {
       this.setState({
          id_user: row
        })
      console.log('data_profile_id', row)
    })

   }


   changeName = async () => {
    if (this.state.name.len.gth < 3) {
        alert('Error', 'Ple')
    }
   }

   handleChange = key => val => {
    this.setState({[key]: val})
   }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                     <Image source={require("../../assets/icon/Back-Icon.png")} style={{width: 20, height: 20}} tintColor='black'/>
                </TouchableOpacity>
                <ImageBackground source={require("../../assets/images/backgrounds.png")} style={styles.bacImage}>
                    <Image
                        source={require("../../assets/icon/account.png")}
                        style={styles.image} />
                </ImageBackground>
                <View style={styles.parentText}>
                    <ListItem icon> 
                        <Left>
                            <Image source={require("../../assets/icon/account.png")} style={{width: 20, height: 20}} tintColor='black'/>
                        </Left>
                        <Body>
                            <Text>{User.name}...</Text>
                        </Body>
                    </ListItem>

                    <TextInput
                        style={styles.input}
                        value={this.state.name}
                        onChangeText={this.handleChange}
                    />
                </View>

               
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        borderRadius: 100,
        alignItems: 'center',
        alignContent: 'center'
    },
    Text: {
        fontSize: 22,
        color: '#2b2b2b'
    },
    parentText: {
        flex: 1,
        marginVertical: 20,
        marginHorizontal: 17,
    },
    bacImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    back: {
        marginLeft: 7,
        marginTop: 7,
        padding: 10,
        position: 'absolute',
        zIndex: 999,
    },
    logo: {
        width: 150,
        resizeMode: 'contain',
        position: 'absolute',
        top: -739,
        left: 110
    },
    textconnect: {
        height: 70,
        resizeMode: 'contain',
        position: 'absolute',
        top: -399,
        left: -260
    },
      input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '80%',
    marginBottom: 10,
    borderRadius: 5
  },
  btnText: {
    color: 'darkblue',
    fontSize: 20
  }
})