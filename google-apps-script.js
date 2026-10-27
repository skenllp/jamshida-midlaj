/**
 * ==============================================================================
 * GOOGLE APPS SCRIPT FOR WEDDING & HOUSEWARMING RSVP
 * "Two Beginnings · One Blessed Celebration"
 * ==============================================================================
 * 
 * INSTRUCTIONS FOR SETTING UP GOOGLE SHEETS:
 * 
 * 1. Open Google Sheets (https://sheets.new) and create a new spreadsheet.
 * 2. Name your spreadsheet: "Wedding & Housewarming RSVP 2026".
 * 3. In the top menu, click: "Extensions" > "Apps Script".
 * 4. Delete any code in the editor, and paste THIS ENTIRE FILE content.
 * 5. Click the "Save" icon (or press Ctrl+S / Cmd+S).
 * 6. Click the blue "Deploy" button at the top right > "New deployment".
 * 7. Click the gear icon next to "Select type" > choose "Web app".
 * 8. Set the following fields:
 *    - Description: "RSVP Form Web App"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone" (IMPORTANT: This allows guests to submit RSVPs without login)
 * 9. Click "Deploy".
 * 10. Authorize access if prompted by Google (click Advanced > Go to Untitled Project (unsafe) > Allow).
 * 11. Copy the "Web App URL" (it looks like: https://script.google.com/macros/s/AKfycb.../exec).
 * 12. Open `script.js` in your website code, and paste your Web App URL in `EVENT_CONFIG.googleSheetsEndpoint`.
 * 
 * Done! Any RSVP submitted on the website will automatically appear in your Google Sheet!
 * ==============================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Prevent concurrent write conflicts

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      var headerRange = sheet.getRange(1, 1, 1, 7);
      headerRange.setValues([[
        "Timestamp",
        "Guest Name",
        "Mobile Number",
        "Attendance Status",
        "Number of Guests",
        "Events Attending",
        "Special Message / Dua"
      ]]);
      
      // Style header row
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#143820");
      headerRange.setFontColor("#faeecf");
      headerRange.setHorizontalAlignment("center");
      sheet.setFrozenRows(1);
    }

    var data;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter;
    }

    var timestamp = new Date();
    var name = data.name || "";
    var mobile = data.mobile || "";
    var attendance = data.attendance || data.attending || "Yes, Insha Allah";
    var guests = data.guests !== undefined ? data.guests : 1;
    var events = data.events || "Both Celebrations (19 & 20 Dec)";
    var message = data.message || "";

    // Append new row to Google Sheet
    sheet.appendRow([
      timestamp,
      name,
      mobile,
      attendance,
      guests,
      events,
      message
    ]);

    // Format new row
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1).setNumberFormat("yyyy-mm-dd hh:mm:ss");
    sheet.getRange(lastRow, 3).setNumberFormat("@"); // Keep mobile number as text (preserving + / 0)
    sheet.getRange(lastRow, 5).setHorizontalAlignment("center");

    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "row": lastRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ "status": "active", "message": "RSVP Google Apps Script endpoint is running." }))
    .setMimeType(ContentService.MimeType.JSON);
}
