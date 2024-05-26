const projectId = "testingProject";

describe('Task List Feature', () => {
  beforeAll(async () => {
    await page.goto(`http://localhost:9000/pages/notes.html?projectId=${projectId}`); // Update to your local server and path
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
