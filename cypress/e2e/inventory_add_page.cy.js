var backendUrl = 'http://katara-back.test/api';
var aangUrl = 'http://aang.test/api';

describe('The add inventory page', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: backendUrl + '/unit-of-measurement**'
    }, {
      fixture: 'inventory_add/units_of_measurement.json',
      statusCode: 200
    }).as('unitsOfMeasurement');

    cy.intercept({
      method: 'GET',
      url: backendUrl + '/product-catalog'
    }, {
      fixture: 'inventory_add/products_catalog.json',
      statusCode: 200
    }).as('productsCatalog');

    cy.intercept({
      method: 'GET',
      url: aangUrl + '/house/**'
    }, {
      fixture: 'inventory_add/house.json',
      statusCode: 200
    }).as('house');

    cy.intercept({
      method: 'POST',
      url: backendUrl + '/user/**/houses/**/inventory',
    },{
      statusCode: 201,
      fixture: 'inventory_add/success.json'
    }).as('addInventory');

    cy.visit('/users/1/houses/1/inventory/add');
  });
  context('Show error message because of lack of data', () => {
    it('Quantity is 0', () => {
      cy.intercept({
        method: 'POST',
        url: backendUrl + '/user/**/houses/**/inventory',
      },{
        statusCode: 422,
        fixture: 'inventory_add/error.json'
      }).as('addInventory');

      cy.get('#mat-select-value-1').click();
      cy.get('#mat-option-0').click();
      cy.get('#product').click();
      cy.get('#mat-option-10').click();
      cy.get('form').submit();
      cy.wait('@addInventory');
      cy.get('#cdk-overlay-2').should('be.visible');
    });
    it('Unit of measurement is not selected', () => {
      cy.intercept({
        method: 'POST',
        url: backendUrl + '/user/**/houses/**/inventory',
      },{
        statusCode: 422,
        fixture: 'inventory_add/error.json'
      }).as('addInventory');
      cy.get('#quantity').clear().type('1');
      cy.get('#product').click();
      cy.get('#mat-option-10').click();
      cy.get('form').submit();
      cy.wait('@addInventory');
      cy.get('#cdk-overlay-1').should('be.visible');
    });
    it('Product catalog is not selected', () => {
      cy.intercept({
        method: 'POST',
        url: backendUrl + '/user/**/houses/**/inventory',
      },{
        statusCode: 422,
        fixture: 'inventory_add/error.json'
      }).as('addInventory');
      cy.get('#quantity').clear().type('1');
      cy.get('#mat-select-value-1').click();
      cy.get('#mat-option-0').click();
      cy.get('form').submit();
      cy.wait('@addInventory');
      cy.get('#cdk-overlay-1').should('be.visible');
    });
  });
  context('Show error because invalid data', () => {
    it('Quantity is not a number', () => {
      cy.intercept({
        method: 'POST',
        url: backendUrl + '/user/**/houses/**/inventory',
      },{
        statusCode: 422,
        fixture: 'inventory_add/error.json'
      }).as('addInventory');
      cy.get('#quantity').clear().type('A');
      cy.get('#mat-select-value-1').click();
      cy.get('#mat-option-0').click();
      cy.get('form').submit();
      cy.wait('@addInventory');
      cy.get('#cdk-overlay-1').should('be.visible');
    });
    it('Quantity is negative', () => {
      cy.intercept({
        method: 'POST',
        url: backendUrl + '/user/**/houses/**/inventory',
      },{
        statusCode: 422,
        fixture: 'inventory_add/error.json'
      }).as('addInventory');
      cy.get('#quantity').clear().type('-10');
      cy.get('#mat-select-value-1').click();
      cy.get('#mat-option-0').click();
      cy.get('form').submit();
      cy.wait('@addInventory');
      cy.get('#cdk-overlay-1').should('be.visible');
    });
  });
  context('A product is not selected yet', () => {
    it('should show the add new product link', () => {
      cy.get('a.ng-star-inserted').should('be.visible');
    });

    it('should hide the add new product link', () => {
      cy.get('#product').click();
      cy.get('#mat-option-10').click();
      cy.get('a.ng-star-inserted').should('not.exist');
    });
  });
  context('The inventory is created', () => {
    it('should create a new inventory item', () => {
      cy.get('#quantity').clear().type(100);
      cy.get('#mat-select-value-1').click();
      cy.get('#mat-option-0').click();
      cy.get('#product').click();
      cy.get('#mat-option-10').click();
      cy.get('form').submit();
      cy.wait('@addInventory');
      cy.get('#cdk-overlay-2').should('be.visible');
    });
  });
});
