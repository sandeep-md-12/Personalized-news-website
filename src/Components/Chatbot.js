import React, { Component } from 'react'
import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";
export class Chatbot extends Component {
    constructor(props){
        super(props);
    }

    componentDidMoun(){
        (function (d, m) {
            var kommunicateSettings = {appId: "14ac24519e9821a1f95b8904c9b8c3053",popupWidget: true,automaticChatOpenOnNavigation: true,"receivedMessageTextColor": "#646262"};
            
            kommunicateSettings.restartConversationByUser = true;
            kommunicateSettings.onInit = function () {
            var defaultSettings = {
                    "customWelcomeEvent": "customEvent",
                };
                  Kommunicate.updateSettings(defaultSettings);
            };
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0];
            h.appendChild(s);
            window.kommunicate = m;
            m._globals = kommunicateSettings;
        })(document, window.kommunicate || {});
    }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default Chatbot
