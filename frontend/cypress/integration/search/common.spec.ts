describe('Search common', () => {
  it('Should redirects to search from root', () => {
    cy.visit('/');
    cy.getByQA('header-h1').should('have.text', 'Search');
    cy.url().should('include', 'search');
  });
});
