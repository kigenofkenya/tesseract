#!/bin/bash

#!/bin/sh


##############
### BASICS ###
##############

### create user ###
curl 'http://localhost:8675/users/' -H 'Content-Type: application/json' --data-binary '{ "email": "admin@penny.local", "password": "root" }'

### fetch jwt token with user email and password ###
#curl -H "Content-Type: application/json" -X POST -d '{"strategy":"local","email":"admin@penny.local", "password": "root"}' http://localhost:9109/authentication

### fetch assset with returned token ###

#curl -H "Content-Type: application/json" -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJ1c2VySWQiOjAsImlhdCI6MTUxNjQxODUxNCwiZXhwIjoxNTE2NTA0OTE0LCJhdWQiOiJodHRwczovL3lvdXJkb21haW4uY29tIiwiaXNzIjoiZmVhdGhlcnMiLCJzdWIiOiJhbm9ueW1vdXMiLCJqdGkiOiIwMzBlNzRhOC1iZGFmLTQwNWYtOTk1MS1mZTU0YjlhY2I4ODEifQ.4nVBd18jK1cq1LKY_AsYAfvhBXpkTm7e0cJHnbuhhHw" -X POST http://localhost:9109/authentication
