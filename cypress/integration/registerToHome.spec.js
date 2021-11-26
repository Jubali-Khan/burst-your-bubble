describe('Register', () => {
  it('should register', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-cy="loginOrRegister"]').click();

    cy.get('[data-cy="email-input"]').type('user4@user4.user4');
    cy.get('[data-cy="password-input"]').type('user4');
    cy.get('[data-cy="register"]').click();
    cy.wait(1000);
    cy.get('[data-cy="username-input"]').type('user4');
    cy.get('[data-cy="register"]').click();
  });
});
