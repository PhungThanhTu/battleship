cd ../../client
docker build . -t battleship-client:dev

cd ../server
docker build . -t battleship-server:dev

cd ../api
docker build . -t battleship-api:dev