from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        cwd = os.getcwd()
        page.goto(f"file://{cwd}/menu.html")

        # Check initial lang
        initial_lang = page.locator("html").get_attribute("lang")
        print(f"Initial Lang: {initial_lang}")

        # Switch to Arabic
        page.click("#lang-toggle")
        page.wait_for_timeout(1000)

        new_lang = page.locator("html").get_attribute("lang")
        print(f"New Lang: {new_lang}")

        # Switch to Dark Mode
        page.click("#theme-toggle")
        page.wait_for_timeout(500)

        # Verify Translations
        hero_caption = page.locator('[data-i18n="chefs_special"]').inner_text()
        print(f"Hero Caption (AR): {hero_caption}")

        add_btn = page.locator('[data-i18n="add_to_order"]').first.inner_text()
        print(f"Add Button (AR): {add_btn}")

        # Verify Dark Mode Class on Body
        body_class = page.locator("body").get_attribute("class")
        print(f"Body Classes: {body_class}")
        if "dark" in body_class:
            print("Dark mode class present on body.")
        else:
            print("Dark mode class MISSING on body.")

        # Take screenshot
        os.makedirs("verification", exist_ok=True)
        page.screenshot(path="verification/menu_dark_ar.png", full_page=True)
        print("Screenshot generated at verification/menu_dark_ar.png")

        browser.close()

if __name__ == "__main__":
    run()
