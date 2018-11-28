import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Container, Text, List, ListItem, Card, CardItem, Content, Button } from 'native-base';
import MEDICINELIST from '../../services/MedicineList';
import PATIENTLIST from '../../services/PatientList';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
class Nurse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      m: [],
      // disabledButton:false,
    }
    changeButton = this.changeButton.bind(this)
  }
  componentDidMount() {
    this.getMedicine()
    AsyncStorage.getItem("Tim", (err, result) => {
      if (result != null) {
        this.state.notEmpty = true
        // console.log(result)
      }
    })
  }
  getMedicine() {
    PATIENTLIST.patientsName.map((item) => (
      AsyncStorage.getItem(item).then((result) => {
        //  console.log(item)
        const data = JSON.parse(result);
        var mn = []
        var mn2 = []
        if (result != null) {
          if (data.medicine.length > 0) {
            for (var j = 0; j < data.medicine.length; j++) {
              if (data.medicine[j].name != null) {
                mn = mn.concat(data.medicine[j].name)
                mn2 = mn2.concat(data.medicine[j].qty)
              }
              else {
                continue
              }
            }
            var med = {
              pn: item,
              s: mn,
              qty: mn2,
              buttonDisable: false,
              buttonDisable2: true,
              buttonCheckColour: "black",
              buttonCameraColour: "#006600",
              buttonIconn: "checkbox-blank-outline",
              resetColour: "grey"

            }
            this.setState({
              m: this.state.m.concat(med)
            });
          }
        }
      })
    ))
  }

  changeButton = (i) => {
    if(this.state.m[i].buttonDisable == false){
      this.state.m[i].buttonDisable = true
      this.state.m[i].buttonCheckColour = "black"
      this.state.m[i].buttonCameraColour = "grey"
      this.state.m[i].buttonIconn = "checkbox-marked-outline"
      this.forceUpdate();
    }
    else{
      this.state.m[i].buttonDisable = false
      this.state.m[i].buttonCheckColour = "black"  
      this.state.m[i].buttonCameraColour = "#006600"  
      this.state.m[i].buttonIconn = "checkbox-blank-outline"
      this.forceUpdate();
    }
  }
  render() {
    return (

      <Container>
        
        <Content>
          <List>
            {
              this.state.m.map((item, i) => (
                <Card key = {i}>
                <CardItem key={i}>
                  <Text style={{ width: "30%" }}>{item.pn}</Text>
                  <List style={{ width: "70%" }}>
                    {
                      this.state.m[i].s.map((item2, i2) => (
                        <ListItem key={i2}>
                          <Text>{item2}</Text>
                          {
                            <Text style={{ marginLeft: '90%', position: "absolute" }}>{this.state.m[i].qty[i2]}</Text>
                          }
                        </ListItem>
                      ))
                    }
                    <CardItem style={{ width: "45%", flex: 1, flexDirection: "row" }}>

                      <Button disabled={this.state.m[i].buttonDisable} title='Complete' buttonStyle={styles.cameraButton2} onPress={() => { this.changeButton(i) }} />
                      <Button style={{  marginLeft: 30, width: "80%", height: "100%", backgroundColor:"white" }} disabled={this.state.m[i].buttonDisable} onPress={() => { MEDICINELIST.MedicineRoute(this.state.m[i]) }}>
                        <Entypo name='camera' size={50} color={this.state.m[i].buttonCameraColour} />
                      </Button>
                      <Button style={{ marginLeft: 20, width: "80%", height: "100%", backgroundColor: "white" }} onPress={() => { this.changeButton(i) }}>
                        <MaterialCommunityIcons
                          name={this.state.m[i].buttonIconn}
                          size={50}
                          color={this.state.m[i].buttonCheckColour}
                          disabled='0'
                        />
                      </Button>
                    </CardItem>
                  </List>
                </CardItem>
                </Card>
              ))
            }
            
          </List>
        </Content>
      </Container>
    )
  }
}
Nurse.propTypes = {

}

const styles = {
  cameraButton: {
    backgroundColor: 'blue',
    borderWidth: 1,
    borderRadius: 15,
  },
  cameraButton2: {
    backgroundColor: 'green',
    borderWidth: 1,
    borderRadius: 15,
    marginLeft: -20,
  },
  cameraButton3: {
    borderWidth: 1,
    borderRadius: 15,
    marginLeft: -20,
  }
}

export default Nurse;
