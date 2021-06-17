console.log('webrtc example');

('use strict');

document.getElementById('showVideo').onclick = (e) => {
  var roomId = document.getElementById('roomId').value;
  new WebRTC(roomId);
};

document.getElementById('stopVideo').onclick = (e) => {
  window.stream.getTracks().forEach(function (track) {
    track.stop();
  });
};

class WebRTC {
  constructor(roomId) {
    this.pc = new RTCPeerConnection({});
    this.roomId = roomId;
    this.socket = new AppSocket(this.receivedMessage,this.afterConnected,this.roomId);
    this.pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.socket.sendMessage({
          "Candidate":event.candidate
        });
      }
    };

    this.pc.ontrack = (event) => {
      const stream = event.streams[0];
      const remoteVideo = document.getElementById('remoteVideo');
      if (!remoteVideo.srcObject || remoteVideo.srcObject.id !== stream.id) {
        remoteVideo.srcObject = stream;
      }
    };
  }

  afterConnected = () => {
    this.init();
  }

  receivedMessage = (message) => {
    if(message.payload.isGetMembers == true) {
      this.checkMemberInRoom(message.payload.members);
    }
    else if(message.payload.sdp) {
      this.setRemoteDescription(message.payload.sdp);
    } else if(message.payload.candidate) {
      this.addIceCandidate(message.payload.candidate);
    }
  }

  addIceCandidate(candidate) {
    try {
      this.pc.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      console.log("error addIceCandidate:",error);
    }
  }

  async init() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      });
      this.showLocalVideo(stream);
      this.sendCheckMemberInRoom();
    } catch (e) {
      console.log(e);
    }
  }
  
  sendCheckMemberInRoom() {
    this.socket.sendMessage({isGetMembers:true});
  }

  checkMemberInRoom(members) {
    if(members == 2) {
      this.createOffer();
    }
  }

  showLocalVideo(stream) {
    const video = document.getElementById('localvideo');
    window.stream = stream;
    video.srcObject = stream;
    // Add your stream to be sent to the conneting peer
    stream.getTracks().forEach(track => this.pc.addTrack(track, stream));
  }

  async createOffer() {
    try {
      const desc = await this.pc.createOffer();
      this.setLocalDescription(desc);
    } catch (e) {
      console.error('fail to create localDescription:', e);
    }
  }

  async setLocalDescription(desc) {
    try {
      await this.pc.setLocalDescription(desc);
      this.socket.sendMessage({'sdp':this.pc.localDescription});
    } catch (e) {
      console.error('fail to create localDescription:', e);
    }
  }

  async setRemoteDescription(sdp) {
    await this.pc.setRemoteDescription(new RTCSessionDescription(sdp));
    if (this.pc.remoteDescription.type === 'offer') {
      try {
        const desc = await this.pc.createAnswer();
        this.setLocalDescription(desc);
      } catch (error) {
        console.error('setRemoteDescription:', error);
      }
    }
  }
}

class AppSocket {
  constructor(receivedMessage,afterConnected,roomId) {
    this.socket = null;
    this.receivedMessage = receivedMessage;
    this.roomId = roomId;
    this.afterConnected = afterConnected;
    this.createSocket();
  }

  createSocket() {
    this.socket = io('http://localhost/');
    this.socket.on('videoChat', (message) => {
      this.receivedMessage(message);
    });
    this.socket.on("connect", () => {
      this.socketId = this.socket.id;
      this.afterConnected();
    });
  }

  sendMessage(payload) {
    payload.roomId = this.roomId;
    this.socket.emit('videoChat', payload);
  }
}
