describe('Header User menu', () => {
  beforeEach(() => {
    cy.login();
    cy.getByQA('user-menu-trigger').click();
  });

  it('should open on click', () => {
    cy.getByQA('user-menu-overlay').should('be.visible');
  });

  it('should contain user info', () => {
    cy.fixture('auth').then(({ name, surname, email }) => {
      cy.getByQA('user-menu-trigger').should('include.text', `${name} ${surname}`);
      cy.getByQA('user-menu-overlay').should('include.text', `${name} ${surname}`);
      cy.getByQA('user-menu-overlay').should('include.text', email);
    });
  });

  it('should navigating by first letters', () => {
    cy.getByQA('user-menu-overlay').type('p');
    cy.getByQA('profile-link').should('be.focused');

    cy.getByQA('user-menu-overlay').type('s');
    cy.getByQA('search-link').should('be.focused');

    cy.getByQA('user-menu-overlay').type('r');
    cy.getByQA('relations-link').should('be.focused');

    cy.getByQA('user-menu-overlay').type('l');
    cy.getByQA('logout-link').should('be.focused');
  });

  it('should navigating by arrow keys', () => {
    cy.getByQA('user-menu-overlay').type('{downarrow}');
    cy.getByQA('search-link').should('be.focused');

    cy.getByQA('user-menu-overlay').type('{downarrow}');
    cy.getByQA('relations-link').should('be.focused');

    cy.getByQA('user-menu-overlay').type('{downarrow}');
    cy.getByQA('logout-link').should('be.focused');

    cy.getByQA('user-menu-overlay').type('{downarrow}');
    cy.getByQA('profile-link').should('be.focused');

    cy.getByQA('user-menu-overlay').type('{uparrow}');
    cy.getByQA('logout-link').should('be.focused');
  });

  it('should open profile details', () => {
    cy.getByQA('profile-link').click();
    cy.url().should('include', 'search/');
    cy.fixture('auth').then(({ name, surname }) =>
      cy.getByQA('header-h1').should('have.text', `Profile | ${name} ${surname}`)
    );
  });

  it('should open main search', () => {
    cy.getByQA('profile-link').click();
    cy.getByQA('search-link').click();
    cy.url().should('include', 'search');
    cy.getByQA('header-h1').should('have.text', 'Search');
  });

  it('should open relation requests page', () => {
    cy.getByQA('relations-link').click();
    cy.url().should('include', 'requests');
    cy.getByQA('header-h1').should('have.text', 'Relation requests');
  });

  it('should logout user', () => {
    cy.getByQA('logout-link').click();
    cy.getByQA('user-menu-overlay').should('not.exist');
    cy.getByQA('user-menu-trigger').should('not.exist');
  });
});
