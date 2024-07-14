var backendUrl = 'http://katara-back.test/api';

describe('The add resident page', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: backendUrl + '/nutritional-restriction'
    }, {
      fixture: 'residents_add/nutritional_restriction.json',
      statusCode: 200
    }).as('restrictions');
    cy.visit('/users/1/houses/31/residents/add');
    cy.wait('@restrictions');
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
        cy.get('#vegetarian').check();
        cy.get('#vegan').check();
        cy.get('form').submit();
        cy.wait('@addResident');
        cy.get('.mat-mdc-simple-snack-bar > .mat-mdc-snack-bar-label').should('be.visible');
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
