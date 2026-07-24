// src/pages/dashboard/StudentProfile/EditProfileModal.jsx
import { useEffect, useRef, useState } from "react";
import styles from "./ProfilePage.module.css";

export default function EditProfileModal({
  isOpen,
  student,
  learningTrackOptions,
  currentPhaseOptions,
  onCancel,
  onSave,
}) {
  const [formValues, setFormValues] = useState(student);
  const fileInputRef = useRef(null);

  // Re-sync the form whenever the modal is (re)opened so it always
  // reflects the latest saved profile rather than stale local state.
  useEffect(() => {
    if (isOpen) {
      setFormValues(student);
    }
  }, [isOpen, student]);

  if (!isOpen) return null;

  const updateField = (field) => (event) => {
    setFormValues((previous) => ({ ...previous, [field]: event.target.value }));
  };

  const handleAvatarButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormValues((previous) => ({ ...previous, avatarUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formValues);
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div
        className={styles.modalCard}
        role="dialog"
        aria-modal="true"
        aria-labelledby="editProfileTitle"
      >
        <div className={styles.modalHeader}>
          <h3 id="editProfileTitle">Edit Profile</h3>
          <button
            type="button"
            className={styles.modalCloseButton}
            onClick={onCancel}
            aria-label="Close edit profile modal"
          >
            ✕
          </button>
        </div>

        <form className={styles.modalForm} onSubmit={handleSubmit}>
          <div className={styles.avatarEditRow}>
            <div className={styles.avatarEditPreview}>
              <img src={formValues.avatarUrl} alt={formValues.fullName} />
            </div>
            <div>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={handleAvatarButtonClick}
              >
                Change photo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className={styles.hiddenFileInput}
                onChange={handleAvatarFileChange}
              />
            </div>
          </div>

          <div className={styles.formGrid}>
            <label className={styles.formField}>
              <span>Full Name</span>
              <input
                type="text"
                value={formValues.fullName}
                onChange={updateField("fullName")}
                required
              />
            </label>

            <label className={styles.formField}>
              <span>Email</span>
              <input
                type="email"
                value={formValues.email}
                onChange={updateField("email")}
                required
              />
            </label>

            <label className={styles.formField}>
              <span>Phone Number</span>
              <input
                type="tel"
                value={formValues.phone}
                onChange={updateField("phone")}
              />
            </label>

            <label className={styles.formField}>
              <span>Learning Track</span>
              <select
                value={formValues.learningTrack}
                onChange={updateField("learningTrack")}
              >
                {learningTrackOptions.map((track) => (
                  <option key={track} value={track}>
                    {track}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.formField}>
              <span>Current Phase</span>
              <select
                value={formValues.currentPhase}
                onChange={updateField("currentPhase")}
              >
                {currentPhaseOptions.map((phase) => (
                  <option key={phase} value={phase}>
                    {phase}
                  </option>
                ))}
              </select>
            </label>

            <label className={`${styles.formField} ${styles.formFieldFull}`}>
              <span>Bio</span>
              <textarea
                value={formValues.bio}
                onChange={updateField("bio")}
                rows={4}
              />
            </label>
          </div>

          <div className={styles.modalActions}>
            <button type="button" className={styles.secondaryButton} onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className={styles.primaryButton}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
