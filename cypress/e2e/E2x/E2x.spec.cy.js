import {Given, When, Then, And} from '@badeball/cypress-cucumber-preprocessor';
import E2xPO from '../../page/E2xPO';

beforeEach( () => {
cy.intercept('GET', `https://cornerstone-light-demo.mybigcommerce.com/search.php?search_query=Able%20Brewing%20System`).as('product-search');
}); 

Given('I am on the ecommerce site', () => {
    cy.visit('/');
    cy.contains('Accept All Cookies').click();
});

When('I add a product to the cart', () => {
    cy.get('[id="quick-search-expand"]').click();
    cy.get('[id="nav-quick-search"]').click().type('Able Brewing System');
    cy.wait('@product-search');
});

Then('I complete the checkout process', () => {
    return true
});

Then('I should see the order confirmation page', () => {
    return true
});