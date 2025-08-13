import React, { useState, useEffect } from "react";

import Change from './Change';
import { FaBars, FaChevronDown, FaPlus, FaCheck, FaEllipsisV, FaBroadcastTower, FaEdit, FaPrint, FaCogs, FaArrowDown, FaArrowUp, FaClone, FaUserCheck, FaPlusSquare, FaExchangeAlt, FaTrash, FaTags, FaTimes, FaCalendarAlt, FaCheck as FaCheckIcon } from "react-icons/fa";
import "./Interface.css";
import EditPipeline from "./EditPipeline";
import { leadsAPI } from '../services/api';
import { pipelineAPI } from '../services/api';
import { tasksAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Task from './Task';
import Notes from './Notes';
import Files from './Files';
import { usePipeline } from '../context/PipelineContext';

const sidebarItems = [
  { icon: "🏠", label: "Dashboard" },
  { icon: "📋", label: "Leads" },
  { icon: "💬", label: "Chats" },
  { icon: "🟢", label: "WhatsApp" },
  { icon: "📅", label: "Calendar" },
          { icon: "🗂️", label: "Invoice" },
  { icon: "✉️", label: "Mail" },
  { icon: "📊", label: "Stats" },
  { icon: "⚙️", label: "Settings" },
];

const initialFormState = {
  name: "",
  amount: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  companyName: "",
  companyAddress: "",
};

function AdvancedFieldForm({ onCancel }) {
  return (
    <form className="crm-advanced-form">
      <div className="crm-advanced-group">
        <div className="crm-advanced-group-title">LEAD FIELDS</div>
        <select className="crm-advanced-input"><option>Name</option></select>
        <select className="crm-advanced-input"><option>Sales value</option></select>
        <button type="button" className="crm-advanced-addfield">+ Add field</button>
      </div>
      <div className="crm-advanced-group">
        <div className="crm-advanced-group-title">CONTACT FIELDS</div>
        <select className="crm-advanced-input"><option>Name</option></select>
        <select className="crm-advanced-input"><option>Phone</option></select>
        <select className="crm-advanced-input"><option>Email</option></select>
        <button type="button" className="crm-advanced-addfield">+ Add field</button>
      </div>
      <div className="crm-advanced-group">
        <div className="crm-advanced-group-title">COMPANY FIELDS</div>
        <select className="crm-advanced-input"><option>Name</option></select>
        <select className="crm-advanced-input"><option>Address</option></select>
        <button type="button" className="crm-advanced-addfield">+ Add field</button>
      </div>
      <div className="crm-advanced-actions">
        <button type="submit" className="crm-advanced-save">Save</button>
        <button type="button" className="crm-advanced-cancel" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

function QuickAddForm({ onCancel, onAdd, onSettings }) {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === 'amount') {
      newValue = newValue.replace(/[^0-9]/g, '');
    } else if (["name", "contactName", "companyName"].includes(name)) {
      newValue = newValue.replace(/[^a-zA-Z ]/g, '');
    }
    setForm({ ...form, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!/^[a-zA-Z ]+$/.test(form.name)) newErrors.name = 'Only alphabets allowed';
    if (!/^[a-zA-Z ]+$/.test(form.contactName)) newErrors.contactName = 'Only alphabets allowed';
    if (!/^[a-zA-Z ]+$/.test(form.companyName)) newErrors.companyName = 'Only alphabets allowed';
    if (!/^[0-9]+$/.test(form.amount)) newErrors.amount = 'Only numbers allowed';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    onAdd(form);
    setForm(initialFormState);
  };

  return (
    <form className="crm-quickadd-form" onSubmit={handleSubmit}>
      <div className="crm-quickadd-form-fields">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        {errors.name && <div style={{color:'red',fontSize:'0.9em'}}>{errors.name}</div>}
        <input name="amount" value={form.amount} onChange={handleChange} placeholder="₹0" />
        {errors.amount && <div style={{color:'red',fontSize:'0.9em'}}>{errors.amount}</div>}
        <input name="contactName" value={form.contactName} onChange={handleChange} placeholder="Contact: Name" />
        {errors.contactName && <div style={{color:'red',fontSize:'0.9em'}}>{errors.contactName}</div>}
        <input name="contactPhone" value={form.contactPhone} onChange={handleChange} placeholder="Contact: Phone" />
        <input name="contactEmail" value={form.contactEmail} onChange={handleChange} placeholder="Contact: Email" />
        <input name="companyName" value={form.companyName} onChange={handleChange} placeholder="Company: Name" />
        {errors.companyName && <div style={{color:'red',fontSize:'0.9em'}}>{errors.companyName}</div>}
        <input name="companyAddress" value={form.companyAddress} onChange={handleChange} placeholder="Company: Address" />
      </div>
      <div className="crm-quickadd-form-bottom">
        <div className="crm-quickadd-form-actions">
          <button type="submit" className="crm-quickadd-add">Add</button>
          <button type="button" className="crm-quickadd-cancel" onClick={onCancel}>Cancel</button>
        </div>
      </div>
      <div style={{marginTop:'8px',textAlign:'right'}}>
        <button type="button" className="crm-quickadd-settings" onClick={onSettings}>
          Settings <span className="crm-quickadd-gear">⚙️</span>
        </button>
      </div>
    </form>
  );
}

function LeadModal({ onClose, onAdd, pipelines, selectedPipelineIndex, initialStage }) {
  const [form, setForm] = useState(initialFormState);
  const [note, setNote] = useState("");
  const [showSetup, setShowSetup] = useState(false);
  const [customFields, setCustomFields] = useState([]);
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldType, setNewFieldType] = useState("text");
  const [activeTab, setActiveTab] = useState("Details");
  // Pipeline and stage selection
  const selectedPipelineIdx = selectedPipelineIndex || 0;
  const [selectedStage, setSelectedStage] = useState(initialStage || pipelines[selectedPipelineIdx].stages[0]);

  // Kommo-style stage colors
  const stageColors = [
    '#e3f1ff', // blue
    '#fff9c4', // yellow
    '#ffe0b2', // orange
    '#ffd6d6', // red
    '#e0ffd6', // green
    '#f0f0f0'  // gray
  ];

  React.useEffect(() => {
    setSelectedStage(initialStage || pipelines[selectedPipelineIdx].stages[0]);
  }, [selectedPipelineIdx, pipelines, initialStage]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form, selectedStage);
    setForm(initialFormState);
  };
  const handleAddCustomField = (e) => {
    e.preventDefault();
    if (newFieldLabel.trim()) {
      setCustomFields([...customFields, { label: newFieldLabel, type: newFieldType, name: `custom_${customFields.length}` }]);
      setNewFieldLabel("");
      setNewFieldType("text");
    }
  };
  return (
    <div className="crm-modal-overlay" onClick={onClose}>
      <div className="crm-modal crm-modal-detail crm-leadmodal-modern" onClick={e => e.stopPropagation()}>
        {/* Modern Header */}
        <div className="crm-leadmodal-header">
          <div className="crm-leadmodal-avatar">A</div>
          <div className="crm-leadmodal-titlebox">
            <div className="crm-leadmodal-title">Abhishek Kumar</div>
            <div className="crm-leadmodal-stage">Initial Contact</div>
          </div>
          <div className="crm-leadmodal-header-actions">
            <span className="crm-leadmodal-setup-link" onClick={() => setShowSetup(s => !s)}>Setup</span>
            <span className="crm-leadmodal-close" onClick={onClose}>×</span>
          </div>
        </div>
        {/* Tabs */}
        <div className="crm-leadmodal-tabs">
          {['Details','Timeline','Tasks','Notes','Files'].map(tab => (
            <div
              key={tab}
              className={`crm-leadmodal-tab${activeTab===tab?' crm-leadmodal-tab-active':''}`}
              onClick={()=>setActiveTab(tab)}
            >{tab}</div>
          ))}
        </div>
    
        {/* Tab Content */}
        <div className="crm-leadmodal-content">
          {activeTab === 'Details' && (
            <form className="crm-leadmodal-detailsform" onSubmit={handleSubmit}>
              <div className="crm-leadmodal-detailsgrid">
                <div className="crm-leadmodal-label">Responsible user</div>
                <div className="crm-leadmodal-value">Abhishek</div>
                <div className="crm-leadmodal-label">Sale</div>
                <div className="crm-leadmodal-value">₹ 0</div>
                <div className="crm-leadmodal-label">Initial contact</div>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <select
                    value={selectedStage}
                    onChange={e => setSelectedStage(e.target.value)}
                    className="crm-leadmodal-stage-dropdown"
                  >
                    {pipelines[selectedPipelineIdx].stages.map((stage, idx) => (
                      <option
                        key={stage}
                        value={stage}
                        style={{background: stageColors[idx % stageColors.length], color:'#17404e'}}>
                        {stage}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="crm-leadmodal-label">Contact</div>
                <input name="contactName" value={form.contactName} onChange={handleChange} placeholder="Contact name" />
                <div className="crm-leadmodal-label">Company</div>
                <input name="companyName" value={form.companyName} onChange={handleChange} placeholder="Company name" />
                <div className="crm-leadmodal-label">Work phone</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ padding: '6px 8px', background: '#f7f8fa', border: '1px solid #e0e0e0', borderRight: 'none', borderRadius: '4px 0 0 4px', color: '#888', fontSize: '1rem' }}>+91</span>
                  <input
                    name="contactPhone"
                    value={form.contactPhone}
                    onChange={handleChange}
                    placeholder="Enter phone"
                    style={{ borderRadius: '0 4px 4px 0', borderLeft: 'none' }}
                    maxLength={12}
                    pattern="\d{12}"
                    required
                  />
                </div>
                <div className="crm-leadmodal-label">Work email</div>
                <input name="contactEmail" value={form.contactEmail} onChange={handleChange} placeholder="..." />
                <div className="crm-leadmodal-label">Position</div>
                <input name="position" value={form.position || ''} onChange={handleChange} placeholder="..." />
                {customFields.map((field, idx) => (
                  <React.Fragment key={field.name}>
                    <div className="crm-leadmodal-label">{field.label}</div>
                    <input
                      name={field.name}
                      type={field.type}
                      value={form[field.name] || ''}
                      onChange={handleChange}
                      placeholder={field.label}
                    />
                  </React.Fragment>
                ))}
              </div>
              <div className="crm-leadmodal-note-row">
                <label className="crm-leadmodal-note-label">Note:</label>
                <input className="crm-leadmodal-note-input" value={note} onChange={e => setNote(e.target.value)} placeholder="type here" />
              </div>
              <div className="crm-leadmodal-actions">
                <button type="submit" className="crm-leadmodal-addbtn">Add</button>
                <button type="button" className="crm-leadmodal-cancelbtn" onClick={onClose}>Cancel</button>
              </div>
              {showSetup && (
                <form className="crm-leadmodal-setupform" onSubmit={handleAddCustomField}>
                  <input
                    className="crm-leadmodal-setupinput"
                    placeholder="Field label"
                    value={newFieldLabel}
                    onChange={e => setNewFieldLabel(e.target.value)}
                  />
                  <select className="crm-leadmodal-setuptype" value={newFieldType} onChange={e => setNewFieldType(e.target.value)}>
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="email">Email</option>
                  </select>
                  <button className="crm-leadmodal-setupaddbtn" type="submit">Add Field</button>
                </form>
              )}
            </form>
          )}
          {activeTab === 'Timeline' && (
            <div className="crm-leadmodal-timeline">
              <div className="crm-leadmodal-timelineitem">
                <span className="crm-leadmodal-timelineicon">🕒</span>
                <span className="crm-leadmodal-timelinetext">Lead created by Abhishek (12:12PM)</span>
              </div>
              <div className="crm-leadmodal-timelineitem">
                <span className="crm-leadmodal-timelineicon">✏️</span>
                <span className="crm-leadmodal-timelinetext">The value of the field «Address» is set to «Bhardwaj traders shop, kanhai road, behind cyber park, Jharsa, sec-39, gurugram» (12:12PM)</span>
              </div>
              <div className="crm-leadmodal-timelineitem">
                <span className="crm-leadmodal-timelineicon">✏️</span>
                <span className="crm-leadmodal-timelinetext">The value of the field «Phone» is set to «09625613008» (12:12PM)</span>
              </div>
              <div className="crm-leadmodal-timelineitem">
                <span className="crm-leadmodal-timelineicon">✏️</span>
                <span className="crm-leadmodal-timelinetext">The value of the field «Name» is set to «Abhishek kumar» (12:12PM)</span>
              </div>
            </div>
          )}
          {activeTab === 'Tasks' && (
            <Task leadId={form.id || form._id || form.leadId || ''} />
          )}
          {activeTab === 'Notes' && (
            <Notes leadId={form.id || form._id || form.leadId || ''} />
          )}
          {activeTab === 'Files' && (
            <Files leadId={form.id || form._id || form.leadId || ''} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function Interface({ onSidebarNav, navigate }) {
  const [openFormIndex, setOpenFormIndex] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showLeadsSidebar, setShowLeadsSidebar] = useState(false);
  const [addPipelineActive, setAddPipelineActive] = useState(false);
  const [newPipelineName, setNewPipelineName] = useState("");
  const [showDotMenu, setShowDotMenu] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showLeadDetail, setShowLeadDetail] = useState(false);
  const [leadStage, setLeadStage] = useState('Initial contact');
  const [timeline, setTimeline] = useState([
    { time: '12:12PM', text: 'The value of the field «Address» is set to «Bhardwaj traders shop, kanhai road, behind cyber park, Jharsa, sec-39, gurugram»' },
    { time: '12:12PM', text: 'The value of the field «Phone» is set to «09625613008»' },
    { time: '12:12PM', text: 'The value of the field «Name» is set to «Abhishek kumar»' },
  ]);
  
  // Use global pipeline context
  const { 
    pipelines, 
    selectedPipelineIndex, 
    setSelectedPipelineIndex, 
    updatePipelines, 
    addPipeline, 
    updatePipeline, 
    deletePipeline,
    fetchPipelines 
  } = usePipeline();
  // Add state for context menu and renaming
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, index: null });
  const [renamingIndex, setRenamingIndex] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const [leadModalInitialStage, setLeadModalInitialStage] = useState(null);
  // Add leads state:
  const [leads, setLeads] = useState([]);
  // In Interface component, add selectedLead state:
  const [selectedLead, setSelectedLead] = useState(null);
  const [showEditPipeline, setShowEditPipeline] = useState(false);
  const [showListSettings, setShowListSettings] = useState(false);
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [showAddTodoModal, setShowAddTodoModal] = useState(false);
  const [todoType, setTodoType] = useState('Follow up');
  const [todoText, setTodoText] = useState('');
  const [todoDate, setTodoDate] = useState(() => {
    const d = new Date();
    d.setHours(0,0,0,0);
    return d;
  });
  const [todoTime, setTodoTime] = useState('All day');
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [showTodoAdvanced, setShowTodoAdvanced] = useState(false); // NEW: controls quick options vs advanced
  const [selectedQuick, setSelectedQuick] = useState('today'); // 'today', 'tomorrow', or 'custom'
  // Add state for change stage modal
  const [showChangeStageModal, setShowChangeStageModal] = useState(false);
  const [changeStageValue, setChangeStageValue] = useState('Initial contact');
  const [showStageDropdown, setShowStageDropdown] = useState(false);
  const stageColors = [
    '#b3e0ff', // blue
    '#fff9c4', // yellow
    '#ffe0b2', // orange
    '#ffd6d6', // red
    '#e0ffd6', // green
    '#f0f0f0'  // gray
  ];
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [tags, setTags] = useState(["ayush123"]);
  const [tagInput, setTagInput] = useState("");
  // Add this state:
  const [selectedLeadIds, setSelectedLeadIds] = useState([]);
  const [leadModalPipelineIndex, setLeadModalPipelineIndex] = useState(0);
  const [activeDotIndex, setActiveDotIndex] = useState({}); // Track active dot for each lead
  // Add state for contact info modal
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactModalData, setContactModalData] = useState(null);
  const [contactModalType, setContactModalType] = useState(''); // 'call', 'email'
  const [pipelineUpdateTrigger, setPipelineUpdateTrigger] = useState(0); // Add this to force re-renders
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showFindDuplicatesModal, setShowFindDuplicatesModal] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [importProgress, setImportProgress] = useState(0);
  const [duplicates, setDuplicates] = useState([]);
  const [exportFormat, setExportFormat] = useState('csv');

  // Function to detect overflow and add scroll indicators
  const checkPipelineOverflow = () => {
    const pipelineStages = document.querySelectorAll('.crm-pipeline-stage');
    pipelineStages.forEach((stage) => {
      const cardsContainer = stage.querySelector('.crm-pipeline-stage-cards');
      if (cardsContainer) {
        const hasOverflow = cardsContainer.scrollHeight > cardsContainer.clientHeight;
        if (hasOverflow) {
          stage.classList.add('has-overflow');
        } else {
          stage.classList.remove('has-overflow');
        }
      }
    });
  };

  // Check overflow on mount and when leads change
  useEffect(() => {
    // Check overflow after a short delay to ensure DOM is ready
    const timer = setTimeout(checkPipelineOverflow, 100);
    
    // Add resize listener to check overflow when window resizes
    const handleResize = () => {
      setTimeout(checkPipelineOverflow, 100);
    };
    
    // Add mutation observer to check overflow when DOM changes
    const observer = new MutationObserver(() => {
      setTimeout(checkPipelineOverflow, 50);
    });
    
    const pipelineContainer = document.querySelector('.crm-pipeline');
    if (pipelineContainer) {
      observer.observe(pipelineContainer, { 
        childList: true, 
        subtree: true, 
        attributes: true 
      });
    }
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [leads, pipelines]);

  // Function to get data based on active dot
  const getDotData = (lead, dotIndex) => {
    const dotData = [
      {
        label: "Initial Contact",
        value: "₹0",
        contact: lead.contactPhone || "...",
        status: "New Lead"
      },
      {
        label: "Discussion",
        value: "₹" + (lead.amount || 0),
        contact: lead.contactEmail || "...",
        status: "In Progress"
      },
      {
        label: "Contract",
        value: "₹" + (lead.amount || 0),
        contact: lead.contactPhone || "...",
        status: "Negotiating"
      }
    ];
    return dotData[dotIndex] || dotData[0];
  };

  const quickOptions = [
    { label: 'Today', get: () => { const d = new Date(); d.setHours(0,0,0,0); return d; }, key: 'today' },
    { label: 'Tomorrow', get: () => { const d = new Date(); d.setDate(d.getDate()+1); d.setHours(0,0,0,0); return d; }, key: 'tomorrow' },
  ];
  const timeSlots = Array.from({length: 10}, (_,i) => `${9+i}:00AM`).concat(['6:00PM']);

  function renderCalendar() {
    const d = new Date(todoDate);
    const year = d.getFullYear();
    const month = d.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month+1, 0).getDate();
    let days = [];
    for(let i=0;i<firstDay;i++) days.push(null);
    for(let i=1;i<=daysInMonth;i++) days.push(i);
    return (
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginBottom:12}}>
        <div style={{display:'flex',justifyContent:'space-between',width:294,marginBottom:4}}>
          <button onClick={()=>setTodoDate(new Date(year, month-1, 1))}>&lt;</button>
          <span style={{fontWeight:600}}>{d.toLocaleString('default',{month:'long'})} {year}</span>
          <button onClick={()=>setTodoDate(new Date(year, month+1, 1))}>&gt;</button>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:4,width:294,margin:'0 auto'}}>
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(day=>(<div key={day} style={{fontWeight:600,fontSize:13,textAlign:'center',minWidth:40}}>{day}</div>))}
          {days.map((day,i)=>(
            <div key={i} style={{height:36,textAlign:'center',minWidth:40}}>
              {day ? (
                <button
                  style={{
                    width:34,height:34,borderRadius:6,padding:10,border:'none',background: day===d.getDate()?'#1abc9c':'#e0e0e0',color: day===d.getDate()?'#fff':'#17404e',cursor:'pointer',fontWeight:600,fontSize:'1rem'
                  }}
                  onClick={()=>{
                    const newDate = new Date(todoDate);
                    newDate.setDate(day); setTodoDate(newDate);
                  }}
                >{day}</button>
              ) : <span></span>}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const handleSetStage = (newStage) => {
    if (newStage !== leadStage) {
      const now = new Date();
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setTimeline(prev => [
        { time, text: `Abhishek changed stage from "${leadStage}" to "${newStage}"` },
        ...prev
      ]);
      setLeadStage(newStage);
    }
  };

  const handleQuickAddClick = (idx) => {
    setOpenFormIndex(idx);
    setShowAdvanced(false);
    setLeadModalInitialStage(pipelines[selectedPipelineIndex].stages[idx]);
  };

  const handleCancel = () => {
    setOpenFormIndex(null);
    setShowAdvanced(false);
  };

  const handleAdd = async (formData, stage) => {
    try {
      const name = formData.name || formData.contactName || '';
      // If amount is empty or not a number, use 0
      const amount = formData.amount && !isNaN(Number(formData.amount)) ? Number(formData.amount) : 0;
      const response = await leadsAPI.create({ 
        ...formData, 
        name, 
        amount, 
        stage, 
        pipeline: pipelines[leadModalPipelineIndex].name // Use the modal's pipeline index
      });
      setLeads([...leads, response.data]);
      // Check overflow after adding lead
      setTimeout(checkPipelineOverflow, 100);
    } catch (error) {
      alert('Failed to add lead: ' + (error.response?.data?.message || error.message));
    }
    setOpenFormIndex(null);
    setShowAdvanced(false);
    setShowLeadModal(false);
  };

  const handleSettings = () => {
    setShowAdvanced(true);
  };

  const handleLeadsDropdownClick = () => {
    setShowLeadsSidebar(true);
  };

  const handleCloseLeadsSidebar = (e) => {
    if (e.target.classList.contains("crm-leads-sidebar-overlay")) {
      setShowLeadsSidebar(false);
      setAddPipelineActive(false);
      setNewPipelineName("");
    }
  };

  const handleAddPipelineClick = () => {
    setAddPipelineActive(true);
  };

  const handlePipelineNameChange = (e) => {
    setNewPipelineName(e.target.value);
  };

  // Pipeline data is now managed by global context
  // No need to fetch here as it's handled by PipelineProvider

  const handlePipelineNameSubmit = async (e) => {
    e.preventDefault();
    setAddPipelineActive(false);
    setNewPipelineName("");
    const newStages = [
      "Initial Contact",
      "Offer Made",
      "Negotiation"
    ];
    
    // Create new pipeline object
    const newPipeline = {
      name: newPipelineName,
      stages: newStages,
    };
    
    // Add to global state
    addPipeline(newPipeline);
    setSelectedPipelineIndex(pipelines.length); // Select the new pipeline
    
    // Save to backend
    try {
      await pipelineAPI.create(newPipelineName, newStages.map(stage => ({
        key: stage.toLowerCase().replace(/ /g, ''),
        label: stage,
        isDefault: false,
      })));
      // Refresh pipelines from backend to get the ID
      await fetchPipelines();
    } catch (error) {
      console.error('Error creating pipeline:', error);
    }
  };

  const handleDotMenuClick = (e) => {
    e.stopPropagation();
    setShowDotMenu((prev) => !prev);
  };

  const handleDotMenuClose = () => {
    setShowDotMenu(false);
  };

  React.useEffect(() => {
    if (showDotMenu) {
      const close = () => setShowDotMenu(false);
      window.addEventListener("click", close);
      return () => window.removeEventListener("click", close);
    }
  }, [showDotMenu]);

  // Context menu handlers
  const handlePipelineRightClick = (e, idx) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY, index: idx });
  };
  const handleCloseContextMenu = () => setContextMenu({ visible: false, x: 0, y: 0, index: null });

  React.useEffect(() => {
    if (contextMenu.visible) {
      const close = () => setContextMenu({ visible: false, x: 0, y: 0, index: null });
      window.addEventListener("click", close);
      return () => window.removeEventListener("click", close);
    }
  }, [contextMenu]);

  const handleRenamePipeline = (idx) => {
    setRenamingIndex(idx);
    setRenameValue(pipelines[idx].name);
    setContextMenu({ visible: false, x: 0, y: 0, index: null });
  };
  const handleRenameChange = (e) => setRenameValue(e.target.value);
  // Rename pipeline and persist to backend
  const handleRenameSubmit = async (e) => {
    e.preventDefault();
    const pipelineId = pipelines[renamingIndex]?.id;
    
    // Update in global state
    updatePipeline(renamingIndex, { ...pipelines[renamingIndex], name: renameValue });
    setRenamingIndex(null);
    setRenameValue("");
    
    if (pipelineId) {
      try {
        await pipelineAPI.rename(pipelineId, renameValue);
        // Refresh pipelines from backend
        await fetchPipelines();
      } catch (error) {
        console.error('Error renaming pipeline:', error);
      }
    }
  };

  // Delete pipeline and persist to backend
  const handleDeletePipeline = async (idx) => {
    if (window.confirm('Are you sure you want to delete this pipeline?')) {
      try {
        await pipelineAPI.delete(pipelines[idx].id);
        await fetchPipelines();
        if (selectedPipelineIndex === idx) {
          setSelectedPipelineIndex(0);
        }
      } catch (error) {
        console.error('Error deleting pipeline:', error);
        alert('Failed to delete pipeline');
      }
    }
  };



  const handleSavePipeline = async (newPipelines) => {
    try {
      console.log('=== handleSavePipeline started ===');
      console.log('newPipelines received:', newPipelines);
      console.log('selectedPipelineIndex:', selectedPipelineIndex);
      console.log('current pipelines state:', pipelines);
      
      // Test backend connectivity first
      console.log('Testing backend connectivity...');
      try {
        const connectivityTest = await fetch('http://localhost:5000/api/pipeline/all');
        if (connectivityTest.ok) {
          const testData = await connectivityTest.json();
          console.log('Backend is running, database test result:', testData);
        } else {
          console.error('Backend responded with error:', connectivityTest.status);
        }
      } catch (connectivityError) {
        console.error('Backend connectivity test failed:', connectivityError);
        console.error('This means the backend server is not running on localhost:5000');
        alert('Backend server is not running. Please start the backend server first.');
        return;
      }
      
      // Save to backend first
      const currentPipeline = newPipelines[selectedPipelineIndex]; // Get the current pipeline
      console.log('currentPipeline to save:', currentPipeline);
      
      if (currentPipeline && currentPipeline.id) {
        // Convert stages to the format expected by the backend
        const columns = currentPipeline.stages.map((stage, index) => ({
          key: stage.toLowerCase().replace(/[^a-z0-9]/g, ''), // Remove all non-alphanumeric characters
          label: stage,
          isDefault: index === 0, // First stage is default
          hints: {} // Empty hints for now
        }));
        
        console.log('Sending columns to backend:', columns);
        console.log('Pipeline ID:', currentPipeline.id);
        console.log('Full request data:', { columns });
        
        try {
          // Save to backend using the pipeline update API
          console.log('=== Making backend API call ===');
          console.log('URL:', `PUT /api/pipeline/${currentPipeline.id}`);
          console.log('Request body:', { name: currentPipeline.name, columns: columns });
          
          const response = await pipelineAPI.update(currentPipeline.id, {
            name: currentPipeline.name, // Add the required name field
            columns: columns
          });
          console.log('Backend response:', response);
          
          // Update local state AFTER successful backend save
          console.log('Updating local state...');
          updatePipelines(newPipelines);
          setShowEditPipeline(false);
          
          // Refresh pipelines from backend to ensure consistency
          await fetchPipelines();
          console.log('Pipeline saved to backend successfully');
          
          // Add a small delay to ensure backend has processed the changes
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Fetch again to ensure we have the latest data
          await fetchPipelines();
          console.log('Second fetch completed after delay');
          
          // Force interface to re-render with new pipeline data
          setPipelineUpdateTrigger(prev => prev + 1);
          console.log('Pipeline update trigger incremented');
          
        } catch (backendError) {
          console.error('Backend save failed, but local state updated:', backendError);
          console.error('Error details:', backendError.response?.data);
          console.error('Error status:', backendError.response?.status);
          console.error('Error message:', backendError.message);
          
          // Even if backend fails, update local state
          console.log('Updating local state despite backend failure...');
          updatePipelines(newPipelines);
          setShowEditPipeline(false);
          
          alert('Pipeline changes saved locally. Backend sync failed - please check your connection.');
        }
      } else {
        console.error('No pipeline ID found:', currentPipeline);
        
        // Update local state even without backend ID
        console.log('Updating local state without backend ID...');
        updatePipelines(newPipelines);
        setShowEditPipeline(false);
        
        alert('Pipeline changes saved locally. No backend ID found for this pipeline.');
      }
      
      console.log('=== handleSavePipeline finished ===');
    } catch (error) {
      console.error('Error in handleSavePipeline:', error);
      alert(`Failed to save pipeline changes: ${error.message}. Please try again.`);
    }
  };

  // In Interface component, update leads state when stage changes:
  const handleLeadStageChange = (newStage) => {
    if (!selectedLead) return;
    setLeads(leads => leads.map(lead =>
      lead === selectedLead ? { ...lead, stage: newStage } : lead
    ));
    setSelectedLead(lead => ({ ...lead, stage: newStage }));
  };

  const handleLeadUpdate = (updatedLead) => {
    console.log('Interface: Received updated lead:', updatedLead);
    console.log('Interface: Current leads before update:', leads);
    
    // Map backend field names to frontend field names for display
    const mappedLead = {
      ...updatedLead,
      contactName: updatedLead.contactName || updatedLead.contact_name,
      contactPhone: updatedLead.contactPhone || updatedLead.contact_phone,
      contactEmail: updatedLead.contactEmail || updatedLead.contact_email,
      contactPosition: updatedLead.contactPosition || updatedLead.contact_position,
      companyName: updatedLead.companyName || updatedLead.company_name,
      companyAddress: updatedLead.companyAddress || updatedLead.company_address,
      amount: updatedLead.amount || updatedLead.sale
    };
    
    setLeads(leads => {
      const newLeads = leads.map(lead => lead.id === updatedLead.id ? mappedLead : lead);
      console.log('Interface: Updated leads with mapped fields:', newLeads);
      return newLeads;
    });
  };

  const handleAddTodo = async () => {
    console.log('handleAddTodo called');
    try {
      await tasksAPI.create({
        title: todoText,
        description: '', // Add description if needed
        due_date: todoDate.toLocaleDateString('en-CA'), // YYYY-MM-DD, matches Calendar filter
        type: todoType
      });
      setShowAddTodoModal(false);
      setTodoText('');
      setTodoType('Follow up');
      setTodoDate(() => {
        const d = new Date();
        d.setHours(0,0,0,0);
        return d;
      });
    } catch (err) {
      console.error('Error in handleAddTodo:', err);
    }
  };

  const handleChangeStageSave = async () => {
    if (!selectedLead) return;
    try {
      await leadsAPI.updateStage(selectedLead.id, changeStageValue);
      setLeads(leads => leads.map(lead =>
        lead.id === selectedLead.id ? { ...lead, stage: changeStageValue } : lead
      ));
      setShowChangeStageModal(false);
    } catch (err) {
      alert('Failed to update stage: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDeleteLeads = async () => {
    for (const id of selectedLeadIds) {
      await leadsAPI.delete(id);
    }
    setLeads(leads => leads.filter(lead => !selectedLeadIds.includes(lead.id)));
    setSelectedLeadIds([]);
    setShowDeleteModal(false);
  };
  // Instead of replacing the main view with Change, render it as a panel/modal:
  useEffect(() => {
    leadsAPI.getAll().then(res => {
      if (res.data && res.data.leads) {
        setLeads(res.data.leads);
        console.log('Fetched leads:', res.data.leads.length); // Debug log
      }
    }).catch(err => {
      console.error('Error fetching leads:', err);
    });
  }, []);

  // When user selects a pipeline:
  const handlePipelineSelect = (idx) => {
    setSelectedPipelineIndex(idx);
    localStorage.setItem('selectedPipelineName', pipelines[idx].name);
  };

  // Add handlers for contact action buttons
  const handleCallClick = (lead) => {
    setContactModalData(lead);
    setContactModalType('call');
    setShowContactModal(true);
  };

  const handleEmailClick = (lead) => {
    setContactModalData(lead);
    setContactModalType('email');
    setShowContactModal(true);
  };

  const handleCloseContactModal = () => {
    setShowContactModal(false);
    setContactModalData(null);
    setContactModalType('');
  };

  // Add copy functionality
  const handleCopyToClipboard = async (text, buttonElement) => {
    try {
      await navigator.clipboard.writeText(text);
      buttonElement.textContent = 'Copied!';
      buttonElement.classList.add('copied');
      setTimeout(() => {
        buttonElement.textContent = 'Copy';
        buttonElement.classList.remove('copied');
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Print functionality
  const handlePrint = () => {
    const printContent = document.createElement('div');
    printContent.innerHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1>${pipelines[selectedPipelineIndex].name} - Lead Report</h1>
        <p>Generated on: ${new Date().toLocaleDateString()}</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Name</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Company</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Stage</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Value</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Contact</th>
            </tr>
          </thead>
          <tbody>
            ${leads.map(lead => `
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${lead.contactName || lead.name || 'N/A'}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${lead.companyName || 'N/A'}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${lead.stage || 'N/A'}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">₹${lead.amount || 0}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${lead.contactPhone || lead.contactEmail || 'N/A'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.close();
    printWindow.print();
  };

  // Export functionality
  const handleExport = () => {
    setShowExportModal(true);
  };

  const handleExportData = () => {
    const currentLeads = leads.filter(lead => {
      const leadPipeline = (lead.pipeline || '').toLowerCase();
      const currentPipeline = (pipelines[selectedPipelineIndex].name || '').toLowerCase();
      return leadPipeline === currentPipeline;
    });

    if (exportFormat === 'csv') {
      const headers = ['Name', 'Company', 'Stage', 'Value', 'Phone', 'Email', 'Address'];
      const csvContent = [
        headers.join(','),
        ...currentLeads.map(lead => [
          `"${(lead.contactName || lead.name || '').replace(/"/g, '""')}"`,
          `"${(lead.companyName || '').replace(/"/g, '""')}"`,
          `"${(lead.stage || '').replace(/"/g, '""')}"`,
          lead.amount || 0,
          `"${(lead.contactPhone || '').replace(/"/g, '""')}"`,
          `"${(lead.contactEmail || '').replace(/"/g, '""')}"`,
          `"${(lead.companyAddress || '').replace(/"/g, '""')}"`
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${pipelines[selectedPipelineIndex].name}_leads_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } else if (exportFormat === 'json') {
      const jsonContent = JSON.stringify(currentLeads, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${pipelines[selectedPipelineIndex].name}_leads_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
    setShowExportModal(false);
  };

  // Import functionality
  const handleImport = () => {
    setShowImportModal(true);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setImportFile(file);
  };

  const handleImportData = async () => {
    if (!importFile) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const content = e.target.result;
        let importedLeads = [];

        if (importFile.name.endsWith('.csv')) {
          const lines = content.split('\n');
          const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
          
          for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
              const values = lines[i].split(',').map(v => v.replace(/"/g, '').trim());
              const lead = {};
              headers.forEach((header, index) => {
                lead[header.toLowerCase().replace(/\s+/g, '')] = values[index] || '';
              });
              importedLeads.push(lead);
            }
            setImportProgress((i / (lines.length - 1)) * 100);
          }
        } else if (importFile.name.endsWith('.json')) {
          importedLeads = JSON.parse(content);
          setImportProgress(100);
        }

        // Process imported leads
        for (const lead of importedLeads) {
          try {
            const mappedLead = {
              name: lead.name || lead.contactname || '',
              contactName: lead.contactname || lead.name || '',
              contactPhone: lead.phone || lead.contactphone || '',
              contactEmail: lead.email || lead.contactemail || '',
              companyName: lead.company || lead.companyname || '',
              companyAddress: lead.address || lead.companyaddress || '',
              amount: lead.value || lead.amount || 0,
              stage: lead.stage || pipelines[selectedPipelineIndex].stages[0],
              pipeline: pipelines[selectedPipelineIndex].name
            };

            await leadsAPI.create(mappedLead);
          } catch (error) {
            console.error('Error importing lead:', error);
          }
        }

        // Refresh leads
        const response = await leadsAPI.getAll();
        if (response.data && response.data.leads) {
          setLeads(response.data.leads);
        }

        setShowImportModal(false);
        setImportFile(null);
        setImportProgress(0);
        alert(`Successfully imported ${importedLeads.length} leads!`);
      } catch (error) {
        console.error('Error processing import:', error);
        alert('Error importing file. Please check the file format.');
      }
    };
    reader.readAsText(importFile);
  };

  // Find duplicates functionality
  const handleFindDuplicates = () => {
    setShowFindDuplicatesModal(true);
    
    // Find duplicates based on email, phone, or name
    const duplicatesFound = [];
    const seen = new Map();

    leads.forEach(lead => {
      const key = lead.contactEmail || lead.contactPhone || lead.contactName;
      if (key && seen.has(key)) {
        duplicatesFound.push([seen.get(key), lead]);
      } else if (key) {
        seen.set(key, lead);
      }
    });

    setDuplicates(duplicatesFound);
  };

  const handleMergeDuplicates = async (originalLead, duplicateLead) => {
    try {
      // Merge duplicate into original
      const mergedLead = {
        ...originalLead,
        contactName: originalLead.contactName || duplicateLead.contactName,
        contactPhone: originalLead.contactPhone || duplicateLead.contactPhone,
        contactEmail: originalLead.contactEmail || duplicateLead.contactEmail,
        companyName: originalLead.companyName || duplicateLead.companyName,
        companyAddress: originalLead.companyAddress || duplicateLead.companyAddress,
        amount: Math.max(originalLead.amount || 0, duplicateLead.amount || 0)
      };

      // Update original lead
      await leadsAPI.update(originalLead.id, mergedLead);
      
      // Delete duplicate lead
      await leadsAPI.delete(duplicateLead.id);
      
      // Refresh leads
      const response = await leadsAPI.getAll();
      if (response.data && response.data.leads) {
        setLeads(response.data.leads);
      }
      
      // Remove from duplicates list
      setDuplicates(duplicates.filter(d => d[0].id !== originalLead.id || d[1].id !== duplicateLead.id));
      
      alert('Duplicates merged successfully!');
    } catch (error) {
      console.error('Error merging duplicates:', error);
      alert('Error merging duplicates. Please try again.');
    }
  };

  // On mount, restore selected pipeline from localStorage if available
  useEffect(() => {
    const savedName = localStorage.getItem('selectedPipelineName');
    if (savedName && pipelines.length > 0) {
      const idx = pipelines.findIndex(p => p.name === savedName);
      if (idx !== -1) setSelectedPipelineIndex(idx);
      else setSelectedPipelineIndex(0);
    } else if (pipelines.length > 0 && selectedPipelineIndex === null) {
      setSelectedPipelineIndex(0); // fallback to first pipeline
    }
  }, [pipelines]);

  // Helper function to check if a field has data
  const hasData = (value) => {
    return value && value.toString().trim() !== '' && value.toString().trim() !== 'N/A';
  };

  // Helper function to get field value with fallback to different naming conventions
  const getFieldValue = (lead, fieldNames) => {
    for (const fieldName of fieldNames) {
      if (hasData(lead[fieldName])) {
        return lead[fieldName];
      }
    }
    return null;
  };

  // Helper function to render contact field only if it has data
  const renderContactField = (label, value, isHighlighted = false, showCopy = false) => {
    if (!hasData(value)) return null;
    
    return (
      <>
        <p><strong>{label}:</strong></p>
        <div className={`contact-value ${isHighlighted ? 'highlight' : ''}`}>
          <span className="contact-text">{value}</span>
          {showCopy && (
            <button 
              className="copy-btn" 
              onClick={(e) => handleCopyToClipboard(value, e.target)}
            >
              Copy
            </button>
          )}
        </div>
      </>
    );
  };

  // Helper function to check if any relevant data exists for the modal type
  const hasRelevantData = (lead, type) => {
    switch (type) {
      case 'call':
        return hasData(getFieldValue(lead, ['contactPhone', 'phone', 'contact_phone']));
      case 'email':
        return hasData(getFieldValue(lead, ['contactEmail', 'email', 'contact_email']));
      default:
        return false;
    }
  };

  if (selectedPipelineIndex === null || !pipelines[selectedPipelineIndex]) return null;
  return (
    <div className="crm-main-wrapper">
      {showEditPipeline && (
        <EditPipeline
          onClose={() => setShowEditPipeline(false)}
          pipelines={pipelines}
          selectedPipelineIndex={selectedPipelineIndex}
          onSave={handleSavePipeline}
        />
      )}
      {showLeadsSidebar && (
        <div className="crm-leads-sidebar-overlay" onClick={handleCloseLeadsSidebar}>
          <div className="crm-leads-sidebar">
            <div className="crm-leads-sidebar-title">LEADS</div>
            <div className="crm-leads-sidebar-section">
              {pipelines.map((pipeline, idx) => (
                <div
                  key={pipeline.name + idx}
                  className={`crm-leads-sidebar-link${selectedPipelineIndex === idx ? ' crm-leads-sidebar-link-active' : ''}`}
                  onClick={() => handlePipelineSelect(idx)}
                  onContextMenu={e => handlePipelineRightClick(e, idx)}
                  style={{marginBottom: 4, position: 'relative'}}
                >
                  {renamingIndex === idx ? (
                    <form onSubmit={handleRenameSubmit} style={{display:'inline'}}>
                      <input
                        value={renameValue}
                        onChange={handleRenameChange}
                        autoFocus
                        onBlur={() => setRenamingIndex(null)}
                        style={{width:'80%', fontSize:'1rem'}}
                      />
                    </form>
                  ) : pipeline.name}
                </div>
              ))}
              {addPipelineActive ? (
                <form className="crm-leads-sidebar-addform" onSubmit={handlePipelineNameSubmit}>
                  <input
                    className="crm-leads-sidebar-addinput"
                    type="text"
                    placeholder="New pipeline name"
                    value={newPipelineName}
                    onChange={handlePipelineNameChange}
                    autoFocus
                  />
                  <button type="submit" className="crm-leads-sidebar-checkbtn"><FaCheck /></button>
                </form>
              ) : (
                <div className="crm-leads-sidebar-add" onClick={handleAddPipelineClick}>
                  <FaPlus className="crm-leads-sidebar-add-icon" /> Add pipeline
                </div>
              )}
            </div>
            <div className="crm-leads-sidebar-footer">All leads</div>
          </div>
        </div>
      )}
      {contextMenu.visible && (
        <div
          style={{
            position: 'fixed',
            top: contextMenu.y,
            left: contextMenu.x,
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: 6,
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            zIndex: 2002,
            minWidth: 120,
            padding: 0,
          }}
        >
          <div
            style={{padding: '10px 18px', cursor: 'pointer', color: '#1abc9c'}}
            onClick={() => handleRenamePipeline(contextMenu.index)}
          >Rename</div>
          <div
            style={{padding: '10px 18px', cursor: pipelines.length === 1 ? 'not-allowed' : 'pointer', color: pipelines.length === 1 ? '#ccc' : '#e74c3c'}}
            onClick={() => pipelines.length > 1 && handleDeletePipeline(contextMenu.index)}
          >Delete</div>
        </div>
      )}
      {showLeadModal && (
        <LeadModal
          onClose={() => setShowLeadModal(false)}
          onAdd={handleAdd}
          pipelines={pipelines}
          selectedPipelineIndex={leadModalPipelineIndex}
          initialStage={leadModalInitialStage}
        />
      )}
      {showReassignModal && (
        <div className="crm-modal-overlay">
          <div className="crm-modal crm-reassign-modal">
            <button className="crm-modal-close" onClick={() => setShowReassignModal(false)}>×</button>
            <div className="crm-modal-title">Change responsible user to</div>
            <input className="crm-modal-input" placeholder="Abhishek" />
            <div className="crm-modal-actions">
              <button className="crm-modal-save">Save</button>
              <button className="crm-modal-cancel" onClick={() => setShowReassignModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {showAddTodoModal && (
        <div className="crm-modal-overlay">
          <div className="crm-modal crm-reassign-modal" style={{minWidth: showTodoAdvanced ? '420px' : '340px', maxWidth: '90vw', padding: '24px 18px 18px 18px'}}>
            <button className="crm-modal-close" onClick={() => { setShowAddTodoModal(false); setShowTodoAdvanced(false); }}>×</button>
            <div className="crm-modal-title" style={{fontSize:'1.1rem',marginBottom:10}}>Add task</div>
            {!showTodoAdvanced ? (
              <div style={{display:'flex',gap:8,marginBottom:18,justifyContent:'flex-start'}}>
                {quickOptions.map(opt => (
                  <button
                    key={opt.key}
                    style={{
                      background: selectedQuick===opt.key ? '#1abc9c' : '#17404e',
                      color:'#fff',
                      border:'1px solid #1abc9c',
                      borderRadius:4,
                      padding:'8px 18px',
                      fontSize: '1rem',
                      cursor:'pointer',
                      fontWeight: selectedQuick===opt.key ? 700 : 500,
                      transition:'background 0.18s',
                      outline: selectedQuick===opt.key ? '2px solid #1abc9c' : 'none'
                    }}
                    onClick={()=>{
                      setSelectedQuick(opt.key);
                      setTodoDate(opt.get());
                    }}
                  >{opt.label}</button>
                ))}
                <button
                  style={{
                    background: selectedQuick==='custom' ? '#1abc9c' : '#17404e',
                    color:'#fff',
                    border:'1px solid #1abc9c',
                    borderRadius:4,
                    padding:'8px 14px',
                    fontSize: '1rem',
                    cursor:'pointer',
                    fontWeight: selectedQuick==='custom' ? 700 : 500,
                    display:'flex',alignItems:'center',gap:6,
                    outline: selectedQuick==='custom' ? '2px solid #1abc9c' : 'none'
                  }}
                  onClick={()=>{
                    setShowTodoAdvanced(true);
                    setSelectedQuick('custom');
                  }}
                ><FaCalendarAlt style={{fontSize:'1.1em'}}/>Custom</button>
              </div>
            ) : (
              <>
                <button style={{background:'none',border:'none',color:'#1abc9c',fontWeight:600,fontSize:'1rem',marginBottom:6,cursor:'pointer',textAlign:'left'}} onClick={()=>setShowTodoAdvanced(false)}>&larr; Back</button>
                <div style={{display:'flex',gap:10,marginBottom:10,justifyContent:'center',alignItems:'flex-start'}}>
                  {/* Calendar */}
                  <div style={{background:'#153a4a',borderRadius:8,padding:'6px 8px',minWidth:180}}>{renderCalendar()}</div>
                  {/* Time Slots */}
                  <div style={{display:'flex',flexDirection:'column',gap:1,background:'#153a4a',borderRadius:8,padding:'6px 4px',minWidth:80,alignItems:'center'}}>
                    <div style={{fontWeight:600,marginBottom:2,fontSize:'0.95rem',color:'#fff'}}>All day</div>
                    {timeSlots.map(slot => (
                      <button key={slot} style={{background:todoTime===slot?'#1abc9c':'#22303c',color:'#fff',border:'none',borderRadius:4,padding:'4px 0',fontSize:'0.92rem',width:64,marginBottom:1,cursor:'pointer'}} onClick={()=>setTodoTime(slot)}>{slot}</button>
                    ))}
                  </div>
                </div>
              </>
            )}
            {/* Show rest of form only if a quick option or custom is selected */}
            {(selectedQuick || showTodoAdvanced) && !showTodoAdvanced && (
              <>
                <input
                  className="crm-modal-input"
                  placeholder="To-do description"
                  value={todoText}
                  onChange={e => setTodoText(e.target.value)}
                  style={{marginBottom:10,fontSize:'1rem'}}
                />
                <select
                  className="crm-modal-input"
                  style={{marginBottom: 14,fontSize:'1rem'}}
                  value={todoType}
                  onChange={e => setTodoType(e.target.value)}
                >
                  <option>Follow up</option>
                  <option>Call</option>
                  <option>Meeting</option>
                  <option>Send email</option>
                  <option>Demo</option>
                  <option>Other</option>
                </select>
                <input
                  className="crm-modal-input"
                  placeholder="Add comment"
                  style={{marginBottom:14,fontSize:'1rem'}}
                />
                <div className="crm-modal-actions">
                  <button type="button" className="crm-modal-save" onClick={handleAddTodo}>Save</button>
                  <button className="crm-modal-cancel" onClick={() => { setShowAddTodoModal(false); setShowTodoAdvanced(false); }}>Cancel</button>
                </div>
              </>
            )}
            {/* If in advanced mode, show form below calendar/time slots */}
            {showTodoAdvanced && (
              <>
                <input
                  className="crm-modal-input"
                  placeholder="To-do description"
                  value={todoText}
                  onChange={e => setTodoText(e.target.value)}
                  style={{marginBottom:10,fontSize:'1rem'}}
                />
                <select
                  className="crm-modal-input"
                  style={{marginBottom: 14,fontSize:'1rem'}}
                  value={todoType}
                  onChange={e => setTodoType(e.target.value)}
                >
                  <option>Follow up</option>
                  <option>Call</option>
                  <option>Meeting</option>
                  <option>Send email</option>
                  <option>Demo</option>
                  <option>Other</option>
                </select>
                <input
                  className="crm-modal-input"
                  placeholder="Add comment"
                  style={{marginBottom:14,fontSize:'1rem'}}
                />
                <div className="crm-modal-actions">
                  <button type="button" className="crm-modal-save" onClick={handleAddTodo}>Save</button>
                  <button className="crm-modal-cancel" onClick={() => { setShowAddTodoModal(false); setShowTodoAdvanced(false); }}>Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {/* Change Stage Modal */}
      {showChangeStageModal && (
        <div className="crm-modal-overlay">
          <div className="crm-modal crm-reassign-modal" style={{minWidth: '420px', maxWidth: '95vw', padding: '32px 28px 24px 28px', position:'relative'}}>
            <button className="crm-modal-close" onClick={() => setShowChangeStageModal(false)}>×</button>
            <div className="crm-modal-title" style={{marginBottom:18}}>Change stage</div>
            <div style={{marginBottom:18}}>
              <div style={{fontWeight:600,marginBottom:6}}>Pipeline</div>
              <div style={{position:'relative'}}>
                <input
                  className="crm-modal-input"
                  value={changeStageValue}
                  readOnly
                  style={{cursor:'pointer',background:'#17404e',color:'#fff',fontWeight:600}}
                  onClick={()=>setShowStageDropdown(s=>!s)}
                />
                {showStageDropdown && (
                  <div style={{
                    position:'absolute',
                    top:'110%',
                    left:0,
                    width:'100%',
                    background:'#fff',
                    borderRadius:8,
                    boxShadow:'0 4px 16px rgba(0,0,0,0.10)',
                    border:'1px solid #e0e0e0',
                    zIndex:1001,
                    overflow:'hidden',
                    marginTop:2
                  }}>
                    {pipelines[selectedPipelineIndex].stages.map((stage, idx) => (
                      <div
                        key={stage}
                        style={{
                          background: stageColors[idx % stageColors.length],
                          color:'#17404e',
                          padding:'10px 18px',
                          fontSize:'1rem',
                          fontWeight: changeStageValue===stage ? 700 : 500,
                          display:'flex',alignItems:'center',gap:10,
                          cursor:'pointer',
                          borderBottom: idx===pipelines[selectedPipelineIndex].stages.length-1 ? 'none' : '1px solid #e0e0e0',
                        }}
                        onClick={()=>{
                          setChangeStageValue(stage);
                          setShowStageDropdown(false);
                        }}
                      >
                        {changeStageValue===stage && <FaCheckIcon style={{color:'#2980ef',marginRight:6}}/>}
                        {stage}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="crm-modal-actions">
              <button className="crm-modal-save" onClick={handleChangeStageSave}>Save</button>
              <button className="crm-modal-cancel" onClick={() => setShowChangeStageModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="crm-modal-overlay">
          <div className="crm-modal crm-reassign-modal" style={{minWidth: '420px', maxWidth: '95vw', padding: '32px 28px 24px 28px', position:'relative'}}>
            <button className="crm-modal-close" onClick={() => setShowDeleteModal(false)}>×</button>
            <div className="crm-modal-title" style={{marginBottom:18}}>Delete elements</div>
            <div style={{marginBottom:18, color:'#fff', fontSize:'1.08rem'}}>
              Are you sure you want to delete selected elements?<br/><br/>
              <span style={{fontSize:'0.98rem', color:'#bfc5c9'}}>
                All data associated with the selected elements will be also deleted.<br/>
                To recover deleted elements, view the "Deleted" filter state in List view.
              </span>
            </div>
            <div className="crm-modal-actions">
              <button className="crm-modal-save" style={{background:'#e74c3c'}} onClick={handleDeleteLeads}>Delete</button>
              <button className="crm-modal-cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {showTagsModal && (
        <div className="crm-modal-overlay">
          <div className="crm-modal crm-reassign-modal" style={{minWidth: '420px', maxWidth: '95vw', padding: '32px 28px 24px 28px', position:'relative'}}>
            <button className="crm-modal-close" onClick={() => setShowTagsModal(false)}>×</button>
            <div className="crm-modal-title" style={{marginBottom:18}}>Manage tags</div>
            <input
              className="crm-modal-input"
              placeholder="Add tag"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && tagInput.trim()) {
                  setTags([...tags, tagInput.trim()]);
                  setTagInput("");
                  e.preventDefault();
                }
              }}
              style={{marginBottom:14}}
            />
            <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:18}}>
              {tags.map((tag, idx) => (
                <span key={idx} style={{background:'#22303c',color:'#fff',borderRadius:6,padding:'6px 14px',fontSize:'1rem',fontWeight:600}}>{tag}</span>
              ))}
            </div>
            <div className="crm-modal-actions">
              <button className="crm-modal-save" onClick={() => setShowTagsModal(false)}>Save</button>
              <button className="crm-modal-cancel" onClick={() => setShowTagsModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <main className="crm-main">
        <header className="crm-topbar">
          <div className="crm-topbar-left">
            <button className="crm-menu-btn"><FaBars /></button>
            <div className="crm-leads-dropdown" onClick={handleLeadsDropdownClick} tabIndex={0} style={{cursor:'pointer'}}>
              <span className="crm-leads-title">{pipelines[selectedPipelineIndex].name}</span>
              <FaChevronDown className="crm-leads-dropdown-icon" />
            </div>
            <input className="crm-search" placeholder="Search and filter" />
          </div>
          <div className="crm-topbar-center">
            <span className="crm-total-leads">1 lead: ₹0</span>
          </div>
          <div className="crm-topbar-right">
            <div className="crm-dotmenu-wrapper" style={{position:'relative'}}>
              <button className="crm-dotmenu-btn" onClick={handleDotMenuClick}><FaEllipsisV /></button>
              {showDotMenu && (
                <div className="crm-dotmenu-dropdown">
                  <div className="crm-dotmenu-item" onClick={() => setShowEditPipeline(true)}><FaEdit className="crm-dotmenu-icon" /> Edit pipeline</div>
                  <div className="crm-dotmenu-item" onClick={handlePrint}><FaPrint className="crm-dotmenu-icon" /> Print</div>
                  <div className="crm-dotmenu-item" onClick={() => setShowListSettings(true)}><FaCogs className="crm-dotmenu-icon" /> Invoice settings</div>
                  <div className="crm-dotmenu-item" onClick={handleImport}><FaArrowDown className="crm-dotmenu-icon" /> Import</div>
                  <div className="crm-dotmenu-item" onClick={handleExport}><FaArrowUp className="crm-dotmenu-icon" /> Export</div>
                  <div className="crm-dotmenu-item" onClick={handleFindDuplicates}><FaClone className="crm-dotmenu-icon" /> Find duplicates</div>
                </div>
              )}
            </div>
            
            <button className="crm-new-lead-btn" onClick={() => setShowLeadModal(true)}>+ NEW LEAD</button>
          </div>
        </header>
        {showListSettings ? (
          <div className="crm-action-bar">
            <button className="crm-action-btn" aria-label="Reassign" onClick={() => setShowReassignModal(true)}><FaUserCheck style={{marginRight:8}}/>Re-Assign</button>
            <button className="crm-action-btn" aria-label="Add to-do" onClick={() => setShowAddTodoModal(true)}><FaPlusSquare style={{marginRight:8}}/>Add To-Do</button>
            <button className="crm-action-btn" aria-label="Change stage" onClick={() => setShowChangeStageModal(true)}><FaExchangeAlt style={{marginRight:8}}/>Change Stage</button>
            <button className="crm-action-btn" aria-label="Delete" onClick={() => setShowDeleteModal(true)}><FaTrash style={{marginRight:8}}/>Delete</button>
            <button className="crm-action-btn" aria-label="Edit tags" onClick={() => setShowTagsModal(true)}><FaTags style={{marginRight:8}}/>Edit Tags</button>
            <button className="crm-actionbar-close" aria-label="Close action bar" onClick={() => setShowListSettings(false)}><FaTimes /></button>
          </div>
        ) : (
        <div className="crm-summary-bar">
          <div className="crm-summary-item"><span className="crm-summary-label">With tasks due today:</span> <span className="crm-summary-green">0</span></div>
          <div className="crm-summary-item"><span className="crm-summary-label">Without tasks assigned:</span> <span className="crm-summary-orange">1</span></div>
          <div className="crm-summary-item"><span className="crm-summary-label">With overdue tasks:</span> <span className="crm-summary-red">0</span></div>
          <div className="crm-summary-item"><span className="crm-summary-label">New today / yesterday:</span> <span className="crm-summary-blue">1 / 0</span></div>
          <div className="crm-summary-item crm-summary-right">Prospective sales <span className="crm-summary-nodata">No data</span></div>
        </div>
        )}
        <section className="crm-pipeline">
          {pipelines[selectedPipelineIndex] && pipelines[selectedPipelineIndex].stages.map((stage, idx) => (
            <div className="crm-pipeline-stage" key={`${stage}-${pipelineUpdateTrigger}-${idx}`}>
              <div className="crm-pipeline-stage-title">{stage.toUpperCase()}</div>
              <div className="crm-pipeline-stage-info">{
                leads.filter(lead => {
                  const leadStage = lead.stage || '';
                  const pipelineStage = stage || '';
                  return leadStage.toLowerCase() === pipelineStage.toLowerCase();
                }).length
              } lead(s): ₹0</div>
              {openFormIndex === idx ? (
                showAdvanced ? (
                  <AdvancedFieldForm onCancel={handleCancel} />
                ) : (
                  <QuickAddForm
                    onCancel={handleCancel}
                    onAdd={(form) => handleAdd(form, pipelines[selectedPipelineIndex].stages[idx])}
                    onSettings={handleSettings}
                  />
                )
              ) : (
                <div className="crm-quick-add" onClick={() => handleQuickAddClick(idx)}>
                  Quick add
                </div>
              )}
              {/* Render leads for this stage */}
              <div className="crm-pipeline-stage-cards">
              {leads.filter(lead => {
                const leadStage = (lead.stage || '').toLowerCase();
                const pipelineStage = (stage || '').toLowerCase();
                const leadPipeline = (lead.pipeline || '').toLowerCase();
                const currentPipeline = (pipelines[selectedPipelineIndex].name || '').toLowerCase();
                return leadStage === pipelineStage && leadPipeline === currentPipeline;
              }).map((lead, i) => (
                <div
                  className="crm-lead-card crm-lead-card-compact"
                  key={i}
                  style={{position:'relative', padding: '2px 6px', marginBottom: '2px', background: '#fff', border: '1px solid #e0e0e0', borderRadius: '3px', cursor: 'pointer', maxWidth: '201px'}}
                  onClick={() => {
                    setSelectedLead(lead);
                    setShowLeadDetail(true);
                  }}
                >
                  {showListSettings && (
                    <input
                      type="checkbox"
                      className="crm-lead-select-checkbox"
                      style={{position: 'absolute', top: 2, left: 2, zIndex: 2}}
                      checked={selectedLeadIds.includes(lead.id)}
                      onChange={e => {
                        setSelectedLeadIds(ids =>
                          e.target.checked
                            ? [...ids, lead.id]
                            : ids.filter(id => id !== lead.id)
                        );
                      }}
                    />
                  )}
                  
                  {/* Priority Indicator */}
                  <div className={`crm-lead-card-priority crm-lead-card-priority-${lead.priority || 'low'}`} style={{position: 'absolute', top: 2, right: 2, width: '3px', height: '3px', borderRadius: '50%'}}></div>
                  
                  {/* Badge for new leads */}
                  {lead.createdAt && new Date(lead.createdAt) > new Date(Date.now() - 24*60*60*1000) && (
                    <div style={{position: 'absolute', top: -1, left: -1, background: '#1abc9c', color: 'white', fontSize: '7px', padding: '0px 2px', borderRadius: '4px', fontWeight: 'bold'}}>New</div>
                  )}
                  
                  <div style={{display: 'flex', alignItems: 'center', gap: '3px'}}>
                    <div style={{width: '14px', height: '14px', borderRadius: '50%', background: '#1abc9c', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7px', fontWeight: 'bold', flexShrink: 0}}>
                      {lead.contactName ? lead.contactName[0].toUpperCase() : 'L'}
                    </div>
                    <div style={{flex: 1, minWidth: 0}}>
                      <div style={{fontWeight: '600', fontSize: '11px', color: '#333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '1.0'}}>
                        {lead.contactName || lead.name || lead.company || 'No Name'}
                      </div>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0px'}}>
                        <div style={{fontSize: '9px', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '50%'}}>
                          {lead.companyName || 'No Company'}
                        </div>
                        <div style={{fontSize: '9px', color: '#1abc9c', fontWeight: '600', marginLeft: '1px'}}>
                          {getDotData(lead, activeDotIndex[lead.id] || 0).value}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
              {/* Sample lead card in each stage */}
              {/* This section is now redundant as leads are rendered directly */}
              {/* {stage === 'Initial Contact' && leadStage === 'Initial contact' && (
                <div className="crm-lead-card crm-lead-card-modern" onClick={() => setShowLeadDetail(true)} style={{cursor:'pointer', position:'relative'}}>
                  <div className="crm-lead-card-header">
                    <div className="crm-lead-card-avatar">A</div>
                    <div className="crm-lead-card-maininfo">
                      <div className="crm-lead-card-title">Abhishek Kumar</div>
                      <div className="crm-lead-card-company">Bhardwaj Traders</div>
                    </div>
                    <div className="crm-lead-card-status crm-lead-card-status-new">New</div>
                  </div>
                  <div className="crm-lead-card-row">
                    <span className="crm-lead-card-label">Value:</span> <span className="crm-lead-card-value">₹0</span>
                  </div>
                  <div className="crm-lead-card-row">
                    <span className="crm-lead-card-label">Contact:</span> <span className="crm-lead-card-contact">09625613008</span>
                  </div>
                  <div className="crm-lead-card-progress">
                    <div className="crm-lead-card-progress-dot crm-lead-card-progress-dot-active" />
                    <div className="crm-lead-card-progress-dot" />
                    <div className="crm-lead-card-progress-dot" />
                  </div>
                  <div className="crm-lead-card-actions">
                    <span title="Call" className="crm-lead-card-action">📞</span>
                    <span title="Email" className="crm-lead-card-action">✉️</span>
                  </div>
                </div>
              )} */}
              {/* {stage === 'Discussions' && leadStage === 'Discussions' && (
                <div className="crm-lead-card" onClick={() => setShowLeadDetail(true)} style={{cursor:'pointer'}}>
                  <div className="crm-lead-card-title">Lead #3752044</div>
                  <div className="crm-lead-card-footer">
                    <span>Today 1:17PM</span>
                    <span className="crm-lead-card-tasks">No Tasks</span>
                  </div>
                </div>
              )} */}
              {/* {stage === 'Decision Making' && leadStage === 'Decision making' && (
                <div className="crm-lead-card" onClick={() => setShowLeadDetail(true)} style={{cursor:'pointer'}}>
                  <div className="crm-lead-card-title">Lead #3752044</div>
                  <div className="crm-lead-card-footer">
                    <span>Today 1:17PM</span>
                    <span className="crm-lead-card-tasks">No Tasks</span>
                  </div>
                </div>
              )} */}
              {/* {stage === 'Contract Discussion' && leadStage === 'Contract discussion' && (
                <div className="crm-lead-card" onClick={() => setShowLeadDetail(true)} style={{cursor:'pointer'}}>
                  <div className="crm-lead-card-title">Lead #3752044</div>
                  <div className="crm-lead-card-footer">
                    <span>Today 1:17PM</span>
                    <span className="crm-lead-card-tasks">No Tasks</span>
                  </div>
                </div>
              )} */}
              {/* {stage === 'deal - won' && leadStage === 'deal - won' && (
                <div className="crm-lead-card" onClick={() => setShowLeadDetail(true)} style={{cursor:'pointer'}}>
                  <div className="crm-lead-card-title">Lead #3752044</div>
                  <div className="crm-lead-card-footer">
                    <span>Today 1:17PM</span>
                    <span className="crm-lead-card-tasks">No Tasks</span>
                  </div>
                </div>
              )} */}
              {/* {stage === 'deal - lost' && leadStage === 'deal - lost' && (
                <div className="crm-lead-card" onClick={() => setShowLeadDetail(true)} style={{cursor:'pointer'}}>
                  <div className="crm-lead-card-title">Lead #3752044</div>
                  <div className="crm-lead-card-footer">
                    <span>Today 1:17PM</span>
                    <span className="crm-lead-card-tasks">No Tasks</span>
                  </div>
                </div>
              )} */}
            </div>
          ))}
        </section>
      </main>
      {showLeadDetail && selectedLead && (
        <div className="crm-lead-detail-overlay">
          <Change
            onBack={() => setShowLeadDetail(false)}
            lead={selectedLead}
            stage={selectedLead.stage}
            setStage={handleLeadStageChange}
            timeline={timeline}
            onLeadUpdate={handleLeadUpdate}
          />
        </div>
      )}
      {showContactModal && contactModalData && (
        <div className="crm-modal-overlay">
          <div className="crm-modal crm-contact-modal">
            <button className="crm-modal-close" onClick={handleCloseContactModal}>×</button>
            <div className="crm-modal-title">
              {contactModalType === 'call' && '📞 Call Information'}
              {contactModalType === 'email' && '✉️ Email Information'}
            </div>
            <div className="crm-modal-content">
              {contactModalType === 'call' && (
                <div className="crm-contact-info">
                  {!hasRelevantData(contactModalData, 'call') ? (
                    <div className="no-data-message">
                      <p>📞 No phone number available for this lead.</p>
                      <p>Please add a phone number when creating or editing the lead.</p>
                    </div>
                  ) : (
                    <>
                      {renderContactField('Name', getFieldValue(contactModalData, ['contactName', 'name', 'contact_name']))}
                      {renderContactField('Phone Number', getFieldValue(contactModalData, ['contactPhone', 'phone', 'contact_phone']), true, true)}
                      {renderContactField('Email', getFieldValue(contactModalData, ['contactEmail', 'email', 'contact_email']))}
                      {renderContactField('Company', getFieldValue(contactModalData, ['companyName', 'company_name']))}
                      {renderContactField('Address', getFieldValue(contactModalData, ['companyAddress', 'company_address']))}
                    </>
                  )}
                </div>
              )}
              {contactModalType === 'email' && (
                <div className="crm-contact-info">
                  {!hasRelevantData(contactModalData, 'email') ? (
                    <div className="no-data-message">
                      <p>✉️ No email address available for this lead.</p>
                      <p>Please add an email address when creating or editing the lead.</p>
                    </div>
                  ) : (
                    <>
                      {renderContactField('Name', getFieldValue(contactModalData, ['contactName', 'name', 'contact_name']))}
                      {renderContactField('Email Address', getFieldValue(contactModalData, ['contactEmail', 'email', 'contact_email']), true, true)}
                      {renderContactField('Phone', getFieldValue(contactModalData, ['contactPhone', 'phone', 'contact_phone']))}
                      {renderContactField('Company', getFieldValue(contactModalData, ['companyName', 'company_name']))}
                      {renderContactField('Address', getFieldValue(contactModalData, ['companyAddress', 'company_address']))}
                    </>
                  )}
                </div>
              )}
            </div>
            <div className="crm-modal-actions">
              <button className="crm-modal-save" onClick={handleCloseContactModal}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="crm-modal-overlay">
          <div className="crm-modal crm-reassign-modal" style={{minWidth: '500px', maxWidth: '95vw', padding: '32px 28px 24px 28px'}}>
            <button className="crm-modal-close" onClick={() => { setShowImportModal(false); setImportFile(null); setImportProgress(0); }}>×</button>
            <div className="crm-modal-title" style={{marginBottom:18}}>Import Leads</div>
            <div style={{marginBottom:18}}>
              <p style={{color:'#fff', marginBottom:12}}>Select a CSV or JSON file to import leads:</p>
              <input
                type="file"
                accept=".csv,.json"
                onChange={handleFileSelect}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px dashed #1abc9c',
                  borderRadius: '8px',
                  background: '#17404e',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              />
              {importFile && (
                <div style={{marginTop:12, color:'#1abc9c', fontSize:'0.9rem'}}>
                  Selected: {importFile.name}
                </div>
              )}
              {importProgress > 0 && (
                <div style={{marginTop:12}}>
                  <div style={{color:'#fff', marginBottom:6}}>Importing... {Math.round(importProgress)}%</div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    background: '#22303c',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${importProgress}%`,
                      height: '100%',
                      background: '#1abc9c',
                      transition: 'width 0.3s ease'
                    }}></div>
                  </div>
                </div>
              )}
            </div>
            <div className="crm-modal-actions">
              <button 
                className="crm-modal-save" 
                onClick={handleImportData}
                disabled={!importFile}
                style={{opacity: importFile ? 1 : 0.5, cursor: importFile ? 'pointer' : 'not-allowed'}}
              >
                Import
              </button>
              <button className="crm-modal-cancel" onClick={() => { setShowImportModal(false); setImportFile(null); setImportProgress(0); }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="crm-modal-overlay">
          <div className="crm-modal crm-reassign-modal" style={{minWidth: '400px', maxWidth: '95vw', padding: '32px 28px 24px 28px'}}>
            <button className="crm-modal-close" onClick={() => setShowExportModal(false)}>×</button>
            <div className="crm-modal-title" style={{marginBottom:18}}>Export Leads</div>
            <div style={{marginBottom:18}}>
              <p style={{color:'#fff', marginBottom:12}}>Choose export format:</p>
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                className="crm-modal-input"
                style={{marginBottom:12}}
              >
                <option value="csv">CSV (Excel compatible)</option>
                <option value="json">JSON (Data format)</option>
              </select>
              <div style={{color:'#bfc5c9', fontSize:'0.9rem'}}>
                Exporting {leads.filter(lead => {
                  const leadPipeline = (lead.pipeline || '').toLowerCase();
                  const currentPipeline = (pipelines[selectedPipelineIndex].name || '').toLowerCase();
                  return leadPipeline === currentPipeline;
                }).length} leads from {pipelines[selectedPipelineIndex].name}
              </div>
            </div>
            <div className="crm-modal-actions">
              <button className="crm-modal-save" onClick={handleExportData}>Export</button>
              <button className="crm-modal-cancel" onClick={() => setShowExportModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Find Duplicates Modal */}
      {showFindDuplicatesModal && (
        <div className="crm-modal-overlay">
          <div className="crm-modal crm-reassign-modal" style={{minWidth: '600px', maxWidth: '95vw', padding: '32px 28px 24px 28px', maxHeight: '80vh', overflow: 'auto'}}>
            <button className="crm-modal-close" onClick={() => setShowFindDuplicatesModal(false)}>×</button>
            <div className="crm-modal-title" style={{marginBottom:18}}>Find Duplicates</div>
            <div style={{marginBottom:18}}>
              {duplicates.length === 0 ? (
                <div style={{color:'#1abc9c', textAlign:'center', padding:'20px'}}>
                  🎉 No duplicates found! Your data is clean.
                </div>
              ) : (
                <div>
                  <p style={{color:'#fff', marginBottom:12}}>Found {duplicates.length} duplicate pairs:</p>
                  {duplicates.map(([original, duplicate], index) => (
                    <div key={index} style={{
                      border: '1px solid #22303c',
                      borderRadius: '8px',
                      padding: '16px',
                      marginBottom: '12px',
                      background: '#17404e'
                    }}>
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
                        <span style={{color:'#1abc9c', fontWeight:600}}>Duplicate Pair #{index + 1}</span>
                        <button
                          onClick={() => handleMergeDuplicates(original, duplicate)}
                          style={{
                            background: '#1abc9c',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '6px 12px',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                          }}
                        >
                          Merge
                        </button>
                      </div>
                      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
                        <div>
                          <div style={{color:'#1abc9c', fontWeight:600, marginBottom:4}}>Original Lead</div>
                          <div style={{color:'#fff', fontSize:'0.9rem'}}>
                            <div>Name: {original.contactName || original.name || 'N/A'}</div>
                            <div>Email: {original.contactEmail || 'N/A'}</div>
                            <div>Phone: {original.contactPhone || 'N/A'}</div>
                            <div>Company: {original.companyName || 'N/A'}</div>
                          </div>
                        </div>
                        <div>
                          <div style={{color:'#e74c3c', fontWeight:600, marginBottom:4}}>Duplicate Lead</div>
                          <div style={{color:'#fff', fontSize:'0.9rem'}}>
                            <div>Name: {duplicate.contactName || duplicate.name || 'N/A'}</div>
                            <div>Email: {duplicate.contactEmail || 'N/A'}</div>
                            <div>Phone: {duplicate.contactPhone || 'N/A'}</div>
                            <div>Company: {duplicate.companyName || 'N/A'}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="crm-modal-actions">
              <button className="crm-modal-cancel" onClick={() => setShowFindDuplicatesModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
