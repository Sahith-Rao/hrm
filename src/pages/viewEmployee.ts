import {type Locator, type Page, expect} from "@playwright/test";

export class ViewEmployee {
    page: Page;
    #addButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.#addButton = this.page.getByRole("button", {name: " Add "});
    }
    async clickAdd() {
        await this.#addButton.click();
        console.log("Clicked on Add");
    }
}