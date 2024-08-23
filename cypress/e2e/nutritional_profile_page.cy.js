var backendUrl = 'http://katara-back.test/api';

describe('The nutritional profile page', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: backendUrl + '/user/*/nutritional-profile'
    }, {
      fixture: 'nutritional_profile_list/nutritional_profile.json',
      statusCode: 200
    }).as('profile');

    cy.intercept({
      method: 'GET',
      url: backendUrl + '/product-category'
    }, {
      fixture: 'nutritional_profile_list/product_categories.json'
    }).as('productCategories');

    cy.intercept({
      method: 'GET',
      url: backendUrl + '/consumption-level'
    }, {
      fixture: 'nutritional_profile_list/consumption_levels.json'
    }).as('consumptionLevels');

    cy.visit('/users/1/nutritional-profile');
    cy.wait(['@profile', '@productCategories', '@consumptionLevels']);
  });

  context('Given the user has a nutritional profile', () => {
    it('Then show the nutritional profile successfully', () => {
      cy.get('.mat-mdc-row > .cdk-column-category').should('be.visible');
      cy.get('.mat-mdc-row > .cdk-column-consumptionLevel').should('be.visible');

    });
  });

  context('Given I want to go back', () => {
    it('Then redirect to user list', () => {
      cy.get('app-nutritional-profile-view > a').click();
      cy.location().should((location) => {
        expect(location.pathname.toString()).equal('/users');
      });
    });
  });
});
