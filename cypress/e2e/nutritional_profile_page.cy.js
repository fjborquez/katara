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
      url: backendUrl + '/nutritional-restriction'
    }, {
      fixture: 'nutritional_profile_list/nutritional_restriction.json',
      statusCode: 200
    }).as('restrictions');

    cy.visit('/users/1/nutritional-profile');
    cy.wait(['@profile', '@restrictions']);
  });

  context('Given the user has a nutritional profile', () => {
    it('Then show the nutritional profile successfully', () => {
      cy.get('#vegetarian').should('be.checked');
      cy.get('#celiac').should('be.checked');
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
