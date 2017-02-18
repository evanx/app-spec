
set -x 

  version=`npm version | head -1 | sed "s/.*'\([0-9].*\)',/\1/"`
  npm info | grep latest | grep -v $version

  git add -A
  git commit -m 'publish'
  git push

  npm publish
