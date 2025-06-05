import http.server
import socketserver
import os
import cgi

PORT = 8000
UPLOAD_DIR = "backend/uploads"
WEBAPP_DIR = "" # Project root serves as the webapp directory

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'

        # Attempt to serve from webapp_dir first
        webapp_path = os.path.join(WEBAPP_DIR, self.path.lstrip('/'))

        if os.path.exists(webapp_path) and not os.path.isdir(webapp_path) :
             try:
                with open(webapp_path, 'rb') as f:
                    self.send_response(200)
                    # Guess MIME type
                    if webapp_path.endswith(".html"):
                        self.send_header("Content-type", "text/html")
                    elif webapp_path.endswith(".js"):
                        self.send_header("Content-type", "application/javascript")
                    elif webapp_path.endswith(".css"):
                        self.send_header("Content-type", "text/css")
                    elif webapp_path.endswith(".png"):
                        self.send_header("Content-type", "image/png")
                    elif webapp_path.endswith(".jpg") or webapp_path.endswith(".jpeg"):
                        self.send_header("Content-type", "image/jpeg")
                    elif webapp_path.endswith(".gif"):
                        self.send_header("Content-type", "image/gif")
                    elif webapp_path.endswith(".ico"):
                        self.send_header("Content-type", "image/x-icon")
                    elif webapp_path.endswith(".svg"):
                        self.send_header("Content-type", "image/svg+xml")
                    elif webapp_path.endswith(".woff"):
                        self.send_header("Content-type", "font/woff")
                    elif webapp_path.endswith(".woff2"):
                        self.send_header("Content-type", "font/woff2")
                    elif webapp_path.endswith(".ttf"):
                        self.send_header("Content-type", "font/ttf")
                    elif webapp_path.endswith(".otf"):
                         self.send_header("Content-type", "font/otf")
                    elif webapp_path.endswith(".eot"):
                        self.send_header("Content-type", "application/vnd.ms-fontobject")
                    else:
                        self.send_header("Content-type", "application/octet-stream")
                    self.end_headers()
                    self.wfile.write(f.read())
                return
             except Exception as e:
                self.send_error(500, f"Error reading file: {e}")
                return

        # If not found in webapp_dir or it's a directory, fall back to SimpleHTTPRequestHandler
        # This allows directory listing for WEBAPP_DIR if index.html is not present
        # and also serves files from other locations if self.path was modified (e.g. by other handlers)
        # For security, ensure WEBAPP_DIR is the current directory or a subdirectory
        # For this specific case, WEBAPP_DIR is "" (root), so we change directory
        # to allow SimpleHTTPRequestHandler to serve from there.
        original_cwd = os.getcwd()
        os.chdir(os.path.join(original_cwd, WEBAPP_DIR))
        try:
            super().do_GET()
        finally:
            os.chdir(original_cwd)


    def do_POST(self):
        if self.path == '/upload':
            content_type, pdict = cgi.parse_header(self.headers['content-type'])
            if content_type == 'multipart/form-data':
                pdict['boundary'] = bytes(pdict['boundary'], "utf-8")
                fields = cgi.parse_multipart(self.rfile, pdict)

                if 'file' in fields:
                    file_item = fields['file'][0] # Get the first file if multiple are sent with the same name

                    # Get the filename
                    filename = os.path.basename(self.headers.get_filename()) # Use get_filename from headers if available
                    if not filename: # Fallback if not in headers (cgi.FieldStorage might provide it)
                         # Create a dummy FieldStorage object to parse the file item
                        fs = cgi.FieldStorage(
                            fp=None,  # We don't have a file pointer in the traditional sense
                            headers={'content-disposition': f'form-data; name="file"; filename="{os.path.basename(file_item)}"' if isinstance(file_item, bytes) else f'form-data; name="file"; filename="{os.path.basename(fields["file"][0])}"'}, # Fake header
                            environ={'REQUEST_METHOD': 'POST'}
                        )
                        if hasattr(fs['file'], 'filename') and fs['file'].filename:
                             filename = os.path.basename(fs['file'].filename)
                        else: # If still no filename, generate a default one or reject
                             self.send_response(400)
                             self.end_headers()
                             self.wfile.write(b"Filename not provided or could not be determined.")
                             return

                    if not os.path.exists(UPLOAD_DIR):
                        os.makedirs(UPLOAD_DIR)

                    filepath = os.path.join(UPLOAD_DIR, filename)

                    # Check if file already exists to prevent overwrite, or handle as needed
                    if os.path.exists(filepath):
                        self.send_response(409) # Conflict
                        self.end_headers()
                        self.wfile.write(f"File {filename} already exists.".encode())
                        return

                    with open(filepath, 'wb') as f:
                        f.write(file_item if isinstance(file_item, bytes) else file_item.encode()) # file_item can be bytes or str

                    self.send_response(201) # Created
                    self.end_headers()
                    self.wfile.write(f"File {filename} uploaded successfully to {filepath}".encode())
                else:
                    self.send_response(400) # Bad request
                    self.end_headers()
                    self.wfile.write(b"No file field in form-data.")
            else:
                self.send_response(400) # Bad request
                self.end_headers()
                self.wfile.write(b"Only multipart/form-data is supported for uploads.")
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Endpoint not found.")

with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
    print(f"Serving at port {PORT}")
    print(f"Serving webapp from: {os.path.abspath(WEBAPP_DIR) or os.getcwd()}")
    print(f"Uploads will be saved to: {os.path.abspath(UPLOAD_DIR)}")
    httpd.serve_forever()
