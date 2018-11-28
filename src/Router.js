import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux'
import { StyleSheet } from 'react-native';
import Nurse from './components/nurse/nurseComponent'
import Camera from './components/camera/CameraComponent'
import Login from './components/login/LoginComponent'
import Doctor from './components/doctor/doctorComponent'
import Prescription from './components/prescription/PrescriptionComponent'

// import logouticon from '../assets/images/logout'
const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 ,backgroundColor:'white'}}  >
      <Scene key='main' >
        <Scene key='login' component={Login} title='' {...sceneConfig} initial left={()=>null} navTransparent={true} gesturesEnabled={false}  />
        <Scene key='nurse' component={Nurse} title=''  titleStyle={{ textAlign: 'center', flex: 1 }}   sceneStyle={styles.doctor}  onLeft={ ()=>{Actions.login()}} leftButtonImage={require('../assets/images/logout.png')} gesturesEnabled={false}  />
        <Scene key='doctor' component={Doctor} title="Today's Patient" titleStyle={{ textAlign: 'center', flex: 1 }}   sceneStyle={styles.doctor}  onLeft={ ()=>{Actions.login()}} leftButtonImage={require('../assets/images/logout.png')} gesturesEnabled={false} />
        <Scene key='camera' component={Camera} title='Camera' onLeft={ ()=>{Actions.nurse()}} />
        <Scene key='prescription' component={Prescription} title='' onLeft={ ()=>{Actions.doctor()}}/>
      </Scene>
    </Router>
  )
};
var sceneConfig = {
  cardStyle: {
    backgroundColor: 'white'
  }
}

const styles = StyleSheet.create({
  doctor:{
    paddingTop:0,
    paddingBottom:100,
    marginTop:10
  },
  navBarStyle: {
    elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor:'#000',
          borderColor: "#141414",
    
    },

})


export default RouterComponent;
