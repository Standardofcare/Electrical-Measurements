// Replace the previous content of app.js with the following code
const socket = io();

// Function to populate the table with data
function populateTable(data) {
  const table = document.getElementById('data-table');
  table.innerHTML = '';

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const row = table.insertRow();
      const keyCell = row.insertCell(0);
      const valueCell = row.insertCell(1);

      keyCell.textContent = key;
      valueCell.textContent = data[key].toFixed(4); // Show values with 4 decimal places (you can adjust this as needed)
    }
  }
}

// Function to display the IP address and port information
function displayIpAddressInfo(ipAddress, port) {
  const ipAddressElement = document.getElementById('ip-address');
  const portElement = document.getElementById('port');

  ipAddressElement.textContent = ipAddress;
  portElement.textContent = port;
}

// Listen for real-time data from the server
socket.on('realtimeData', (data) => {
  populateTable(data);
});

// Fetch IP address and port information from the server
fetch('http://localhost:8080/ipinfo')
  .then(response => response.json())
  .then(data => {
    const ipAddress = data.ip;
    const port = 8080;

    displayIpAddressInfo(ipAddress, port);
  })
  .catch(error => console.error('Error fetching IP address information:', error));
