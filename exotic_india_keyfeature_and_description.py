import pandas as pd
import time
import re

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

INPUT_FILE = "test_skus.xlsx"
OUTPUT_FILE = "exotic_india_keyfeatures_NEW.xlsx"

SKU_COLUMN = "Sku"

# ==========================
# KEY FEATURE GENERATOR
# ==========================

def generate_key_features(description):

    if not description or description == "Description Not Found":
        return ["", "", "", "", ""]

    description = re.sub(r"\s+", " ", description).strip()

    sentences = re.split(r'(?<=[.!?])\s+', description)

    features = []

    for sentence in sentences:

        sentence = sentence.strip()

        if len(sentence) < 60:
            continue

        if ":" in sentence and len(sentence) < 120:
            continue

        if sentence not in features:
            features.append(sentence)

        if len(features) == 5:
            break

    while len(features) < 5:
        features.append("")

    return features[:5]


# ==========================
# READ EXCEL
# ==========================

df = pd.read_excel(INPUT_FILE)
df = df.dropna(subset=[SKU_COLUMN])

print("=" * 60)
print("Total Rows Found:", len(df))

print("\nLast 10 SKUs:")
print(df[SKU_COLUMN].tail(10).tolist())
print("=" * 60)

results = []

# ==========================
# CHROME
# ==========================

driver = webdriver.Chrome()
driver.maximize_window()

# ==========================
# LOOP
# ==========================

for index, row in df.iterrows():

    sku = str(row[SKU_COLUMN]).strip()

    if not sku:
        continue

    print(f"\nProcessing Row: {index + 1}")
    print(f"Checking SKU: {sku}")

    try:

        driver.get("https://www.exoticindiaart.com")

        time.sleep(3)

        search_box = driver.find_element(
            By.CSS_SELECTOR,
            "input[type='search']"
        )

        search_box.clear()
        search_box.send_keys(sku)
        search_box.send_keys(Keys.ENTER)

        time.sleep(5)

        title = driver.title
        url = driver.current_url

        description = ""

        try:

            desc_blocks = driver.find_elements(
                By.CSS_SELECTOR,
                "div.product-details-description.ai-desc"
            )

            all_desc = []

            for block in desc_blocks:

                txt = block.text.strip()

                if txt:
                    all_desc.append(txt)

            description = "\n\n".join(all_desc)

            if not description:
                description = "Description Not Found"

        except:
            description = "Description Not Found"

        kfs = generate_key_features(description)

        results.append({
            "SKU": sku,
            "Title": title,
            "URL": url,
            "Description": description,
            "KF1": kfs[0],
            "KF2": kfs[1],
            "KF3": kfs[2],
            "KF4": kfs[3],
            "KF5": kfs[4]
        })

        print("Title:", title)

    except Exception as e:

        print("ERROR:", str(e))

        results.append({
            "SKU": sku,
            "Title": "ERROR",
            "URL": "",
            "Description": "",
            "KF1": "",
            "KF2": "",
            "KF3": "",
            "KF4": "",
            "KF5": ""
        })

# ==========================
# CLOSE CHROME
# ==========================

driver.quit()

# ==========================
# SAVE
# ==========================

print("\nTotal Results Collected:", len(results))

pd.DataFrame(results).to_excel(
    OUTPUT_FILE,
    index=False
)

print("\nCompleted")
print("Saved:", OUTPUT_FILE)