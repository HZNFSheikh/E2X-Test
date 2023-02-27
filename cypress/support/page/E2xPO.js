class E2xPO {

 openSearch() {
  return cy.get('#quick-search-expand').click();
}

enterProduct() {
    return cy.get('#nav-quick-search').click();
}

selectResult() {
    return cy.get('ul').children('.product');
}

addToCart() {
    return cy.get('#form-action-addToCart').click();
}

}

export default new E2xPO();