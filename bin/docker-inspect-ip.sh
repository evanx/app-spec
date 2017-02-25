
set -u -e 

  [ $# -eq 1 ]

  docker inspect $1 |
      grep '"IPAddress":' | tail -1 | sed 's/.*"\([0-9\.]*\)",/\1/'
