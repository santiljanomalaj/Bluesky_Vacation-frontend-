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
        const data={email:response.email}
            if(response.email && response.accessToken){
                authService.loginSocial(data).then(res=>{
                    if(res && res.success === true){
                        setCookie('is_loged_in', 'true', 1);
                        setCookie('user_name', res.userinfo.first_name, 1);
                        setCookie('user_id', res.userinfo.id, 1);
                        setCookie('user_type', res.userinfo.user_type, 1);   
                        setCookie('token', res.token, 1);
                        this.props.facebooklogin();
                    }
                    else{
                            alertService.showError("You must signup in this site FB Email", "");
                            window.location.href="/";
                            return;
                        }
                    });
                }
    }
    componentClicked=()=>console.log("clicked");
    render()
    {
        let fbContent;  
            fbContent=(<FacebookLogin
                appId="2954386157928223"
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook}
                render={renderProps => (
                // <a onClick={renderProps.onClick} className="btn icon-btn btn-block btn-large row-space-1 btn-facebook font-normal pad-top mr1">
                // <span><i className="icon icon-facebook" /></span>
                <span>Log in with Facebook</span>
            //   </a>
                  )}
            />)
        return (
            <div>
                {fbContent}
            </div>
        )
    }
} 
