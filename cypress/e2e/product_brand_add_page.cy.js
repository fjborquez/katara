var backendUrl = 'http://katara-back.test/api';

describe('The add product brand page', () => {
  beforeEach(() => {
    cy.visit('/product-brand/add');
  });

  context('Given I add a new product brand successfully', () => {
    it('Then the product brand name and brand description are not empty', () => {
      cy.intercept({
        method: 'POST',
        url: backendUrl + '/product-brand'
      }, {
        fixture: 'product_brand_add/success.json',
        statusCode: 201
      }).as('add');

      cy.get('#name').clear().type('Test Product Brand');
      cy.get('#description').clear().type('Test Product Brand Description');
      cy.get('form').submit();
      cy.wait('@add');
      cy.url().should("be.equals", "about:blank");
    });
  });

  context('Given I add a new product brand unsuccessfully', () => {
    it('Then the product brand name and brand description are empty', () => {
      cy.intercept({
        method: 'POST',
        url: backendUrl + '/product-brand'
      }, {
        fixture: 'product_brand_add/error.json',
        statusCode: 422
      }).as('add');

      cy.get('#name').clear();
      cy.get('#description').clear();
      cy.get('form').submit();
      cy.wait('@add');
      cy.get('#cdk-overlay-0').should('be.visible');
    });
  });
});
