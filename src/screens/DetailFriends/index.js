import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, ImageBackground,  Dimensions } from 'react-native'
import { Icon, ListItem, Left, Body, Text, Button } from 'native-base'
import MapView, { Marker } from "react-native-maps"
import User from '../Login/User';
import firebase from "../../config/firebase";
console.disableYellowBox = true;
export default class DetailFriends extends React.Component {
	 constructor(props) {
    super(props);
    this.state = {
    	nameFriends: this.props.route.params.name, 
    	phoneFriends: this.props.route.params.phone, 
        latitudeFriends: this.props.route.params.latitude,
        longitudeFriends: this.props.route.params.longitude,
        imageSource: this.props.route.params.image !== undefined ? {uri: User.foto} : require("../../assets/icon/account.png"),
        //imageSource:  '',
        arrMarker : [
            {latitude:this.props.route.params.latitude, longitude: this.props.route.params.longitude},
          ],

    };

    console.log('kamperr', this.state.latitudeFriends)
    console.log('kamperr22222', this.state.longitudeFriends)
    // console.log('ineke', User.image)
  }

  componentDidMount() {

		 this.getImage();
	}

	async getImage(){

		const ref = firebase.storage().refFromURL(this.props.route.params.image);
		const url = await ref.getDownloadURL();
		User.foto = url;
		 //this.setState({ imageSource: url })
		// if (url !== null) {

		// } else {
		// 	this.setState({ imageSource: require("../../assets/icon/account.png") })
		// }

	}

	render() {
		return (
			 <View style={{ flex: 1 }}>
                  <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                     <Image source={require("../../assets/icon/Back-Icon.png")} style={{width: 20, height: 20}} tintColor='black'/>
                </TouchableOpacity>
                 <View style={styles.view}> 
                 <MapView
                    style={styles.map}
                    initialRegion={{
                      latitude: this.state.latitudeFriends,
                      longitude: this.state.longitudeFriends,
                      latitudeDelta: 0.3922,
                      longitudeDelta: 0.3421,
                    }}>
                   
                  

                        {this.state.arrMarker.map((singleMarker, index) => (
                          <Marker coordinate={singleMarker} key={index} />
                        ))}
              
                  </MapView>
                  </View>
                    
                      <Image style={styles.avatar} source={this.state.imageSource}/>    
                        
                       <View style={styles.body}>
                            <View style={styles.bodyContent}>
                               <Text style={styles.name}>{this.state.nameFriends ? this.state.nameFriends: "Empty"}</Text>
                                <Text style={styles.info}> Phone: {this.state.phoneFriends ? this.state.phoneFriends: "Empty" }</Text>
                              
                               
                                       
                             
                            </View>
                        </View>

                
            </View>
		)
	}
}

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    view: {
    ...StyleSheet.absoluteFillObject,
    height: 300,
    width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
    avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:250
  },
  name:{
    fontSize:28,
    color: "black",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "black",
    marginTop:10
  },
  body:{
    marginTop:380,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
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
    color: 'darkblue',
    fontSize: 20
  },
  change: {
    alignItems: 'center',
  }
})