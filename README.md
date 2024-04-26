# Project Usage Instructions

This guide will walk you through the steps to use this project to extract and format data from "arztsuche24.at". Even if you're not an IT expert, these simple instructions will help you navigate through the process.

## Prerequisites

Before starting, make sure you have the following:

- [Node.js](https://nodejs.org/) installed on your system.
- Basic familiarity with using the terminal or command prompt.

## Step 1: Download the Repository

1. Download the repository from [this link](https://github.com/fnnzzz/oif-doctors-parser/archive/refs/heads/master.zip).
2. Unzip the downloaded file and save it to a location of your choice.

## Step 2: Install Dependencies

1. Open your terminal or command prompt.
2. Navigate to the directory where you unzipped the repository. For example:
   ```
   cd /path/to/oif-doctors-parser/
   ```
3. Run the following command to install dependencies:
   ```
   npm install
   ```

## Step 3: Configure the Parser

1. Open the `parser.js` file in your preferred text editor.
2. Locate and edit the following variables:
    - `BASE_URL`: Specify the URL of the "arztsuche24.at" website from which you want to extract data. You can find this URL by visiting the website and copying the page URL.
    - `PAGE_START` and `PAGE_END`: You can specify a particular range of pages to extract information from. This allows you to extract data in portions. If you want to get all the information at once, specify the first page and the maximum available on the site. In this case, however, in the event of an error, all the information from the previous pages will be lost. It is recommended that you upload your data in parts (for example, by 30 pages).

## Step 4: Run the Parser

1. After saving your changes in `parser.js`, return to your terminal or command prompt.
2. Navigate to the directory where the project files are located.
3. Run the following command:
   ```
   node parser.js
   ```

## Step 5: Extract Information by Portions (Optional)

If you'd like to extract information from specific portions of the website:

1. Edit the `PAGE_START` and `PAGE_END` variables in `parser.js` to specify the desired page range.
2. Repeat **Step 4** to run the parser again.

## Step 6: Format the Data

1. Once you've extracted all the desired pages, run the following command in your terminal:
   ```
   node formatter.js
   ```
2. This will generate a CSV (Comma-Separated Values) file, which you can open in Excel or Google Spreadsheet.
3. To open the CSV file, follow these steps in Excel or Google Spreadsheet:
   - Excel: **Open** -> **Import**.
   - Google Spreadsheet: **File** -> **Import** -> **Upload**.

## Step 7: Verify Data Correctness

After formatting the data into a CSV file:

- Review all fields for correctness, paying particular attention to names as they may be provided in a non-unique format.

## Example Usage:

```shell
1) cd /Users/john/Downloads/oif-doctors-parser/
2) npm install
3) node parser.js
4) "edit page start from 1 to 11, page end from 10 to 20"
5) node parser.js
6) node formatter.js
7) create new google spreadsheet
8) File -> Import -> Upload -> Import data (nothing to change)
```