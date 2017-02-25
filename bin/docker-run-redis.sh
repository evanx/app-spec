
set -u -e 

  [ $# -eq 1 ]
  name="$1"

  docker run --network=$name-network --name $name-redis -d redis

