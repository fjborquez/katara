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

      it('Then the options column should have 2 items', () => {
        cy.get('.mat-mdc-row > .cdk-column-options').then((column) => {
          let text = column.text().split('|')
          expect(text.length).to.be.eq(2);
        });
      });
    });
  });
  context('Given I want to add a new resident', () => {
    it('Then redirect to add resident page', () => {
      cy.get('[ng-reflect-router-link="add"]').click();
      cy.location().should((location) => {
        expect(location.pathname.toString()).equal('/users/1/houses/31/residents/add');
      });
    });
  });
});
