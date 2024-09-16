const { defineConfig, devices } = require('@playwright/test');
/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  timeout: 30000, // 30 segundos de timeout
  globalTimeout: 120000, // 2 minutos para todos os testes acabarem
  testDir: './testes', // Diretório onde os testes são executados
  fullyParallel: true, // Rodando os testes em paralelo
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0, // 
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['line'], ['./customReporter.js', {outputFile: './resultados.json'}]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    headless: true, 

  },

  /* Configure projects for major browsers */

  // Para nossa configuração usaremos apenas o navegador Google Chrome
  projects: [

    // Alteração para chamar a execução do arquivo global.setup.ts
    {
      name: 'setup',
      testMatch: 'loginGlobal.setup.js',
      // testMatch é usado para que os arquivo que terminam com "setup.js" rodem primeiro que os testes, para salvar o storageStage
    },

    {
      name: 'chromium',
      dependencies: ['setup'],
      testDir: './testes/',
      use: {
        ...devices['Desktop Chrome'],
        storageState: './.auth/storageState.json',
      // Especifica um arquivo de estado de armazenamento que será usado para inicializar o estado do navegador (cookies, localStorage, etc.), 
      // permitindo simular um usuário já logado ou um estado específico da aplicação.
      },
    },


   // Se quiser utilizar outros navegadores é só descomentar as linhas abaixo 
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

});

