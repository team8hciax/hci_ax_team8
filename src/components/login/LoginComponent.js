import React, { Component } from 'react';
import { Alert, AsyncStorage, StyleSheet, Image ,KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import LoginAuth from '../../services/LoginList';
import logoimage from '../../../assets/images/mediasist.png';
import { FontAwesome, } from '@expo/vector-icons';



import {
  Container,
  Form,
  Item as FormItem,
  Label,
  Input,

} from 'native-base';

export default class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
      date: new Date(),
    };
  }
  
  reset(){
    AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)
  }
  onLogin() {
    const { username, password } = this.state;
    var LoginStatus = LoginAuth.Login({username,password});
    
    console.log(LoginStatus)
    if (LoginStatus == "Doctor")
    {
      //Doctor Page
      this.setState({username:'',password:''});
      Actions.doctor();
    }
    else if (LoginStatus == "Nurse")
    {
      //Nurse Page
      this.setState({username:'',password:''});
      Actions.nurse({title: this.state.date.toLocaleDateString()});
    }
   else{
    Alert.alert('Wrong Username or Password');
   }
  }

  render() {
    return (
      <Container style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <Container style={styles.imagecontainer}>
     <Image source={logoimage} style={styles.image} />
     </Container>
     <KeyboardAvoidingView  
          style={styles.keyboardavoidview}
          behavior="padding"
          keyboardVerticalOffset={-20} 
          >
      <Form style={{marginBottom:100}}>
          <FormItem floatingLabel>
          <Label>Username</Label>
          <Input 
           value={this.state.username}
           onChangeText={(username) => this.setState({ username })}
          ></Input>
          </FormItem>
          <FormItem  floatingLabel>
          <Label>Password</Label>
          <Input secureTextEntry={true} 
           value={this.state.password}
           onChangeText={(password) => this.setState({ password })} ></Input>
          </FormItem>
        <Button
          title={'Login'}
          textStyle={{ fontWeight: 'bold', fontSize: 20 }}
          buttonStyle={styles.login}
          onPress={this.onLogin.bind(this)}
        />

        {/* reset button for async store */}
        <FontAwesome
                          name='refresh'
                          size={20}
                          color="black"
                          onPress= {this.reset.bind(this)}
                          style={styles.resetbutton}
                        />
        
      </Form>
      </KeyboardAvoidingView>

      </Container>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  login: {
    marginTop:10,
    height: 44,
    padding: 10,
    backgroundColor: "#006600"
  },

image:{
  height:'90%',
  width:'90%',

},
  imagecontainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboardavoidview:{
    padding:0
  },
  resetbutton:{
    position:'absolute',
    height:50,
    width:50,
    alignSelf:'flex-end',
    marginTop:230
  },
});
