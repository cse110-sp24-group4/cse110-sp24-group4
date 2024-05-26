//const puppeteer = require('puppeteer');
const projectId = "testingProject";

describe('Task List Feature', () => {
  //let browser;
  //let page;

  beforeAll(async () => {
    //browser = await puppeteer.launch({ headless: false }); // Set to true if you don't need to see the browser
    //page = await browser.newPage();
    await page.goto(`http://localhost:9000/pages/notes.html?projectId=${projectId}`); // Update to your local server and path
  });
  /*
  afterAll(async () => {
    await browser.close();
  });*/

  test('should add a new task', async () => {
    await page.type('#new-task-name', 'Test Task');
    await page.click('#add-task-button');

    const taskText = await page.$eval('#task-list li span', el => el.innerText);
    expect(taskText).toBe('Test Task');
  });

  test('should mark a task as completed', async () => {
    // Ensure the task is added before trying to complete it
    //await page.type('#new-task-name', 'Test Task to Complete');
    //await page.click('#add-task-button');
    await page.waitForSelector('#task-list li input[type="checkbox"]'); // Wait for the task to appear in the list

    // Mark the task as completed
    await page.click('#task-list li input[type="checkbox"]');
    //await page.waitForTimeout(500);
    
    //await page.click('#task-list li input[type="checkbox"]');

    const taskCompleted = await page.$eval('#task-list li span', el => el.classList.contains('task-completed'));
    expect(taskCompleted).toBe(false);
  });

  test('should delete a task', async () => {
    await page.click('#task-list li button');

    const taskCount = await page.$$eval('#task-list li', els => els.length);
    expect(taskCount).toBe(0);
  });
});
