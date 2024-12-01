var backendUrl = 'http://katara-back.test/api';

describe('The add user page', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: backendUrl + '/consumption-level'
    }, {
      fixture: 'user_add/consumption_levels.json'
    }).as('consumptionLevels');
    cy.intercept({
      method: 'GET',
      url: backendUrl + '/product-category'
    }, {
      fixture: 'user_add/product-categories.json'
    }).as('productCategories');
    cy.intercept({
      method: 'DELETE',
      url: backendUrl + '/user/*/nutritional-profile/**'
    }, {
      statusCode: 200,
      fixture: 'residents_edit/success.json'
    }).as('nutritionalProfileDelete');
    cy.visit('/users/add');
    cy.wait('@consumptionLevels').its('response.statusCode').should('equal', 200);
    cy.wait('@productCategories').its('response.statusCode').should('equal', 200);
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
        cy.get('#mat-select-value-1').click();
        cy.get('mat-option').contains('Dairy').click();
        cy.get('#mat-select-value-3').click();
        cy.get('mat-option').contains('High').click();
        cy.get('[style="width: 35%;"] > .mdc-button > .mdc-button__label').click();

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

    it('Then delete a nutritional profile detail', () => {
      cy.fixture('user_add/user_input.json').then((input) => {
        cy.get('#name').type(input.name);
        cy.get('#lastname').type(input.lastname);
        cy.get('#date_of_birth').type(input.date_of_birth);
        cy.get('#mat-select-value-1').click();
        cy.get('#mat-option-6').click();
        cy.get('#mat-select-value-3').click();
        cy.get('#mat-option-12').click();
        cy.get('[style="width: 35%;"] > .mdc-button > .mdc-button__label').click();
        cy.get('.cdk-column-options > a').click();
        cy.wait('@nutritionalProfileDelete');
        cy.get('.mat-mdc-row').should('not.exist');
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
