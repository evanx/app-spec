
set -u -e 

  [ $# -eq 1 ]
  name="$1"
  network=${name}-network 
  docker network ls -q -f name=^$network | grep -vq '\w' && 
    docker network create -d bridge $network
  docker inspect `
    docker run --network=$network --name $name-redis -d redis
  ` |
    grep '"IPAddress":' | 
    tail -1 | 
    sed 's/.*"\([0-9\.]*\)",/\1/'`

