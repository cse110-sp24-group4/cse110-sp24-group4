describe("Test the functionality of the landing page", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:9000/pages/project.html");
  });

  /**
   * Test delete project feature
   * How do I click the specific button to delete
   */
  it("Delete project given a name", async () => {
    await page.type("#new-project-name", "Project 1");
    await page.click("#project-create");
    await page.waitForSelector("#Project-List li");

    const projectsBeforeDeletion = await page.$$eval(
      "#Project-List li",
      (items) => items.length,
    ); // Get number of projects before deletion

    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });

    await page.$$eval("#Project-List li button", (buttons) => {
      buttons.forEach((button) => button.click()); // Click delete button for each project
    });

    const projectsAfterDeletion = await page.$$eval(
      "#Project-List li",
      (items) => items.length,
    );

    expect(projectsAfterDeletion).toBe(projectsBeforeDeletion - 1);
  }, 10000);

  /**
   * Test create project button with invalid input
   */
  it("Add blank name project to page", async () => {
    const currProjects = await page.$$("a"); // obtain the current list of projects
    await page.click(".add-project-button"); // click on the add project button
    const projects = await page.$$("a"); // obtain the current list of projects
    expect(projects.length).toBe(currProjects.length); // the project length shouldve rejected blank project name
  }, 10000);

  /**
   * Test add project with a specific name
   */
  it("Add project to page with specific name", async () => {
    await page.type("#new-project-name", "Dummy Project"); // type Dummy Project in the text box
    await page.click(".add-project-button"); // click on the add project button
    const projects = await page.$eval(
      "#Project-List",
      (proj) => proj.textContent,
    );
    console.log(projects);
    expect(projects).toContain("Dummy Project");
  }, 10000);

  /**
   * Test local storage
   */
  it("See if projects are stored in local storage", async () => {
    const currProjects = await page.$$("a");
    await page.reload();
    const reloadedProjects = await page.$$("a");
    expect(currProjects.length).toBe(reloadedProjects.length);
  }, 10000);
});
