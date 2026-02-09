import { type Locator, type Page } from "@playwright/test";

export class ViewEmployee {
    page: Page;
    #addButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.#addButton = this.page.getByRole("button", { name: /Add/i });
    }
    
    async clickAdd() {
        await this.#addButton.click();
        console.log("Clicked on Add");
    }
}