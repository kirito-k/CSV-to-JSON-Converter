CSV-to-JSON-Converter


Install travis CLI using following commands
```
sudo apt install ruby ruby-dev
sudo gem install travis
```

To create travis api_key
```
travis encrypt $(heroku auth:token) --add deploy.api_key
```

This will automatically create a key for travis, encrypt it and add it to your .travis file