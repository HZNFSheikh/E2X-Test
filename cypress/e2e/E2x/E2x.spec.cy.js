import {Given, When, Then, And} from '@badeball/cypress-cucumber-preprocessor';
import E2xPO from '../../page/E2xPO';

beforeEach( () => {
cy.intercept('GET', `https://cornerstone-light-demo.mybigcommerce.com/search.php?search_query=Able%20Brewing%20System`).as('product-search');
cy.intercept('POST', `https://cornerstone-light-demo.mybigcommerce.com/remote/v1/cart/add`).as('add-to-cart');
cy.intercept('GET', `https://cornerstone-light-demo.mybigcommerce.com/api/storefront/form-fields`).as('form');
cy.intercept('GET', `https://cornerstone-light-demo.mybigcommerce.com/internalapi/v1/shipping/countries`).as('countries');
cy.intercept('GET', `/api/storefront/payments`).as('payment-form');
cy.intercept('POST', `https://cornerstone-light-demo.mybigcommerce.com/internalapi/v1/checkout/order`).as('order');
cy.intercept('GET', `/api/storefront/checkout-settings`).as('checkout-confirmation');
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
    const firstName = 'Cole';
    const lastName = 'Cassidy';

    cy.get('#email').type('email@email.com');
    cy.get('#privacyPolicy').click({force: true});
    cy.get('#privacyPolicy').should('be.checked');
    cy.get('[id="checkout-customer-continue"]').click();
    cy.get('#checkout-guest-continue').click();
    cy.wait('@countries');
    cy.get('#firstNameInput').type('Cole');
    cy.get('#lastNameInput').type('Cassidy');
    cy.get('#addressLine1Input').type('Watchpoint Gibraltar');
    cy.get('#cityInput').type('HQ');
    cy.get('#postCodeInput').type('B25 HED')
    cy.get('#phoneInput').type('000100101');
    cy.get('#checkout-shipping-continue').click();
    cy.get('@payment-form');
    cy.get('#ccNumber').type("4" + "111 1111 1111 1111");
    cy.get('#ccExpiry').type('04/28');
    cy.get('#ccName').type(firstName + ' ' + lastName);
    cy.get('#ccCvv').type('369');
    cy.get('#checkout-payment-continue').click();
    cy.wait('@order');
});

Then('I should see the order confirmation page', () => {
    const firstName = 'Cole';
    cy.url().should('contain', 'order-confirmation');
    cy.wait('@checkout-confirmation');
    cy.get('#checkout-app').should('contain.text', firstName);
});