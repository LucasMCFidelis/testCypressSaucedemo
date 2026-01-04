import { BasePage } from "..";

class PrivacyPolicyPage extends BasePage {
  validatePage(): void {
    this.validateUrl("privacy-policy");
  }
}

export default new PrivacyPolicyPage();
