function __anonymous() {
  let client = new CpgqlsClientLib.CpgqlsClient('localhost:8080');
  const results = [];
  window.queryServer = () => {
    const textArea = document.querySelector('#query-box');
    const server = document.querySelector('#server');
    if (client !== null && client.endpoint !== server.value) {
      client.closeConnection();
      client = null;
    }
    if (client === null) {
      client = new CpgqlsClientLib.CpgqlsClient(server.value);
    }
    client.execute(
      new CpgqlsClientLib.JoernQuery(
        // 'importCode("/home/suchakra/joern-workshop/alloc_party")',
        textArea.value,
        data => {
          results.push(data);
        },
      ),
    );
  };
  const renderSingle = data => {
    const wrapper = document.createElement('div');
    const query = document.createElement('div');
    const result = document.createElement('div');
    query.className = 'query';
    result.className = 'query';
    query.textContent = data.query;
    result.textContent = data.result;
    wrapper.appendChild(query);
    wrapper.appendChild(result);
    return wrapper;
  };
  const renderResults = () => {
    document.querySelectorAll('#results > div').forEach(item => item.remove());
    const resultsNode = document.querySelector('#results');
    results.forEach(item => resultsNode.appendChild(renderSingle(item)));
  };
}
__anonymous();
