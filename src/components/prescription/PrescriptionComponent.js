import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Button, Text, ListItem, Content } from 'native-base';
import PATIENTLIST from '../../services/PatientList';
import { Alert } from 'react-native';
import MEDICINELIST from '../../services/MedicineList';
import { Dimensions, AsyncStorage } from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown';


class Prescription extends Component {
    constructor(props) {
        super(props);
        this._dropdown_select = this._dropdown_select.bind(this)
        this.state = {
            qty: [
                "Please selec..." ,1, 2, 3, 4, 5, 6, 7, 8, 9, 10
            ],
            dataL: {
                medicine: []
            },
            InitMedList:{
                obj:[]

            },
            notEmpty: false,
            currentmedqty:""
        }
    }

    _dropdown_select(mediIndex, item) {
        var med = [{
            name: item,
            qty: this.state.qty[mediIndex]
        }]
        // Check if already exitst, if exist update else concat
        if (this.state.dataL.medicine.length != 0) {
            for (var i = 0; i < this.state.dataL.medicine.length; i++) {
                if (med[0].name == this.state.dataL.medicine[i].name) {
                    this.state.dataL.medicine[i] = med[0]
                    break;
                }else if(i+1 == this.state.dataL.medicine.length){
                    this.state.dataL.medicine = this.state.dataL.medicine.concat(med);
                }else{
                    continue;
                }
            
            }
        }
        else {
            this.state.dataL.medicine = this.state.dataL.medicine.concat(med);
        }
        // console.log("---------------New Array--------------")
        // console.log(this.state.dataL.medicine)
    
    }
    componentDidMount(){
       
        AsyncStorage.getItem(this.props.text).then((result)=>{
                if(result!=null)
                {
                    // get current data from async store
                    const data = JSON.parse(result);
                    // update the list with the current list from the stores
                    this.state.dataL = data;
                    //update it
                    this.setState({ InitMedList:data});
                    this.state.notEmpty = true
                 
                }
            
        
        });
    }

    checkname(){
          if(PATIENTLIST.patientsName.indexOf(this.props.text) > -1)
          {
              return this.props.text
          }else{
              return false
          }
    }
    namechange(){
        var check = this.checkname()
        const list = this.state.dataL.medicine
        if(this.props.text == check){
            for(var i = 0; i < this.state.dataL.medicine.length; i++)
            {
                if(this.state.dataL.medicine[i].qty == "Please selec...")
                {  
                    list.splice(i,1) 
                    i--;
                    this.setState({
                        list
                    })
                }
            }

            AsyncStorage.setItem(check,JSON.stringify(this.state.dataL),(err)=>{
                console.log(err)
        });
        Alert.alert(
            "Notice",
            "Update Records?",
            [
                {text:"Ok", onPress:()=> (Actions.doctor()) },
                {text:"Cancel", onPress:()=> console.log("cancel")}             
            ],
            );
    } 
}
    
    _defaultValue(item) {
        const data_2 = this.state.InitMedList
        if(data_2.medicine !=  undefined){
        const user = data_2.medicine
            for (var i = 0; i < user.length; i++) {  
                   if(item  == user[i].name)
                   {
                    console.log("Name: ("+this.props.text+") | LIST: ("+item +") | ListITEM: ("+user[i].name+") | Qty: "+user[i].qty)
                     return String(user[i].qty)
                   }
            }
      }
    }

    render() {

        return (
            <Container>
                <Content>
                    {
                        MEDICINELIST.MLIST.map((item, i) => (
                            <ListItem key={i}>
                                <Text>{item}</Text>
                                <ModalDropdown
                                    textStyle={styles.textStyle}
                                    key={i}
                                    style={styles.dropdown}
                                    dropdownStyle={styles.dropdownStyle}
                                    dropdownTextStyle = {styles.dropdownTextStyle}
                                    options={this.state.qty}
                                    defaultValue={this._defaultValue(item)}
                                    onSelect={(qty) => this._dropdown_select(qty, item)}
                                >
                                </ModalDropdown>                
                            </ListItem>
                        ))
                    }
                </Content>
                <Content style={styles.ButtonContainer}>
                    <Button full style={styles.SucessButton} onPress={this.namechange.bind(this)} success>
                        <Text> Confirm </Text>
                    </Button>
                </Content>
            </Container>
            
        )
    }
}

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const styles = {

    textInput: {
        width: 70,
        height: 30,
        position: "absolute",
        right: 0,
        margin: 10,
        marginBottom: 4,
    },
    dropdown: {
        width: 100,
        justifyContent:'center',
        alignItems:'center',
        height: 15,
        position: "absolute",
        right: 0,
        marginRight: 20,
        marginTop: 40,
        marginBottom: -20,
    },
    dropdownStyle: {
        width: 200,
        height: 300,
        
        
    },
    dropdownTextStyle: {
        fontSize: 20,
        textAlign: "center",
        justifyContent:'center',
    alignItems:'center',
        
    },

    textStyle:{
        fontSize:15,
    },
    ButtonContainer: {
        position: 'absolute',
        height: 50,
        left: 0,
        top: deviceHeight - 110,
        width: deviceWidth,
    }
}

export default Prescription;
