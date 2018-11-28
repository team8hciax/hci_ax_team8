import React, { Component } from 'react';
import { AsyncStorage, StyleSheet } from 'react-native';
import { Container, Text, List, ListItem} from 'native-base';
import PATIENTLIST from '../../services/PatientList';
import { AntDesign } from '@expo/vector-icons';


class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      m: []
    };
  }

  componentDidMount() {
    this.getValue()

    PATIENTLIST.patientsName.map((item) => {
      AsyncStorage.getItem(item).then((result) => {
        if (result != null) {
          const data = JSON.parse(result);
          //update it
          this.setState({ InitMedList: data });
        }
      });
    });

  }
  _defaultValue(item) {
    const data_2 = this.state.InitMedList
    if (data_2.medicine != undefined) {
      const data = data_2.medicine
      for (var i = 0; i < data.medicine.length; i++) {
        if (item == user[i].name) {
          return "green"
        }
      }

    }
  }
  changeButton() {
    this.forceUpdate()
  }

  getValue() {
    PATIENTLIST.patientsName.map((item) => (
      AsyncStorage.getItem(item).then((result) => {
        //  console.log(item)
        const data = JSON.parse(result);
        if (result != null) {
          if (data.medicine.length != null) {
            if(data.medicine.length >=1)
            {
              var med = {
                pn: item,
                noEmpty: true,
                iconColour: "#006600",
                iconType: "checkcircle"
              }
            }
            else
            {
              var med = {
                pn: item,
                noEmpty: false,
                iconColour: "black",
                iconType: "plus"
              }
            }
            this.setState({
              m: this.state.m.concat(med)
            });
          }
        }
        else 
          {
            var med = {
              pn: item,
              noEmpty: false,
              iconColour: "black",
              iconType: "plus"
            }
            this.setState({
              m: this.state.m.concat(med)
            });
          }
        
      })
    ))
  }

  checkEmpty(getName){
    for(var i = 0; i<this.state.m.length;i++){
      if(getName==this.state.m[i].pn){
        return this.state.m[i].iconColour
      }
      else{
        continue
      }
    }
    
  }
  checkIcon(getName){
    for(var i = 0; i<this.state.m.length;i++){
      if(getName==this.state.m[i].pn){
        return this.state.m[i].iconType
      }
      else{
        continue
      }
    }
    
  }
  renderlist = () => (
    <Container>
      {
              this.state.m.map((item, i) => (
                <List key = {i}>
                <ListItem key={i} onPress={() => PATIENTLIST.PatientRoute(item.pn)} >
                  <Text style={{ width: "30%" }}  >{item.pn}</Text>
                  <List style={{ width: "70%" }}>
                  <AntDesign style={{ marginTop:-13,marginLeft: '90%', position: "absolute" }}
                    name={this.checkIcon(item.pn)}
                    size={25 } 
                    color={this.checkEmpty(item.pn)}
                    disabled='' />
                  </List>
                </ListItem>
                </List>
              ))
            }
    </Container>

  )

  render() {
      const content =  this.renderlist();
      return (content);
  }
};
  const styles = StyleSheet.create({
    logout: {
      height: 15,
      position: "absolute",
      right: 0,
      marginRight: 20,
      marginTop: 20,
    },
    header: {
      position: 'absolute',
      paddingTop: 0,
    }
  });



  export default Doctor;
