import { Actions } from 'react-native-router-flux';


const PATIENTLIST ={
    patientsName : [
        'Tom',
        'Dick',
        'Harry',
        'Tim',
        'Raphael',
        'Patrick',
        'Halimin',
        'Wei Qiang'
      ],
      PatientRoute : function(e){
        Actions.prescription({text:e,title:e})
      }
}
export default PATIENTLIST;