import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { supabase } from '../../lib/supabase';
import { Trash2, Plus, Edit2, X, Save, Upload } from 'lucide-react';

const Dashboard = () => {
  const { activeSidebarTab, setActiveSidebarTab } = useOutletContext();
  const { data, updateHero, addProject, deleteProject, updateProject, addSkill, deleteSkill, updateSkill, addExperience, deleteExperience, updateExperience, deleteMessage, addTestimonial, deleteTestimonial, updateTestimonial } = usePortfolio();
  
  // Use the sidebar tab as our active tab, but also allow local tabs
  const activeTab = activeSidebarTab;
  const setActiveTab = setActiveSidebarTab;

  // Hero State
  const [heroTitle, setHeroTitle] = useState('');
  const [heroDesc, setHeroDesc] = useState('');
  const [heroGithub, setHeroGithub] = useState('');
  const [heroLinkedin, setHeroLinkedin] = useState('');
  const [heroInstagram, setHeroInstagram] = useState('');
  const [heroResume, setHeroResume] = useState('');
  const [heroExp, setHeroExp] = useState('');
  const [heroProjects, setHeroProjects] = useState('');
  const [heroTech, setHeroTech] = useState('');
  const [heroClients, setHeroClients] = useState('');
  const [heroAvatar, setHeroAvatar] = useState('');
  const [uploadingResume, setUploadingResume] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const [newTest, setNewTest] = useState({ name: '', role: '', company: '', content: '', image_url: '' });
  const [editingTest, setEditingTest] = useState(null);
  const [uploadingTestImg, setUploadingTestImg] = useState(false);

  // Item States
  const [newSkill, setNewSkill] = useState({ name: '', color: '#06B6D4' });
  const [editingSkill, setEditingSkill] = useState(null);

  const [newProject, setNewProject] = useState({ title: '', description: '', tech: '', image: '' });
  const [editingProject, setEditingProject] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [newExp, setNewExp] = useState({ role: '', org: '', date: '', desc_text: '' });
  const [editingExp, setEditingExp] = useState(null);

  // Update local state when context data loads
  useEffect(() => {
    if (data.hero) {
      setHeroTitle(data.hero.title || '');
      setHeroDesc(data.hero.description || '');
      setHeroGithub(data.hero.github || '');
      setHeroLinkedin(data.hero.linkedin || '');
      setHeroInstagram(data.hero.instagram || '');
      setHeroResume(data.hero.resume_url || '');
      setHeroExp(data.hero.exp_years || '');
      setHeroProjects(data.hero.projects_count || '');
      setHeroTech(data.hero.tech_count || '');
      setHeroClients(data.hero.clients_count || '');
      setHeroAvatar(data.hero.avatar_url || '');
    }
  }, [data.hero]);

  const handleResumeUpload = async (e) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;
      setUploadingResume(true);
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `resume_${Math.random()}.${fileExt}`;
      
      let { error: uploadError } = await supabase.storage.from('portfolio').upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from('portfolio').getPublicUrl(fileName);
      setHeroResume(urlData.publicUrl);
      alert('Resume uploaded! Click Save Hero Changes to apply.');
    } catch (error) {
      alert('Error uploading resume. Check your Supabase storage settings.');
    } finally {
      setUploadingResume(false);
    }
  };

  // Refetch when messages tab is clicked
  const { refetch } = usePortfolio();
  useEffect(() => {
    if (activeTab === 'messages') {
      refetch();
    }
  }, [activeTab, refetch]);

  const handleSaveHero = () => {
    updateHero({ 
      title: heroTitle, 
      description: heroDesc,
      github: heroGithub,
      linkedin: heroLinkedin,
      instagram: heroInstagram,
      resume_url: heroResume,
      exp_years: heroExp,
      projects_count: heroProjects,
      tech_count: heroTech,
      clients_count: heroClients,
      avatar_url: heroAvatar
    });
    alert('Hero updated successfully!');
  };

  // Projects
  const handleProjectSubmit = () => {
    const formattedTech = typeof newProject.tech === 'string' ? newProject.tech.split(',').map(t => t.trim()) : newProject.tech;
    const projectData = { ...newProject, tech: formattedTech };
    
    if (editingProject) {
      updateProject(editingProject, projectData);
      setEditingProject(null);
    } else {
      addProject(projectData);
    }
    setNewProject({ title: '', description: '', tech: '', image: '' });
  };

  const handleImageUpload = async (e) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;
      
      setUploadingImage(true);
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('portfolio').getPublicUrl(filePath);
      
      setNewProject({ ...newProject, image: data.publicUrl });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Make sure you created a public bucket named "portfolio" in Supabase.');
    } finally {
      setUploadingImage(false);
    }
  };

  const startEditProject = (p) => {
    setEditingProject(p.id);
    setNewProject({ ...p, tech: p.tech.join(', ') });
  };

  // Skills
  const handleSkillSubmit = () => {
    if (editingSkill) {
      updateSkill(editingSkill, newSkill);
      setEditingSkill(null);
    } else {
      addSkill(newSkill);
    }
    setNewSkill({ name: '', color: '#06B6D4' });
  };

  const startEditSkill = (s) => {
    setEditingSkill(s.id);
    setNewSkill({ name: s.name, color: s.color });
  };

  // Experiences
  const handleExpSubmit = () => {
    if (editingExp) {
      updateExperience(editingExp, newExp);
      setEditingExp(null);
    } else {
      addExperience(newExp);
    }
    setNewExp({ role: '', org: '', date: '', desc_text: '' });
  };

  const startEditExp = (e) => {
    setEditingExp(e.id);
    setNewExp({ role: e.role, org: e.org, date: e.date, desc_text: e.desc_text });
  };

  return (
    <div className="w-full pb-20">
      <header className="mb-8 flex justify-between items-end border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-widest uppercase mb-2">Command Center</h1>
          <p className="text-gray-400 text-sm">System Overview & Content Management</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-white/10 pb-4 overflow-x-auto">
        {['hero', 'projects', 'skills', 'experiences', 'messages', 'testimonials'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-semibold capitalize transition-all whitespace-nowrap ${
              activeTab === tab ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5'
            }`}
          >
            {tab === 'messages' && data.messages?.length > 0 ? (
              <span className="flex items-center gap-2">
                {tab} <span className="bg-primary text-[10px] w-4 h-4 flex items-center justify-center rounded-full">{data.messages.length}</span>
              </span>
            ) : tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="glass-panel p-6 border-white/10">
        
        {/* HERO TAB */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">Edit Hero Section</h2>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Hero Title</label>
              <input 
                type="text" 
                value={heroTitle} 
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full bg-[#030014] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary outline-none" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Hero Description</label>
              <textarea 
                value={heroDesc}
                onChange={(e) => setHeroDesc(e.target.value)}
                className="w-full bg-[#030014] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary outline-none h-32" 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">GitHub URL</label>
                <input 
                  type="text" 
                  value={heroGithub} 
                  onChange={(e) => setHeroGithub(e.target.value)}
                  className="w-full bg-[#030014] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary outline-none" 
                  placeholder="https://github.com/..."
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">LinkedIn URL</label>
                <input 
                  type="text" 
                  value={heroLinkedin} 
                  onChange={(e) => setHeroLinkedin(e.target.value)}
                  className="w-full bg-[#030014] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary outline-none" 
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Instagram URL</label>
                <input 
                  type="text" 
                  value={heroInstagram} 
                  onChange={(e) => setHeroInstagram(e.target.value)}
                  className="w-full bg-[#030014] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary outline-none" 
                  placeholder="https://instagram.com/..."
                />
              </div>

              <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 p-4 bg-white/5 rounded-xl border border-white/5">
                <div>
                  <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1">Experience</label>
                  <input type="text" value={heroExp} onChange={e => setHeroExp(e.target.value)} placeholder="2+" className="w-full bg-[#030014] border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1">Projects</label>
                  <input type="text" value={heroProjects} onChange={e => setHeroProjects(e.target.value)} placeholder="15+" className="w-full bg-[#030014] border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1">Technologies</label>
                  <input type="text" value={heroTech} onChange={e => setHeroTech(e.target.value)} placeholder="10+" className="w-full bg-[#030014] border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1">Satisfaction</label>
                  <input type="text" value={heroClients} onChange={e => setHeroClients(e.target.value)} placeholder="5★" className="w-full bg-[#030014] border border-white/10 rounded-lg px-3 py-2 text-white text-sm" />
                </div>
              </div>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Profile Photo (Hexagon)</label>
                  <div className="relative">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={async (e) => {
                        if (!e.target.files?.[0]) return;
                        setUploadingAvatar(true);
                        const file = e.target.files[0];
                        const fileName = `avatar_${Math.random()}.${file.name.split('.').pop()}`;
                        const { data: uploadData } = await supabase.storage.from('portfolio').upload(fileName, file);
                        if (uploadData) {
                          const { data: urlData } = supabase.storage.from('portfolio').getPublicUrl(fileName);
                          setHeroAvatar(urlData.publicUrl);
                        }
                        setUploadingAvatar(false);
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className={`bg-[#030014] border border-white/10 rounded-lg px-4 py-3 text-white flex items-center justify-between ${uploadingAvatar ? 'opacity-50' : ''}`}>
                      <span className="text-sm truncate">{uploadingAvatar ? 'Uploading...' : (heroAvatar ? 'Avatar Uploaded' : 'Select Photo')}</span>
                      <Upload size={18} className="text-primary" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Resume / CV (PDF)</label>
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      <input 
                        type="file" 
                        accept=".pdf"
                        onChange={handleResumeUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={uploadingResume}
                      />
                      <div className={`bg-[#030014] border border-white/10 rounded-lg px-4 py-3 text-white flex items-center justify-between ${uploadingResume ? 'opacity-50' : ''}`}>
                        <span className="text-sm truncate">
                          {uploadingResume ? 'Uploading...' : (heroResume ? 'Resume File Uploaded' : 'Select Resume PDF')}
                        </span>
                        <Upload size={18} className="text-primary" />
                      </div>
                    </div>
                    {heroResume && (
                      <a href={heroResume} target="_blank" rel="noreferrer" className="bg-white/5 border border-white/10 rounded-lg px-4 flex items-center text-xs text-gray-400 hover:text-white">
                        View Current
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <button onClick={handleSaveHero} className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/80 transition-colors">
              Save Hero Changes
            </button>
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">Manage Projects</h2>
            
            {/* Add/Edit Form */}
            <div className="bg-[#030014] p-4 rounded-xl border border-white/10 mb-8 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-primary font-semibold">{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
                {editingProject && (
                  <button onClick={() => { setEditingProject(null); setNewProject({ title: '', description: '', tech: '', image: '' }); }} className="text-gray-400 hover:text-white">
                    <X size={16} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
                
                <div className="relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    disabled={uploadingImage}
                  />
                  <div className={`bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white flex items-center justify-between ${uploadingImage ? 'opacity-50' : ''}`}>
                    <span className="text-sm truncate max-w-[150px]">
                      {uploadingImage ? 'Uploading...' : (newProject.image ? 'Image Uploaded' : 'Upload Image')}
                    </span>
                    <Upload size={16} className="text-primary" />
                  </div>
                </div>

                <input type="text" placeholder="Tech Stack (comma separated)" value={newProject.tech} onChange={e => setNewProject({...newProject, tech: e.target.value})} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white col-span-2" />
                <textarea placeholder="Description" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white col-span-2 h-20" />
              </div>
              <button onClick={handleProjectSubmit} className="flex items-center gap-2 bg-primary px-4 py-2 rounded-lg text-white font-medium text-sm">
                {editingProject ? <><Save size={16} /> Update Project</> : <><Plus size={16} /> Add Project</>}
              </button>
            </div>

            {/* List */}
            <div className="space-y-4">
              {data.projects.map(p => (
                <div key={p.id} className={`flex justify-between items-center p-4 rounded-lg border transition-all ${editingProject === p.id ? 'bg-primary/10 border-primary' : 'bg-white/5 border-white/10'}`}>
                  <div>
                    <h4 className="text-white font-bold">{p.title}</h4>
                    <p className="text-sm text-gray-400">{Array.isArray(p.tech) ? p.tech.join(', ') : p.tech}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEditProject(p)} className="text-blue-400 hover:bg-blue-400/20 p-2 rounded-lg transition-colors">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => { if(window.confirm('Are you sure you want to delete this project?')) deleteProject(p.id) }} className="text-red-400 hover:bg-red-400/20 p-2 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SKILLS TAB */}
        {activeTab === 'skills' && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">Manage Skills</h2>
            
            <div className="flex flex-wrap md:flex-nowrap gap-4 mb-8 bg-[#030014] p-4 rounded-xl border border-white/10 items-end relative">
              {editingSkill && (
                <button onClick={() => { setEditingSkill(null); setNewSkill({name:'', color:'#06B6D4'}) }} className="absolute top-2 right-2 text-gray-400 hover:text-white">
                  <X size={16} />
                </button>
              )}
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs text-gray-400 mb-1">Skill Name</label>
                <input type="text" value={newSkill.name} onChange={e => setNewSkill({...newSkill, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
              </div>
              <div className="w-[120px]">
                <label className="block text-xs text-gray-400 mb-1">Color</label>
                <input 
                  type="color" 
                  value={newSkill.color} 
                  onChange={e => setNewSkill({...newSkill, color: e.target.value})} 
                  className="w-full h-[42px] bg-white/5 border border-white/10 rounded-lg cursor-pointer" 
                />
              </div>
              <button onClick={handleSkillSubmit} className="bg-primary px-6 py-2 rounded-lg text-white font-medium text-sm mb-[2px]">
                {editingSkill ? 'Update' : 'Add'}
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data.skills.map(s => (
                <div key={s.id} className={`flex justify-between items-center p-3 rounded-lg border transition-all ${editingSkill === s.id ? 'bg-primary/10 border-primary' : 'bg-white/5 border-white/10'}`}>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-white text-sm">{s.name}</span>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => startEditSkill(s)} className="text-blue-400 hover:text-blue-300 p-1">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => { if(window.confirm('Are you sure you want to delete this skill?')) deleteSkill(s.id) }} className="text-red-400 hover:text-red-300 p-1">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EXPERIENCES TAB */}
        {activeTab === 'experiences' && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">Manage Experiences</h2>
            
            <div className="bg-[#030014] p-4 rounded-xl border border-white/10 mb-8 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-primary font-semibold">{editingExp ? 'Edit Experience' : 'Add New Experience'}</h3>
                {editingExp && (
                  <button onClick={() => { setEditingExp(null); setNewExp({role:'', org:'', date:'', desc_text:''}); }} className="text-gray-400 hover:text-white">
                    <X size={16} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Role (e.g. Developer)" value={newExp.role} onChange={e => setNewExp({...newExp, role: e.target.value})} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
                <input type="text" placeholder="Organization" value={newExp.org} onChange={e => setNewExp({...newExp, org: e.target.value})} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
                <input type="text" placeholder="Date (e.g. 2023 - Present)" value={newExp.date} onChange={e => setNewExp({...newExp, date: e.target.value})} className="col-span-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
                <textarea placeholder="Description" value={newExp.desc_text} onChange={e => setNewExp({...newExp, desc_text: e.target.value})} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white col-span-2 h-20" />
              </div>
              <button onClick={handleExpSubmit} className="flex items-center gap-2 bg-primary px-4 py-2 rounded-lg text-white font-medium text-sm">
                {editingExp ? <><Save size={16} /> Update Experience</> : <><Plus size={16} /> Add Experience</>}
              </button>
            </div>

            <div className="space-y-4">
              {data.experiences.map(e => (
                <div key={e.id} className={`flex justify-between items-start p-4 rounded-lg border transition-all ${editingExp === e.id ? 'bg-primary/10 border-primary' : 'bg-white/5 border-white/10'}`}>
                  <div>
                    <h4 className="text-white font-bold">{e.role}</h4>
                    <p className="text-sm text-primary mb-1">{e.org} | {e.date}</p>
                    <p className="text-xs text-gray-400">{e.desc_text}</p>
                  </div>
                  <div className="flex gap-2 mt-1">
                    <button onClick={() => startEditExp(e)} className="text-blue-400 hover:bg-blue-400/20 p-2 rounded-lg transition-colors">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => { if(window.confirm('Are you sure you want to delete this experience?')) deleteExperience(e.id) }} className="text-red-400 hover:bg-red-400/20 p-2 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === 'messages' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white uppercase tracking-widest">Incoming Transmissions</h2>
              <button 
                onClick={() => refetch()} 
                className="text-xs bg-primary/20 text-primary border border-primary/50 px-3 py-1 rounded-full hover:bg-primary/30 transition-all flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Refresh Signals
              </button>
            </div>
            <div className="space-y-4">
              {data.messages?.length === 0 ? (
                <div className="text-center py-12 text-gray-500 italic">No incoming signals detected.</div>
              ) : (
                data.messages.map(m => (
                  <div key={m.id} className="bg-white/5 border border-white/10 rounded-xl p-6 transition-all hover:border-primary/50">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-white font-bold text-lg">{m.name}</h4>
                        <p className="text-primary text-sm">{m.email}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">{new Date(m.created_at).toLocaleString()}</span>
                        <button onClick={() => { if(window.confirm('Delete this message?')) deleteMessage(m.id) }} className="text-red-400 hover:bg-red-400/20 p-2 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="bg-[#030014] p-4 rounded-lg border border-white/5">
                      <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Subject: {m.subject}</p>
                      <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{m.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        {/* TESTIMONIALS TAB */}
        {activeTab === 'testimonials' && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">Manage Testimonials</h2>
            
            <div className="bg-[#030014] p-4 rounded-xl border border-white/10 mb-8 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-primary font-semibold">{editingTest ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
                {editingTest && (
                  <button onClick={() => { setEditingTest(null); setNewTest({name:'', role:'', company:'', content:'', image_url:''}); }} className="text-gray-400 hover:text-white">
                    <X size={16} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Name" value={newTest.name} onChange={e => setNewTest({...newTest, name: e.target.value})} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
                <input type="text" placeholder="Role (e.g. CEO)" value={newTest.role} onChange={e => setNewTest({...newTest, role: e.target.value})} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
                <input type="text" placeholder="Company (optional)" value={newTest.company} onChange={e => setNewTest({...newTest, company: e.target.value})} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" />
                
                <div className="relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={async (e) => {
                      if (!e.target.files?.[0]) return;
                      setUploadingTestImg(true);
                      const file = e.target.files[0];
                      const fileName = `test_${Math.random()}.${file.name.split('.').pop()}`;
                      const { data: uploadData } = await supabase.storage.from('portfolio').upload(fileName, file);
                      if (uploadData) {
                        const { data: urlData } = supabase.storage.from('portfolio').getPublicUrl(fileName);
                        setNewTest({...newTest, image_url: urlData.publicUrl});
                      }
                      setUploadingTestImg(false);
                    }} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  />
                  <div className={`bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white flex items-center justify-between ${uploadingTestImg ? 'opacity-50' : ''}`}>
                    <span className="text-sm truncate">{uploadingTestImg ? 'Uploading...' : (newTest.image_url ? 'Photo Uploaded' : 'Upload Photo')}</span>
                    <Upload size={16} className="text-primary" />
                  </div>
                </div>

                <textarea placeholder="The testimonial content..." value={newTest.content} onChange={e => setNewTest({...newTest, content: e.target.value})} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white col-span-2 h-24" />
              </div>
              <button 
                onClick={() => {
                  if (editingTest) updateTestimonial(editingTest, newTest);
                  else addTestimonial(newTest);
                  setNewTest({name:'', role:'', company:'', content:'', image_url:''});
                  setEditingTest(null);
                }} 
                className="flex items-center gap-2 bg-primary px-4 py-2 rounded-lg text-white font-medium text-sm"
              >
                {editingTest ? <><Save size={16} /> Update Testimonial</> : <><Plus size={16} /> Add Testimonial</>}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.testimonials.map(t => (
                <div key={t.id} className="flex justify-between items-start p-4 rounded-lg border bg-white/5 border-white/10">
                  <div className="flex gap-4">
                    <img src={t.image_url} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h4 className="text-white font-bold">{t.name}</h4>
                      <p className="text-[10px] text-primary">{t.role} @ {t.company}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingTest(t.id); setNewTest(t); }} className="text-blue-400 p-1"><Edit2 size={16} /></button>
                    <button onClick={() => { if(window.confirm('Delete?')) deleteTestimonial(t.id) }} className="text-red-400 p-1"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
