import JoernQuery from './JoernQuery';

export default class CpgqlsClient {
  private endpoint: string;
  webSocket: WebSocket | null = null;
  queries: Map<string, JoernQuery> = new Map<string, JoernQuery>();

  constructor(server_endpoint: string) {
    this.endpoint = server_endpoint;
  }

  getHttpEndpoint() {
    return `http://${this.endpoint}`;
  }

  getWSEndpoint() {
    return `ws://${this.endpoint}`;
  }

  checkWebSocket(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        if (this.webSocket === null) {
          this.webSocket = new WebSocket(`${this.getWSEndpoint()}/connect`);
          this.webSocket.addEventListener('message', evt => {
            if (evt.data === 'connected') {
              resolve(null);
            } else {
              this.onMessage(evt);
            }
          });
          this.webSocket.addEventListener('error', (evt: Event) => {
            console.error(evt);
            reject(evt);
          });
          this.webSocket.addEventListener('close', (evt: Event) => {
            reject(evt);
          });
        } else if (this.webSocket.readyState === this.webSocket.OPEN) {
          resolve(null);
        } else if (
          this.webSocket.readyState === this.webSocket.CLOSED ||
          this.webSocket.readyState === this.webSocket.CLOSING
        ) {
          this.webSocket = null;
          reject('Connection Closed');
        }
      } catch (ex) {
        reject(ex);
      }
    });
  }
  closeConnection() {
    if (
      this.webSocket &&
      (this.webSocket.readyState !== this.webSocket.CLOSED ||
        this.webSocket.readyState !== this.webSocket.CLOSING)
    ) {
      this.webSocket.close();
    }
  }
  onMessage(event: MessageEvent) {
    if (this.queries.has(event.data)) {
      this.getQueryResult(event.data);
    } else {
      console.log(event);
      console.log(event.data);
    }
  }

  async getQueryResult(uuid: string) {
    const response = await fetch(`${this.getHttpEndpoint()}/result/${uuid}`);
    const query = this.queries.get(uuid);
    query?.completeCallback({
      query: query.query,
      result: await response.json(),
    });
    this.queries.delete(uuid);
  }

  async postQuery(query: JoernQuery) {
    const payload = {
      query: query.query,
    };
    const url = `${this.getHttpEndpoint()}/query`;
    console.log(`Sending post query to ${url}`);
    const response = await fetch(url, {
      body: JSON.stringify(payload),
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'omit',
    });
    const jsonData = await response.json();
    if (jsonData.uuid) {
      this.queries.set(jsonData.uuid, query);
    }
  }

  async execute(query: JoernQuery) {
    try {
      await this.checkWebSocket();
      this.postQuery(query);
    } catch (ex) {
      query.completeCallback({ error: ex.message || ex.description || ex });
    }
  }
}
