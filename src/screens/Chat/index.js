import React from 'react'
import {  Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Text, StyleSheet, View, SafeAreaView, TextInput, TouchableOpacity, AsyncStorage, FlatList, Dimensions, Image } from 'react-native'
import User from '../Login/User';
import firebase from "../../config/firebase";

export default class Chat extends React.Component {

	

	constructor(props) {
    super(props);
    this.state = {
   		 textMessage: '',
		id_user: '',
		myuid: this.props.route.params.idchat,
		name: '',
		nameListChat: this.props.route.params.namechat,
		messageList: [],

    };
      	//console.log('kamper', this.props.route.params.namechat)
  }

	handleChange = key => val => {
		this.setState({[key]: val})
	}

	convertTime = (time) => {
		let d = new Date(time);
		let c = new Date();
		let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
		result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
		if (c.getDay() !== d.getDay()) {
			result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
		}

		return result
	}

	sendMessage = async () => {
		if (this.state.textMessage.length > 0) {
	      let msgId = firebase
	        .database()
	        .ref("messages")
	        .child(this.state.myuid)
	        .child(this.state.id_user)
	        .push().key;
	      let updates = {};
	      let message = {
	        message: this.state.textMessage,
	        time: firebase.database.ServerValue.TIMESTAMP,
	        from: this.state.name
	      };
	      updates[
	        "messages/" + this.state.id_user + "/" + this.state.myuid + "/" + msgId
	      ] = message;
	      updates[
	        "messages/" + this.state.myuid + "/" + this.state.id_user + "/" + msgId
	      ] = message;
	      // console.warn(updates)
	      firebase
	        .database()
	        .ref()
	        .update(updates);
	      this.setState({ textMessage: "" });
	    }
	}

	componentDidMount(){
    AsyncStorage.getItem('uid').then(valid => {
       this.setState({
          id_user: valid
        })
      console.log('data_chat', valid)
	      	firebase
	      .database()
	      .ref("messages")
	      .child(this.state.myuid)
	      .child(valid)
	      .on("child_added", value => {
	         // console.log('value ',value)
	         // console.log('value dan val',value.val())
	        this.setState(previousState => {
	          return {
	            messageList: [...previousState.messageList, value.val()]
	          };
	        });
	        // console.warn(this.state.messagesList)
	      });

    }),
    AsyncStorage.getItem('name').then(row => {
       this.setState({
          name: row
        })
      console.log('data_chat_name', row)
    })

  }

//  componentWillMount(){
  	// firebase
   //    .database()
   //    .ref("messages")
   //    .child(this.state.id_user)
   //    .child(this.state.id_user)
   //    .on("child_added", value => {
   //       console.log('value ',value)
   //      // console.log('value dan val',value.val())
   //      // this.setState(previousState => {
   //      //   return {
   //      //     messagesList: [...previousState.messageList, value.val()]
   //      //   };
   //      // });
   //      // console.warn(this.state.messagesList)
   //    });


 // }


  renderRow= ({item}) => {
  	return(
  		
      
  		<View style={{
  			flexDirection: 'row',
  			width: '60%',
  			alignSelf: item.from===this.state.name ? 'flex-end' : 'flex-start',
  			backgroundColor: item.from===this.state.name ? '#00bcd4' : '#0779e4',
  			borderRadius: 5,
  			marginBottom: 10
  		}}
  		>
  			<Text style={{color: '#fff', padding: 7, fontSize: 16}}>
  				{item.message}
  			</Text>
  			<Text style={{color: '#eee', padding: 3, fontSize: 12}}>
  				{this.convertTime(item.time)}
  			</Text>
  		</View>
  	)
  }

	render() {
		console.log('data_messageList',  this.state.messageList)
		let {height, width} = Dimensions.get('window');
		const keyboardVerticalOffset = Platform.OS === 'android' ? 0 : 0
		return (
			
		  <KeyboardAvoidingView
                behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}
            >
			<SafeAreaView> 
				<View style={{backgroundColor: '#0779e4', padding: 10}}>
				<View style={{flexDirection: 'row', alignItems:'center',}}>
		      		<TouchableOpacity  style={{ flex: 1, }} onPress={() => this.props.navigation.goBack()}>
		      		 <Image source={require("../../assets/icon/Back-Icon.png")} style={{width: 20, height: 20}}/> 
		      		</TouchableOpacity>
		          <Text style={{ flex: 1, textAlign: 'center', color: 'white', fontSize: 20}}>{this.state.nameListChat}</Text>
		          <Text style={{ flex: 1, textAlign: 'right'}}></Text>
		        </View>
		        </View>

				<FlatList
					style={{padding: 10, height: height * 0.8}}
					data={this.state.messageList}
					renderItem={this.renderRow}
					keyExtractor={(item, index) => index.toString()}
				/>


				
	            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 5,   justifyContent: "flex-end",}}>
					<TextInput
						style={styles.input}
						value={this.state.textMessage}
						placeholder="Type message..."
						onChangeText={this.handleChange('textMessage')}
					>
						
					</TextInput>

					<TouchableOpacity onPress={this.sendMessage} style={{paddingBottom: 10, marginLeft: 5, backgroundColor: '#0098DB', padding: 10, borderRadius: 10}}>
						<Text style={styles.btnText}>Send</Text>
					</TouchableOpacity>
				</View>
				</TouchableWithoutFeedback>
			</SafeAreaView>

			 </KeyboardAvoidingView>
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
    width: '80%',
    marginBottom: 10,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  btnText: {
    color: 'white',
    fontSize: 20
  }
})