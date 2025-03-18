describe('Testes de Contatos', () => {
  beforeEach(() => {
    // Visita a página inicial do aplicativo
    cy.visit('https://agenda-contatos-react.vercel.app');
  });

  it('Deve incluir um novo contato', () => {
    // Preenche o formulário de inclusão
    cy.get('input[name="nome"]').type('João Silva');
    cy.get('input[name="email"]').type('joao.silva@example.com');
    cy.get('input[name="telefone"]').type('123456789');
    cy.get('button[type="submit"]').click();

    // Verifica se o contato foi adicionado
    cy.contains('João Silva').should('exist');
  });

  it('Deve alterar um contato existente', () => {
    // Localiza o contato e clica no botão de edição
    cy.contains('João Silva').parent().find('button.edit').click();

    // Altera os dados do contato
    cy.get('input[name="nome"]').clear().type('João Silva Alterado');
    cy.get('button[type="submit"]').click();

    // Verifica se o contato foi alterado
    cy.contains('João Silva Alterado').should('exist');
    cy.contains('João Silva').should('not.exist');
  });

  it('Deve remover um contato', () => {
    // Localiza o contato e clica no botão de remoção
    cy.contains('João Silva Alterado').parent().find('button.delete').click();

    // Confirma a remoção se necessário
    cy.on('window:confirm', () => true);

    // Verifica se o contato foi removido
    cy.contains('João Silva Alterado').should('not.exist');
  });
});