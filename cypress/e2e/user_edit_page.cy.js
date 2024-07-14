var backendUrl = 'http://katara-back.test/api';

describe('The edit user page', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: backendUrl + '/nutritional-restriction'
    }, {
      statusCode: 200,
      fixture: 'user_edit/nutritional_restriction.json'
    }).as('restrictions');
  });
  context('Given I update an user', () => {
    it('Then the nutritional profile is not empty', () =>{
      cy.intercept({
        method: 'GET',
        url: backendUrl + '/user/1'
      }, {
        fixture: 'user_edit/user.json',
        statusCode: 200
      }).as('userData');
      cy.visit('/users/1/update');
      cy.wait(['@restrictions', '@userData']);
      cy.fixture('user_edit/user_input.json').then((user) => {
        cy.get('#name').clear().type(user.name);
        cy.get('#lastname').clear().type(user.lastname);
        cy.get('#date_of_birth').clear().type(user.date_of_birth);
        cy.get('#password').clear().type(user.password);
        cy.get('#vegetarian').uncheck();
        cy.get('#vegetarian').check();
        cy.get('#vegan').check();
        cy.get('form').submit();
      });
    });

    it('Then the nutritional profile is empty', () =>{
      cy.intercept({
        method: 'GET',
        url: backendUrl + '/user/1'
      }, {
        fixture: 'user_edit/user_without_profile.json',
        statusCode: 200
      }).as('userData');
      cy.visit('/users/1/update');
      cy.wait(['@restrictions', '@userData']);
      cy.fixture('user_edit/user_input.json').then((user) => {
        cy.get('#name').clear().type(user.name);
        cy.get('#lastname').clear().type(user.lastname);
        cy.get('#date_of_birth').clear().type(user.date_of_birth);
        cy.get('#password').clear().type(user.password);
        cy.get('form').submit();
      });
    });

    it('Then redirect to the user page', () => {
      cy.intercept({
        method: 'GET',
        url: backendUrl + '/user/*'
      }, {
        fixture: 'user_edit/user.json',
        statusCode: 200
      }).as('userData');
      cy.intercept({
        method: 'PUT',
        url: backendUrl + '/user/*'
      }, {
        statusCode: 204
      }).as('editUser');
      cy.visit('/users/1/update');
      cy.wait(['@restrictions', '@userData']);
      cy.fixture('user_edit/user_input.json').then((user) => {
        cy.get('#name').clear().type(user.name);
        cy.get('#lastname').clear().type(user.lastname);
        cy.get('#date_of_birth').clear().type(user.date_of_birth);
        cy.get('#password').clear().type(user.password);
        cy.get('#vegetarian').uncheck();
        cy.get('#vegetarian').check();
        cy.get('#vegan').check();
        cy.get('form').submit();
      });
      cy.wait('@editUser').location().should((location) => {
        expect(location.pathname.toString()).equal('/users');
      })
    });
  });

  context('Given I enter wrong inputs', () => {
    it('Then the user is not updated', () => {
      cy.intercept({
        method: 'GET',
        url: backendUrl + '/user/*'
      }, {
        fixture: 'user_edit/user.json',
        statusCode: 200
      }).as('userData');
      cy.intercept({
        method: 'PUT',
        url: backendUrl + '/user/*'
      }, {
        statusCode: 422,
        fixture: 'user_edit/user_error.json'
      }).as('editUser');
      cy.visit('/users/1/update');
      cy.wait(['@restrictions', '@userData']);
      cy.fixture('user_edit/user_input.json').then((user) => {
        cy.get('#name').clear().type(user.name);
        cy.get('#lastname').clear().type(user.lastname);
        cy.get('#date_of_birth').clear().type(user.date_of_birth);
        cy.get('#password').clear().type(user.password);
        cy.get('#vegetarian').uncheck();
        cy.get('#vegetarian').check();
        cy.get('#vegan').check();
        cy.get('form').submit();
      });
      cy.get('.mat-mdc-simple-snack-bar > .mat-mdc-snack-bar-label').should('be.visible');
    });
  });

  context('Given I want to go back', () => {
    it('Then redirect to user list page', () => {
      cy.visit('/users/1/update');
      cy.get('app-user-update > a').click();
      cy.location().should((location) => {
        expect(location.pathname.toString()).equal('/users');
      })
    });
  });
});
