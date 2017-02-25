
set -u -e

name=`
  cat package.json |
  jq '.name' |
  sed 's/"\(.*\)"/\1/'`

user=`
  docker info 2>/dev/null |
  grep ^Username |
  sed 's/^Username: \(.*\)$/\1/'`

[ -n "$user" ] 
[ -n "$name" ] 

echo "$user/$name" 

  docker build -t $name https://github.com/evanx/$name.git
  docker tag $name $user/$name
  docker push $user/$name

