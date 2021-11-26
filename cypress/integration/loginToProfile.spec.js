describe('Navigate', () => {
  it('should navigate to user profile page over login / register page from home page', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-cy="loginOrRegister"]').click();

    cy.get('[data-cy="email-input"]').type('user1@user1.user1');
    cy.get('[data-cy="password-input"]').type('user1');
    cy.get('[data-cy="login"]').click();

    cy.get('[data-cy="myProfile"]').click();
  });
});
