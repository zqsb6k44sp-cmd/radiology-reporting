# RobCo Industries Medical Terminal System
## Radiology USG Report Generation System

A Fallout-themed radiology report generation web application for personal use. This system allows radiologists to generate, manage, and print USG (ultrasound) reports with a retro terminal aesthetic.

![Terminal Interface](https://img.shields.io/badge/Interface-Terminal-green)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

---

## ✨ Features

### Core Functionality
- **Split-Screen Interface**: Editor on left, template selection on right
- **5 Pre-defined USG Templates**: Abdomen, Pelvis, Obstetric, Thyroid, and Musculoskeletal
- **Patient Data Management**: Comprehensive form for patient information
- **Draft & Finish Workflow**: Save work in progress or mark as complete
- **Professional Print Output**: Clean medical report format for printing
- **Report Repository**: Search, view, and reprint completed reports
- **Role-Based Access Control**: Doctor and Admin access levels

### Visual Design
- **Terminal Aesthetic**: Inspired by Fallout franchise terminals
- **Green Phosphor Theme**: Classic green text on black background
- **Monospace Typography**: Courier New for authentic terminal feel
- **Clean Design**: Simple borders and layout without fancy effects

---

## 🚀 Quick Start

### Installation

1. **Clone or Download** this repository to your web server or local machine

2. **Open in Browser**:
   ```
   Simply open login.html in any modern web browser
   No build process or dependencies required!
   ```

3. **Login with Test Accounts**:
   - **Doctor Account**: `dr.smith` / `password123`
   - **Doctor Account**: `dr.jones` / `password123`
   - **Admin Account**: `admin` / `admin`

### First Time Use

1. Open `login.html` in your browser
2. Login with one of the test accounts
3. Select a USG template from the right panel
4. Fill in patient data
5. Click "LOAD TEMPLATE" to populate the editor
6. Edit the report as needed
7. Save as draft or finish the report
8. Use the print function to generate final output

---

## 📁 File Structure

```
radiology-reporting/
├── index.html              # Main application (report editor)
├── login.html              # Authentication page
├── admin.html              # Report repository viewer
├── css/
│   ├── fallout-theme.css   # Terminal styling
│   ├── editor.css          # Editor-specific styles
│   └── print.css           # Print output styles
├── js/
│   ├── app.js              # Main application logic
│   ├── templates.js        # USG report templates
│   ├── auth.js             # Authentication logic
│   └── storage.js          # LocalStorage data management
└── README.md               # This file
```

---

## 🎯 How to Use

### Creating a New Report

1. **Login** to the system
2. **Select a Template** from the right panel
3. **Fill Patient Data**:
   - Patient Name (required)
   - Age/DOB (required)
   - Gender (required)
   - Date of Examination (required)
   - Referring Doctor (optional)
   - Clinical History (optional)
4. **Load Template** - Click "LOAD TEMPLATE" button
5. **Edit Report** - Modify the pre-filled content as needed
6. **Save Draft** - Click "SAVE DRAFT" to save work in progress
7. **Finish Report** - Click "FINISH REPORT" to mark as complete
8. **Print** - Use "PRINT" button to generate final output

### Managing Reports

- **View Drafts**: Saved drafts appear in the "SAVED DRAFTS" section
- **Load Draft**: Click on any draft to continue editing
- **View Reports**: Click "VIEW REPORTS" link to see all finished reports
- **Search Reports**: Use search bar to find reports by patient name, doctor, or date
- **Reprint Reports**: Click on any report and use "PRINT REPORT" button

### Access Levels

**Doctor Access**:
- Create new reports
- View and edit own drafts
- View own finished reports
- Print own reports

**Admin Access**:
- View ALL reports from all doctors
- Search across all reports
- Reprint any report
- Cannot edit finished reports (view only)

---

## 📋 Available Templates

### 1. Abdomen USG
Complete abdominal ultrasound examination including liver, gallbladder, pancreas, spleen, kidneys, and bladder.

### 2. Pelvis USG
Pelvic ultrasound examination for both male and female patients (uterus, ovaries, prostate, bladder).

### 3. Obstetric USG
Pregnancy ultrasound with fetal biometry, gestational age, placenta, and amniotic fluid assessment.

### 4. Thyroid USG (Small Parts)
Thyroid gland examination including nodule assessment and cervical lymph nodes.

### 5. Musculoskeletal USG
MSK ultrasound for joints, tendons, ligaments, and soft tissues.

---

## 🔧 Customization

### Adding New Templates

Edit `js/templates.js` and add a new template object:

```javascript
newTemplate: {
    id: 'newTemplate',
    name: 'New Template Name',
    description: 'Description of the template',
    template: `REPORT CONTENT HERE
    
    PATIENT NAME: {{patientName}}
    AGE/DOB: {{age}}
    ...
    
    RADIOLOGIST: {{doctorName}}
    DATE: {{reportDate}}`
}
```

Available placeholders:
- `{{patientName}}`
- `{{age}}`
- `{{gender}}`
- `{{examDate}}`
- `{{referringDoctor}}`
- `{{clinicalHistory}}`
- `{{doctorName}}`
- `{{reportDate}}`

### Adding New Users

Edit `js/storage.js` in the `init()` function to add default users:

```javascript
{
    username: 'dr.newdoctor',
    password: 'password123',
    role: 'doctor',
    name: 'Dr. New Doctor'
}
```

### Styling Changes

- **Colors**: Edit CSS variables in `css/fallout-theme.css`:
  ```css
  :root {
      --terminal-green: #00FF41;
      --terminal-amber: #FFB000;
      --terminal-bg: #000000;
      --terminal-border: #00FF41;
  }
  ```

- **Fonts**: Change font family in `css/fallout-theme.css`:
  ```css
  body {
      font-family: 'Courier New', Courier, monospace;
  }
  ```

---

## 🌐 Integration with Your Website

### Option 1: Direct Integration

Copy all files to your web server and link to `login.html`:

```html
<a href="/radiology-reporting/login.html">USG Report System</a>
```

### Option 2: iFrame Embedding

Embed the application in your website:

```html
<iframe src="/radiology-reporting/login.html" 
        width="100%" 
        height="800px" 
        style="border: 1px solid #00FF41;">
</iframe>
```

### Option 3: Subdomain

Host on a subdomain like `reports.yourdomain.com`

---

## 💾 Data Storage

### Current Implementation: LocalStorage

- All data stored in browser's LocalStorage
- **Pros**: No server required, simple setup
- **Cons**: Data specific to one browser, limited storage, not suitable for production

### Upgrading to Backend Database

To upgrade for production use:

1. **Choose a Backend**: Node.js + Express, PHP, Python Flask, etc.
2. **Database**: MySQL, PostgreSQL, MongoDB, etc.
3. **Replace LocalStorage calls** in `js/storage.js` with API calls
4. **Implement proper security**:
   - Secure authentication (JWT, sessions)
   - Password hashing (bcrypt)
   - HTTPS encryption
   - Input validation and sanitization
5. **Add features**:
   - User registration
   - Password reset
   - Audit logs
   - Backup/export functionality

Example API structure:
```
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/reports
POST   /api/reports
PUT    /api/reports/:id
DELETE /api/reports/:id
GET    /api/drafts
POST   /api/drafts
```

---

## ⚠️ Important Notes

### Security Considerations

**This application uses LocalStorage and is intended for personal use only.**

For production deployment:
- ✅ Implement server-side authentication
- ✅ Use encrypted connections (HTTPS)
- ✅ Hash passwords (never store plain text)
- ✅ Validate and sanitize all inputs
- ✅ Implement proper access controls
- ✅ Regular backups
- ✅ Comply with medical data regulations (HIPAA, GDPR, etc.)

### Medical Disclaimer

This software is provided for personal productivity use. It is not certified for clinical use. Always follow your institution's approved workflows and quality assurance procedures.

---

## 🛠️ Browser Compatibility

Tested and working on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)

Requires JavaScript enabled.

---

## 📄 License

This project is provided as-is for personal use. 

---

## 🤝 Contributing

This is a personal project template. Feel free to fork and customize for your needs.

---

## 📞 Support

For issues or questions, refer to the code comments or create an issue in the repository.

---

## 🎮 Credits

Terminal aesthetic inspired by Fallout franchise (Bethesda Game Studios).
All medical terminology is professionally accurate but should be verified for clinical use.

---

**Built with vanilla HTML, CSS, and JavaScript - No frameworks required! 🚀**

---

*Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): 2026-01-14 10:35:00*  
*Current User's Login: zqsb6k44sp-cmd*
