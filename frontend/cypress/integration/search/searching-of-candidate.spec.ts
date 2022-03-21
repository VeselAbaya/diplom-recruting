import { ICandidate } from '@cypress/fixtures/candidate.interface';

describe('Searching of candidate', () => {
  const fillFormAndWaitForResult = () => {
    cy.getByQA('search-form').should('exist');
    cy.fixture('candidate').then(({
                                    maxRateValue,
                                    experience,
                                    english,
                                    workSchedule
                                  }: ICandidate) => {
      cy.getByQA('range--max-input')
        .type(maxRateValue.toString());

      cy.getByQA('experience-slider')
        .focus()
        .type(experience === -1 ? '{leftarrow}' : '{rightarrow}'.repeat(experience));

      cy.selectValueFromMatSelect('english-select', english);

      cy.getByQA('work-schedule-toggles')
        .contains(workSchedule)
        .click();

      cy.intercept('**/users**').as('getUsers');
      cy.wait('@getUsers');
    });
  };

  beforeEach(() => {
    cy.login();
    fillFormAndWaitForResult();
  });

  it('should find candidate and write a message to him', () => {
    cy.fixture('candidate').then(({ message }: ICandidate) => {
      const uniqueMessage = `${message}{shift+enter}-----{shift+enter}(Random part of message): ${crypto.randomUUID()}`;
      cy.getByQA('user-card--message-button')
        .first()
        .click();
      cy.getByQA('message-input')
        .type(uniqueMessage);
      cy.getByQA('send-message-button')
        .click();

      cy.getByQA('message-text')
        .last()
        .should('have.text', uniqueMessage.replace(/{shift\+enter}/g, '\n'));
    });
  });

  // TODO not working now because request decline doesn't delete the request
  //      and we can't create new request on next test
  it.only('should find candidate, send the relation request to him and decline it', () => {
    let candidateFullName = '';
    cy.get('app-user-card')
      .first()
      .then(userCard =>
        cy.wrap(userCard)
          .getByQA('user-info--link')
          .invoke('text')
          .then(fullName => cy.log(`Candidate Full Name: ${candidateFullName = fullName}`))
      );
    cy.getByQA('user-info--add-relation-button')
      .first()
      .click();

    cy.fixture('candidate').then(({ relation }: ICandidate) => {
      cy.selectValueFromMatSelect('relation-type-select', relation.type);
      cy.getByQA('relation-start-date-input').type(relation.startDate);

      const description = `Random description: ${crypto.randomUUID()}`;
      cy.getByQA('relation-description-input').type(description);

      const message = `Random message: ${crypto.randomUUID()}`;
      cy.getByQA('relation-comment-input').type(message);

      cy.getByQA('create-relation-button').click();
    });

    cy.getByQA('user-menu-trigger')
      .click();
    cy.getByQA('user-menu-overlay')
      .should('be.visible')
      .getByQA('relations-link')
      .click();
    cy.url().should('include', 'requests/to-me');

    cy.getByQA('from-me-link')
      .should('be.visible')
      .click();
    cy.url().should('include', 'requests/from-me');

    cy.contains(candidateFullName);
  });
});
