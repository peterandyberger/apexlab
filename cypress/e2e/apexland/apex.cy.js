import {
  click_elements,
  environment_url,
  search_field,
  spinner,
  fill_field,
  modal,
  verify_visibility,
  first_row,
  modalText,
} from './utils';

describe('Dashboard tests', () => {
  beforeEach(() => {
    cy.visit(environment_url);
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });

  it('Test search field  ', () => {
    try {
      fill_field(search_field, 'Home Alone');
      verify_visibility(spinner);
      click_elements(first_row, 1);
      verify_visibility(modal);
      verify_visibility(modalText);
    } catch (e) {
      console.log(e);
    }
  });
});
