function __anonymous() {
  let client = new CpgqlsClientLib.CpgqlsClient('localhost:8080');
  const results = [];
  window.queryServer = () => {
    try {
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
            renderResults();
          },
        ),
      );
    } catch (ex) {
      showAlert(ex.message || ex.description);
    }
  };
  const showAlert = text => {
    document.querySelector('#error').textContent = text;
    $('.alert').removeClass('fade').addClass('show');
    setTimeout(() => {
      $('.alert').removeClass('show').addClass('fade');
    }, 5000);
  };
  const renderSingle = data => {
    if (data.error) {
      if (typeof data.error === 'string') {
        showAlert(data.error);
      } else {
        showAlert('Connection/Query Failed, please check console/Network');
      }
      return;
    }
    const wrapper = document.createElement('tr');
    const query = document.createElement('td');
    const result = document.createElement('td');
    query.className = 'query';
    result.className = 'query';
    query.textContent = data.query;
    result.textContent = (data.result.out != "" ? data.result.out :`ERROR: ${data.result.err}`);
    wrapper.appendChild(query);
    wrapper.appendChild(result);
    return wrapper;
  };
  const renderResults = () => {
    document.querySelectorAll('#results > tr').forEach(item => item.remove());
    const resultsNode = document.querySelector('#results');
    results.forEach(item => {
      const renderedItem = renderSingle(item);
      if (renderedItem) {
        resultsNode.appendChild(renderedItem);
      }
    });
  };
}
__anonymous();
