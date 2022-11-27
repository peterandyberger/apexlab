/// <reference types="cypress" />

export const environment_url = 'localhost:3000';

// ----------------- selectors -----------------
export const search_field = "[data-test-id='search']";
export const first_row = '.MuiDataGrid-cellContent';
export const spinner = "[data-test-id='spinner']";
export const modal = "[data-test-id='modal']";
export const modalText =
  "[data-test-text='Wikipedia does not have any info about this title']";
// ----------------- methods -----------------

export const click_element = (selector) => {
  cy.get(selector, { timeout: 10000 }).should('be.visible');
  cy.get(selector).click();
};

export const click_elements = (selector, index) => {
  cy.get(selector).eq(index).click();
};

export const fill_field = (selector, text, index = 0) => {
  cy.get(selector).invoke('val', '');
  cy.get(selector).eq(index).type(text);
  cy.get(selector).type('{enter}');
};
export const verify_visibility = (selector) => {
  cy.get(selector, { timeout: 10000 }).should('be.visible');
};
