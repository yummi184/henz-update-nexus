
// JSON Storage utility for cross-device data persistence
class JsonStorage {
  private data: Record<string, any> = {};
  private storageKey = 'henz_update_hub_data';
  private isInitialized = false;

  constructor() {
    this.initializeStorage();
  }

  private initializeStorage() {
    try {
      // Try to load from localStorage first (for backward compatibility)
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.data = JSON.parse(stored);
      } else {
        // Initialize with empty data structure
        this.data = {
          users: {},
          currentUser: null,
          toolLinks: {},
          redeemCodes: [],
          adminSupport: [],
          userSupport: {}
        };
      }
      this.isInitialized = true;
      this.saveData();
    } catch (error) {
      console.error('Error initializing JSON data:', error);
      this.data = {
        users: {},
        currentUser: null,
        toolLinks: {},
        redeemCodes: [],
        adminSupport: [],
        userSupport: {}
      };
      this.isInitialized = true;
    }
  }

  private saveData() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
      // Also save to a global variable for cross-tab communication
      (window as any).henzUpdateHubData = this.data;
    } catch (error) {
      console.error('Error saving JSON data:', error);
    }
  }

  private ensureInitialized() {
    if (!this.isInitialized) {
      this.initializeStorage();
    }
  }

  getItem(key: string): string | null {
    this.ensureInitialized();
    
    // Handle special keys that map to our data structure
    if (key === 'currentUser') {
      return this.data.currentUser ? JSON.stringify(this.data.currentUser) : null;
    }
    
    if (key.startsWith('user_')) {
      const userId = key.replace('user_', '');
      return this.data.users[userId] ? JSON.stringify(this.data.users[userId]) : null;
    }
    
    if (key === 'toolLinks') {
      return JSON.stringify(this.data.toolLinks || {});
    }
    
    if (key === 'redeemCodes') {
      return JSON.stringify(this.data.redeemCodes || []);
    }
    
    if (key === 'adminSupport') {
      return JSON.stringify(this.data.adminSupport || []);
    }
    
    if (key.startsWith('support_')) {
      const userId = key.replace('support_', '');
      return JSON.stringify(this.data.userSupport[userId] || []);
    }
    
    if (key.startsWith('redeemed_')) {
      const userId = key.replace('redeemed_', '');
      return JSON.stringify(this.data.users[userId]?.redeemedCodes || []);
    }
    
    // Fallback for any other keys
    return this.data[key] || null;
  }

  setItem(key: string, value: string): void {
    this.ensureInitialized();
    
    try {
      const parsedValue = JSON.parse(value);
      
      // Handle special keys that map to our data structure
      if (key === 'currentUser') {
        this.data.currentUser = parsedValue;
      } else if (key.startsWith('user_')) {
        const userId = key.replace('user_', '');
        if (!this.data.users) this.data.users = {};
        this.data.users[userId] = parsedValue;
      } else if (key === 'toolLinks') {
        this.data.toolLinks = parsedValue;
      } else if (key === 'redeemCodes') {
        this.data.redeemCodes = parsedValue;
      } else if (key === 'adminSupport') {
        this.data.adminSupport = parsedValue;
      } else if (key.startsWith('support_')) {
        const userId = key.replace('support_', '');
        if (!this.data.userSupport) this.data.userSupport = {};
        this.data.userSupport[userId] = parsedValue;
      } else if (key.startsWith('redeemed_')) {
        const userId = key.replace('redeemed_', '');
        if (!this.data.users) this.data.users = {};
        if (!this.data.users[userId]) this.data.users[userId] = {};
        this.data.users[userId].redeemedCodes = parsedValue;
      } else {
        // Fallback for any other keys
        this.data[key] = parsedValue;
      }
      
      this.saveData();
    } catch (error) {
      console.error('Error setting JSON data:', error);
      // Fallback to storing as string
      this.data[key] = value;
      this.saveData();
    }
  }

  removeItem(key: string): void {
    this.ensureInitialized();
    
    if (key === 'currentUser') {
      this.data.currentUser = null;
    } else if (key.startsWith('user_')) {
      const userId = key.replace('user_', '');
      if (this.data.users) {
        delete this.data.users[userId];
      }
    } else if (key.startsWith('support_')) {
      const userId = key.replace('support_', '');
      if (this.data.userSupport) {
        delete this.data.userSupport[userId];
      }
    } else if (key.startsWith('redeemed_')) {
      const userId = key.replace('redeemed_', '');
      if (this.data.users && this.data.users[userId]) {
        delete this.data.users[userId].redeemedCodes;
      }
    } else {
      delete this.data[key];
    }
    
    this.saveData();
  }

  clear(): void {
    this.data = {
      users: {},
      currentUser: null,
      toolLinks: {},
      redeemCodes: [],
      adminSupport: [],
      userSupport: {}
    };
    this.saveData();
  }

  getAllData(): Record<string, any> {
    this.ensureInitialized();
    return { ...this.data };
  }

  // Method to get all users for admin panel
  getAllUsers(): any[] {
    this.ensureInitialized();
    if (!this.data.users) return [];
    return Object.values(this.data.users);
  }

  // Method to refresh data from storage (for sync across tabs)
  refresh(): void {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.data = JSON.parse(stored);
      }
      // Also check global variable
      if ((window as any).henzUpdateHubData) {
        this.data = (window as any).henzUpdateHubData;
        this.saveData();
      }
    } catch (error) {
      console.error('Error refreshing JSON data:', error);
    }
  }
}

export const jsonStorage = new JsonStorage();

// Auto-refresh data every 2 seconds to sync across tabs/devices
setInterval(() => {
  jsonStorage.refresh();
}, 2000);
