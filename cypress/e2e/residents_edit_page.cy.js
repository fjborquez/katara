var backendUrl = 'http://katara-back.test/api';

describe('The edit resident page', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: backendUrl + '/nutritional-restriction'
    }, {
      fixture: 'residents_edit/nutritional_restriction.json',
      statusCode: 200
    }).as('restrictions');

    cy.intercept({
      method: 'GET',
      url: backendUrl + '/user/*/houses/*/residents/**'
    }, {
      fixture: 'residents_edit/resident.json',
      statusCode: 200
    }).as('residentData');

    cy.visit('/users/1/houses/44/residents/1/update');
    cy.wait(['@restrictions', '@residentData']);
  });

  context('Given I update a resident', () => {
    beforeEach(() => {
      cy.intercept({
        method: 'PUT',
        url: backendUrl + '/user/*/houses/*/residents/**'
      }, {
        statusCode: 200,
        fixture: 'residents_edit/success.json'
      }).as('residentUpdate');
    });

    it('Then the nutritional profile is not empty', () =>{
      cy.fixture('residents_edit/resident_input.json').then((input) => {
        cy.get('#name').clear().type(input.name);
        cy.get('#lastname').clear().type(input.lastname);
        cy.get('#date_of_birth').clear().type(input.date_of_birth);
        cy.get('#vegetarian').check();
        cy.get('#celiac').check();
        cy.get('form').submit();
        cy.wait('@residentUpdate');
        cy.get('#cdk-overlay-0').should('be.visible');
      });
    });

    it('Then the nutritional profile is empty', () =>{
      cy.fixture('residents_edit/resident_input.json').then((input) => {
        cy.get('#name').clear().type(input.name);
        cy.get('#lastname').clear().type(input.lastname);
        cy.get('#date_of_birth').clear().type(input.date_of_birth);
        cy.get('form').submit();
        cy.wait('@residentUpdate');
        cy.get('#cdk-overlay-0').should('be.visible');
      });
    });

    it('Then redirect to the residents page', () => {
      cy.fixture('residents_edit/resident_input.json').then((input) => {
        cy.get('#name').clear().type(input.name);
        cy.get('#lastname').clear().type(input.lastname);
        cy.get('#date_of_birth').clear().type(input.date_of_birth);
        cy.get('#vegetarian').check();
        cy.get('#celiac').check();
        cy.get('form').submit();
        cy.wait('@residentUpdate').location().should((location) => {
          expect(location.pathname.toString()).equal('/users/1/houses/44/residents');
        })
      });
    });
  });

  context('Given I enter wrong inputs', () => {
    it('Then the user is not updated', () => {
      cy.intercept({
        method: 'PUT',
        url: backendUrl + '/user/*/houses/*/residents/**'
      }, {
        statusCode: 422,
        fixture: 'residents_edit/error.json'
      }).as('residentUpdate');
      cy.fixture('residents_edit/resident_wrong_input.json').then((input) => {
        cy.get('#name').clear().type(input.name);
        cy.get('#lastname').clear().type(input.lastname);
        cy.get('#date_of_birth').clear().type(input.date_of_birth);
        cy.get('form').submit();
      });
    });
  });

  context('Given I want to go back', () => {
    it('Then redirect to user list page', () => {
      cy.get('app-house-residents-update > a').click();
      cy.location().should((location) => {
        expect(location.pathname.toString()).equal('/users/1/houses/44/residents');
      })
    });
  });
});
