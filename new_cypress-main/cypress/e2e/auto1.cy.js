import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
         });

    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible');
         });

    it('Верный пароль и верный логин', function () {
         cy.get(main_page.email).type(data.login);
         cy.get(main_page.password).type(data.password);
         cy.get(main_page.login_button).click();
         cy.get(result_page.title).should('be.visible');
         cy.get(result_page.title)).contains('Авторизация прошла успешно');
     }) 
     
     it('Восстановление пароля', function () {
         cy.get('#forgotEmailButton').click();
         cy.get(recovery_password_page.email).type(data.login);
         cy.get(recovery_password_page.send_button).click();
         cy.get(result_page.title).should('be.visible');
         cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');
     }) 
     
     it('Верный логин и НЕверный пароль', function () {
         cy.get(main_page.email).type(data.login);
         cy.get(main_page.password).type('iLoveqastudio');
         cy.get(main_page.login_button).click();
         cy.get(result_page.title).should('be.visible');
         cy.get(result_page.title).contains('Такого логина или пароля нет');
     })

     it('Верный пароль и НЕверный логин', function () {
         cy.get(main_page.email).type('germn@dolnikov.ru');
         cy.get(main_page.password).type(data.password);
         cy.get(main_page.login_button).click();
         cy.get(result_page.title).should('be.visible');
         cy.get(result_page.title).contains('Такого логина или пароля нет');
        }) 
 
       it('Логин без @', function () {
         cy.get(main_page.email).type('germandolnikov.ru');
         cy.get(main_page.password).type(data.password);
         cy.get(main_page.login_button).click();
         cy.get(result_page.title).should('be.visible');
         cy.get(result_page.title).contains('Нужно исправить проблему валидации');
     })

       it('Проверка на приведение к строчным буквам в логине', function () {
         cy.get(main_page.email).type('GerMan@Dolnikov.ru');
         cy.get(main_page.password).type(data.password);
         cy.get(main_page.login_button).click();
         cy.get(result_page.title).should('be.visible');
         cy.get(result_page.title).contains('Авторизация прошла успешно');
    }) 
 })
