const ListofUsers ={
    Doctor:{
        UserName:"doctor",
        PassWord:"doctor",
    },
    Nurse:{
        UserName:"nurse",
        PassWord:"nurse",
    },

}

const LoginAuth = {

    Login : function(e){
        // console.log("username - " + e.username);
        // console.log("password - " + e.password);
        if(e.username.toLowerCase() == ListofUsers.Doctor.UserName.toLowerCase() && e.password.toLowerCase() == ListofUsers.Doctor.PassWord.toLowerCase()){
            return "Doctor";
        }
        else if(e.username.toLowerCase()== ListofUsers.Nurse.UserName.toLowerCase() && e.password.toLowerCase() == ListofUsers.Nurse.PassWord.toLowerCase()){
            return "Nurse";
        }
        else
        {
            return "Invalid";
        }
    },


}
export default LoginAuth;