import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const PortfolioContext = createContext();

const defaultData = {
  hero: {
    title: 'Loading System...',
    description: 'Establishing secure connection to database core...',
    github: 'https://github.com/Rameesllo',
    linkedin: '#',
    instagram: '#',
    exp_years: '2+',
    projects_count: '15+',
    tech_count: '10+',
    clients_count: '5★',
  },
  projects: [],
  skills: [],
  experiences: [],
  messages: [],
  testimonials: [],
  loading: true
};

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      // Fetch all tables concurrently
      const [heroRes, projectsRes, skillsRes, experiencesRes, messagesRes, testimonialsRes] = await Promise.all([
        supabase.from('hero').select('*').eq('id', 1).single(),
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('skills').select('*'),
        supabase.from('experiences').select('*'),
        supabase.from('messages').select('*').order('created_at', { ascending: false }),
        supabase.from('testimonials').select('*').order('created_at', { ascending: false })
      ]);

      setData({
        hero: heroRes.data || defaultData.hero,
        projects: projectsRes.data || [],
        skills: skillsRes.data || [],
        experiences: experiencesRes.data || [],
        messages: messagesRes.data || [],
        testimonials: testimonialsRes.data || [],
        loading: false
      });
    } catch (error) {
      console.error('Error fetching data from Supabase:', error);
      setData(prev => ({ ...prev, loading: false }));
    }
  };

  const updateHero = async (heroData) => {
    setData((prev) => ({ ...prev, hero: heroData }));
    try {
      const { error } = await supabase.from('hero').update(heroData).eq('id', 1);
      if (error) throw error;
    } catch (error) { console.error('Failed to update hero:', error); }
  };

  // Projects CRUD
  const addProject = async (project) => {
    try {
      const { data: newProject, error } = await supabase.from('projects').insert([project]).select().single();
      if (error) throw error;
      setData(prev => ({ ...prev, projects: [newProject, ...prev.projects] }));
    } catch (error) { console.error('Error adding project:', error); }
  };
  
  const updateProject = async (id, project) => {
    try {
      const { data: updatedProject, error } = await supabase.from('projects').update(project).eq('id', id).select().single();
      if (error) throw error;
      setData(prev => ({ ...prev, projects: prev.projects.map(p => p.id === id ? updatedProject : p) }));
    } catch (error) { console.error('Error updating project:', error); }
  };

  const deleteProject = async (id) => {
    setData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
    try { await supabase.from('projects').delete().eq('id', id); } 
    catch (error) { console.error('Error deleting project:', error); }
  };

  // Skills CRUD
  const addSkill = async (skill) => {
    try {
      const { data: newSkill, error } = await supabase.from('skills').insert([skill]).select().single();
      if (error) throw error;
      setData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
    } catch (error) { console.error('Error adding skill:', error); }
  };

  const updateSkill = async (id, skill) => {
    try {
      const { data: updatedSkill, error } = await supabase.from('skills').update(skill).eq('id', id).select().single();
      if (error) throw error;
      setData(prev => ({ ...prev, skills: prev.skills.map(s => s.id === id ? updatedSkill : s) }));
    } catch (error) { console.error('Error updating skill:', error); }
  };

  const deleteSkill = async (id) => {
    setData(prev => ({ ...prev, skills: prev.skills.filter(s => s.id !== id) }));
    try { await supabase.from('skills').delete().eq('id', id); } 
    catch (error) { console.error('Error deleting skill:', error); }
  };

  // Experiences CRUD
  const addExperience = async (exp) => {
    try {
      const { data: newExp, error } = await supabase.from('experiences').insert([exp]).select().single();
      if (error) throw error;
      setData(prev => ({ ...prev, experiences: [...prev.experiences, newExp] }));
    } catch (error) { console.error('Error adding experience:', error); }
  };

  const updateExperience = async (id, exp) => {
    try {
      const { data: updatedExp, error } = await supabase.from('experiences').update(exp).eq('id', id).select().single();
      if (error) throw error;
      setData(prev => ({ ...prev, experiences: prev.experiences.map(e => e.id === id ? updatedExp : e) }));
    } catch (error) { console.error('Error updating experience:', error); }
  };

  const deleteExperience = async (id) => {
    setData(prev => ({ ...prev, experiences: prev.experiences.filter(e => e.id !== id) }));
    try { await supabase.from('experiences').delete().eq('id', id); } 
    catch (error) { console.error('Error deleting experience:', error); }
  };

  return (
    <PortfolioContext.Provider value={{ 
      data, updateHero, 
      addProject, deleteProject, updateProject,
      addSkill, deleteSkill, updateSkill,
      addExperience, deleteExperience, updateExperience,
      // Testimonials CRUD
      addTestimonial: async (test) => {
        const { data: newT, error } = await supabase.from('testimonials').insert([test]).select().single();
        if (!error) setData(prev => ({ ...prev, testimonials: [newT, ...prev.testimonials] }));
      },
      deleteTestimonial: async (id) => {
        setData(prev => ({ ...prev, testimonials: prev.testimonials.filter(t => t.id !== id) }));
        await supabase.from('testimonials').delete().eq('id', id);
      },
      updateTestimonial: async (id, test) => {
        const { data: updatedT, error } = await supabase.from('testimonials').update(test).eq('id', id).select().single();
        if (!error) setData(prev => ({ ...prev, testimonials: prev.testimonials.map(t => t.id === id ? updatedT : t) }));
      },
      refetch: fetchPortfolioData 
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
