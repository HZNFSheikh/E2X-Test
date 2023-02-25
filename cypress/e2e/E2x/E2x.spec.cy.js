import {Given, When, Then, And} from '@badeball/cypress-cucumber-preprocessor';
import E2xPO from '../../page/E2xPO';

beforeEach( () => {
cy.intercept('GET', `https://cornerstone-light-demo.mybigcommerce.com/search.php?search_query=Able%20Brewing%20System`).as('product-search');
cy.intercept('POST', `https://cornerstone-light-demo.mybigcommerce.com/remote/v1/cart/add`).as('add-to-cart');
cy.intercept('GET', `https://cornerstone-light-demo.mybigcommerce.com/api/storefront/form-fields`).as('form');
}); 

Given('I am on the ecommerce site', () => {
    cy.visit('/');
    cy.contains('Accept All Cookies').click();
});

When('I add a product to the cart', () => {
    cy.get('[id="quick-search-expand"]').click();
    cy.get('[id="nav-quick-search"]').click().type('Able Brewing System');
    cy.wait('@product-search');
    cy.get('ul').children('.product').eq(0).should('contain', 'Able Brewing System').click();
    cy.url().should('contain', 'able-brewing-system');
    cy.get('.add-to-cart-buttons').click();
    cy.wait('@add-to-cart');
    cy.contains('Proceed to checkout').click();
    cy.wait('@form');
});

Then('I should complete the checkout process', () => {
    return true
});

Then('I should see the order confirmation page', () => {
    return true
});