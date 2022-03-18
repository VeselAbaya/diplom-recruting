describe('Header links', () => {
  it('should open signin page', () => {
    cy.visit('/');
    cy.contains('Sign in')
      .should('exist')
      .click();

    cy.url().should('include', 'signin');
  });

  it('should open signup page', () => {
    cy.visit('/');
    cy.contains('Sign up')
      .should('exist')
      .click();

    cy.url().should('include', 'signup');
  });

  it('should open search page', () => {
    cy.visit('/auth/signin');
    cy.getByQA('header-logo')
      .should('exist')
      .click();

    cy.url().should('include', 'search');
  });
});
