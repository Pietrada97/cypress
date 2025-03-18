describe('Agenda de Contatos', () => {
  beforeEach(() => {
    cy.visit('https://agenda-contatos-react.vercel.app');
  });

  it('Deve incluir um novo contato', () => {
    cy.get('input[placeholder="Nome"]').type('João Silva');
    cy.get('input[placeholder="E-mail"]').type('joao.silva@example.com');
    cy.get('input[placeholder="Telefone"]').type('123456789');
    cy.get('button').contains('Adicionar').click();
    cy.get('.sc-eDDNvR.cTVgex li').contains('João Silva').should('exist');
  });

  it('Deve alterar um contato existente', () => {
    cy.get('.sc-eDDNvR.cTVgex li').contains('João Silva')
      .parents('.sc-beqWaB')
      .find('button.edit')
      .click();

    cy.get('input[placeholder="Nome"]').should('be.visible').clear().type('João Silva Alterado');
    cy.get('button').contains('Salvar').click();
    cy.get('.sc-eDDNvR.cTVgex li').contains('João Silva Alterado').should('exist');
  });

  it('Deve remover um contato', () => {
    cy.get('.sc-eDDNvR.cTVgex li').contains('João Silva Alterado')
      .parents('.sc-beqWaB')
      .find('button.delete')
      .click();
    
    cy.on('window:confirm', () => true);
    cy.get('.sc-eDDNvR.cTVgex li').contains('João Silva Alterado').should('not.exist');
  });
});