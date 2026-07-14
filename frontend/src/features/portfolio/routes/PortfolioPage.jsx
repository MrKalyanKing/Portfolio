import { useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { BookCallModal } from '../../../shared/components/BookCallModal';
import { portfolioConfig } from '../../../config/portfolioData';
import { API_BASE } from '../../../config/api';
import { useReveal } from '../../../hooks/useReveal';
import { BackgroundGlow } from '../../../shared/components/BackgroundGlow';
import { Navigation } from '../../../shared/components/Navigation';
import { HeroSection } from '../../home/components/HeroSection';
import { ServicesSection } from '../../home/components/ServicesSection';
import { FlagshipSection } from '../../home/components/FlagshipSection';
import { ApproachSection } from '../../home/components/ApproachSection';
import { ProofSection } from '../../home/components/ProofSection';
import { AboutSection } from '../../home/components/AboutSection';
import { WorkExperienceSection } from '../../work/components/WorkExperienceSection';
import { StackSection } from '../../home/components/StackSection';
import { ProjectsSection } from '../../projects/components/ProjectsSection';
import { ContactSection } from '../../home/components/ContactSection';

// Explain a failed section fetch in plain words. The section still renders
// the bundled fallback content; this text is shown in a small inline notice.
const describeFetchError = (error, what) => {
  if (error instanceof TypeError && /fetch|network/i.test(error.message)) {
    return `Couldn't reach the portfolio server to load the latest ${what} — showing a saved copy instead.`;
  }
  const reason = error?.message ? ` (${error.message})` : '';
  return `The latest ${what} couldn't be loaded${reason} — showing a saved copy instead.`;
};

// Map raw backend documents to the shapes the sections render. Shared by the
// initial REST fetch and the live socket updates so both stay identical.
const mapWork = (work) =>
  work.map((item) => ({
    id: item._id,
    role: item.role || 'Role',
    company: item.company || 'Company',
    location: item.location || '',
    date: item.duration || '',
    points: Array.isArray(item.description) && item.description.length > 0
      ? item.description
      : item.description ? [item.description] : [],
    tags: Array.isArray(item.techStack) ? item.techStack : []
  }));

const mapProjects = (projects) =>
  projects.map((item) => ({
    id: item._id,
    title: item.title,
    desc: item.description,
    // Handle both absolute (ImageKit) and locally uploaded image paths
    image: item.image?.startsWith('http') ? item.image : `${API_BASE}/uploads/${item.image}`,
    tags: Array.isArray(item.tags) ? item.tags.map(t => typeof t === 'object' ? t.name : t) : [],
    github: item.githublink,
    live: item.previewlink,
    kind: item.kind || 'Project'
  }));

export default function PortfolioPage() {
  const [data, setData] = useState(portfolioConfig);
  const [loadingWork, setLoadingWork] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [workError, setWorkError] = useState(null);
  const [projectsError, setProjectsError] = useState(null);
  const [bookCallOpen, setBookCallOpen] = useState(false);

  const openBookCall = useCallback(() => setBookCallOpen(true), []);
  const closeBookCall = useCallback(() => setBookCallOpen(false), []);

  useReveal(data.theme.reduceMotion);

  useEffect(() => {
    // Inject accent color into CSS variables
    document.documentElement.style.setProperty('--accent', data.theme.accent);
  }, [data.theme.accent]);

  useEffect(() => {
    // Fetch work experience from backend
    const fetchWorkExperience = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/show/work`);
        const result = await response.json();

        if (result.success && result.work) {
          setData(prevData => ({
            ...prevData,
            timeline: mapWork(result.work)
          }));
          setWorkError(null);
        } else {
          setWorkError(result.message || `The server answered with an error (HTTP ${response.status}) — showing a saved copy instead.`);
        }
      } catch (error) {
        console.error('Failed to fetch work experience:', error);
        setWorkError(describeFetchError(error, 'work experience'));
      } finally {
        setLoadingWork(false);
      }
    };
    
    // Fetch projects from backend
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/show/project`);
        const result = await response.json();

        if (result.success && result.project) {
          setData(prevData => ({
            ...prevData,
            projects: mapProjects(result.project)
          }));
          setProjectsError(null);
        } else {
          setProjectsError(result.message || `The server answered with an error (HTTP ${response.status}) — showing a saved copy instead.`);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        setProjectsError(describeFetchError(error, 'projects'));
      } finally {
        setLoadingProjects(false);
      }
    };
    
    fetchWorkExperience();
    fetchProjects();
  }, []);

  useEffect(() => {
    // Live updates: the backend pushes the fresh collection whenever the
    // admin panel adds/edits/deletes data, so the page updates in place.
    // Reconnection with backoff is handled by socket.io-client; if the
    // socket is unavailable the page still works from the initial fetch.
    const socket = io(API_BASE || window.location.origin, { reconnectionDelayMax: 10000 });

    socket.on('collection:update', ({ collection, data }) => {
      if (!Array.isArray(data)) return;
      if (collection === 'work') {
        setData(prevData => ({ ...prevData, timeline: mapWork(data) }));
        setWorkError(null);
      } else if (collection === 'project') {
        setData(prevData => ({ ...prevData, projects: mapProjects(data) }));
        setProjectsError(null);
      }
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden font-sans bg-[#060907] text-[#e7efe9]">
      <BackgroundGlow accent={data.theme.accent} showGrid={data.theme.showGrid} reduceMotion={data.theme.reduceMotion} />
      
      <div className="relative z-10">
        <Navigation navData={data.nav} onBookCall={openBookCall} />
        <HeroSection hero={data.hero} onBookCall={openBookCall} />
        <ServicesSection services={data.services} note={data.servicesNote} onBookCall={openBookCall} />
        <FlagshipSection flagship={data.flagship} onBookCall={openBookCall} />
        <ProjectsSection projects={data.projects} loading={loadingProjects} error={projectsError} />
        <ApproachSection approach={data.approach} />
        <StackSection techGroups={data.techGroups} />
        <ProofSection proof={data.proof} />
        <WorkExperienceSection timeline={data.timeline} loading={loadingWork} error={workError} />
        <AboutSection aboutText={data.aboutText} aboutStats={data.aboutStats} socials={data.socials} />
        <ContactSection socials={data.socials} onBookCall={openBookCall} />
        <BookCallModal open={bookCallOpen} onClose={closeBookCall} />
      </div>
    </div>
  );
}
