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
      fixture: 'product_catalog_add/success.json',
      headers: {
        'Location': 'http://katara-back.test/api/product-catalog/1'
      }
    }).as('addProductCatalog');

    cy.visit('/product-catalog/add');
  });

  context('Given I add a new product catalog successfully', () => {
    it('Then the product catalog is not empty', () => {
      cy.wait('@productCategories');
      cy.wait('@productBrands');
      cy.wait('@productTypes');
      cy.wait('@productPresentations');

      cy.get('#category').type('Bakery');
      cy.contains('.mdc-list-item__primary-text', 'Bakery').click();
      cy.get('#brand').type('Ideal');
      cy.contains('.mdc-list-item__primary-text', 'Ideal').click();
      cy.get('#type').type('Bread');
      cy.contains('.mdc-list-item__primary-text', 'Sliced Bread').click();
      cy.get('#presentation').type('Bottled');
      cy.contains('.mdc-list-item__primary-text', 'Bottled').click();
      cy.get('form').submit();
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
