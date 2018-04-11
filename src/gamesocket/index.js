class WebSocketConnection {
  constructor() {
      this.store = null;
      this.socket = null;
  }

  setStore(store) {
      this.store = store;
  }

  connect(link) {
      if (this.store !== undefined) {
          this.socket = new WebSocket(link);
          this.socket.onopen = (e) => {
              //what is this for
              //this.send({ type: 'FETCH_HOSTS' });
          }
          this.socket.onmessage = (e) => this.store.dispatch(JSON.parse(e.data));
          this.socket.onclose = (e) => console.log(e);
      }
  }

  send(data) {
      this.socket.send(JSON.stringify(data));
  }

  close() {
      this.socket.close();
  }
}

const wsCon = new WebSocketConnection();

export default wsCon;