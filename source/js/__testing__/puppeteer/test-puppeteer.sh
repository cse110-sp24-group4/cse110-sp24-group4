set -e

npx live-server --port=9000 source/ &

PID=$!

sleep 5

echo Running tests...

node --experimental-vm-modules node_modules/jest/bin/jest.js source/js/__testing__/puppeteer/*

kill $PID

fuser -k 9000/tcp
