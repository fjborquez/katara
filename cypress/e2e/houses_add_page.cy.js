var backendUrl = 'http://katara-back.test/api';

describe('The add house page', () => {
  beforeEach(() => {
    cy.visit('/users/1/houses/add');
  });
  context('Given I add a new house successfully', () => {
    it('Then the house is a default one', () => {
      cy.intercept({
        method: 'POST',
        url: backendUrl + '/user/**/houses'
      }, {
        fixture: 'houses_add/success.json',
      }).as('userAdded');

      cy.fixture('houses_add/house_input.json').then((input) => {
        cy.get('#description').type(input.description);
        cy.get('#mat-select-value-1').type(input.city);
        cy.get('#is_default').check({force:true});
        cy.get('.button').click({force:true});
        cy.wait('@userAdded');
        cy.get('.mat-mdc-simple-snack-bar > .mat-mdc-snack-bar-label').should('be.visible');
      });
    });

    it('Then the house is not a default one', () => {
      cy.intercept({
        method: 'POST',
        url: backendUrl + '/user/**/houses'
      }, {
        fixture: 'houses_add/success.json',
      }).as('userAdded');

      cy.fixture('houses_add/house_input.json').then((input) => {
        cy.get('#description').type(input.description);
        cy.get('#mat-select-value-1').type(input.city);
        cy.get('.button').click({force:true});
        cy.wait('@userAdded');
        cy.get('.mat-mdc-simple-snack-bar > .mat-mdc-snack-bar-label').should('be.visible');
      });
    });
  });

  context('Given I add wrong input', () => {
    it('Then show error message', () => {
      cy.intercept({
        method: 'POST',
        url: backendUrl + '/user/**/houses'
      }, {
        fixture: 'houses_add/success.json',
        statusCode: 422
      }).as('userAdded');

      cy.fixture('houses_add/house_wrong_input.json').then((input) => {
        cy.get('#description').type(input.description);
        cy.get('#mat-select-value-1').type(input.city);
        cy.get('.button').click({force:true});
        cy.wait('@userAdded');
        cy.get('.mat-mdc-simple-snack-bar > .mat-mdc-snack-bar-label').should('be.visible');
      });
    });
  });

  context('Given I want go back', () => {
    it('Then I am redirected to the houses list page', () => {
      cy.get('app-user-house-create.ng-star-inserted > a').click();
      cy.location().should((location) => {
        expect(location.pathname.toString()).equal('/users/1/houses');
      })
    });
  });
});
