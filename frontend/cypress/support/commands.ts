// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// tslint:disable-next-line:no-namespace
declare namespace Cypress {
  // tslint:disable-next-line:no-any
  interface Chainable<Subject = any> {
    login(email?: string, password?: string): void;

    getByQA<K extends keyof HTMLElementTagNameMap>(selector: string): Chainable<JQuery<HTMLElementTagNameMap[K]>>;

    getByQALike<K extends keyof HTMLElementTagNameMap>(selector: string): Chainable<JQuery<HTMLElementTagNameMap[K]>>;

    selectValueFromMatSelect(qaSelector: string, optionText: string): void;
  }
}
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email = 'AntayJuskovets@gmail.com', password = '123456') => {
  cy.visit('/auth/signin');
  cy.getByQA('email-input').type(email);
  cy.getByQA('password-input').type(password);
  cy.getByQA('submit-button').click();
});

// TODO upgrade these command to be able to chain them
Cypress.Commands.add('getByQA', (selector: string) => cy.get(`[data-qa="${selector}"]`));
Cypress.Commands.add('getByQALike', (selector: string) => cy.get(`[data-qa*="${selector}"]`));

Cypress.Commands.add('selectValueFromMatSelect', (qaSelector: string, optionText: string) => {
  cy.getByQA(qaSelector)
    .should('be.visible')
    .click();
  cy.get('.mat-option')
    .contains(optionText)
    .should('be.visible')
    .click();
});
