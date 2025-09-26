var backendUrl = 'http://katara-back.test/api';

describe('The add resident page', () => {
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
    cy.visit('/users/1/houses/31/residents/add');
    cy.wait(['@productCategories', '@consumptionLevels']);
  });

  context('Given I add a new resident successfully', () => {
    it('Then the nutritional profile is not empty', () => {
      cy.intercept({
        method: 'POST',
        url: backendUrl + '/user/*/houses/*/residents',
      },{
        statusCode: 201,
        fixture: 'residents_add/success.json'
      }).as('addResident');

      cy.fixture('residents_add/resident_input.json').then((input) => {
        cy.get('#name').type(input.name);
        cy.get('#lastname').type(input.lastname);
        cy.get('#date_of_birth').type(input.date_of_birth);
        cy.get('#mat-select-value-0').click();
        cy.get('#mat-option-6').click();
        cy.get('#mat-select-value-1').click().get('mat-option').contains('Very Low').click();
        cy.get('[style="width: 35%;"] > button').click();
        cy.get('.mat-mdc-row > .cdk-column-category').should('be.visible');
        cy.get('.mat-mdc-row > .cdk-column-consumptionLevel').should('be.visible');
        cy.get('form').submit();
        cy.wait('@addResident');
        cy.get('#cdk-overlay-2').should('be.visible');
      });
    });

    it('Then the nutritional profile is empty', () => {
      cy.intercept({
        method: 'POST',
        url: backendUrl + '/user/*/houses/*/residents',
      },{
        statusCode: 201,
        fixture: 'residents_add/success.json'
      }).as('addResident');

      cy.fixture('residents_add/resident_input.json').then((input) => {
        cy.get('#name').type(input.name);
        cy.get('#lastname').type(input.lastname);
        cy.get('#date_of_birth').type(input.date_of_birth);
        cy.get('form').submit();
        cy.wait('@addResident');
        cy.get('.mat-mdc-simple-snack-bar > .mat-mdc-snack-bar-label').should('be.visible');
      });
    });

    it('Then delete a nutritional profile detail', () => {
      cy.fixture('residents_add/resident_input.json').then((input) => {
        cy.get('#name').type(input.name);
        cy.get('#lastname').type(input.lastname);
        cy.get('#date_of_birth').type(input.date_of_birth);
        cy.get('#mat-select-value-0').click();
        cy.get('#mat-option-6').click();
        cy.get('#mat-select-value-1').click();
        cy.get('#mat-option-12').click();
        cy.get('[style="width: 35%;"] > button').click();
        cy.get('.cdk-column-options > a').click();
        cy.get('.mat-mdc-row').should('not.exist');
      });
    });

    it('Then redirect to user list page', () => {
      cy.intercept({
        method: 'POST',
        url: backendUrl + '/user/*/houses/*/residents',
      },{
        statusCode: 201,
        fixture: 'residents_add/success.json'
      }).as('addResident');

      cy.fixture('residents_add/resident_input.json').then((input) => {
        cy.get('#name').type(input.name);
        cy.get('#lastname').type(input.lastname);
        cy.get('#date_of_birth').type(input.date_of_birth);
        cy.get('form').submit();
        cy.wait('@addResident').location().should((location) => {
          expect(location.pathname.toString()).equal('/users/1/houses/31/residents');
        })
      });
    });
  });

  context('Given I add wrong input', () => {
    it('Then show error message', () => {
      cy.intercept({
        method: 'POST',
        url: backendUrl + '/user/*/houses/*/residents',
      },{
        statusCode: 422,
        fixture: 'residents_add/resident_wrong_input.json'
      }).as('addResident');

      cy.fixture('residents_add/resident_input.json').then((input) => {
        cy.get('#name').type(input.name);
        cy.get('#lastname').type(input.lastname);
        cy.get('#date_of_birth').type(input.date_of_birth);
        cy.get('form').submit();
        cy.wait('@addResident');
        cy.get('.mat-mdc-simple-snack-bar > .mat-mdc-snack-bar-label').should('be.visible');
      });
    });
  });

  context('Given I want to go back', () => {
    it('Then redirect to user list page', () => {
      cy.get('app-house-residents-create > a').click();
      cy.location().should((location) => {
        expect(location.pathname.toString()).equal('/users/1/houses/31/residents');
      })
    });
  });
});
