const puppeteer = require('puppeteer');

describe('Task List Feature', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false }); // Set to true if you don't need to see the browser
    page = await browser.newPage();
    await page.goto('http://localhost:8000/path/to/your/project/page'); // Update to your local server and path
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should add a new task', async () => {
    await page.type('#new-task-name', 'Test Task');
    await page.click('#add-task-button');

    const taskText = await page.$eval('#task-list li span', el => el.innerText);
    expect(taskText).toBe('Test Task');
  });

  test('should mark a task as completed', async () => {
    await page.click('#task-list li input[type="checkbox"]');

    const taskCompleted = await page.$eval('#task-list li span', el => el.classList.contains('task-completed'));
    expect(taskCompleted).toBe(true);
  });

  test('should delete a task', async () => {
    await page.click('#task-list li button');

    const taskCount = await page.$$eval('#task-list li', els => els.length);
    expect(taskCount).toBe(0);
  });
});
