import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../../../components/atoms/Modal/Modal';
import styles from './EditProfileModal.module.css';

export default function EditProfileModal({ isOpen, onClose, user, onSave }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '+20 100 123 4567',
      learningTrack: user?.learningTrack || 'Frontend Development',
      bio: user?.bio || '',
      skills: user?.skills ? (Array.isArray(user.skills) ? user.skills.join(', ') : user.skills) : 'React, TypeScript, CSS, AI Tools',
    }
  });

  const [avatarBase64, setAvatarBase64] = useState(user?.avatar || null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    const formattedSkills = data.skills
      ? data.skills.split(',').map(s => s.trim()).filter(Boolean)
      : [];

    onSave({
      name: data.name,
      email: data.email,
      phone: data.phone,
      learningTrack: data.learningTrack,
      bio: data.bio,
      skills: formattedSkills,
      avatar: avatarBase64,
      title: `${data.learningTrack} Learner`,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Profile Details"
      maxWidth="500px"
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.avatarUploadGroup}>
          <label className={styles.formLabel}>Profile Picture</label>
          <div className={styles.avatarPreviewRow}>
            {avatarBase64 ? (
              <img src={avatarBase64} alt="Preview" className={styles.avatarPreview} />
            ) : (
              <div className={styles.avatarPlaceholder}>
                {user?.name ? user.name.charAt(0) : 'U'}
              </div>
            )}
            <div className={styles.uploadBtnWrapper}>
              <button type="button" className={styles.uploadBtn}>Upload New Photo</button>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.fileInput}
              />
            </div>
            {avatarBase64 && (
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => setAvatarBase64(null)}
              >
                Remove
              </button>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Full Name *</label>
          <input
            type="text"
            className={`${styles.formInput} ${errors.name ? styles.inputError : ''}`}
            placeholder="e.g. Amr Mohamed Ali"
            {...register('name', { required: 'Full name is required' })}
          />
          {errors.name && <span className={styles.errorText}>{errors.name.message}</span>}
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email *</label>
            <input
              type="email"
              className={`${styles.formInput} ${errors.email ? styles.inputError : ''}`}
              placeholder="e.g. amr.mohamed@example.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
            />
            {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Phone Number</label>
            <input
              type="tel"
              className={styles.formInput}
              placeholder="e.g. +20 100 123 4567"
              {...register('phone')}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Learning Track</label>
          <select className={styles.formSelect} {...register('learningTrack')}>
            <option value="Frontend Development">Frontend Development</option>
            <option value="Backend Development">Backend Development</option>
            <option value="Fullstack Development">Fullstack Development</option>
            <option value="AI & Machine Learning">AI & Machine Learning</option>
            <option value="Data Science">Data Science</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Bio</label>
          <textarea
            className={styles.formTextarea}
            placeholder="Briefly describe yourself and your learning goals..."
            rows={3}
            {...register('bio')}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Skills (comma separated)</label>
          <input
            type="text"
            className={styles.formInput}
            placeholder="React, TypeScript, CSS, Next.js"
            {...register('skills')}
          />
        </div>

        <div className={styles.formActions}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={styles.submitBtn}>
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
}
