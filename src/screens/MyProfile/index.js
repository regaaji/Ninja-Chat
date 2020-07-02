import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, ActivityIndicator, ImageBackground, AsyncStorage, TextInput, ScrollView } from 'react-native'
import { Icon, ListItem, Left, Body, Text, Button } from 'native-base'
import User from '../Login/User';
import firebase from "../../config/firebase";

export default class MyProfile extends Component {

    constructor(props) {
    super(props);
    this.state = {
        id_user: '',
        name: '',
        phone: User.phone,
        //imageSource: User.image ? {uri: User.image} : require("../../assets/icon/account.png"),
        imageSource: User.image ? {uri: User.image} : require("../../assets/icon/account.png"),
        upload: false

    };
        console.log('kamper', this.state.phone)
  }

    componentDidMount(){
        AsyncStorage.getItem('uid').then(row => {
           this.setState({
              id_user: row
            })

           firebase.database()
           .ref(`user/${row}`).on('value',(snapshot)=>{
                console.log('snaphost', snapshot.val().phone);

                    this.setState({
                        phone: snapshot.val().phone,
                    })

                User.phone =  snapshot.val().phone;
                User.image =  snapshot.val().image;

            })

          console.log('data_profile_id', row)
        }),

        // AsyncStorage.getItem('name').then(Datarow => {
        //    if (DataRow !== null) {
        //         this.setState({
        //           name: Datarow
        //         })
        //    }
          
        // })

         AsyncStorage.getItem('name', (error, result) => {
                console.log('data_profile_name', result)
                User.name = result;
                if (result !== null) {
                
                    this.setState({
                        name: result,
                    });
                }

         });

         

   }


   

    render() {
       
       
        return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                     <Image source={require("../../assets/icon/Back-Icon.png")} style={{width: 20, height: 20}} tintColor='black'/>
                </TouchableOpacity>
                <ImageBackground source={require("../../assets/images/backgrounds.png")} style={styles.bacImage}>
               
                        {
                            this.state.upload ? <ActivityIndicator size="large"/> :
                              <Image
                             source={this.state.imageSource}
                            style={styles.image} />
                        }
                          
                   
                </ImageBackground>
                <View style={styles.parentText}>


                      <ListItem icon>
		                <Left>
		                    <Button style={{ backgroundColor: '#0098DB' }}>
		                         <Image source={require("../../assets/icon/phone.png")} style={{width: 20, height: 20}} tintColor='white'/>
		                    </Button>
		                    <Text style={{marginLeft: 10, fontSize: 20}}>{User.phone ? User.phone : "Empty"}</Text>
		                </Left>
		                <Body>
		                </Body>
		                
		            </ListItem>
                    

                    <ListItem icon>
		                <Left>
		                    <Button style={{ backgroundColor: '#0098DB', marginRight: 10, marginTop: 50}}>
		                         <Image source={require("../../assets/icon/account.png")} style={{width: 20, height: 20}} tintColor='white'/>
		                    </Button>
		                     <Text style={{fontSize: 20,marginTop: 50}}>{User.name  ? User.name : "Empty" }</Text>
		                </Left>
		                <Body>
		                </Body>
		                
		            </ListItem>
                     
                  
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
        marginTop: 50,
        marginLeft: 90
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

})