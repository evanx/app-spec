
set -u -e 

  [ $# -eq 1 ]
  name="$1"
  network="${name}-network"

  if docker network ls -q -f name=^$network | wc -l | grep -q '^0$' 
  then
    docker network create -d bridge $network >/dev/null
  fi

  container=`docker ps -a -q -f "name=/${name}-redis"`
  if [ -z "$container" ]
  then
    container=`docker run --network=$network --name ${name}-redis -d redis`
  fi
  docker inspect "$container" |
    grep '"IPAddress":' | 
    tail -1 | 
    sed 's/.*"\([0-9\.]*\)",/\1/'

