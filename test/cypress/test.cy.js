describe('顧客情報入力フォームのテスト', () => {
  it('顧客情報を入力して送信し、成功メッセージを確認する', () => {
    cy.visit('/hiroshi_takemori/customer/add.html'); // テスト対象のページにアクセス
    cy.window().then((win) => {
      // windowのalertをスタブ化し、エイリアスを設定
      cy.stub(win, 'alert').as('alertStub');
    });

    // テストデータの読み込み
    cy.fixture('customerData').then((data) => {
      // フォームの入力フィールドにテストデータを入力
      const uniqueContactNumber = `03-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
      cy.get('#companyName').type(data.companyName);
      cy.get('#industry').type(data.industry);
      cy.get('#contact').type(uniqueContactNumber);
      cy.get('#location').type(data.location);

      // フォームの送信
      cy.get('#confirm').click();

      // 確認画面で入力データがセットされたことを確認
      cy.get('#companyName').should('have.value', data.companyName);
      cy.get('#industry').should('have.value', data.industry);
      cy.get('#contact').should('have.value', uniqueContactNumber);
      cy.get('#location').should('have.value', data.location);
    });

    // アラートが表示されるまで待機
    cy.get('#customer-form button[type="submit"]').click();
    cy.on('window:alert', (alertText) => {
      // アラートの内容が期待通りか確認
      expect(alertText).to.equal('顧客情報が正常に保存されました。');
    });

    // リスト画面に遷移することを確認
    cy.url().should('include', '/customer/list.html');

    cy.wait(5000);
  });
});