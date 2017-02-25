
set -u -e

  [ $# -eq 1 ]
  network=$1

  if docker network ls -q -f name=^$network | grep '\w'
  then
    docker network rm $network
  fi
