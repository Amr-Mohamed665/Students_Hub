import styles from './PlanetCard.module.css';

const sphereClassMap = {
  react: styles.reactSphere,
  javascript: styles.jsSphere,
  css: styles.cssSphere,
  nextjs: styles.nextSphere,
  typescript: styles.tsSphere,
  aiml: styles.aimlSphere,
};

export default function PlanetCard({ category, onClick }) {
  const { name, resources, color, planet } = category;

  const sphereClass = sphereClassMap[planet] || styles.reactSphere;

  return (
    <div
      className={styles.card}
      onClick={() => onClick && onClick(category)}
      style={{ '--planet-color': color }}
    >
      <div className={styles.sphereContainer}>
        
        <div className={styles.atmosphere} />
        
        
        <div className={`${styles.sphere} ${sphereClass}`}>
          
          <div className={styles.texture} />
        </div>
      </div>
      
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.resources}>{resources} Resources</p>
      </div>
    </div>
  );
}
