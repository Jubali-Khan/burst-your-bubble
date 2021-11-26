describe('Navigate', () => {
  it('should login', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-cy="loginOrRegister"]').click();

    cy.get('[data-cy="email-input"]').type('user2@user2.user2');
    cy.get('[data-cy="password-input"]').type('user2');
    cy.get('[data-cy="login"]').click();
  });
  it('should navigate to an event page and leave a comment', () => {
    cy.wait(3000);
    cy.get('[data-cy="7"]').click();
  });
  it('should navigate to an event page and leave a comment', () => {
    cy.get('[data-cy="verbChoice"]').select('agrees');
    cy.get('[data-cy="argumentInput"]').type('that this website kicks ass!');
    cy.get('[data-cy="addPremise"]').click().wait(500);

    cy.get('[data-cy="verbChoice"]').select('agrees');
    cy.get('[data-cy="argumentInput"]').type('that this website kicks ass!');
  });
});
