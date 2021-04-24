# Build scripts

Build database image and push to repo:

```
docker build -t prostakov/mssql:latest -f ./database-setup/Dockerfile ./database-setup/
docker push prostakov/mssql:latest
```

Build notes-api image and push to repo:

```
docker build -t prostakov/notes-api:latest -f ./NotesApi/Dockerfile ./NotesApi/.`
docker push prostakov/notes-api:latest
```

Build notes-web image and push to repo:

```
docker build -t prostakov/notes-web:latest -f ./NotesWeb/Dockerfile ./NotesWeb/.
docker push prostakov/notes-web:latest
```

# Launch script on linux box

1. Move `docker-compose.release.yml` and `release.env` to box.

2. Launch from release compose file (copy docker-compose.release.yml and release.env first):

`docker-compose -f docker-compose.release.yml --env-file release.env up -d`

3. Set up nginx reverse proxy configurations

3.1. Launch `notes-api.prostakov.me` with nginx reverse proxy.

3.1.1. Create `notes-api.prostakov.me` file in `/etc/nginx/sites-available`:

```
server {
    server_name  notes-api.prostakov.me www.notes-api.prostakov.me;
    location / {        
        proxy_pass http://localhost:9410;
    }
}
```

3.1.2. Run `sudo ln -s /etc/nginx/sites-available/notes-api.prostakov.me /etc/nginx/sites-enabled/`

3.1.3. Run `sudo certbot --nginx -d notes-api.prostakov.me -d www.notes-api.prostakov.me`

3.1.4. Run

```
sudo nginx -t;
sudo systemctl restart nginx;
```

3.1.5. Test the app.

3.2. Launch `notes.prostakov.me` with nginx reverse proxy.

3.2.1. Create `notes.prostakov.me` file in `/etc/nginx/sites-available`:

```
server {
    server_name  notes.prostakov.me www.notes.prostakov.me;
    location / {
        proxy_pass http://127.0.0.1:9510;
    }
}
```

3.2.2. Run `sudo ln -s /etc/nginx/sites-available/notes.prostakov.me /etc/nginx/sites-enabled/`

3.2.3. Run `sudo certbot --nginx -d notes.prostakov.me -d www.notes.prostakov.me`

3.2.4. Run

```
sudo nginx -t;
sudo systemctl restart nginx;
```

3.2.5. Test the app.

3.3. Open firewall.

3.4. Test everything.