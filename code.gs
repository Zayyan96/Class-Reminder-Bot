function sendClassReminders() {
  // Open the spreadsheet containing class schedule
  var classSheetId = "18FrjT6cpwWCWMqF7iweUFXe9_29NDNKtDj2IQNNGaO8"; // Replace with the ID of your class schedule Google Sheet file
  var classSheet = SpreadsheetApp.openById(classSheetId); // Replace "Sheet1" with the name of your sheet

  // Open the spreadsheet containing student details
  var studentSheetId = "1SgkjEcSjQnivbwt3dHKg7Nrtk8ZyAKLcmiZcW7x5Du0"; // Replace with the ID of your student details Google Sheet file
  var studentSheet = SpreadsheetApp.openById(studentSheetId); // Replace "Sheet1" with the name of your sheet
  
  // Open the spreadsheet containing student emails
  var emailSheetId = "1PiUJ1cO1U-YMfVC4KNQIShmekp7wM3rR6JagQHG0FP0"; // Replace with the ID of your student email Google Sheet file
  var emailSheet = SpreadsheetApp.openById(emailSheetId); // Replace "Sheet1" with the name of your sheet

  // Get today's date and day of the week
  var today = new Date();
  var day = today.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

  // Fetch all data from the class schedule sheet
  var classData = classSheet.getDataRange().getValues();

  // Fetch all data from the student details sheet
  var studentData = studentSheet.getDataRange().getValues();
  
  // Fetch all data from the student email sheet
  var emailData = emailSheet.getDataRange().getValues();

  // Iterate through each row of the class schedule to check for classes on the current day
  var classesToday = [];

  for (var i = 1; i < classData.length; i++) { // Start from 1 to skip header row
    var classDay = classData[i][3].toLowerCase(); // Day of the class
    if (classDay === day && classData[i][1] != "AS" && classData[i][1] != "A2") {
      // Convert time column to string
      var time = Utilities.formatDate(classData[i][4], Session.getScriptTimeZone(), "h:mm a");
      // Save the entire row if it's scheduled for today
      classesToday.push([classData[i][0], classData[i][1], classData[i][2], classData[i][3], time]);
    }
  } 
  Logger.log(classesToday);
  // Iterate through each student to check their assigned classes for today and send reminders
  for (var j = 1; j < 266; j++) { // Start from 1 to skip header row
    var studentID = j; // Student ID
    var studentEmail = ""; // Initialize student email
    // Find student email
    for (var e = 0; e < emailData.length; e++) {
      if (emailData[e][0] == studentID) {
        studentEmail = emailData[e][1]; // Student Email
        break;
      }
    }
    if (studentEmail === "") continue; // If student email not found, skip to next student

    var studentClasses = []; // Array to store classes for the student for today
    
    // Iterate through each class scheduled for today
    for (var k = 0; k < classesToday.length; k++) {
      var classID = classesToday[k][0]; // Class ID
      
      // Check if the student is assigned to this class
      for (var z = 1; z < studentData.length; z++) { // Start from 2 to skip first two columns (student ID and email)
 
        if (studentData[z][3] === classID && studentData[z][0] == studentID) {
          studentClasses.push(classesToday[k]); // Add class details to student's classes for today
          
        }
      }
    }

    //  Log student ID with their respective classes today
  
    if (studentClasses.length > 0) {
      for(var a=0; a<studentData.length; a++){
       if(studentData[a][0]==studentID){
        var b=a;
       }}
    
          var subject = "Reminder for Scheduled Classes";
          var body = "<p>Dear " + studentData[b][1] + " " + studentData[b][2] + ",<\p>This email serves as a reminder of your scheduled classes today, "+ classesToday[0][3] + ". Please find the details below:\n\n";

  // Construct the email body with all the student's classes
  for (var k = 0; k < studentClasses.length; k++) {
    body += "<li>" + studentClasses[k][1] + "<strong> " + studentClasses[k][2] + "</strong> at <strong>" + studentClasses[k][4] + " KSA time</strong></li>";
  }

  body += "</ul>" +
          "<p>Should there be any changes to the schedule due to unforeseen circumstances, you will be promptly informed by the teacher.</p>" +
          "<p>Looking forward to your participation.</p>" +
          "<p>Best regards,<br>Management Online Tuitions</p>";
  Logger.log(body);
  // Send email using GmailApp.sendEmail() 
 //GmailApp.sendEmail(studentEmail, subject, null, {
 //         htmlBody: body,
 //        from: "support@online-tuitions.com"
 //      });
        }
  }
}
