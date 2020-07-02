import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, ActivityIndicator, ImageBackground, AsyncStorage, TextInput, ScrollView } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { Icon, ListItem, Left, Body, Text } from 'native-base'
import User from '../Login/User';
import firebase from "../../config/firebase";

export default class Profile extends Component {

    constructor(props) {
    super(props);
    this.state = {
        id_user: '',
        name: '',
        phone: User.phone,
        //imageSource: User.image ? {uri: User.image} : require("../../assets/icon/account.png"),
        imageSource: User.image !== undefined  ? {uri: User.image} : require("../../assets/icon/account.png"),
        upload: false

    };
        console.log('kamper', this.state.imageSource)
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


   changeName = async () => {
    console.log('asem', this.state.imageSource)
    if (this.state.name.length < 3) {
        alert('Please enter valid name');
    } else if(this.state.phone.length < 10) {
        alert('Please enter valid phone');
    } else if(this.state.imageSource == 6) {
        alert('Please enter valid image');
    } else {
      // firebase
      //   .database()
      //   .ref('user')
      //   .child(this.state.id_user)
      //   .set({name: this.state.name, phone: this.state.phone});

        let userf = firebase.auth().currentUser;
          userf.updateProfile({
            displayName: this.state.name,
          });
        User.name = this.state.name;
        User.phone = this.state.phone;
        this.updateUser();
        ///alert('success', 'Name changed successful');
    }
   }

   changeImage = async () => {
        const options = {
            quality: 0.7, allowsEditing: true, mediaType: 'photo', noData: true,
            storageOptions: {
                skipBackup: true, waitUntilSaved: true, path: 'images', cameraRoll: true
            }
    }
        ImagePicker.showImagePicker(options, response => {
            if (response.error) {
                console.log(error);
            } else if(!response.didCancel){
                this.setState({
                    upload: true,
                    imageSource: {uri: response.uri}
                }, this.uploadFile)
            }
        })
   }

   updateUser = () => {
       firebase
         .database()
         .ref("user/" + this.state.id_user)
         .set(User);
        alert('success', 'Successful Saved');
   }

   updateUserImage = (imageUrl) => {
    User.image = imageUrl
        //firebase
        // .database()
        // .ref('user')
        // .child(this.state.id_user)
        // .set({name: User.name, image: imageUrl});
        //  firebase
        //  .database()
        //  .ref("user/" + this.state.id_user)
        //  .set({name: User.name, phone: User.phone, image: imageUrl});
        // alert('success', 'Image changed successful');

        this.updateUser()
        this.setState({upload: false, imageSource: {uri: imageUrl}})
   }

   uploadFile = async () => {
     const file = await this.uriToBlob(this.state.imageSource.uri);
     firebase.storage().ref(`profile_picture/${User.name}.png`)
            .put(file)
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => this.updateUserImage(url))
            .catch(error => {
                this.setState({
                    upload: false,
                    imageSource: require("../../assets/icon/account.png")
                });
                alert('Error', 'Error on upload image')
            })
   }

   uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            resolve(xhr.response);
        };

        xhr.onerror = function() {
            reject(new Error('Error on upload image'));
        };

        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null)
    })
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
                    <TouchableOpacity onPress={this.changeImage}>
                        {
                            this.state.upload ? <ActivityIndicator size="large"/> :
                              <Image
                             source={this.state.imageSource}
                            style={styles.image} />
                        }
                          
                      </TouchableOpacity>
                </ImageBackground>
                <View style={styles.parentText}>
                    
                    
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        onChangeText={this.handleChange('name')}
                    />
                     <TextInput
                        style={styles.input}
                        placeholder="Phone"
                        onChangeText={this.handleChange('phone')}
                    />


                     <TouchableOpacity style={styles.change} onPress={this.changeName}>
                        <Text style={styles.btnText}>Change</Text>
                     </TouchableOpacity>
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
        alignItems: 'center',
        marginTop: 20,
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
    color: 'white',
    fontSize: 20
  },
  change: {
    alignItems: 'center',
    backgroundColor: '#0098DB',
    padding: 10,
    borderRadius: 25,
    marginTop: 30
  }
})