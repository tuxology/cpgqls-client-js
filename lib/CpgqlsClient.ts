export default class CpgqlsClient {
  endpoint: string;
  constructor(server_endpoint: string) { 
    this.endpoint = server_endpoint;
  }

  execute(query: string) {
    console.log("Connecting.. " + this.endpoint)
    var ws = connect(this.endpoint)
    const req = new XMLHttpRequest()
    var query_post_result:string

    ws.onopen = () => {
      var query_str = {
        "query": query
      }
      req.open("POST", this.endpoint + '/query')
      req.responseType = 'json';
      req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      req.send(JSON.stringify(query_str))
      req.onload  = () => {
        query_post_result = req.response;
        console.log(req.response)
     };
    }

    ws.onmessage = (event) => {
      if (event.data == "connected") {
        console.log("Connected to Joern Server..")
      }
      else {
        req.open("GET", this.endpoint + '/result/' + JSON.parse(query_post_result)["uuid"])
        req.send()
      }
    }
  }
}

function connect(endpoint: string) {
    var sock = new WebSocket("ws://" + endpoint + "/connect");
    return sock
}
