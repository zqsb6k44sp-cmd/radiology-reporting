/**
 * Authentication Logic
 * 
 * Handles user authentication and authorization for the application.
 * 
 * Features:
 * - Login/logout functionality
 * - Session management using localStorage
 * - Role-based access control (doctor/admin)
 * - Page access protection
 * 
 * Security Note: This is a client-side only authentication system
 * suitable for personal use. For production, implement server-side
 * authentication with proper session management and HTTPS.
 */

// Authentication Logic

const AuthManager = {
    // Check if user is logged in
    isLoggedIn() {
        return StorageManager.getCurrentUser() !== null;
    },

    // Get current user
    getCurrentUser() {
        return StorageManager.getCurrentUser();
    },

    // Login user
    login(username, password) {
        const user = StorageManager.authenticateUser(username, password);
        if (user) {
            StorageManager.setCurrentUser(user);
            return { success: true, user: user };
        }
        return { success: false, message: 'Invalid username or password' };
    },

    // Logout user
    logout() {
        StorageManager.logout();
        window.location.href = 'login.html';
    },

    // Check if user is admin
    isAdmin() {
        const user = this.getCurrentUser();
        return user && user.role === 'admin';
    },

    // Redirect to login if not authenticated
    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    },

    // Redirect to admin if not admin
    requireAdmin() {
        if (!this.requireAuth()) return false;
        
        if (!this.isAdmin()) {
            window.location.href = 'index.html';
            return false;
        }
        return true;
    }
};
