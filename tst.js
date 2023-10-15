import http from 'http'

const port = 3000;

const generatePage = () => {
	return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>JavaScript Генерування HTML</title>
    </head>
    <body>
      <h1>JavaScript Генерування HTML</h1>
      <button onclick="sendRequest()">Натисніть на мене</button>

      <script>
        function sendRequest() {
          fetch('/buttonClick', {
            method: 'POST'
          })
          .then(response => response.text())
          .then(data => {
            alert(data); // Повідомлення з сервера
          })
          .catch(error => console.error('Помилка:', error));
        }
      </script>
    </body>
    </html>
  `;
};

const server = http.createServer((req, res) => {
	if (req.method === 'GET' && req.url === '/') {
		const pageContent = generatePage();
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(pageContent);
	} else if (req.method === 'POST' && req.url === '/buttonClick') {
		// Обробка події при натисканні на кнопку
		console.log('Кнопка була натиснута!');
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end('Повідомлення було відправлено на сервер.');
	} else {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end('404 Not Found');
	}
});

server.listen(port, () => {
	console.log(`Сервер працює на порті ${port}`);
});
