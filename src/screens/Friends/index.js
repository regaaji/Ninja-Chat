import React from 'react'
import { Text, StyleSheet, View, AsyncStorage, FlatList, TouchableOpacity, Image, SafeAreaView, Spinner } from 'react-native'
import firebase from "../../config/firebase"


// class FlatListItem extends React.Component {
//     render() {
//         return (
//             <View style={styles.container}>
//                 <TouchableOpacity
//                     onPress={() => { this.props.navigation.navigate('Chat') }}
//                     style={styles.button}>
//                     <View style={styles.parenImage}>
//                         <Image
//                             source={{ uri: this.props.item.image }}
//                             style={styles.image} />
//                     </View>
//                     <View style={styles.content}>
//                         <Text style={styles.TextName}>{this.props.item.name}</Text>
//                         <Text style={styles.TexContent}>{this.props.item.status}</Text>
//                     </View>
//                 </TouchableOpacity>
//             </View>
//         )
//     }
// }

 class Friends extends React.Component {
     state = {
        user: [],
        myuid: ''
     }

     async componentDidMount() {
        // this.setState({
        //     myuid : await AsyncStorage.getItem('uid')
        // })
        // let dbRef = firebase.database().ref('user');
        // dbRef.on('child_added', val => {
        //     let person = val.val();
        //     person.uid = val.key;
        //      this.setState((prevState) => {
        //             return { 
        //                 user: [...prevState.user, person]
        //            }
        //      })

        //     //   if (person.uid === ) {
        //     //   User.name = person;
        //     // } else {
        //     //   this.setState(prevState => {
        //     //     console.log("pevstae", prevState);
        //     //     return {
        //     //       user: [...prevState.user, person]
        //     //     };
        //     //   });
        //     // }

        //     console.log('myuid', this.state.myuid)

        // })


        AsyncStorage.getItem("uid", (error, result) => {
          if (result) {
            // firebase
            //   .database()
            //   .ref("user")
            //   .on("child_added", val => {
            //     const person = val.val();
            //     person.uid = val.key;
            //     if (person.uid === result) {
            //       User.name = person;
            //     } else {
            //       this.setState(prevState => {
            //         console.log("pevstae", prevState);
            //         return {
            //           user: [...prevState.user, person]
            //         };
            //       });
            //     }
            //   });
        
          }
        });
    }
    render() {
        console.log('result_user', this.props.uid)
        return (
            <View>
             
                 {this.state.user ? (
              this.state.user.map((item, index) => {
                return (
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Chat", item)}
                    style={styles.button}>
                    <View style={styles.parenImage}>
                        <Image
                            source={{ uri: item.image }}
                            style={styles.image} />
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.TextName}>{item.name}</Text>
                        <Text style={styles.TexContent}>{item.status}</Text>
                    </View>
                </TouchableOpacity>
                   );
              })
            ) : (
              <Spinner color='blue' />
            )}

            </View>

        )
    }
}

export default Friends;

const styles = StyleSheet.create({
    TextName: {
        fontSize: 20
    },
    button: {
        padding: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
})