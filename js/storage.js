/**
 * Local Storage Management for Reports and Users
 * 
 * This module handles all data persistence using browser's localStorage.
 * 
 * IMPORTANT: This localStorage implementation is for personal/development use only.
 * For production deployment, replace these functions with API calls to a backend server
 * with proper database storage and security measures.
 * 
 * Storage Structure:
 * - usg_reports: Array of finished reports
 * - usg_users: Array of user accounts
 * - current_user: Currently logged-in user object
 * - usg_drafts: Array of draft reports
 * 
 * Security Note: Passwords are stored in plain text in localStorage.
 * This is NOT secure and should only be used for demonstration purposes.
 * In production, use proper authentication with hashed passwords on the backend.
 */

// Local Storage Management for Reports and Users

const StorageManager = {
    // Storage keys
    KEYS: {
        REPORTS: 'usg_reports',
        USERS: 'usg_users',
        CURRENT_USER: 'current_user',
        DRAFTS: 'usg_drafts'
    },

    // Initialize storage with default data
    init() {
        // Create default users if not exists
        if (!this.getUsers()) {
            const defaultUsers = [
                {
                    username: 'admin',
                    password: 'admin',
                    role: 'admin',
                    name: 'System Administrator'
                },
                {
                    username: 'dr.smith',
                    password: 'password123',
                    role: 'doctor',
                    name: 'Dr. John Smith'
                },
                {
                    username: 'dr.jones',
                    password: 'password123',
                    role: 'doctor',
                    name: 'Dr. Sarah Jones'
                }
            ];
            this.saveUsers(defaultUsers);
        }

        // Create sample reports if not exists
        if (!this.getReports() || this.getReports().length === 0) {
            this.createSampleReports();
        }
    },

    // User Management
    getUsers() {
        const users = localStorage.getItem(this.KEYS.USERS);
        return users ? JSON.parse(users) : null;
    },

    saveUsers(users) {
        localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));
    },

    authenticateUser(username, password) {
        const users = this.getUsers();
        if (!users) return null;
        
        return users.find(u => u.username === username && u.password === password) || null;
    },

    getCurrentUser() {
        const user = localStorage.getItem(this.KEYS.CURRENT_USER);
        return user ? JSON.parse(user) : null;
    },

    setCurrentUser(user) {
        if (user) {
            localStorage.setItem(this.KEYS.CURRENT_USER, JSON.stringify(user));
        } else {
            localStorage.removeItem(this.KEYS.CURRENT_USER);
        }
    },

    logout() {
        this.setCurrentUser(null);
    },

    // Report Management
    getReports() {
        const reports = localStorage.getItem(this.KEYS.REPORTS);
        return reports ? JSON.parse(reports) : [];
    },

    saveReports(reports) {
        localStorage.setItem(this.KEYS.REPORTS, JSON.stringify(reports));
    },

    addReport(report) {
        const reports = this.getReports();
        report.id = this.generateId();
        report.createdAt = new Date().toISOString();
        reports.push(report);
        this.saveReports(reports);
        return report;
    },

    updateReport(reportId, updatedReport) {
        const reports = this.getReports();
        const index = reports.findIndex(r => r.id === reportId);
        if (index !== -1) {
            reports[index] = { ...reports[index], ...updatedReport, updatedAt: new Date().toISOString() };
            this.saveReports(reports);
            return reports[index];
        }
        return null;
    },

    deleteReport(reportId) {
        const reports = this.getReports();
        const filtered = reports.filter(r => r.id !== reportId);
        this.saveReports(filtered);
    },

    getReportById(reportId) {
        const reports = this.getReports();
        return reports.find(r => r.id === reportId) || null;
    },

    getReportsByDoctor(doctorName) {
        const reports = this.getReports();
        return reports.filter(r => r.doctorName === doctorName);
    },

    searchReports(query, doctorName = null) {
        let reports = this.getReports();
        
        // Filter by doctor if specified
        if (doctorName) {
            reports = reports.filter(r => r.doctorName === doctorName);
        }
        
        // Search in patient name, doctor name, and date
        if (query) {
            query = query.toLowerCase();
            reports = reports.filter(r => 
                (r.patientData.patientName && r.patientData.patientName.toLowerCase().includes(query)) ||
                (r.doctorName && r.doctorName.toLowerCase().includes(query)) ||
                (r.patientData.examDate && r.patientData.examDate.includes(query))
            );
        }
        
        // Sort by creation date (newest first)
        reports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        return reports;
    },

    // Draft Management
    getDrafts() {
        const drafts = localStorage.getItem(this.KEYS.DRAFTS);
        return drafts ? JSON.parse(drafts) : [];
    },

    saveDrafts(drafts) {
        localStorage.setItem(this.KEYS.DRAFTS, JSON.stringify(drafts));
    },

    saveDraft(draft) {
        const drafts = this.getDrafts();
        draft.id = draft.id || this.generateId();
        draft.savedAt = new Date().toISOString();
        
        const index = drafts.findIndex(d => d.id === draft.id);
        if (index !== -1) {
            drafts[index] = draft;
        } else {
            drafts.push(draft);
        }
        
        this.saveDrafts(drafts);
        return draft;
    },

    getDraftsByDoctor(doctorName) {
        const drafts = this.getDrafts();
        return drafts.filter(d => d.doctorName === doctorName);
    },

    deleteDraft(draftId) {
        const drafts = this.getDrafts();
        const filtered = drafts.filter(d => d.id !== draftId);
        this.saveDrafts(filtered);
    },

    // Utility functions
    generateId() {
        return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },

    // Create sample reports for testing
    createSampleReports() {
        const sampleReports = [
            {
                id: this.generateId(),
                templateId: 'abdomen',
                patientData: {
                    patientName: 'John Doe',
                    age: '45 years',
                    gender: 'Male',
                    examDate: '2026-01-10',
                    referringDoctor: 'Dr. Williams',
                    clinicalHistory: 'Abdominal pain, right upper quadrant'
                },
                content: 'Sample abdomen USG report content...',
                doctorName: 'Dr. John Smith',
                status: 'finished',
                createdAt: '2026-01-10T10:00:00.000Z'
            },
            {
                id: this.generateId(),
                templateId: 'pelvis',
                patientData: {
                    patientName: 'Jane Smith',
                    age: '32 years',
                    gender: 'Female',
                    examDate: '2026-01-12',
                    referringDoctor: 'Dr. Brown',
                    clinicalHistory: 'Lower abdominal pain'
                },
                content: 'Sample pelvis USG report content...',
                doctorName: 'Dr. Sarah Jones',
                status: 'finished',
                createdAt: '2026-01-12T14:30:00.000Z'
            },
            {
                id: this.generateId(),
                templateId: 'thyroid',
                patientData: {
                    patientName: 'Robert Johnson',
                    age: '55 years',
                    gender: 'Male',
                    examDate: '2026-01-13',
                    referringDoctor: 'Dr. Davis',
                    clinicalHistory: 'Thyroid swelling'
                },
                content: 'Sample thyroid USG report content...',
                doctorName: 'Dr. John Smith',
                status: 'finished',
                createdAt: '2026-01-13T09:15:00.000Z'
            }
        ];
        
        this.saveReports(sampleReports);
    }
};

// Initialize storage on load
StorageManager.init();
