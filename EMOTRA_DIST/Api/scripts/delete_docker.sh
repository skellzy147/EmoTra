echo 'STOPPING CONTAINER...'
docker ps -a -q | xargs docker stop 
echo 'REMOVING CONTAINER...'
docker ps -a -q | xargs docker rm
docker images -f dangling=true -q | xargs docker rmi
echo 'DONE'