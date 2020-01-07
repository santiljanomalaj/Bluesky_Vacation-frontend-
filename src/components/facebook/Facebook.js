import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {setCookie} from '../../services/config';
import {authService} from '../../services/auth';
import {alertService} from '../../services/alert';

export class Facebook extends Component{
    constructor(props){
        super(props);
        this.state={
            isLoggedIn:false,
            userID:"",
            name:"",
            email:"",
            picture:""
       };
    }
    responseFacebook=response=>{
        console.log(response);
        const data={email:response.email,token:response.token}
            console.log(data);
            if(response.email && response.token){
                authService.loginSocial(data).then(res=>{
                    if(res && res.success==true){
                        setCookie('is_loged_in', 'true', 1);
                        setCookie('user_name', res.userinfo.first_name, 1);
                        setCookie('user_id', res.userinfo.id, 1);
                        setCookie('user_type', res.userinfo.user_type, 1);   
                        setCookie('token', res.token, 1);
                    }
                    else{
                        alertService.showError("Email not exsit", "");
                        window.location.href="/";
                        return;
                    }
                });
                this.props.facebooklogin();
             }
            // window.location.href="/";
        // this.setState({
        //     isLoggedIn:true,
        //     userID:response.userID,
        //     name:response.name,
        //     email:response.email,
        //     picture:response.picture.data.url
        // });
    }
    componentClicked=()=>console.log("clicked");
    render()
    {
        let fbContent;
        if(this.state.isLoggedIn)
        {
            // fbContent=(
            //     <div style={{
            //         width:'400px',
            //         margin:'auto',
            //         background:'#f4f4f4',
            //         padding:'20px'
            //     }}>
            //         <img src={this.state.picture} alt={this.state.name} />
            //         <h2>Welcome {this.state.name}</h2>
            //         Email:{this.state.email}
                    
            //     </div>
            // )
        }
        else
        {
            fbContent=(<FacebookLogin
                appId="2954386157928223"
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook}
                render={renderProps => (
                <a onClick={renderProps.onClick} className="btn icon-btn btn-block btn-large row-space-1 btn-facebook font-normal pad-top mr1">
                <span><i className="icon icon-facebook" /></span>
                <span>Log in with Facebook</span>
              </a>
                  )}
            />)
        }
        return (
            <div>
                {fbContent}
            </div>
        )
    }
} 
