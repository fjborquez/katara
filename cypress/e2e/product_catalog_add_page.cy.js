var backendUrl = 'http://katara-back.test/api';

describe('The add product catalog page', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: backendUrl + '/product-category'
    }, {
      fixture: 'product_catalog_add/product_categories.json',
      statusCode: 200
    }).as('productCategories');

    cy.intercept({
      method: 'GET',
      url: backendUrl + '/product-brand'
    }, {
      fixture: 'product_catalog_add/product_brands.json',
      statusCode: 200
    }).as('productBrands');

    cy.intercept({
      method: 'GET',
      url: backendUrl + '/product-type'
    }, {
      fixture: 'product_catalog_add/product_types.json',
      statusCode: 200
    }).as('productTypes');

    cy.intercept({
      method: 'GET',
      url: backendUrl + '/product-presentation'
    }, {
      fixture: 'product_catalog_add/product_presentations.json',
      statusCode: 200
    }).as('productPresentations');

    cy.intercept({
      method: 'POST',
      url: backendUrl + '/product-catalog',
    },{
      statusCode: 201,
      fixture: 'product_catalog_add/success.json'
    }).as('addProductCatalog');

    cy.visit('/product-catalog/add');
  });

  context('Given I add a new product catalog successfully', () => {
    it('Then the product catalog is not empty', () => {
      cy.get('#category').click();
      cy.get('#mat-option-0').click();
      cy.get('#brand').click();
      cy.get('#mat-option-13').click();
      cy.get('#type').click();
      cy.get('#mat-option-48').click();
      cy.get('#presentation').click();
      cy.get('#mat-option-153').click();
      cy.get('form').submit();
      cy.wait('@addProductCatalog');
      cy.url().should("be.equals", "about:blank");
    });

    it('Then the product catalog is empty', () => {
      cy.intercept({
        method: 'POST',
        url: backendUrl + '/product-catalog',
      },{
        statusCode: 500,
        fixture: 'product_catalog_add/error.json'
      }).as('addProductCatalog');

      cy.get('form').submit();
      cy.get('.mat-mdc-simple-snack-bar > .mat-mdc-snack-bar-label').should('be.visible');
    });

    it('Then there are no brand and presentation', () => {
      cy.get('#category').click();
      cy.get('#mat-option-0').click();
      cy.get('#type').click();
      cy.get('#mat-option-48').click();
      cy.get('form').submit();
      cy.wait('@addProductCatalog');
      cy.url().should("be.equals", "about:blank");
    });
  });
});
