docker build -t emoji-api:latest .
docker run -d -p 5000:5000 emoji-api:latest