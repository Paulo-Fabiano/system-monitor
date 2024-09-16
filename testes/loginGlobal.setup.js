// Imports
import { test } from '@playwright/test';

test('Login no Swag Labs', async ({page}) => {

    await page.goto('https://www.saucedemo.com/v1/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button')

    // Salvando o estado de autenticação em um arquivo JSON
    await page.context().storageState({path: "./.auth/storageState.json"});

})