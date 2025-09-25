interface InstitutionSettings {
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

interface AdminRole {
  id: string;
  name: string;
  email: string;
  role: 'super-admin' | 'moderator';
  createdAt: string;
}

class SettingsService {
  private readonly INSTITUTION_KEY = 'mitra-institution-settings';
  private readonly ADMINS_KEY = 'mitra-admins';

  constructor() {
    this.initializeSettings();
  }

  private initializeSettings() {
    // Initialize institution settings
    if (!localStorage.getItem(this.INSTITUTION_KEY)) {
      const defaultSettings: InstitutionSettings = {
        name: 'University of Excellence',
        logo: '',
        primaryColor: '#3B82F6',
        secondaryColor: '#8B5CF6',
        accentColor: '#10B981'
      };
      localStorage.setItem(this.INSTITUTION_KEY, JSON.stringify(defaultSettings));
    }

    // Initialize admin list
    if (!localStorage.getItem(this.ADMINS_KEY)) {
      const defaultAdmins: AdminRole[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'admin@university.edu',
          role: 'super-admin',
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem(this.ADMINS_KEY, JSON.stringify(defaultAdmins));
    }
  }

  getInstitutionSettings(): InstitutionSettings {
    const data = localStorage.getItem(this.INSTITUTION_KEY);
    return data ? JSON.parse(data) : this.getDefaultSettings();
  }

  private getDefaultSettings(): InstitutionSettings {
    return {
      name: 'University of Excellence',
      logo: '',
      primaryColor: '#3B82F6',
      secondaryColor: '#8B5CF6',
      accentColor: '#10B981'
    };
  }

  updateInstitutionSettings(settings: InstitutionSettings): void {
    localStorage.setItem(this.INSTITUTION_KEY, JSON.stringify(settings));
  }

  getAdmins(): AdminRole[] {
    const data = localStorage.getItem(this.ADMINS_KEY);
    return data ? JSON.parse(data) : [];
  }

  addAdmin(admin: AdminRole): void {
    const admins = this.getAdmins();
    admins.push(admin);
    localStorage.setItem(this.ADMINS_KEY, JSON.stringify(admins));
  }

  removeAdmin(id: string): void {
    const admins = this.getAdmins();
    const filtered = admins.filter(a => a.id !== id);
    localStorage.setItem(this.ADMINS_KEY, JSON.stringify(filtered));
  }

  updateAdminRole(id: string, role: 'super-admin' | 'moderator'): void {
    const admins = this.getAdmins();
    const index = admins.findIndex(a => a.id === id);
    if (index !== -1) {
      admins[index].role = role;
      localStorage.setItem(this.ADMINS_KEY, JSON.stringify(admins));
    }
  }

  // Reset all application data
  resetAllData(): void {
    const keysToKeep = ['theme-preference']; // Keep theme preference
    const allKeys = Object.keys(localStorage);
    
    allKeys.forEach(key => {
      if (!keysToKeep.includes(key) && key.startsWith('mitra-')) {
        localStorage.removeItem(key);
      }
    });

    // Reinitialize with defaults
    this.initializeSettings();
  }

  // Export settings for backup
  exportSettings(): string {
    const settings = {
      institution: this.getInstitutionSettings(),
      admins: this.getAdmins(),
      timestamp: new Date().toISOString()
    };
    return JSON.stringify(settings, null, 2);
  }

  // Import settings from backup
  importSettings(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      if (data.institution) {
        this.updateInstitutionSettings(data.institution);
      }
      if (data.admins) {
        localStorage.setItem(this.ADMINS_KEY, JSON.stringify(data.admins));
      }
      return true;
    } catch (error) {
      console.error('Failed to import settings:', error);
      return false;
    }
  }
}

export const settingsService = new SettingsService();