var backendUrl = 'http://katara-back.test/api';
var aangUrl = 'http://aang.test/api';

describe('The update inventory page', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: backendUrl + '/unit-of-measurement*',
    }, {
      fixture: 'inventory_update/units_of_measurement.json',
      statusCode: 200
    }).as('getUnitsOfMeasurement');

    cy.intercept({
      method: 'GET',
      url: backendUrl + '/product-catalog',
    }, {
      fixture: 'inventory_update/products_catalog.json',
      statusCode: 200
    }).as('getProductCatalog');

    cy.intercept({
      method: 'GET',
      url: aangUrl + '/house/**',
    }, {
      fixture: 'inventory_update/house.json',
      statusCode: 200
    }).as('getHouse');

    cy.intercept({
      method: 'GET',
      url: backendUrl + '/user/**/houses/**/inventory/**'
    }, {
      fixture: 'inventory_update/inventory.json',
      statusCode: 200
    }).as('getInventory');

    cy.intercept({
      method: 'GET',
      url: backendUrl + '/user/**/houses/**/inventory'
    }, {
      fixture: 'inventory_update/full_inventory.json',
      statusCode: 200
    }).as('getFullInventory');

    cy.visit('/users/1/houses/1/inventory/1/update');
  });

  context('Show error message because of lack of data', () => {
    it('Quantity is 0', () => {
      cy.intercept({
        method: 'PUT',
        url: backendUrl + '/user/**/houses/**/inventory/**',
      }, {
        fixture: 'inventory_update/error.json',
        statusCode: 422
      }).as('updateInventory');

      cy.wait('@getInventory');
      cy.wait('@getUnitsOfMeasurement');
      cy.wait('@getProductCatalog');
      cy.get('#quantity').clear().type('0');
      cy.get('form').submit();
      cy.wait('@getHouse');
      cy.wait('@updateInventory');
      cy.get('#cdk-overlay-0').should('be.visible');
    });

    it('Product catalog is not selected', () => {
      cy.intercept({
        method: 'PUT',
        url: backendUrl + '/user/**/houses/**/inventory/**',
      }, {
        fixture: 'inventory_update/error.json',
        statusCode: 422
      }).as('updateInventory');

      cy.wait('@getUnitsOfMeasurement');
      cy.wait('@getProductCatalog');
      cy.get('#product').clear();
      cy.get('form').submit();
      cy.wait('@getHouse');
      cy.wait('@updateInventory');
      cy.get('#cdk-overlay-1').should('be.visible');
    });

    context('Show error because invalid data', () => {
      it('Quantity is not a number', () => {
        cy.intercept({
          method: 'PUT',
          url: backendUrl + '/user/**/houses/**/inventory/**',
        }, {
          fixture: 'inventory_update/error.json',
          statusCode: 422
        }).as('updateInventory');

        cy.wait('@getUnitsOfMeasurement');
        cy.wait('@getProductCatalog');
        cy.get('#quantity').clear().type('abc');
        cy.get('form').submit();
        cy.wait('@getHouse');
        cy.wait('@updateInventory');
        cy.get('#cdk-overlay-0').should('be.visible');
      });

      it('Quantity is negative', () => {
        cy.intercept({
          method: 'PUT',
          url: backendUrl + '/user/**/houses/**/inventory/**',
        }, {
          fixture: 'inventory_update/error.json',
          statusCode: 422
        }).as('updateInventory');

        cy.wait('@getUnitsOfMeasurement');
        cy.wait('@getProductCatalog');
        cy.get('#quantity').clear().type('-100');
        cy.get('form').submit();
        cy.wait('@getHouse');
        cy.wait('@updateInventory');
        cy.get('#cdk-overlay-0').should('be.visible');
      });
    });

    context('A product is not selected yet', () => {
      it('should show the add new product link', () => {
        cy.wait('@getUnitsOfMeasurement');
        cy.wait('@getProductCatalog');
        cy.get('#product').clear();
        cy.get('a.ng-star-inserted').should('be.visible');
      });

      it('should hide the add new product link', () => {
        cy.wait('@getUnitsOfMeasurement');
        cy.wait('@getProductCatalog');
        cy.get('a.ng-star-inserted').should('not.exist');
      });
    });

    context('The inventory is updated', () => {
      it('should update a new inventory item', () => {
        cy.intercept({
          method: 'PUT',
          url: backendUrl + '/user/**/houses/**/inventory/**',
        }, {
          fixture: 'inventory_update/success.json',
          statusCode: 200
        }).as('updateInventory');

        cy.wait('@getUnitsOfMeasurement');
        cy.wait('@getProductCatalog');
        cy.wait('@getHouse');
        cy.get('form').submit();
        cy.wait('@updateInventory');
        cy.wait('@getFullInventory');
        cy.get('#cdk-overlay-0').should('be.visible');
      });
    });
  });
});
