from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Load the local index.html file
        cwd = os.getcwd()
        page.goto(f"file://{cwd}/index.html")

        # Switch to Arabic
        # Wait for hydration if needed, but here it is vanilla JS
        page.click("#lang-toggle")

        # Check "Book a Table" button text
        # It's inside a span with data-i18n="book_table"
        book_btn_text = page.locator('[data-i18n="book_table"]').first.inner_text()
        print(f"Book button text: {book_btn_text}")

        # Check "Mixed Grill Platter" text
        mixed_grill_text = page.locator('[data-i18n="mixed_grill"]').first.inner_text()
        print(f"Mixed Grill text: {mixed_grill_text}")

        # Take screenshot
        os.makedirs("verification", exist_ok=True)
        page.screenshot(path="verification/fixed_ar_v2.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    run()
