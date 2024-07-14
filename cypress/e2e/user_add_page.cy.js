var backendUrl = 'http://katara-back.test/api';

describe('The add user page', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: backendUrl + '/nutritional-restriction'
    }, {
      fixture: 'user_add/nutritional_restriction.json'
    }).as('nutritionalRestrictions');
    cy.visit('/users/add');
    cy.wait('@nutritionalRestrictions').its('response.statusCode').should('equal', 200);
  });

  context('Given I add a new user successfully', () => {
    it('Then the nutritional profile is not empty', () => {
      cy.intercept({
        method: 'POST',
        url: backendUrl + '/user'
      }, {
        fixture: 'user_add/user_added.json',
        statusCode: 201
      }).as('addUser');

      cy.fixture('user_add/user_input.json').then(input => {
        cy.get('#name').type(input.name);
        cy.get('#lastname').type(input.lastname);
        cy.get('#date_of_birth').type(input.date_of_birth, {force: true});
        cy.get('#email').type(input.email);
        cy.get('#password').type(input.password);
        cy.get('#vegetarian').check();
        cy.get('#celiac').check();

        cy.get('form').submit();
        cy.wait('@addUser').its('response.statusCode').should('equal', 201);
      });
    });

    it('Then the nutritional profile is empty', () => {
      cy.intercept({
        method: 'POST',
        url: backendUrl + '/user'
      }, {
        fixture: 'user_add/user_added.json',
        statusCode: 201
      }).as('addUser');

      cy.fixture('user_add/user_input.json').then(input => {
        cy.get('#name').type(input.name);
        cy.get('#lastname').type(input.lastname);
        cy.get('#date_of_birth').type(input.date_of_birth);
        cy.get('#email').type(input.email);
        cy.get('#password').type(input.password);

        cy.get('form').submit();
        cy.wait('@addUser').its('response.statusCode').should('equal', 201);
      });
    });

    it('Then redirect to user list page', () => {
      cy.intercept({
        method: 'POST',
        url: backendUrl + '/user'
      }, {
        fixture: 'user_add/user_added.json',
        statusCode: 201
      }).as('addUser');

      cy.fixture('user_add/user_input.json').then(input => {
        cy.get('#name').type(input.name);
        cy.get('#lastname').type(input.lastname);
        cy.get('#date_of_birth').type(input.date_of_birth);
        cy.get('#email').type(input.email);
        cy.get('#password').type(input.password);
        cy.get('#vegetarian').check();
        cy.get('#celiac').check();

        cy.get('form').submit();
        cy.wait('@addUser').location().should((location) => {
          expect(location.pathname.toString()).equal('/users');
        })
      });
    });
  });

  context('Given I add wrong input', () => {
    it('Then show error message', () => {
      cy.intercept({
        method: 'POST',
        url: backendUrl + '/user'
      }, {
        statusCode: 422,
        fixture: 'user_add/user_added_error.json'
      }).as('addUser');

      cy.fixture('user_add/user_input.json').then(input => {
        cy.get('#name').type(input.name);
        cy.get('#lastname').type(input.lastname);
        cy.get('#date_of_birth').type(input.date_of_birth);
        cy.get('#email').type(input.email);
        cy.get('#password').type(input.password);
        cy.get('#vegetarian').check();
        cy.get('#celiac').check();

        cy.get('form').submit();
        cy.wait('@addUser').its('response.statusCode').should('equal', 422);
      });
    })
  });

  context('Given I want go back', () => {
    it('Then redirect to user list page', () => {
      cy.get('app-user-create > a').click();
      cy.location().should((location) => {
        expect(location.pathname.toString()).equal('/users');
      })
    });
  });
});
