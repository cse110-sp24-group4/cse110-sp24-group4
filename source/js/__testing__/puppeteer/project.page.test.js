describe('Test the functionality of the landing page', ()=>{
    beforeAll(async () => {
        await page.goto("http://127.0.0.1:5500/source/pages/project.html");
    });

    /**
     * Test create project button
     */
    it('Add project to page', async () => {
        const currProjects = await page.$$('a');        // obtain the current list of projects
        await page.click('.add-project-button');        // click on the add project button
        const projects = await page.$$('a');            // obtain the current list of projects
        expect(projects.length).toBe(currProjects.length+1);   // the project length shouldve added one
        
    }, 10000);

    /**
     * Test add project with a specific name
     */
    it('Add project to page with specific name', async () => {
        await page.type('#new-project-name', 'Dummy Project');  // type Dummy Project in the text box
        await page.click('.add-project-button');                // click on the add project button
        const projects = await page.$eval('#Project-List', (proj) => proj.textContent);
        console.log(projects);
        expect(projects).toContain('Dummy Project');
    }, 10000);

    /**
     * Test delete project feature
     */
    it('Delete project given a name', async () => {
        // TODO
        
    }, 10000);

    
});