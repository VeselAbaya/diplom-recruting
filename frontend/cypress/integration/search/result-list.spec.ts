import { compose, isEmpty, not, trim } from 'ramda';

describe('Search result list', () => {
  beforeEach(() => cy.visit('/'));

  it('should include some users initially', () => {
    cy.get('app-user-card').should('exist');
  });

  // TODO it seems like this isn't e2e test, but just an API test
  it('different users should be displayed on different pages', () => {
    const getUserEmailsFromEls = <T>(els$: JQuery<T>) => els$.text()
      .split('\n')
      .map(trim)
      .filter(compose(not, isEmpty));

    let userEmailsFromFirstPage: string[];
    let userEmailsFromSecondPage: string[];
    cy.get('app-user-card').getByQA('user-info--email')
      .then(userEmailsFromFirstPage$ => {
        userEmailsFromFirstPage = getUserEmailsFromEls(userEmailsFromFirstPage$);
        cy.log('Users from first page: ', userEmailsFromFirstPage.join(','));
      })
      .then(() => {
        cy.intercept('**/users**').as('getUsers');
        cy.getByQA('search-paginator').get('.mat-paginator-navigation-next').click();
        cy.wait('@getUsers');
        return cy.get('app-user-card').getByQA('user-info--email');
      })
      .then(userEmailsFromSecondPage$ => {
        userEmailsFromSecondPage = getUserEmailsFromEls(userEmailsFromSecondPage$);
        return cy.log('Users from second page: ', userEmailsFromSecondPage.join(','));
      })
      .then(() =>
        // TODO I don't know how to make it in one assertion
        userEmailsFromSecondPage.forEach(email => expect(userEmailsFromFirstPage).not.to.contain(email))
      );
  });

  it('should show not-found message', () => {
    cy.getByQA('search-input')
      .should('exist')
      .type('asd@2341random text as');
    cy.contains('No users satisfying the request');
  });
});
