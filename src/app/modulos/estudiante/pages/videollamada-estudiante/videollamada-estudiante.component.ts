import { Component, OnInit } from '@angular/core';
import '../../../../../vendor/jitsi/external_api.js';
import { Router } from '@angular/router';

declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-videollamada-estudiante',
  templateUrl: './videollamada-estudiante.component.html',
  styles: []
})
export class VideollamadaEstudianteComponent implements OnInit {

  title = 'ADRIAN';
  domain: string = "meet.jit.si";
  options: any;
  api: any;


  participantId;

  constructor(
    public router: Router
  ) {
  }

  ngOnInit(): void {

    this.options = {
      roomName: "PartnerReu",
      width: 1100,
      height: 470,
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
    this.api.executeCommand('displayName', 'Partner Tech');


    this.api.addEventListener('displayNameChange', (jaja:any)=> {
      this.participantId = jaja.id;
    });
    this.api.addEventListener('participantLeft', (e)=> {
      this.router.navigate(["/gestionestudiante"])
      // window.location.href="https://www.google.com";
    });
    this.api.addEventListener('readyToClose', ()=> {
      this.router.navigate(["/gestionestudiante"])
      // window.location.href="https://www.google.com";
    });
  }

}

// TOOLBAR_BUTTONS: [
//   'microphone', 'camera', 'closedcaptions', 'desktop', 'embedmeeting', 'fullscreen',
//   'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
//   'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
//   'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
//   'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone', 'security'
// ],
