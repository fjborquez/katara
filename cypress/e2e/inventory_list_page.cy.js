var backendUrl = 'http://katara-back.test/api';

describe('The inventory list page', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: `${backendUrl}/user/**/houses/**/inventory`,
    }, {
      fixture: 'inventory_list/inventory_list.json',
      statusCode: 200
    }).as('inventoryList');
    cy.visit('/users/1/houses/1/inventory');
    cy.wait('@inventoryList');
  });

  context('Given I access to the inventory section', () => {
    context('When the users list has loaded registries', () => {
      it('Then the quantity column must be units with uom', () => {
        cy.get('.cdk-column-quantity').each((column, index) => {
          if (index > 0) {
            const value = column.text().trim();
            expect(value).not.to.be.text;
          }
        });
      });

      it('Then the brand column must be a string', () => {
        cy.get('.cdk-column-brand').each((column, index) => {
          if (index > 0) {
            const value = column.text().trim();
            expect(value).not.to.be.text;
          }
        });
      });

      it('Then the product column must be a string', () => {
        cy.get('.cdk-column-product').each((column, index) => {
          if (index > 0) {
            const value = column.text().trim();
            expect(value).not.to.be.text;
          }
        });
      });

      it('Then the purchase date column must be a string', () => {
        cy.get('.cdk-column-purchase_date').each((column, index) => {
          if (index > 0) {
            const value = column.text().trim();
            expect(value).not.to.be.text;
          }
        });
      });

      it('Then the expiration date column must be a string', () => {
        cy.get('.cdk-column-expiration_date').each((column, index) => {
          if (index > 0) {
            const value = column.text().trim();
            expect(value).not.to.be.text;
          }
        });
      });

      it('Then discard an inventory product and click yes option', () => {
        cy.intercept({
          method: 'PUT',
          url: `${backendUrl}/user/**/houses/**/inventory/**/discard`,
        }, {
          fixture: 'inventory_list/success.json',
          statusCode: 204
        }).as('disableInventory');
        cy.get(':nth-child(1) > .cdk-column-options > a').first().click();
        cy.get('.mat-mdc-dialog-surface').should('be.visible');
        cy.get('[mat-dialog-actions=""]').contains('Yes').click();
        cy.wait('@disableInventory');
      });

      it('Then discard an inventory product and click no option', () => {
        cy.get(':nth-child(1) > .cdk-column-options > a').first().click();
        cy.get('.mat-mdc-dialog-surface').should('be.visible');
        cy.get('[mat-dialog-actions=""]').contains('No').click();
        cy.get('.mat-mdc-dialog-surface').should('not.exist');
      });

      it('Then consume an inventory product and click yes option', () => {
        cy.intercept({
          method: 'PUT',
          url: `${backendUrl}/user/**/houses/**/inventory/**/consume`,
        }, {
          fixture: 'inventory_list/success.json',
          statusCode: 204
        }).as('consumeInventory');
        cy.get(':nth-child(1) > .cdk-column-options > :nth-child(2)').first().click();
        cy.get('.mat-mdc-dialog-surface').should('be.visible');
        cy.get('[mat-dialog-actions=""]').contains('Yes').click();
        cy.wait('@consumeInventory');
      });

      it('Then consume an inventory product and click no option', () => {
        cy.get(':nth-child(1) > .cdk-column-options > :nth-child(2)').first().click();
        cy.get('.mat-mdc-dialog-surface').should('be.visible');
        cy.get('[mat-dialog-actions=""]').contains('No').click();
        cy.get('.mat-mdc-dialog-surface').should('not.exist');
      });
    });
  })
});
