// Main Application Logic

const App = {
    currentTemplate: null,
    currentDraft: null,
    currentReport: null,

    init() {
        // Check authentication
        if (!AuthManager.requireAuth()) return;

        // Display user info
        this.displayUserInfo();

        // Load templates
        this.loadTemplates();

        // Set up event listeners
        this.setupEventListeners();

        // Load drafts if any
        this.loadDrafts();

        // Load reports for repository view
        if (document.getElementById('reportsList')) {
            this.loadReports();
        }
    },

    displayUserInfo() {
        const user = AuthManager.getCurrentUser();
        const userInfoElement = document.getElementById('userInfo');
        if (userInfoElement && user) {
            userInfoElement.innerHTML = `
                <span>Logged in as: ${user.name} (${user.role})</span>
                <button class="terminal-button secondary" onclick="App.logout()">LOGOUT</button>
            `;
        }
    },

    logout() {
        AuthManager.logout();
    },

    loadTemplates() {
        const templatesList = document.getElementById('templatesList');
        if (!templatesList) return;

        const templates = getAllTemplates();
        templatesList.innerHTML = '';

        templates.forEach(template => {
            const li = document.createElement('li');
            li.className = 'template-item';
            li.innerHTML = `
                <h3>[${template.id.toUpperCase()}]</h3>
                <p>${template.name}</p>
                <p style="font-size: 0.8em;">${template.description}</p>
            `;
            li.onclick = (e) => this.selectTemplate(template.id, e);
            templatesList.appendChild(li);
        });
    },

    selectTemplate(templateId, event) {
        this.currentTemplate = templateId;

        // Highlight selected template
        document.querySelectorAll('.template-item').forEach(item => {
            item.classList.remove('active');
        });
        if (event) {
            event.target.closest('.template-item').classList.add('active');
        }

        // Show patient data form
        this.showPatientDataForm();
    },

    showPatientDataForm() {
        const formContainer = document.getElementById('patientDataForm');
        if (!formContainer) return;

        formContainer.classList.remove('hidden');
    },

    loadTemplateIntoEditor() {
        const patientName = document.getElementById('patientName').value;
        const age = document.getElementById('age').value;
        const gender = document.getElementById('gender').value;
        const examDate = document.getElementById('examDate').value;
        const referringDoctor = document.getElementById('referringDoctor').value;
        const clinicalHistory = document.getElementById('clinicalHistory').value;

        if (!patientName || !age || !gender || !examDate) {
            this.showMessage('Please fill all required patient data fields', 'error');
            return;
        }

        const user = AuthManager.getCurrentUser();
        const patientData = {
            patientName,
            age,
            gender,
            examDate,
            referringDoctor,
            clinicalHistory,
            doctorName: user.name,
            reportDate: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        };

        const content = populateTemplate(this.currentTemplate, patientData);
        document.getElementById('reportEditor').value = content;

        // Store patient data for later use
        this.currentPatientData = patientData;

        this.showMessage('Template loaded successfully', 'success');
    },

    saveDraft() {
        const content = document.getElementById('reportEditor').value;
        if (!content) {
            this.showMessage('Nothing to save', 'error');
            return;
        }

        const user = AuthManager.getCurrentUser();
        const draft = {
            id: this.currentDraft ? this.currentDraft.id : null,
            templateId: this.currentTemplate,
            patientData: this.currentPatientData || {},
            content: content,
            doctorName: user.name
        };

        const savedDraft = StorageManager.saveDraft(draft);
        this.currentDraft = savedDraft;

        this.showMessage('Draft saved successfully', 'success');
        this.loadDrafts();
    },

    finishReport() {
        const content = document.getElementById('reportEditor').value;
        if (!content || !this.currentPatientData) {
            this.showMessage('Please load a template and fill patient data first', 'error');
            return;
        }

        const user = AuthManager.getCurrentUser();
        const report = {
            templateId: this.currentTemplate,
            patientData: this.currentPatientData,
            content: content,
            doctorName: user.name,
            status: 'finished'
        };

        StorageManager.addReport(report);

        // Delete draft if exists
        if (this.currentDraft) {
            StorageManager.deleteDraft(this.currentDraft.id);
        }

        this.showMessage('Report finished and saved successfully', 'success');
        
        // Clear the editor after a moment
        setTimeout(() => {
            this.clearEditor();
            this.loadDrafts();
        }, 1500);
    },

    clearEditor() {
        document.getElementById('reportEditor').value = '';
        document.getElementById('patientDataForm').classList.add('hidden');
        this.currentTemplate = null;
        this.currentDraft = null;
        this.currentPatientData = null;
        
        // Reset patient form
        document.getElementById('patientForm').reset();
        
        // Deselect templates
        document.querySelectorAll('.template-item').forEach(item => {
            item.classList.remove('active');
        });
    },

    printReport() {
        const content = document.getElementById('reportEditor').value;
        if (!content) {
            this.showMessage('Nothing to print', 'error');
            return;
        }

        window.print();
    },

    loadDrafts() {
        const draftsList = document.getElementById('draftsList');
        if (!draftsList) return;

        const user = AuthManager.getCurrentUser();
        const drafts = StorageManager.getDraftsByDoctor(user.name);

        if (drafts.length === 0) {
            draftsList.innerHTML = '<li style="padding: 15px; border: 1px solid var(--terminal-border);">No drafts available</li>';
            return;
        }

        draftsList.innerHTML = '';
        drafts.forEach(draft => {
            const li = document.createElement('li');
            li.className = 'report-item';
            li.innerHTML = `
                <div class="report-header">
                    <span class="patient-name">${draft.patientData.patientName || 'Unnamed Patient'}</span>
                    <span class="report-date">${new Date(draft.savedAt).toLocaleDateString()}</span>
                </div>
                <div class="report-info">Template: ${draft.templateId || 'N/A'}</div>
            `;
            li.onclick = () => this.loadDraft(draft);
            draftsList.appendChild(li);
        });
    },

    loadDraft(draft) {
        this.currentDraft = draft;
        this.currentTemplate = draft.templateId;
        this.currentPatientData = draft.patientData;

        // Populate form
        if (draft.patientData) {
            document.getElementById('patientName').value = draft.patientData.patientName || '';
            document.getElementById('age').value = draft.patientData.age || '';
            document.getElementById('gender').value = draft.patientData.gender || '';
            document.getElementById('examDate').value = draft.patientData.examDate || '';
            document.getElementById('referringDoctor').value = draft.patientData.referringDoctor || '';
            document.getElementById('clinicalHistory').value = draft.patientData.clinicalHistory || '';
        }

        // Load content
        document.getElementById('reportEditor').value = draft.content;

        // Show form
        document.getElementById('patientDataForm').classList.remove('hidden');

        this.showMessage('Draft loaded', 'success');
    },

    loadReports() {
        const reportsList = document.getElementById('reportsList');
        if (!reportsList) return;

        const user = AuthManager.getCurrentUser();
        const isAdmin = AuthManager.isAdmin();
        
        // Get reports based on user role
        const reports = isAdmin 
            ? StorageManager.searchReports('') 
            : StorageManager.getReportsByDoctor(user.name);

        if (reports.length === 0) {
            reportsList.innerHTML = '<li style="padding: 15px; border: 1px solid var(--terminal-border);">No reports available</li>';
            return;
        }

        reportsList.innerHTML = '';
        reports.forEach(report => {
            const li = document.createElement('li');
            li.className = 'report-item';
            li.innerHTML = `
                <div class="report-header">
                    <span class="patient-name">${report.patientData.patientName}</span>
                    <span class="report-date">${new Date(report.createdAt).toLocaleDateString()}</span>
                </div>
                <div class="report-info">
                    Doctor: ${report.doctorName} | 
                    Template: ${report.templateId} | 
                    Exam: ${report.patientData.examDate}
                </div>
            `;
            li.onclick = () => this.viewReport(report);
            reportsList.appendChild(li);
        });
    },

    viewReport(report) {
        // Store current report
        this.currentReport = report;

        // Display report in modal or new section
        const modal = document.getElementById('reportModal');
        if (modal) {
            document.getElementById('modalReportContent').textContent = report.content;
            modal.classList.remove('hidden');
        }
    },

    closeModal() {
        const modal = document.getElementById('reportModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    },

    printCurrentReport() {
        if (!this.currentReport) return;

        // Create a print window
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>USG Report</title>');
        printWindow.document.write('<link rel="stylesheet" href="css/print.css">');
        printWindow.document.write('</head><body>');
        printWindow.document.write('<div class="print-preview">');
        printWindow.document.write('<div class="print-header">');
        printWindow.document.write('<h1>RADIOLOGY REPORT</h1>');
        printWindow.document.write('<p>ULTRASOUND EXAMINATION</p>');
        printWindow.document.write('</div>');
        printWindow.document.write('<pre>' + this.currentReport.content + '</pre>');
        printWindow.document.write('<div class="print-footer">');
        printWindow.document.write('<p>This is a computer-generated report.</p>');
        printWindow.document.write('</div>');
        printWindow.document.write('</div>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    },

    searchReports() {
        const searchQuery = document.getElementById('searchInput').value;
        const user = AuthManager.getCurrentUser();
        const isAdmin = AuthManager.isAdmin();

        const reports = isAdmin 
            ? StorageManager.searchReports(searchQuery) 
            : StorageManager.searchReports(searchQuery, user.name);

        this.displaySearchResults(reports);
    },

    displaySearchResults(reports) {
        const reportsList = document.getElementById('reportsList');
        if (!reportsList) return;

        if (reports.length === 0) {
            reportsList.innerHTML = '<li style="padding: 15px; border: 1px solid var(--terminal-border);">No reports found</li>';
            return;
        }

        reportsList.innerHTML = '';
        reports.forEach(report => {
            const li = document.createElement('li');
            li.className = 'report-item';
            li.innerHTML = `
                <div class="report-header">
                    <span class="patient-name">${report.patientData.patientName}</span>
                    <span class="report-date">${new Date(report.createdAt).toLocaleDateString()}</span>
                </div>
                <div class="report-info">
                    Doctor: ${report.doctorName} | 
                    Template: ${report.templateId} | 
                    Exam: ${report.patientData.examDate}
                </div>
            `;
            li.onclick = () => this.viewReport(report);
            reportsList.appendChild(li);
        });
    },

    showMessage(message, type = 'info') {
        const messageContainer = document.getElementById('messageContainer');
        if (!messageContainer) return;

        messageContainer.innerHTML = `<div class="message ${type}">${message}</div>`;
        
        setTimeout(() => {
            messageContainer.innerHTML = '';
        }, 3000);
    },

    setupEventListeners() {
        // Load template button
        const loadBtn = document.getElementById('loadTemplateBtn');
        if (loadBtn) {
            loadBtn.onclick = () => this.loadTemplateIntoEditor();
        }

        // Save draft button
        const saveDraftBtn = document.getElementById('saveDraftBtn');
        if (saveDraftBtn) {
            saveDraftBtn.onclick = () => this.saveDraft();
        }

        // Finish report button
        const finishBtn = document.getElementById('finishReportBtn');
        if (finishBtn) {
            finishBtn.onclick = () => this.finishReport();
        }

        // Print button
        const printBtn = document.getElementById('printBtn');
        if (printBtn) {
            printBtn.onclick = () => this.printReport();
        }

        // Clear button
        const clearBtn = document.getElementById('clearBtn');
        if (clearBtn) {
            clearBtn.onclick = () => this.clearEditor();
        }

        // Search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', () => this.searchReports());
        }

        // Modal close button
        const closeModalBtn = document.getElementById('closeModalBtn');
        if (closeModalBtn) {
            closeModalBtn.onclick = () => this.closeModal();
        }

        // Print current report button
        const printReportBtn = document.getElementById('printReportBtn');
        if (printReportBtn) {
            printReportBtn.onclick = () => this.printCurrentReport();
        }
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
