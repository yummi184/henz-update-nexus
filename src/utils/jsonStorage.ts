
// Enhanced JSON Storage utility for cross-device data persistence
class JsonStorage {
  private data: Record<string, any> = {};
  private storageKey = 'henz_update_hub_data';
  private syncInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.initializeStorage();
    this.startAutoSync();
  }

  private initializeStorage() {
    try {
      // Initialize with proper data structure
      const defaultData = {
        users: {},
        currentUser: null,
        toolLinks: {
          freeHacks: '',
          walletFlasher: '',
          bankFlasher: '',
          socialFlasher: '',
          apiDashboard: '',
          downloader: ''
        },
        redeemCodes: [],
        adminSupport: [],
        userSupport: {},
        settings: {}
      };

      // Try to load existing data
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsedData = JSON.parse(stored);
        this.data = { ...defaultData, ...parsedData };
      } else {
        this.data = defaultData;
      }

      this.saveToStorage();
    } catch (error) {
      console.error('Error initializing storage:', error);
      this.data = {
        users: {},
        currentUser: null,
        toolLinks: {},
        redeemCodes: [],
        adminSupport: [],
        userSupport: {},
        settings: {}
      };
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
      // Also save to session storage for cross-tab communication
      sessionStorage.setItem(this.storageKey + '_sync', JSON.stringify(this.data));
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  }

  private startAutoSync() {
    // Sync every 1 second for real-time updates
    this.syncInterval = setInterval(() => {
      this.syncFromStorage();
    }, 1000);
  }

  private syncFromStorage() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      const sessionStored = sessionStorage.getItem(this.storageKey + '_sync');
      
      if (stored) {
        const parsedData = JSON.parse(stored);
        this.data = parsedData;
      }
      
      if (sessionStored) {
        const sessionData = JSON.parse(sessionStored);
        this.data = sessionData;
        localStorage.setItem(this.storageKey, JSON.stringify(sessionData));
      }
    } catch (error) {
      console.error('Error syncing from storage:', error);
    }
  }

  // User management methods
  createUser(userData: any): boolean {
    try {
      if (!this.data.users) this.data.users = {};
      this.data.users[userData.id] = userData;
      this.saveToStorage();
      console.log('User created:', userData);
      return true;
    } catch (error) {
      console.error('Error creating user:', error);
      return false;
    }
  }

  getUser(userId: string): any | null {
    try {
      if (!this.data.users || !this.data.users[userId]) {
        console.log('User not found:', userId);
        return null;
      }
      return this.data.users[userId];
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  updateUser(userId: string, updates: any): boolean {
    try {
      if (!this.data.users || !this.data.users[userId]) {
        console.log('User not found for update:', userId);
        return false;
      }
      
      this.data.users[userId] = { ...this.data.users[userId], ...updates };
      this.saveToStorage();
      console.log('User updated:', userId, updates);
      return true;
    } catch (error) {
      console.error('Error updating user:', error);
      return false;
    }
  }

  deleteUser(userId: string): boolean {
    try {
      if (!this.data.users || !this.data.users[userId]) {
        return false;
      }
      
      delete this.data.users[userId];
      this.saveToStorage();
      console.log('User deleted:', userId);
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }

  getAllUsers(): any[] {
    try {
      if (!this.data.users) return [];
      return Object.values(this.data.users);
    } catch (error) {
      console.error('Error getting all users:', error);
      return [];
    }
  }

  // Current user methods
  setCurrentUser(userData: any): void {
    try {
      this.data.currentUser = userData;
      this.saveToStorage();
      console.log('Current user set:', userData);
    } catch (error) {
      console.error('Error setting current user:', error);
    }
  }

  getCurrentUser(): any | null {
    try {
      return this.data.currentUser;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  clearCurrentUser(): void {
    try {
      this.data.currentUser = null;
      this.saveToStorage();
    } catch (error) {
      console.error('Error clearing current user:', error);
    }
  }

  // Tool links methods
  setToolLinks(links: any): void {
    try {
      this.data.toolLinks = { ...this.data.toolLinks, ...links };
      this.saveToStorage();
      console.log('Tool links updated:', links);
    } catch (error) {
      console.error('Error setting tool links:', error);
    }
  }

  getToolLinks(): any {
    try {
      return this.data.toolLinks || {};
    } catch (error) {
      console.error('Error getting tool links:', error);
      return {};
    }
  }

  // Redeem codes methods
  addRedeemCode(code: any): void {
    try {
      if (!this.data.redeemCodes) this.data.redeemCodes = [];
      this.data.redeemCodes.push(code);
      this.saveToStorage();
      console.log('Redeem code added:', code);
    } catch (error) {
      console.error('Error adding redeem code:', error);
    }
  }

  getRedeemCodes(): any[] {
    try {
      return this.data.redeemCodes || [];
    } catch (error) {
      console.error('Error getting redeem codes:', error);
      return [];
    }
  }

  deleteRedeemCode(codeId: string): boolean {
    try {
      if (!this.data.redeemCodes) return false;
      
      const index = this.data.redeemCodes.findIndex((code: any) => code.id === codeId);
      if (index !== -1) {
        this.data.redeemCodes.splice(index, 1);
        this.saveToStorage();
        console.log('Redeem code deleted:', codeId);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting redeem code:', error);
      return false;
    }
  }

  // Legacy localStorage interface for backward compatibility
  getItem(key: string): string | null {
    try {
      if (key === 'currentUser') {
        return this.getCurrentUser() ? JSON.stringify(this.getCurrentUser()) : null;
      }
      
      if (key.startsWith('user_')) {
        const userId = key.replace('user_', '');
        const user = this.getUser(userId);
        return user ? JSON.stringify(user) : null;
      }
      
      if (key === 'toolLinks') {
        return JSON.stringify(this.getToolLinks());
      }
      
      if (key === 'redeemCodes') {
        return JSON.stringify(this.getRedeemCodes());
      }
      
      return this.data[key] ? JSON.stringify(this.data[key]) : null;
    } catch (error) {
      console.error('Error getting item:', error);
      return null;
    }
  }

  setItem(key: string, value: string): void {
    try {
      const parsedValue = JSON.parse(value);
      
      if (key === 'currentUser') {
        this.setCurrentUser(parsedValue);
        return;
      }
      
      if (key.startsWith('user_')) {
        const userId = key.replace('user_', '');
        this.createUser(parsedValue);
        return;
      }
      
      if (key === 'toolLinks') {
        this.setToolLinks(parsedValue);
        return;
      }
      
      if (key === 'redeemCodes') {
        this.data.redeemCodes = parsedValue;
        this.saveToStorage();
        return;
      }
      
      this.data[key] = parsedValue;
      this.saveToStorage();
    } catch (error) {
      console.error('Error setting item:', error);
    }
  }

  removeItem(key: string): void {
    try {
      if (key === 'currentUser') {
        this.clearCurrentUser();
        return;
      }
      
      if (key.startsWith('user_')) {
        const userId = key.replace('user_', '');
        this.deleteUser(userId);
        return;
      }
      
      delete this.data[key];
      this.saveToStorage();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }

  clear(): void {
    try {
      this.data = {
        users: {},
        currentUser: null,
        toolLinks: {},
        redeemCodes: [],
        adminSupport: [],
        userSupport: {},
        settings: {}
      };
      this.saveToStorage();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }

  // Get all data for debugging
  getAllData(): any {
    return { ...this.data };
  }

  // Force refresh data
  refresh(): void {
    this.syncFromStorage();
  }

  // Cleanup method
  destroy(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }
}

export const jsonStorage = new JsonStorage();

// Make sure to sync on page visibility change
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    jsonStorage.refresh();
  }
});

// Sync on storage events (cross-tab communication)
window.addEventListener('storage', (e) => {
  if (e.key === 'henz_update_hub_data') {
    jsonStorage.refresh();
  }
});
