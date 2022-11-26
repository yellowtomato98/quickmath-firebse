import http.server

def main():
    PORT = 8000
    handler = http.server.SimpleHTTPRequestHandler
    server = http.server.HTTPServer(('', PORT), handler)
    print(f'Server running http://localhost:{PORT}')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.server_close()
        print("Server closed")

if __name__ == '__main__':
    main()