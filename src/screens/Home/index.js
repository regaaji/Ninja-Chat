import React, { Component } from "react";
import { View, Dimensions, StyleSheet, Image, AsyncStorage } from "react-native";
// import AsyncStorage from "@react-native-community/async-storage";
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Right,
  Button,
  Icon,
  Tabs,
  Tab,
  TabHeading,
  Text
} from "native-base";
// import User from "./auth/userdata";
// import Chat from "../components/chat";
// import Friends from "../components/friends";
// import Geolocation from "react-native-geolocation-service";
// import firebase from "firebase";
import Menu, { MenuItem } from "react-native-material-menu";
 import Maps from "../../components/maps";
 import Friends from "../../components/friends";

class Home extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   latitude: '',
    //   longitude: ''
    // }
    // this.getLocation();
    // this.updateLocation();
  }

  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  showMenu = () => {
    this._menu.show();
  };

  // async componentDidMount() {
  //   const myuid = await AsyncStorage.getItem("uid");
  //   let dbRef = firebase.database().ref("user/" + myuid);
  //   dbRef.ref.once("value").then(snapshot => {
  //     const name = snapshot.child("name").val();
  //     const image = snapshot.child("image").val();
  //     User.name = name;
  //     User.image = image;
  //     // console.warn(User.name)
  //     // console.warn(name)
  //   });
  // }

  hideLogout = async () => {
  //   let keys = ["uid", "name", "image"];
  //   await AsyncStorage.multiRemove(keys, error => {
  //     this.props.navigation.navigate("Login");
  //     console.log(error);
  //   });

    await AsyncStorage.clear();
    this.props.navigation.navigate("Login");
  };


  render() {
    return (
      <Container>
        <Header hasTabs style={styles.bgcolorheader}>
          <Left />
          <Body>
            <Title style={styles.titlecolorheader}>Ninja Chat</Title>
          </Body>
          <Right>
            <Menu
              ref={this.setMenuRef}
              button={
                <Button transparent onPress={this.showMenu}>
                   <Image source={require("../../assets/icon/more.png")} style={{width: 20, height: 20}} tintColor='white'/>
                </Button>
              }
            >

              <MenuItem
                onPress={() => this.props.navigation.navigate("MyProfile")}
              >
                My Profile
              </MenuItem>
              
              <MenuItem
                onPress={() => this.props.navigation.navigate("Profile")}
              >
                Set Profile
              </MenuItem>
              
              <MenuItem onPress={this.hideLogout}>Log Out</MenuItem>
            </Menu>
          </Right>
        </Header>
        <Tabs
          tabContainerStyle={{
            elevation: 0
          }}
        >
          <Tab
            heading={
              <TabHeading style={styles.bgcolorheader}>
                <Image source={require("../../assets/icon/map-marker.png")} style={{width: 20, height: 20}} tintColor='white'/>
                <Text style={styles.titlecolor}>Map</Text>
              </TabHeading>
            }
          >
           <Maps navigation={this.props.navigation}/>
            {/* <Text>MAPS</Text> */}
          </Tab>
          <Tab
            heading={
              <TabHeading style={styles.bgcolorheader}>
                <Image source={require("../../assets/icon/chat.png")} style={{width: 20, height: 20}} tintColor='white'/>
                <Text style={styles.titlecolor}>Chat</Text>
              </TabHeading>
            }
          >
          <Friends navigation={this.props.navigation}/>
           
          </Tab>
          
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  bgcolorheader: {
    backgroundColor: "#0098DB"
  },
  titlecolor: {
    color: "white",
  },
  titlecolorheader: {
      color: "white",
    marginRight: -30,
  },
  iconcolor: {
    color: "white"
  }
});

export default Home;
