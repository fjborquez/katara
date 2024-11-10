var backendUrl = 'http://katara-back.test/api';

describe('The houses list page', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: `${backendUrl}/user/**/houses`,
    }, {
      fixture: 'houses_list/houses_list.json',
      statusCode: 200
    }).as('housesList');
    cy.visit('/users/1/houses');
    cy.wait('@housesList');
  });
  context('Given I access to the houses section', () => {
    context('When the users list has loaded registries', () => {
      it('Then the house column must be an string', () => {
        cy.get('.cdk-column-house').each((column, index) => {
          if (index > 0) {
            const value = column.text().trim();
            expect(value).to.be.a('string');
          }
        });
      });

      it('Then the city column must be an string', () => {
        cy.get('.cdk-column-city').each((column, index) => {
          if (index > 0) {
            const value = column.text().trim();
            expect(value).to.be.a('string');
          }
        });
      });

      it('Then the is default column must be an checkbox icon', () => {
        cy.get('.cdk-column-is_default').each((column, index) => {
          if (index > 0) {
            const value = column.text().trim();
            expect(value).to.contains('check_box');
          }
        });
      });

      it('Then the options column must have one or two options', () => {
        cy.get('.cdk-column-options').each((column, index) => {
          if (index > 0) {
            const value = column.text().trim();
            const options = value.split('|');
            expect([1,2,3]).to.contains(options.length);
          }
        });
      });

      it('Then the house must be disabled', () => {
        cy.get(':nth-child(2) > .cdk-column-options > :nth-child(3)').should('be.text', 'Disable');
      });

      it('Then the house must be enabled', () => {
        cy.get(':nth-child(1) > .cdk-column-options > :nth-child(3)').should('be.text', 'Enable');
      });

      it('Then the house must have inventory', () => {
        cy.get(':nth-child(1) > .cdk-column-options > :nth-child(1)').should('be.text', 'Inventory');
      });

      it('Then the resident column must be an icon', () => {
        cy.get(':nth-child(1) > .cdk-column-residents > a > .mat-icon').should('be.text', 'people');
      });
    });

    context('When execute some action', () => {
      it('Then the edit action must be executed', () => {
        cy.get('[ng-reflect-router-link="31,update"]').click();
        cy.location().should((location) => {
          expect(location.pathname.toString()).equal('/users/1/houses/31/update');
        });
      });

      it('Then the resident action must be executed', () => {
        cy.get(':nth-child(1) > .cdk-column-residents > a > .mat-icon').click();
        cy.location().should((location) => {
          expect(location.pathname.toString()).equal('/users/1/houses/31/residents');
        });
      });
    });
  });

  context('Given I want to add a new house', () => {
    it('Then redirect to add house page', () => {
      cy.get('[ng-reflect-router-link="add"]').click();
      cy.location().should((location) => {
        expect(location.pathname.toString()).equal('/users/1/houses/add');
      });
    });
  });
});
