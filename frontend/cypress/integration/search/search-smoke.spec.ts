describe('Search smoke test', () => {
  it('Smoke test', () => {
    cy.visit('/');

    cy.contains('Search');
    cy.contains('Search result');
    cy.get('app-user-card').should('exist');

    cy.getByQA('search-input')
      .should('exist')
      .type('asd@2341random text as');
    cy.contains('No users satisfying the request');
  });
});
