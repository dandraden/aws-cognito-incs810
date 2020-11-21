/*
 *   Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 *  Licensed under the Apache License, Version 2.0 (the "License").
 *  You may not use this file except in compliance with the License.
 *  A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the "license" file accompanying this file. This file is distributed
 *  on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *  express or implied. See the License for the specific language governing
 *  permissions and limitations under the License.
 */
import React from 'react';
import SiteFooter from '../components/SiteFooter';
import DynamicImage from '../components/DynamicImage';
import { Auth } from 'aws-amplify';
import { S3Image } from 'aws-amplify-react';
import '../css/main.css';

let token = '';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                attributes: {
                    email: 'me@example.com',
                    phone_number: '+1123456789',
                    'custom:genre': 'xpto',
                    email_verified: false
                }
            },
            itemChecked: false,
            username: ''
        }
    }

    componentDidMount() {
        Auth.currentAuthenticatedUser().then(user => {
            console.log('Cognito User', user);
            if (user.preferredMFA === 'NOMFA'){
                this.state.itemChecked = false;
            } else {
                this.state.itemChecked = true;
            }
            this.state.username = user.username;
            //console.log(user.username);
            this.setState({user, image_key: 'profile-' + user.attributes.sub + '.jpg'});
        });;
    }

    checkUser() {
        Auth.currentAuthenticatedUser()
          .then(user => console.log({ user }))
          .catch(err => console.log(err));
    }

    async checkItem(e, isChecked) {
        let authMethod;

        if(e.target.checked){
            if(isChecked){
                authMethod ='NOMFA'; 
            } else {
                authMethod = 'SMS';
            }
        }

        let user = await Auth.currentAuthenticatedUser();
        await Auth.setPreferredMFA(user, authMethod);  
        console.log(user.preferredMFA);
    }


    async onImageLoad(url) {
        if (!this.state.user.getSession) { return };
        console.log('Profile Picture URL:', url);
        try {
            let result = await Auth.updateUserAttributes(this.state.user, {
                'picture': this.state.image_key
            });
            console.log(result);
            let user = await Auth.currentAuthenticatedUser();
            token = user.signInUserSession.accessToken.jwtToken;
            console.log('Cognito User Identity Token:', token);
        } catch (ex) {
            console.error('Attribute update error:', ex);
        }
    }

    render() {
       const isItemChecked = this.state.itemChecked;
       const username = this.state.username;
       
      return (<div className="page-unicorns">
        <header className="site-header">
          <div>
          <DynamicImage src="logo.png"/>
          { <S3Image imgKey={this.state.image_key} onLoad={(url) => this.onImageLoad(url)} picker/> }
          <br></br>
    		<table align="center">
    		<tbody>
             <tr>
             <td align="right" style={{fontWeight: "bold"}}>Sub: </td>
             <td align="left">{this.state.user.attributes.sub}</td>
             </tr>
             <tr>
             <td align="right" style={{fontWeight: "bold"}}>Username: </td>
             <td align="left">{username}</td>
             </tr>
             <tr>
             <td align="right" style={{fontWeight: "bold"}}>E-mail: </td>
             <td align="left">{this.state.user.attributes.email}</td>
             </tr>
              <tr>
             <td align="right" style={{fontWeight: "bold"}}>Phone: </td>
             <td align="left">{this.state.user.attributes.phone_number}</td>
             </tr>
             <tr>
             <td align="right" style={{fontWeight: "bold"}}>Gender: </td>
             <td align="left">{this.state.user.attributes["custom:genre"]}</td>
             </tr>
             <tr>
            <td align="right" style={{fontWeight: "bold"}}>{isItemChecked ? 'Disable MFA: ' : 'Enable MFA: '}</td>
            <td align="left"><input type="checkbox"  onChange={ (e) => this.checkItem(e, isItemChecked)  } name="mfa" /></td> 
            </tr>
             <tr>
             <td align="right" style={{fontWeight: "bold"}}>Token: </td>
             <td align="left"><div id="truncateLongTexts">{token}</div></td>
             </tr>
             </tbody>
            </table>
    	</div>
        </header>
            <SiteFooter/>
      </div>
    );
  }
}

export default Profile;
