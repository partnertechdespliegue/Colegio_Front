import { Component, OnInit } from '@angular/core';
import '../../../../../vendor/jitsi/external_api.js';

declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-gestion-empleado',
  templateUrl: './gestion-empleado.component.html',
  styles: []
})
export class GestionEmpleadoComponent implements OnInit {

  title = 'ADRIAN';
  domain: string = "meet.jit.si";
  options: any;
  api: any;


  participantId;

  constructor() {
  }

  ngOnInit(): void {

    this.options = {
      roomName: "nosenoseno",
      width: 1000,
      height: 450,
      interfaceConfigOverwrite: {
        TILE_VIEW_MAX_COLUMNS: 3, // de 1 a 5 como maximo
        CONNECTION_INDICATOR_AUTO_HIDE_TIMEOUT: 5000,
        DEFAULT_LOCAL_DISPLAY_NAME: 'Yo',
        TOOLBAR_TIMEOUT: 100,

        TOOLBAR_BUTTONS: [
          'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
          'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
          'etherpad', 'settings', 'raisehand',
          'videoquality', 'filmstrip', 'shortcuts',
          'tileview', 'download', 'mute-everyone', 'security'
        ],
      },

      configOverwrite: { startWithAudioMuted: true },
      // userInfo: {
      //   email: 'email@jitsiexamplemail.com',
      //   displayName: 'John Doe'
      // },
      parentNode: document.querySelector('#meet')
    }

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);
    this.api.executeCommand('displayName', 'Adrian');


    this.api.addEventListener('displayNameChange', (jaja:any)=> { debugger
      console.log("ACAAA"+jaja);
      this.participantId = jaja.id;
    });
    // this.api.addEventListener('participantLeft', (e)=> { debugger
    //   console.log("LA CONTRAAA" + e) ;window.location.href="https://www.google.com";
    // });
    this.api.addEventListener('readyToClose', ()=> { debugger
      console.log("LA CONTRAAA") ;
      window.location.href="https://www.google.com";
    });


  }

  mostrarAPI() {debugger
    // this.api.dispose();

    console.log(this.api.getDisplayName(this.participantId));

    }

}
