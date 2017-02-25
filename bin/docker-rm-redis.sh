
set -u -e 

  [ $# -eq 1 ]
  name="$1"

  docker rm -f ${name}-redis
  docker network rm ${name}-network

