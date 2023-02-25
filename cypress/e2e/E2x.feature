Feature: Testing checkout process for a product

    A user should be able to search for a product and add to the cart then commplete the checkout process


    Scenario: User adds a product to the cart and uses checkout to purchase
        Given I am on the ecommerce site
        When I add a product to the cart
        Then I should complete the checkout process
        Then I should see the order confirmation page