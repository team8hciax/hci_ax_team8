import { Constants, Permissions, BarCodeScanner } from 'expo';
import React from 'react';
import MEDICINELIST from '../../services/MedicineList';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import { 
  Ionicons,
  MaterialIcons, 
} from '@expo/vector-icons';

const landmarkSize = 2;

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const flashIcons = {
  off: 'flash-off',
  on: 'flash-on',
  auto: 'flash-auto',
  torch: 'highlight'
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};



const wbIcons = {
  auto: 'wb-auto',
  sunny: 'wb-sunny',
  cloudy: 'wb-cloudy',
  shadow: 'beach-access',
  fluorescent: 'wb-iridescent',
  incandescent: 'wb-incandescent',
};

export default class CameraComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          bounds: {origin: {x: 0, y:0}, size: {height:0, width:0}},
          opacity: 0,
          TextOpacity:0,
          activateImage: false,
          showText:"",
          urlImage:"",
          MedChecker:false,
          
          
        };
      }
  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    ratios: [],
    barcodeScanning: false,
    newPhotos: false,
    permissionsGranted: false,
    pictureSize: undefined,
    pictureSizes: [],
    pictureSizeId: 0,

  };

  async componentWillMount() {
    // get user permission to switch on camera
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ permissionsGranted: status === 'granted' });
  }
 
  componentDidUpdate(prevProps, prevState) {
    // set display timeout for each qr code
    if (this.state.activateImage) {
      this.turnOffImage = setTimeout(() => { 
        this.setState(() => ({activateImage: false, opacity:0 ,MedChecker:false}));
        this.preData="";
      }, 1000);
    }
  }
  componentWillUnmount() {
    clearTimeout(this.turnOffImage);
  }

  onBarCodeScanned = code => {
    this.setState(
      { barcodeScanning: !this.state.barcodeScanning },
      Alert.alert(`Barcode found: ${code.data}`)
    );
  };

  changePictureSize = direction => {
    let newId = this.state.pictureSizeId + direction;
    const length = this.state.pictureSizes.length;
    if (newId >= length) {
      newId = 0;
    } else if (newId < 0) {
      newId = length -1;
    }
    this.setState({ pictureSize: this.state.pictureSizes[newId], pictureSizeId: newId });
  }

  renderNoPermissions = () => {
    <View style={styles.noPermissions}>
      <Text style={{ color: 'white' }}>
        Camera permissions not granted - cannot open camera preview.
      </Text>
    </View>
  }

    CheckMedicine(e){
      var medicineName  =  ""
      var qty = ""
      for(var i = 0 ; i < this.props.medlist.s.length;i++){
        if(this.props.medlist.s[i].indexOf(e.data)> -1)
        {
          medicineName = this.props.medlist.s[i]
          qty = this.props.medlist.qty[i]
        }
      }
      if(e.data== ""){
      }
      else {
          if (e.data == medicineName){
            var sText = String(e.data).toLocaleUpperCase() + "     Qty: "+qty
            console.log("stext = " + sText)
            this.setState({
              TextOpacity:1,
              opacity: 1, 
              activateImage:true,
              showText: sText,
              urlImage:MEDICINELIST.MEDICINEIMAGE.CorrectMedicine,
            });
          }
          else if (e.data != medicineName) {
            var sText = medicineName + qty
            this.setState({
              TextOpacity:1,
              opacity: 1, 
              activateImage:true,
              showText: "Wrong Medicine !",
              urlImage:MEDICINELIST.MEDICINEIMAGE.WrongMedicine,
              });
        }
        else {
          this.setState({opacity: 0,TextOpacity:0, urlImage:""});
        }
        }
        
        this.setState({bounds: e.bounds, data: e.data});
      }      
    
    readQR(e) {
      if (e.data != this.preData && this.state.MedChecker == false){
        this.setState({MedChecker:true});          
        this.CheckMedicine(e);
        this.preData = e.data;
      };
  }
      
  renderCamera = () =>
    (
      <View style={{
      flex: 1,
      alignItems:'center',
      justifyContent:'center', }}>
        <BarCodeScanner
         onBarCodeScanned={this.readQR.bind(this)} 
         style={StyleSheet.absoluteFill}>
             <Image
            style={{
                opacity: this.state.opacity,
                alignSelf: 'center',
                marginTop: '20%',
                height: 300,
                width: 300,
                borderWidth: 0,
                borderRadius: 0
            }}
            source={this.state.urlImage}
            resizeMode="contain"
            />
          
          <View style={{
                opacity:this.state.TextOpacity,
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                padding: 25,
                flexDirection: 'row',
                justifyContent: 'center',

          }}>
          <Text numberOfLines={10} style={styles.urlText}>
            {this.state.showText}
          </Text>
      </View>

        </BarCodeScanner> 
      </View>
    );
  render() {
    const cameraScreenContent = this.state.permissionsGranted
      ? this.renderCamera()
      : this.renderNoPermissions();
    const content = cameraScreenContent;
    return <View style={styles.container}>{content}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    flex: 0.2,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Constants.statusBarHeight / 2,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  noPermissions: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
    padding: 10,
  },
  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  toggleButton: {
    flex: 0.25,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  autoFocusLabel: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  bottomButton: {
    flex: 0.3, 
    height: 58, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  newPhotosDot: {
    position: 'absolute',
    top: 0,
    right: -5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4630EB'
  },
  options: {
    position: 'absolute',
    bottom: 80,
    left: 30,
    width: 200,
    height: 160,
    backgroundColor: '#000000BA',
    borderRadius: 4,
    padding: 10,
  },
  detectors: {
    flex: 0.5,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  pictureQualityLabel: {
    fontSize: 10,
    marginVertical: 3, 
    color: 'white'
  },
  pictureSizeContainer: {
    flex: 0.5,
    alignItems: 'center',
    paddingTop: 10,
  },
  pictureSizeChooser: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  pictureSizeLabel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  landmark: {
    width: landmarkSize,
    height: landmarkSize,
    position: 'absolute',
    backgroundColor: 'red',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
  },
  urlText: {
    color: '#fff',
    fontSize: 20,
  },
});

