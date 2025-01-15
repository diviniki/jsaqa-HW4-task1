let page;

beforeEach(async () => {
  page = await browser.newPage();
  //await page.setDefaultNavigationTimeout(60000);
});

afterEach(() => {
  page.close();
});


describe("Github page tests", () => {

  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });
  
  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    //expect(title2).toEqual('GitHub: Where the world builds software · GitHub');
    //expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
    expect(title2).toEqual('GitHub · Build and ship software on a single, collaborative platform · GitHub');
  }, 60000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    //expect(actual).toContain("Sign up for free")
    expect(actual).toContain("Get started with Team")
  });
});


describe("Additional tests", () => {

  beforeEach(async () => {
    await page.goto("https://github.com/features/copilot", {waitUntil: 'load', timeout: 30000});
  });

  test("Additional test 1", async () => {
    const title2 = await page.title();
    expect(title2).toEqual('GitHub Copilot · Your AI pair programmer · GitHub');
  });
  
  test("Additional test 2", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub · Build and ship software on a single, collaborative platform · GitHub');
  });

  test("Additional test 3", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  });
});
