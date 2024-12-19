var backendUrl = 'http://katara-back.test/api';

describe('The add product catalog page', () => {
  beforeEach(() => {
    cy.visit('/product-category/add');
  });

  context('Given I add a new product category successfully', () => {
    it('Then the product category name is not empty', () => {
      cy.intercept({
        method: 'POST',
        url: backendUrl + '/product-category'
      }, {
        fixture: 'product_category_add/success.json',
        statusCode: 201
      }).as('add');

      cy.get('#name').clear().type('Test Product Category');
      cy.get('form').submit();
      cy.wait('@add');
      cy.url().should("be.equals", "about:blank");
    });

    it('Then the product category name is empty', () => {
      cy.intercept({
        method: 'POST',
        url: backendUrl + '/product-category'
      }, {
        fixture: 'product_category_add/error.json',
        statusCode:   422
      }).as('add');

      cy.get('#name').clear();
      cy.get('form').submit();
      cy.wait('@add');
      cy.get('.mat-mdc-simple-snack-bar > .mat-mdc-snack-bar-label').should('be.visible');
    });
  });
});
