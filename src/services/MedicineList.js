import { Actions } from 'react-native-router-flux';


const MEDICINELIST = {
    
    MLIST : ['panadol', 'calpol', 'cylenol', 'peramivir', 'oseltamivir','zanamivir', 'tylenol'],
    MEDCINENAME: function(e){

        if (this.MLIST.indexOf(e) > -1) {
            return e
        } else {
            return false
        }
    },
    
    MEDICINEIMAGE:{
        CorrectMedicine : require('../../assets/images/correct.png'),
        WrongMedicine : require('../../assets/images/wrong.png'),

    },
    MedicineRoute : function(e){
        Actions.camera({medlist:e})
    }
}

export default MEDICINELIST;