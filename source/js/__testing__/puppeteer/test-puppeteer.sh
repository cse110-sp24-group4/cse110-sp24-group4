echo Starting server...

npx webpack serve &

sleep 5

echo Running tests...

jest source/js/__testing__/puppeteer

echo DONE!