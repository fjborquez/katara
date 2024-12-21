var backendUrl = 'http://katara-back.test/api';

describe('The add product presentation page', () => {
  beforeEach(() => {
    cy.visit('/product-presentation/add');
  });

  context('Given I add a new product presentation successfully', () => {
    it('Then the product presentation description is not empty', () => {
      cy.intercept({
        method: 'POST',
        url: backendUrl + '/product-presentation'
      }, {
        fixture: 'product_presentation_add/success.json',
        statusCode: 201
      }).as('add');

      cy.get('#description').clear().type('Test Product Presentation Description');
      cy.get('form').submit();
      cy.wait('@add');
      cy.url().should("be.equals", "about:blank");
    });
  });

  context('Given I add a new product presentation unsuccessfully', () => {
    it('Then the product presentation description is empty', () => {
      cy.intercept({
        method: 'POST',
        url: backendUrl + '/product-presentation'
      }, {
        fixture: 'product_presentation_add/error.json',
        statusCode: 422
      }).as('add');

      cy.get('#description').clear();
      cy.get('form').submit();
      cy.wait('@add');
      cy.get('#cdk-overlay-0').should('be.visible');
    });
  });
});
