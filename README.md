# ClassReminder-Bot

This Google Apps Script automates the process of sending class reminders to students based on the class schedule, student details, and student emails stored in Google Sheets.

## Features

- Retrieves class schedules from a Google Sheet
- Retrieves student details and emails from Google Sheets
- Sends email reminders to students about their scheduled classes for the day
- Skips students without registered email addresses

## Setup

1. Open your Google Sheet and go to `Extensions > Apps Script`.
2. Replace the content with the provided script code.
3. Update the script with your Google Sheet IDs.
4. Save and run the script.

## How to Use

1. Populate the Google Sheets with the necessary class schedules, student details, and student emails.
2. Run the script manually or set up a trigger to run it periodically.

## Configuration

- Update the `classSheetId`, `studentSheetId`, and `emailSheetId` variables with your Google Sheet IDs.
- Ensure the Google Sheets have the appropriate structure as expected by the script.

## Functions

### sendClassReminders()

Main function to send class reminders to students based on the current day's schedule.

### Helper Functions

- **getLastProcessedRow()**: Retrieves the last processed row from script properties.
- **updateLastProcessedRow(row)**: Updates the last processed row in script properties.
- **getOrCreateFolder(folderName, parentFolder)**: Retrieves or creates a folder by name within a given parent folder.
- **getFileIdFromURL(url)**: Extracts the file ID from a Google Drive URL.
- **getFolderIdFromLink(link)**: Extracts the folder ID from a Google Drive link.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
