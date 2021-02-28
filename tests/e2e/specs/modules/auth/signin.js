describe('SignIn.vue', () => {
  it('Visits the signin page, types email and password and clicks submit button', () => {
    cy.visit('/auth/signin');

    const testEmail = 'test@test.com';
    const testPassword = '123456';

    cy.get('[name=email]').type(testEmail).should('have.value', testEmail);
    cy.get('[name=password]').type(testPassword).should('have.value', testPassword);
    cy.get('.submit-btn').click();
  });
});
