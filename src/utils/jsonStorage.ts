
// JSON Storage utility to replace localStorage for published sites
class JsonStorage {
  private data: Record<string, any> = {};
  private storageKey = 'henz_update_hub_data';

  constructor() {
    this.loadData();
  }

  private loadData() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.data = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading JSON data:', error);
      this.data = {};
    }
  }

  private saveData() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    } catch (error) {
      console.error('Error saving JSON data:', error);
    }
  }

  getItem(key: string): string | null {
    return this.data[key] || null;
  }

  setItem(key: string, value: string): void {
    this.data[key] = value;
    this.saveData();
  }

  removeItem(key: string): void {
    delete this.data[key];
    this.saveData();
  }

  clear(): void {
    this.data = {};
    this.saveData();
  }

  getAllData(): Record<string, any> {
    return { ...this.data };
  }
}

export const jsonStorage = new JsonStorage();
