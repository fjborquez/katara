var backendUrl = 'http://katara-back.test/api';

describe('The edit resident page', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: backendUrl + '/product-category'
    }, {
      fixture: 'residents_add/product_categories.json',
      statusCode: 200
    }).as('productCategories');
    cy.intercept({
      method: 'GET',
      url: backendUrl + '/consumption-level'
    }, {
      fixture: 'residents_add/consumption_levels.json',
      statusCode: 200
    }).as('consumptionLevels');

    cy.intercept({
      method: 'GET',
      url: backendUrl + '/user/*/houses/*/residents/**'
    }, {
      fixture: 'residents_edit/resident.json',
      statusCode: 200
    }).as('residentData');

    cy.visit('/users/1/houses/44/residents/1/update');
    cy.wait(['@productCategories', '@consumptionLevels', '@residentData']);
  });

  context('Given I update a resident', () => {
    beforeEach(() => {
      cy.intercept({
        method: 'PUT',
        url: backendUrl + '/user/*/houses/*/residents/**'
      }, {
        statusCode: 200,
        fixture: 'residents_edit/success.json'
      }).as('residentUpdate');

      cy.intercept({
        method: 'DELETE',
        url: backendUrl + '/user/*/nutritional-profile/**'
      }, {
        statusCode: 200,
        fixture: 'residents_edit/success.json'
      }).as('nutritionalProfileDelete');
    });

    it('Then the nutritional profile is not empty', () =>{
      cy.fixture('residents_edit/resident_input.json').then((input) => {
        cy.get('#name').clear().type(input.name);
        cy.get('#lastname').clear().type(input.lastname);
        cy.get('#date_of_birth').clear().type(input.date_of_birth);
        cy.get('.mat-mdc-row > .cdk-column-category').should('be.visible');
        cy.get('.mat-mdc-row > .cdk-column-consumptionLevel').should('be.visible');
        cy.get('#mat-select-value-0').click();
        cy.get('#mat-option-6').click();
        cy.get('#mat-select-value-1').click();
        cy.get('#mat-option-12').click();
        cy.get('[style="width: 35%;"] > .mdc-button > .mdc-button__label').click();
        cy.get('form').submit();
        cy.wait('@residentUpdate');
        cy.get('#cdk-overlay-2').should('be.visible');
      });
    });

    it('Then the nutritional profile is empty', () =>{
      cy.fixture('residents_edit/resident_input.json').then((input) => {
        cy.get('#name').clear().type(input.name);
        cy.get('#lastname').clear().type(input.lastname);
        cy.get('#date_of_birth').clear().type(input.date_of_birth);
        cy.get('form').submit();
        cy.wait('@residentUpdate');
        cy.get('#cdk-overlay-0').should('be.visible');
      });
    });

    it('Then delete a nutritional profile detail', () => {
      cy.get('.cdk-column-options > a').click();
      cy.get('.mat-mdc-row').should('not.exist');
    });

    it('Then redirect to the residents page', () => {
      cy.fixture('residents_edit/resident_input.json').then((input) => {
        cy.get('#name').clear().type(input.name);
        cy.get('#lastname').clear().type(input.lastname);
        cy.get('#date_of_birth').clear().type(input.date_of_birth);
        cy.get('form').submit();
        cy.wait('@residentUpdate').location().should((location) => {
          expect(location.pathname.toString()).equal('/users/1/houses/44/residents');
        })
      });
    });
  });

  context('Given I enter wrong inputs', () => {
    it('Then the user is not updated', () => {
      cy.intercept({
        method: 'PUT',
        url: backendUrl + '/user/*/houses/*/residents/**'
      }, {
        statusCode: 422,
        fixture: 'residents_edit/error.json'
      }).as('residentUpdate');
      cy.fixture('residents_edit/resident_wrong_input.json').then((input) => {
        cy.get('#name').clear().type(input.name);
        cy.get('#lastname').clear().type(input.lastname);
        cy.get('#date_of_birth').clear().type(input.date_of_birth);
        cy.get('form').submit();
      });
    });
  });

  context('Given I want to go back', () => {
    it('Then redirect to user list page', () => {
      cy.get('app-house-residents-update > a').click();
      cy.location().should((location) => {
        expect(location.pathname.toString()).equal('/users/1/houses/44/residents');
      })
    });
  });
});
