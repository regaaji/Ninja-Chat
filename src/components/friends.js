import React from 'react'
import { Text, StyleSheet, View, AsyncStorage, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import firebase from "../config/firebase"
import User from '../screens/Login/User'

class FlatListItem extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                   onPress={() => this.props.navigation.navigate("Chat", {
                      idchat: this.props.item.uid,
                      namechat: this.props.item.name,

                    })}
                    style={styles.button}
                >
                    <View style={styles.parenImage}>
                        <Image
                            source={this.props.item.image ? { uri: this.props.item.image } : require("../assets/icon/account.png")}
                            style={styles.image} />
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.TextName}>{this.props.item.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default class friends extends React.Component {
	 state = {
        user: [],
        id_user: ''
     }

	 async componentDidMount() {
        //  AsyncStorage.getItem('uid').then(row => {
        //     this.setState({
        //           id_user: row
        //     })
        //     let user_id = row
        // })

        // let dbRef = firebase.database().ref('user');
        // dbRef.on('child_added', val => {
        //     let person = val.val();
        //     person.uid = val.key;
             // this.setState((prevState) => {
             //        return { 
             //            user: [...prevState.user, person]
             //       }
             // })
              


            // if (person.uid === this.state.user.uid) {
            //       User.name = person.name;
            //     } else {
            //       this.setState(prevState => {
            //         console.log("pevstae", prevState);
            //         return {
            //           user: [...prevState.user, person]
            //         };
            //     });
            // }   


        // })

        AsyncStorage.getItem("uid", (error, result) => {
              if (result) {
                firebase
                  .database()
                  .ref("user")
                  .on("child_added", val => {
                    const person = val.val();
                    person.uid = val.key;
                    if (person.uid === result) {
                      User.name = person.name;
                      User.image = person.image ? person.image : null
                    } else {
                      this.setState(prevState => {
                        console.log("pevstae", prevState);
                        return {
                          user: [...prevState.user, person]
                        };
                      });
                    }
                  });
              }
            });
    }
	render() {
		console.log('result_user', this.state.user)
		return (
			<SafeAreaView>
				<FlatList
                    data={this.state.user}
                    numColumns={1}
                    horizontal={false}
                    renderItem={({ item, index }) => {
                        return (
                            <FlatListItem navigation={this.props.navigation} item={item} index={index}>

                            </FlatListItem>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
			</SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({
	TextName: {
		fontSize: 20
	},
	button: {
    alignItems: 'center',
    flexDirection: 'row',
		padding: 10,
		borderBottomColor: '#ccc',
		borderBottomWidth: 1
	},
  image: {
    width: 32,
    height: 32,
    resizeMode: 'cover',
    borderRadius: 32,
    marginRight: 5
  }
})