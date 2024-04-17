document.getElementById('apiTestButton').addEventListener('click', function() {
    fetch(apiConfig.baseURL)
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(function(data) {
        document.getElementById('result').textContent = 'API Response: ' + data;
      })
      .catch(function(error) {
        document.getElementById('result').textContent = 'API Error: ' + error.message;
      });
  });
  