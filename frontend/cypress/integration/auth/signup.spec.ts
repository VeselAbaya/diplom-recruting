describe('Sign up', () => {
  beforeEach(() => cy.visit('/auth/signup'));

  it('should show welcome message and sign up must be <strong>', () => {
    cy.contains('Sign up to enhance your professional network')
      .get('strong')
      .should('have.text', 'Sign up');
  });

  it('fields should became invalid after sign up button clicked', () => {
    cy.getByQA('submit-button')
      .click();

    cy.getByQALike('-input')
      .should('have.class', 'ng-invalid');
  });

  it('shouldn\'t sign up existed user', () => {
    cy.fixture('auth').then(auth => {
      cy.getByQA('first-name-input').type(auth.name);
      cy.getByQA('last-name-input').type(auth.surname);
      cy.getByQA('email-input').type(auth.email);
    });
    cy.getByQA('password-input').type('randompassword');
    cy.getByQA('submit-button').click();
    cy.contains('User with given email already exists');
  });

  it('should validate email', () => {
    cy.getByQA('email-input')
      .focus()
      .blur()
      .should('have.class', 'ng-invalid')
      .type('notemail')
      .should('have.class', 'ng-invalid');

    cy.contains('Must be an email');

    cy.getByQA('email-input')
      .clear()
      .type('email@mail.com')
      .should('not.have.class', 'ng-invalid');
  });
});
