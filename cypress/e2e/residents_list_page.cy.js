var backendUrl = 'http://katara-back.test/api';
describe('The resident list page', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: backendUrl + '/user/*/houses/*/residents'
    },{
      fixture: 'residents_list/residents_list.json'
    }).as('residents');
    cy.visit('/users/1/houses/31/residents');
    cy.wait('@residents');
  });
  context('Given I access to residents section', () => {
    context('When the residents list has loaded registries', () => {
      it('Then the fullname column must be an string', () => {
        cy.get('.mat-mdc-row > .cdk-column-fullname').invoke('text').should('be.a', 'string');
      });

      it('Then the fullname must be name and lastname concat', () => {
        cy.get('.mat-mdc-row > .cdk-column-fullname').should('contains.text', 'Test Test');
      });

      it('Then the date of birth must have dd/mm/yyyy format', () => {
        cy.get('.mat-mdc-row > .cdk-column-date_of_birth').then((column) => {
          let text = column.text();
          let date = new Date(text);
          expect(date).to.be.a('Date');
        });
      });

      it('Then the options column should have 3 items', () => {
        cy.get('.mdc-data-table__content > :nth-child(1) > .cdk-column-options').then((column) => {
          let text = column.text().split('|')
          expect(text.length).to.be.eq(3);
        });
      });
    });
  });
  context('Given I want to add a new resident', () => {
    it('Then redirect to add resident page', () => {
      cy.get('[href="/users/1/houses/31/residents/add"]').click();
      cy.location().should((location) => {
        expect(location.pathname.toString()).equal('/users/1/houses/31/residents/add');
      });
    });
  });
  context('Given I want to delete an existing resident', () => {
    it('Then it should delete him successfully', () => {
      cy.get(':nth-child(2) > .cdk-column-options > :nth-child(2)').click();
      cy.get('.mat-mdc-dialog-actions').contains('Yes').click()
      cy.location().should((location) => {
        expect(location.pathname.toString()).equal('/users/1/houses/31/residents');
      });
    });

    it('Then it should not delete him', () => {
      cy.get(':nth-child(2) > .cdk-column-options > :nth-child(2)').click();
      cy.get('.mat-mdc-dialog-actions').contains('No').click()
      cy.location().should((location) => {
        expect(location.pathname.toString()).equal('/users/1/houses/31/residents');
      });
    })
  });
});
