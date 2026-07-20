import { useState } from 'react';
import { Play, FileText, BookOpen, Clock, Star, X, ExternalLink, Search } from 'lucide-react';
import { libraryCategories, libraryResources } from '../../../data/mockData';
import PlanetCard from '../../../components/molecules/PlanetCard/PlanetCard';
import TabGroup from '../../../components/molecules/TabGroup/TabGroup';
import SearchBar from '../../../components/atoms/SearchBar/SearchBar';
import Badge from '../../../components/atoms/Badge/Badge';
import styles from './GalaxyLibrary.module.css';

const typeIcon = { video: Play, article: FileText, guide: BookOpen };
const typeColor = { video: 'purple', article: 'info', guide: 'success' };
const levelColor = { Beginner: 'success', Intermediate: 'cyan', Advanced: 'purple' };

export default function GalaxyLibrary() {
  const [categories] = useState(libraryCategories);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Flatten resources with category info for global search
  const allResources = Object.entries(libraryResources).flatMap(([catId, resList]) => {
    const category = categories.find((c) => c.id === catId);
    const categoryName = category ? category.name : catId;
    const categoryColor = category ? category.color : '#7C3AED';
    return resList.map((res) => ({
      ...res,
      categoryId: catId,
      categoryName,
      categoryColor,
    }));
  });

  // Filter categories by sector tabs
  const filteredCategories = categories.filter((cat) => {
    let matchesTab = true;
    if (activeTab === 'frameworks') matchesTab = ['react', 'nextjs'].includes(cat.id);
    else if (activeTab === 'languages') matchesTab = ['javascript', 'typescript'].includes(cat.id);
    else if (activeTab === 'styling') matchesTab = cat.id === 'css';
    else if (activeTab === 'ai') matchesTab = cat.id === 'aiml';
    return matchesTab;
  });

  // Filter resources globally by search query
  const searchedResources = searchQuery.trim()
    ? allResources.filter((res) => {
        const query = searchQuery.toLowerCase();
        return (
          res.title.toLowerCase().includes(query) ||
          res.categoryName.toLowerCase().includes(query) ||
          res.level.toLowerCase().includes(query) ||
          res.type.toLowerCase().includes(query)
        );
      })
    : [];

  const resources = selectedCategory ? (libraryResources[selectedCategory.id] || []) : [];

  return (
    <div className={styles.container}>
      <div className={styles.libraryHeader}>
        <div>
          <p className={styles.subtitle}>Explore resource planets containing archives of academy documents, lessons, and assets.</p>
        </div>
        <div className={styles.toolbar}>
          <SearchBar
            placeholder="Search solar archive..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              // Clear category selection when searching
              if (e.target.value.trim()) setSelectedCategory(null);
            }}
            className={styles.search}
            glass
          />
        </div>
      </div>

      {/* Only show category tab filters and planets if we are NOT searching */}
      {!searchQuery.trim() ? (
        <>
          <TabGroup
            tabs={[
              { id: 'all', label: 'All Sectors' },
              { id: 'languages', label: 'Languages' },
              { id: 'frameworks', label: 'Frameworks' },
              { id: 'styling', label: 'Styling' },
              { id: 'ai', label: 'AI/ML' },
            ]}
            activeTab={activeTab}
            onTabChange={(id) => {
              setActiveTab(id);
              setSelectedCategory(null);
            }}
            className={styles.tabs}
          />

          <div className={styles.grid}>
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                className={`${styles.planetWrap} ${selectedCategory?.id === cat.id ? styles.planetActive : ''}`}
                onClick={() => setSelectedCategory(selectedCategory?.id === cat.id ? null : cat)}
              >
                <PlanetCard category={cat} onClick={() => {}} />
              </div>
            ))}
          </div>

          {/* Selected Planet Category panel */}
          {selectedCategory && (
            <div className={styles.resourcePanel}>
              <div className={styles.panelHeader}>
                <div className={styles.panelTitle}>
                  <div className={styles.panelDot} style={{ background: selectedCategory.color }} />
                  <h3>{selectedCategory.name} Resources</h3>
                  <span className={styles.panelCount}>{resources.length} items</span>
                </div>
                <button className={styles.closeBtn} onClick={() => setSelectedCategory(null)}>
                  <X size={16} />
                </button>
              </div>

              <div className={styles.resourceGrid}>
                {resources.map((res) => {
                  const Icon = typeIcon[res.type] || FileText;
                  return (
                    <div
                      key={res.id}
                      className={styles.resourceCard}
                      onClick={() => window.open(res.url, '_blank')}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className={styles.resourceIcon} style={{ color: selectedCategory.color }}>
                        <Icon size={20} />
                      </div>
                      <div className={styles.resourceInfo}>
                        <div className={styles.resourceTitle}>{res.title}</div>
                        <div className={styles.resourceMeta}>
                          <span className={styles.metaItem}>
                            <Clock size={11} />
                            {res.duration}
                          </span>
                          <Badge variant={typeColor[res.type]} size="xs">{res.type}</Badge>
                          <Badge variant={levelColor[res.level]} size="xs">{res.level}</Badge>
                        </div>
                      </div>
                      <button
                        className={styles.resourceBtn}
                        title="Open resource"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(res.url, '_blank');
                        }}
                      >
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Featured items */}
          {!selectedCategory && (
            <div className={styles.featuredSection}>
              <div className={styles.featuredHeader}>
                <Star size={16} className={styles.starIcon} />
                <h3 className={styles.featuredTitle}>Featured This Week</h3>
                <span className={styles.featuredSub}>Click any planet above to explore its resources</span>
              </div>
              <div className={styles.featuredGrid}>
                {[
                  { title: 'React 19 — What\'s New', category: 'React', type: 'article', duration: '8 min read', color: '#F97316', url: 'https://react.dev/blog/2024/12/05/react-19' },
                  { title: 'Async/Await Mastery', category: 'JavaScript', type: 'article', duration: '15 min read', color: '#EAB308', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises' },
                  { title: 'Next.js 14 App Router', category: 'Next.js', type: 'article', duration: '22 min read', color: '#6366F1', url: 'https://nextjs.org/docs' },
                  { title: 'Neural Networks Explained', category: 'AI / ML', type: 'article', duration: '18 min read', color: '#A855F7', url: 'https://www.youtube.com/watch?v=aircAruvnKk' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={styles.featuredCard}
                    onClick={() => window.open(item.url, '_blank')}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className={styles.featuredAccent} style={{ background: item.color }} />
                    <div className={styles.featuredContent}>
                      <Badge variant={typeColor[item.type]} size="xs">{item.type}</Badge>
                      <div className={styles.featuredItemTitle}>{item.title}</div>
                      <div className={styles.featuredItemMeta}>
                        <span style={{ color: item.color, fontWeight: 600 }}>{item.category}</span>
                        <span><Clock size={11} /> {item.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        /* Global Search Results Panel */
        <div className={styles.resourcePanel}>
          <div className={styles.panelHeader}>
            <div className={styles.panelTitle}>
              <Search size={16} style={{ color: 'var(--neon-cyan)', marginRight: '8px' }} />
              <h3>Search Results for "{searchQuery}"</h3>
              <span className={styles.panelCount}>{searchedResources.length} items found</span>
            </div>
            <button className={styles.closeBtn} onClick={() => setSearchQuery('')}>
              <X size={16} />
            </button>
          </div>

          {searchedResources.length > 0 ? (
            <div className={styles.resourceGrid}>
              {searchedResources.map((res) => {
                const Icon = typeIcon[res.type] || FileText;
                return (
                  <div
                    key={res.id}
                    className={styles.resourceCard}
                    onClick={() => window.open(res.url, '_blank')}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className={styles.resourceIcon} style={{ color: res.categoryColor }}>
                      <Icon size={20} />
                    </div>
                    <div className={styles.resourceInfo}>
                      <div className={styles.resourceTitle}>{res.title}</div>
                      <div className={styles.resourceMeta}>
                        <span className={styles.metaItem}>
                          <Clock size={11} />
                          {res.duration}
                        </span>
                        <Badge variant={typeColor[res.type]} size="xs">{res.type}</Badge>
                        <Badge variant={levelColor[res.level]} size="xs">{res.level}</Badge>
                        <span className={styles.searchCategoryTag} style={{ color: res.categoryColor, fontSize: 'var(--fs-xs)', fontWeight: '600' }}>
                          {res.categoryName}
                        </span>
                      </div>
                    </div>
                    <button
                      className={styles.resourceBtn}
                      title="Open resource"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(res.url, '_blank');
                      }}
                    >
                      <ExternalLink size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.emptySearch}>
              <h3>No archives matched your search criteria</h3>
              <p>Try searching for core topics like "React", "CSS", "Variables", "Generics", or "Machine Learning".</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
