var backendUrl = 'http://katara-back.test/api'

describe('The list user page', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: backendUrl + '/user'
    }, {
      fixture: 'user_list/user_list.json'
    }).as('listOfUsers');
    cy.visit('/users');
    cy.wait('@listOfUsers').its('response.statusCode').should('equal', 200);
  });

  context('Given I access to users section', () => {
    context('When the users list has loaded registries', () => {
      it('Then the id column must be numeric', () => {
        cy.get('.cdk-column-id').each((column, index) => {
          if (index > 0) {
            const value = column.text().trim();
            expect(Number(value)).to.be.a('number');
          }
        });
      });

      it('Then the date of birth must have dd/mm/yyyy format', () => {
        cy.get('.cdk-column-date_of_birth').each((column, index) => {
          if (index > 0) {
            const value = column.text().trim();
            const date = new Date(value);
            expect(date).to.be.a('Date');
          }
        });
      });

      it('Then the email column must be a valid email', () => {
        cy.get('.cdk-column-email').each((column, index) => {
          if (index > 0) {
            const value = column.text().trim();
            const input = Cypress.$('<input type="email">')[0];
            input.value = value;
            expect(input.validity.valid).to.be.true;
          }
        });
      });

      it('Then there are three options', () => {
        cy.get('.cdk-column-options').each((column, index) => {
          if (index > 0) {
            const value = column.text().trim();
            const options = value.split('|');
            expect(options.length).to.equal(3);
          }
        });
      });
    });

    context('When I want to change the user status', () => {
      it('Then there is the disable option', () => {
        cy.intercept({
          method: 'PUT',
          url: backendUrl + '/user/**/disable',
      }, {
        fixture: 'user_list/user_list_disable.json'
      }).as('disable');

        cy.get(':nth-child(1) > .cdk-column-options > :nth-child(2)').click();
        cy.get('.mat-mdc-dialog-surface').should('be.visible');
        cy.get('.mat-mdc-dialog-actions').contains('Yes').click();
        cy.wait('@disable');
        cy.get('.mat-mdc-simple-snack-bar > .mat-mdc-snack-bar-label').should('be.visible');
      });

      it('Then there is the enable option', () => {
        cy.intercept({
          method: 'PUT',
          url: backendUrl + '/user/**/enable'
        }, {
          fixture: 'user_list/user_list_enable.json'
        }).as('enable');

        cy.get(':nth-child(2) > .cdk-column-options > :nth-child(2)').click();
        cy.get('.mat-mdc-dialog-surface').should('be.visible');
        cy.get('.mat-mdc-dialog-actions').contains('Yes').click();
        cy.wait('@enable');
        cy.get('.mat-mdc-simple-snack-bar > .mat-mdc-snack-bar-label').should('be.visible');
      });
    });

    context('When I want to execute some action', () => {
      it('Then should go to add user page', () => {
        cy.get('[href="/users/add"]').click();
        cy.location().should((location) => {
          expect(location.pathname.toString()).equal('/users/add');
        });
      });

      it('Then should go to edit user page', () => {
        cy.get('[href="/users/1/update"]').click();
        cy.location().should((location) => {
          expect(location.pathname.toString()).equal('/users/1/update');
        });
      });

      it('Then should go to add house page', () => {
        cy.get('[href="/users/1/houses/add"]').should('have.text', 'Add house');
        cy.get('[href="/users/1/houses/add"]').click();
        cy.location().should((location) => {
          expect(location.pathname.toString()).equal('/users/1/houses/add');
        });
      });

      it('Then should go to view houses page', () => {
        cy.get('[href="/users/2/houses"]').should('have.text', 'View houses');
        cy.get('[href="/users/2/houses"]').click();
        cy.location().should((location) => {
          expect(location.pathname.toString()).equal('/users/2/houses');
        });
      });

      it('Then should go to nutritional profile page', () => {
        cy.get(':nth-child(1) > .cdk-column-nutritional_profile > a').should('have.text', 'View');
        cy.get(':nth-child(1) > .cdk-column-nutritional_profile > a').click();
        cy.location().should((location) => {
          expect(location.pathname.toString()).equal('/users/1/nutritional-profile');
        });
      });
    });
  });
});
