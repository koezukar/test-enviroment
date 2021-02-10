import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit {

  constructor() {
    this.arviaChat = new (<any>window).ArviaChat();
  }

  private arviaChat: any;

  public muted: boolean|string = false;
  public cameraOff: boolean = false;

  public mute() {
    this.muted = !this.arviaChat.getMicrophone();

    if(this.muted) {
      console.log("マイクオン");
      this.arviaChat.turnOnMicrophone();
    }
    else {
      console.log("マイクオフ");
      this.arviaChat.turnOffMicrophone();
    }
  }

  turnOffCamera() {
    this.cameraOff = !this.arviaChat.getCamera();

    if(this.cameraOff) {
      console.log("カメラオン");
      this.arviaChat.turnOnCamera();
    }
    else {
      console.log("カメラオフ");
      this.arviaChat.turnOffCamera();
    }
  }


  ngOnInit(): void {
    this.arviaChat.setTestUser(false);
    this.arviaChat.setRoomName('test-room-1');
    this.arviaChat.init('meeting');
    this.arviaChat.connect();

    // ビルトインのコントロールボタンを表示しない
    this.arviaChat.setLocalMediaButtonsVisibility(false)

    this.arviaChat.getDeviceInfo();

    this.arviaChat.on(this.arviaChat.DEVICE_INFO,
      (info: any) => {
        console.log(info);
      }
    );

  }

}
