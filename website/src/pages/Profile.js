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
                    'custom:genre': 'xpto'
                }
            }
        }
    }
    componentDidMount() {
        Auth.currentAuthenticatedUser().then(user => {
            console.log('Cognito User', user);
            this.setState({user, image_key: 'profile-' + user.attributes.sub + '.jpg'});
        });;
    }

    async onImageLoad(url) {
        if (!this.state.user.getSession) { return };
        console.log('Profile Picture URL:', url);
        try {
            let result = await Auth.updateUserAttributes(this.state.user, {
                'picture': this.state.image_key
            });
            console.log(result);
            const session = await Auth.currentSession();
            token = session.getIdToken().getJwtToken();
            console.log('Cognito User Identity Token:', session.getIdToken().getJwtToken());
        } catch (ex) {
            console.error('Attribute update error:', ex);
        }
    }

    render() {
      
      return (<div className="page-unicorns">
        <header className="site-header">
          <div>
          <DynamicImage src="logo.png"/>
          { <S3Image imgKey={this.state.image_key} onLoad={(url) => this.onImageLoad(url)} picker/> }
          <br></br>
    		<table align="center">
    		<tbody>
             <tr>
             <td style={{fontWeight: "bold"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sub: </td>
             <td align="left">{this.state.user.attributes.sub}</td>
             </tr>
             <tr>
             <td style={{fontWeight: "bold"}}>E-mail: </td>
             <td align="left">{this.state.user.attributes.email}</td>
             </tr>
              <tr>
             <td style={{fontWeight: "bold"}}>Phone: </td>
             <td align="left">{this.state.user.attributes.phone_number}</td>
             </tr>
             <tr>
             <td style={{fontWeight: "bold"}}>Genre: </td>
             <td align="left">{this.state.user.attributes["custom:genre"]}</td>
             </tr>
             <tr>
             <td style={{fontWeight: "bold"}}>Token: </td>
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
