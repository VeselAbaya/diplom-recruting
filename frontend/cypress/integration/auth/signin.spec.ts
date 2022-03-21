describe('Signin', () => {
  beforeEach(() => cy.visit('/auth/signin'));

  it('should show welcome message and sign in must be <strong>', () => {
    cy.contains('Sign in to enhance your professional network')
      .get('strong')
      .should('have.text', 'Sign in');
  });

  it('fields should became invalid after sign in button clicked', () => {
    cy.getByQA('submit-button')
      .should('exist')
      .click();

    cy.getByQALike('-input')
      .should('have.class', 'ng-invalid');
  });

  it('should sign in existed user', () => {
    cy.login();
  });

  it('shouldn\'t sign in user with invalid credentials', () => {
    cy.login('notexisting@user.com', 'incorrectpassword');
    cy.contains('Invalid credentials');
    cy.url().then(cy.log).should('include', 'signin');
  });

  it('should validate email and password', () => {
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

    cy.getByQA('password-input')
      .focus()
      .blur()
      .should('have.class', 'ng-invalid')
      .type('short')
      .should('not.have.class', 'ng-invalid');
  });

  it('sign up button should link to sign up page', () => {
    cy.getByQA('signup-link').click();
    cy.url().should('include', 'signup');
  });
});
