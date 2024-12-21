var backendUrl = 'http://katara-back.test/api';

describe('The add product type page', () => {
  beforeEach(() => {
    cy.visit('/product-type/add');
  });

  context('Given I add a new product type successfully', () => {
    it('Then the product type description is not empty', () => {
      cy.intercept({
        method: 'POST',
        url: backendUrl + '/product-type'
      }, {
        fixture: 'product_type_add/success.json',
        statusCode: 201
      }).as('add');

      cy.get('#description').clear().type('Test Product Type Description');
      cy.get('form').submit();
      cy.wait('@add');
      cy.url().should("be.equals", "about:blank");
    });
  });

  context('Given I add a new product type unsuccessfully', () => {
    it('Then the product type description is empty', () => {
      cy.intercept({
        method: 'POST',
        url: backendUrl + '/product-type'
      }, {
        fixture: 'product_type_add/error.json',
        statusCode: 422
      }).as('add');

      cy.get('#description').clear();
      cy.get('form').submit();
      cy.wait('@add');
      cy.get('#cdk-overlay-0').should('be.visible');
    });
  });
});
