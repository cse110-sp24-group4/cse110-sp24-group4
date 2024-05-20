node source/js/__testing__/puppeteer/server.js &

PID=$!

sleep 5

echo Running tests...

jest source/js/__testing__/puppeteer

kill $PID

echo DONE!