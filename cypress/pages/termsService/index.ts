import { BasePage } from "..";

class TermsServicePage extends BasePage {
  validatePage(): void {
    this.validateUrl("terms-service");
  }
}

export default new TermsServicePage();
