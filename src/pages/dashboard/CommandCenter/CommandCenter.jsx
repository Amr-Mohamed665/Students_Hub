import { useState, useEffect } from 'react';
import { Settings, Bell, Shield, Palette, Database, Save, Trash2, Key, Download, HardDrive, ShieldAlert, ChevronRight, ArrowLeft } from 'lucide-react';
import Button from '../../../components/atoms/Button/Button';
import styles from './CommandCenter.module.css';

export default function CommandCenter() {
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  });
  const [activeTab, setActiveTab] = useState(() => {
    return typeof window !== 'undefined' && window.innerWidth < 768 ? 'menu' : 'general';
  });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile((prevIsMobile) => {
        if (prevIsMobile !== mobile) {
          if (mobile) {
            setActiveTab('menu');
          } else {
            setActiveTab('general');
          }
        }
        return mobile;
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const storedConfig = JSON.parse(localStorage.getItem('students_hub_config') || '{}');

  const [particleBgs, setParticleBgs] = useState(storedConfig.particleBgs !== undefined ? storedConfig.particleBgs : true);
  const [soundEffects, setSoundEffects] = useState(storedConfig.soundEffects !== undefined ? storedConfig.soundEffects : false);
  const [gpuAccelerate, setGpuAccelerate] = useState(storedConfig.gpuAccelerate !== undefined ? storedConfig.gpuAccelerate : true);
  const [telemetrySync, setTelemetrySync] = useState(storedConfig.telemetrySync !== undefined ? storedConfig.telemetrySync : true);

  const [criticalAlerts, setCriticalAlerts] = useState(storedConfig.criticalAlerts !== undefined ? storedConfig.criticalAlerts : true);
  const [academicAlerts, setAcademicAlerts] = useState(storedConfig.academicAlerts !== undefined ? storedConfig.academicAlerts : true);
  const [coachAlerts, setCoachAlerts] = useState(storedConfig.coachAlerts !== undefined ? storedConfig.coachAlerts : true);
  const [dailyReminders, setDailyReminders] = useState(storedConfig.dailyReminders !== undefined ? storedConfig.dailyReminders : false);

  const [clearanceCode, setClearanceCode] = useState(storedConfig.clearanceCode !== undefined ? storedConfig.clearanceCode : 'CADET-744-AMR');
  const [encryptionKey, setEncryptionKey] = useState(storedConfig.encryptionKey !== undefined ? storedConfig.encryptionKey : 'STUDENT-HUB-SECURE-KEY-2026');
  const [twoFactor, setTwoFactor] = useState(storedConfig.twoFactor !== undefined ? storedConfig.twoFactor : false);

  const [themePreset, setThemePreset] = useState(storedConfig.themePreset !== undefined ? storedConfig.themePreset : 'deep-cosmos');
  const [uiAnimations, setUiAnimations] = useState(storedConfig.uiAnimations !== undefined ? storedConfig.uiAnimations : true);

  const handleSave = () => {
    const config = {
      particleBgs,
      soundEffects,
      gpuAccelerate,
      telemetrySync,
      criticalAlerts,
      academicAlerts,
      coachAlerts,
      dailyReminders,
      clearanceCode,
      encryptionKey,
      twoFactor,
      themePreset,
      uiAnimations,
    };
    localStorage.setItem('students_hub_config', JSON.stringify(config));
    alert('Applying changes to operational system configuration matrix. Settings saved successfully!');
  };

  const menuTabs = [
    { id: 'general', label: 'General Preferences', icon: Settings, desc: 'Hardware acceleration, sounds, transceiver sync', colorClass: styles.iconPurple },
    { id: 'notifications', label: 'Diagnostic Alerts', icon: Bell, desc: 'Critical malfunctions, academy milestones, coach signals', colorClass: styles.iconOrange },
    { id: 'security', label: 'Clearance Security', icon: Shield, desc: 'Gateway clearance codes, keys, authorization setup', colorClass: styles.iconBlue },
    { id: 'appearance', label: 'Visual Interface', icon: Palette, desc: 'Atmospheric HUD templates, stars particles, animations', colorClass: styles.iconCyan },
    { id: 'data', label: 'Telemetry & Cache', icon: Database, desc: 'Log downloads, storage tracking, cache purge controls', colorClass: styles.iconRed },
  ];

  // Render Mobile top-level menu list
  if (isMobile && activeTab === 'menu') {
    return (
      <div className={styles.container}>
        <div className={styles.mobileMenuHeader}>
          <p className={styles.mobileSubtitle}>Manage student core clearance parameter modules</p>
        </div>
        <div className={styles.mobileMenuList}>
          {menuTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={styles.mobileMenuRow}
                onClick={() => setActiveTab(tab.id)}
              >
                <div className={`${styles.mobileMenuIcon} ${tab.colorClass}`}>
                  <Icon size={18} />
                </div>
                <div className={styles.mobileMenuInfo}>
                  <h4 className={styles.mobileMenuLabel}>{tab.label}</h4>
                  <p className={styles.mobileMenuDesc}>{tab.desc}</p>
                </div>
                <ChevronRight size={16} className={styles.mobileChevron} />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Render Mobile Active Panel view with Back Button
  const renderMobilePanel = () => {
    return (
      <div className={styles.container}>
        <button className={styles.mobileBackButton} onClick={() => setActiveTab('menu')}>
          <ArrowLeft size={16} />
          <span>Back to Settings</span>
        </button>

        <div className={styles.settingsCard}>
          {renderActivePanel()}
          <div className={styles.footer}>
            <Button variant="primary" icon={<Save size={16} />} onClick={handleSave}>
              Apply Parameters
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderActivePanel = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className={styles.section}>
            <h3 className={styles.secTitle}>General Operational Configs</h3>
            <div className={styles.controlsList}>
              <div className={styles.controlRow}>
                <div className={styles.controlInfo}>
                  <h4 className={styles.controlName}>Hardware Acceleration</h4>
                  <p className={styles.controlDesc}>Utilize local system GPU parameters to render orbital models and interactive chart curves.</p>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" checked={gpuAccelerate} onChange={() => setGpuAccelerate(!gpuAccelerate)} />
                  <span className={styles.slider} />
                </label>
              </div>

              <div className={styles.controlRow}>
                <div className={styles.controlInfo}>
                  <h4 className={styles.controlName}>Transceiver Audio Signals</h4>
                  <p className={styles.controlDesc}>Enable localized space station audio chime signals for incoming system alerts and milestones.</p>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" checked={soundEffects} onChange={() => setSoundEffects(!soundEffects)} />
                  <span className={styles.slider} />
                </label>
              </div>

              <div className={styles.controlRow}>
                <div className={styles.controlInfo}>
                  <h4 className={styles.controlName}>Auto Telemetry Sync</h4>
                  <p className={styles.controlDesc}>Periodically upload cognitive growth telemetry metrics to the main academy server banks.</p>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" checked={telemetrySync} onChange={() => setTelemetrySync(!telemetrySync)} />
                  <span className={styles.slider} />
                </label>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className={styles.section}>
            <h3 className={styles.secTitle}>Diagnostic Alerts Configuration</h3>
            <div className={styles.controlsList}>
              <div className={styles.controlRow}>
                <div className={styles.controlInfo}>
                  <h4 className={styles.controlName}>Critical System Malfunctions</h4>
                  <p className={styles.controlDesc}>Immediate warning notifications regarding simulation connection speed drops or memory errors.</p>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" checked={criticalAlerts} onChange={() => setCriticalAlerts(!criticalAlerts)} />
                  <span className={styles.slider} />
                </label>
              </div>

              <div className={styles.controlRow}>
                <div className={styles.controlInfo}>
                  <h4 className={styles.controlName}>Academic Objectives Milestones</h4>
                  <p className={styles.controlDesc}>Notify when educational assignments are near deadline or when courses are completed.</p>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" checked={academicAlerts} onChange={() => setAcademicAlerts(!academicAlerts)} />
                  <span className={styles.slider} />
                </label>
              </div>

              <div className={styles.controlRow}>
                <div className={styles.controlInfo}>
                  <h4 className={styles.controlName}>AI Study Coach Recommendations</h4>
                  <p className={styles.controlDesc}>Allow your AI Coach to send personalized suggestions based on your study patterns.</p>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" checked={coachAlerts} onChange={() => setCoachAlerts(!coachAlerts)} />
                  <span className={styles.slider} />
                </label>
              </div>

              <div className={styles.controlRow}>
                <div className={styles.controlInfo}>
                  <h4 className={styles.controlName}>Daily Flight Reminders</h4>
                  <p className={styles.controlDesc}>Send morning notification alerts to remind you of active daily streaks.</p>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" checked={dailyReminders} onChange={() => setDailyReminders(!dailyReminders)} />
                  <span className={styles.slider} />
                </label>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className={styles.section}>
            <h3 className={styles.secTitle}>Clearance Security Protocols</h3>
            <div className={styles.securityForm}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Academy Clearance Code</label>
                <div className={styles.inputWrapper}>
                  <Key size={16} className={styles.inputIcon} />
                  <input
                    type="text"
                    className={styles.textInput}
                    value={clearanceCode}
                    onChange={(e) => setClearanceCode(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Transceiver Encryption Key</label>
                <div className={styles.inputWrapper}>
                  <ShieldAlert size={16} className={styles.inputIcon} />
                  <input
                    type="password"
                    className={styles.textInput}
                    value={encryptionKey}
                    onChange={(e) => setEncryptionKey(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.controlRow} style={{ borderBottom: 'none', paddingBottom: 0 }}>
                <div className={styles.controlInfo}>
                  <h4 className={styles.controlName}>Two-Factor Gateway Authorization</h4>
                  <p className={styles.controlDesc}>Require a biometric or token key connection confirmation on each new terminal launch.</p>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
                  <span className={styles.slider} />
                </label>
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className={styles.section}>
            <h3 className={styles.secTitle}>Visual Interface Preset Options</h3>
            <div className={styles.controlsList}>
              <div className={styles.controlRow}>
                <div className={styles.controlInfo}>
                  <h4 className={styles.controlName}>Background Star Particles</h4>
                  <p className={styles.controlDesc}>Render real-time floating stardust particle tracks in the dashboard window background.</p>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" checked={particleBgs} onChange={() => setParticleBgs(!particleBgs)} />
                  <span className={styles.slider} />
                </label>
              </div>

              <div className={styles.controlRow}>
                <div className={styles.controlInfo}>
                  <h4 className={styles.controlName}>Cosmic UI Animations</h4>
                  <p className={styles.controlDesc}>Smooth transitions, pulse waves, and rotating planetary animations.</p>
                </div>
                <label className={styles.switch}>
                  <input type="checkbox" checked={uiAnimations} onChange={() => setUiAnimations(!uiAnimations)} />
                  <span className={styles.slider} />
                </label>
              </div>

              <div className={styles.controlRow} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
                <div>
                  <h4 className={styles.controlName}>Visual Color System Theme</h4>
                  <p className={styles.controlDesc}>Select the atmospheric color template for your dashboard HUD panels.</p>
                </div>
                <div className={styles.themeSelector}>
                  {[
                    { id: 'deep-cosmos', label: 'Deep Cosmos', color: '#0B1120' },
                    { id: 'nebula-purple', label: 'Nebula Purple', color: '#1E1B4B' },
                    { id: 'supernova-cyan', label: 'Supernova Cyan', color: '#062F4F' },
                  ].map((theme) => (
                    <button
                      key={theme.id}
                      className={`${styles.themeOption} ${themePreset === theme.id ? styles.activeTheme : ''}`}
                      onClick={() => setThemePreset(theme.id)}
                    >
                      <span className={styles.themeColorDot} style={{ background: theme.color }} />
                      <span>{theme.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'data':
        return (
          <div className={styles.section}>
            <h3 className={styles.secTitle}>Telemetry Cache Control</h3>
            <div className={styles.controlsList}>
              <div className={styles.dataStorage}>
                <div className={styles.storageHeader}>
                  <div className={styles.storageTitle}>
                    <HardDrive size={16} />
                    <span>Academy Data Storage Allocations</span>
                  </div>
                  <span className={styles.storageVal}>4.2 MB / 100 MB</span>
                </div>
                <div className={styles.storageTrack}>
                  <div className={styles.storageProgress} style={{ width: '4.2%' }} />
                </div>
              </div>

              <div className={styles.controlRow}>
                <div className={styles.controlInfo}>
                  <h4 className={styles.controlName}>Download Logs & Telemetry</h4>
                  <p className={styles.controlDesc}>Extract all simulation statistics, logs history, and study progress into a JSON file archive.</p>
                </div>
                <Button variant="secondary" size="sm" icon={<Download size={14} />} onClick={() => alert('Compiling telemetry database... Archive download started.')}>
                  Download DB
                </Button>
              </div>

              <div className={styles.controlRow} style={{ borderBottom: 'none' }}>
                <div className={styles.controlInfo}>
                  <h4 className={styles.controlName} style={{ color: 'var(--error)' }}>Purge Local Memory Bank</h4>
                  <p className={styles.controlDesc}>Resets all local caching configurations and simulation metrics. This action is irreversible.</p>
                </div>
                <Button variant="danger" size="sm" icon={<Trash2 size={14} />} onClick={() => alert('Wiping local cache records...')}>
                  Purge Bank
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isMobile) {
    return renderMobilePanel();
  }

  return (
    <div className={styles.container}>
      <div className={styles.layoutGrid}>

        <div className={styles.leftCol}>
          <div className={styles.sideMenu}>
            {menuTabs.map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  className={`${styles.menuBtn} ${isActive ? styles.activeMenuBtn : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <IconComp size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.settingsCard}>
            {renderActivePanel()}
            <div className={styles.footer}>
              <Button variant="primary" icon={<Save size={16} />} onClick={handleSave}>
                Apply Parameters
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
