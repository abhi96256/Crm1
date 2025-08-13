import React, { useState, useRef, useEffect } from "react";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import "./EditPipeline.css";

const colorPalette = [
  { name: "blue", code: "#e3f1ff" },
  { name: "yellow", code: "#fff9c4" },
  { name: "orange", code: "#ffe0b2" },
  { name: "pink", code: "#ffd6d6" },
  { name: "green", code: "#e0ffd6" },
  { name: "grey", code: "#f0f0f0" },
  { name: "cyan", code: "#b2f7f7" },
  { name: "purple", code: "#e3b2f7" },
  { name: "red", code: "#ffb2b2" },
  { name: "teal", code: "#b2ffe3" },
  { name: "lime", code: "#eaffb2" },
  { name: "violet", code: "#d6b2ff" },
  { name: "deepblue", code: "#b2d6ff" },
  { name: "deepgreen", code: "#b2ffd6" },
  { name: "deepyellow", code: "#fff7b2" },
  { name: "deeppink", code: "#ffb2e3" },
  { name: "deepgrey", code: "#d6d6d6" },
  { name: "deeporange", code: "#ffdcb2" },
  { name: "deepred", code: "#ffb2b2" },
  { name: "deepteal", code: "#b2fff7" },
];

const templates = [
  {
    name: "Custom",
    activeStages: [
      { label: "Initial contact", color: "blue" },
      { label: "Discussions", color: "yellow" },
      { label: "Decision making", color: "orange" },
      { label: "Contract discussion", color: "pink" },
    ],
    closedStages: [
      { label: "Deal - won", color: "green" },
      { label: "Deal - lost", color: "grey" },
    ],
  },
  {
    name: "Online store",
    activeStages: [
      { label: "Contacted", color: "blue" },
      { label: "New inquiry", color: "yellow" },
      { label: "Invoice sent", color: "orange" },
      { label: "Ready to ship", color: "pink" },
      { label: "Delivered", color: "blue" },
    ],
    closedStages: [
      { label: "Order complete", color: "green" },
      { label: "Order abandoned", color: "grey" },
    ],
  },
  {
    name: "Consulting",
    activeStages: [
      { label: "Contacted", color: "blue" },
      { label: "Qualified", color: "yellow" },
      { label: "Nurturing", color: "orange" },
      { label: "Pitch", color: "pink" },
      { label: "Negotiation", color: "blue" },
      { label: "Invoice sent", color: "green" },
    ],
    closedStages: [
      { label: "Close-win", color: "green" },
      { label: "Close-lose", color: "grey" },
    ],
  },
  {
    name: "Services",
    activeStages: [
      { label: "Contacted", color: "blue" },
      { label: "Request processed", color: "yellow" },
      { label: "Service booked", color: "orange" },
      { label: "Specialist assigned", color: "pink" },
      { label: "Invoice sent", color: "blue" },
    ],
    closedStages: [
      { label: "Service rendered", color: "green" },
      { label: "Canceled", color: "grey" },
    ],
  },
  {
    name: "Marketing",
    activeStages: [
      { label: "Qualified", color: "blue" },
      { label: "Call booked", color: "yellow" },
      { label: "Preparing proposal", color: "orange" },
      { label: "Proposal sent", color: "pink" },
      { label: "Follow up", color: "blue" },
      { label: "Invoice sent", color: "green" },
    ],
    closedStages: [
      { label: "Deal - won", color: "green" },
      { label: "Deal - lost", color: "grey" },
    ],
  },
  {
    name: "Travel agency",
    activeStages: [
      { label: "Contacted", color: "blue" },
      { label: "Request processed", color: "yellow" },
      { label: "Itinerary sent", color: "orange" },
      { label: "Contract sent", color: "pink" },
      { label: "Invoice sent", color: "blue" },
    ],
    closedStages: [
      { label: "Paid", color: "green" },
      { label: "Canceled", color: "grey" },
    ],
  },
];

const colorClass = {
  blue: "editpipeline-stage-blue",
  yellow: "editpipeline-stage-yellow",
  orange: "editpipeline-stage-orange",
  pink: "editpipeline-stage-pink",
  green: "editpipeline-stage-green",
  grey: "editpipeline-stage-grey",
  cyan: "editpipeline-stage-cyan",
  purple: "editpipeline-stage-purple",
  red: "editpipeline-stage-red",
  teal: "editpipeline-stage-teal",
  lime: "editpipeline-stage-lime",
  violet: "editpipeline-stage-violet",
  deepblue: "editpipeline-stage-deepblue",
  deepgreen: "editpipeline-stage-deepgreen",
  deepyellow: "editpipeline-stage-deepyellow",
  deeppink: "editpipeline-stage-deeppink",
  deepgrey: "editpipeline-stage-deepgrey",
  deeporange: "editpipeline-stage-deeporange",
  deepred: "editpipeline-stage-deepred",
  deepteal: "editpipeline-stage-deepteal",
};

export default function EditPipeline({ onClose, pipelines, selectedPipelineIndex, onSave }) {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [editingColorIdx, setEditingColorIdx] = useState(null);
  
  // Use actual pipeline data instead of hardcoded templates
  const [templateData, setTemplateData] = useState(() => {
    // Convert actual pipeline data to template format
    const currentPipeline = pipelines[selectedPipelineIndex];
    if (!currentPipeline) return templates;
    
    // Create template from actual pipeline data
    const pipelineTemplate = {
      name: currentPipeline.name,
      activeStages: currentPipeline.stages
        .filter(stage => 
          !stage.toLowerCase().includes('deal - won') && 
          !stage.toLowerCase().includes('deal - lost') &&
          !stage.toLowerCase().includes('deal won') && 
          !stage.toLowerCase().includes('deal lost')
        )
        .map((stage, index) => ({
          label: stage,
          color: Object.keys(colorClass)[index % Object.keys(colorClass).length]
        })),
      closedStages: currentPipeline.stages
        .filter(stage => 
          stage.toLowerCase().includes('deal - won') || 
          stage.toLowerCase().includes('deal - lost') ||
          stage.toLowerCase().includes('deal won') || 
          stage.toLowerCase().includes('deal lost')
        )
        .map((stage, index) => ({
          label: stage,
          color: stage.toLowerCase().includes('won') ? 'green' : 'grey'
        }))
    };
    
    return [pipelineTemplate, ...templates.slice(1)]; // Keep other templates as options
  });
  
  const template = templateData[selectedTemplate];
  const paletteRef = useRef(null);
  const pencilRefs = useRef([]);
  const [addingStage, setAddingStage] = useState(false);
  const [newStageName, setNewStageName] = useState("");
  const [newStageColor, setNewStageColor] = useState("blue");
  
  // Drag and drop state
  const [draggedStage, setDraggedStage] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Save loading state
  const [isSaving, setIsSaving] = useState(false);

  // Update template data when pipeline changes
  useEffect(() => {
    const currentPipeline = pipelines[selectedPipelineIndex];
    if (!currentPipeline) return;
    
    // Create template from actual pipeline data
    const pipelineTemplate = {
      name: currentPipeline.name,
      activeStages: currentPipeline.stages
        .filter(stage => 
          !stage.toLowerCase().includes('deal - won') && 
          !stage.toLowerCase().includes('deal - lost') &&
          !stage.toLowerCase().includes('deal won') && 
          !stage.toLowerCase().includes('deal lost')
        )
        .map((stage, index) => ({
          label: stage,
          color: Object.keys(colorClass)[index % Object.keys(colorClass).length]
        })),
      closedStages: currentPipeline.stages
        .filter(stage => 
          stage.toLowerCase().includes('deal - won') || 
          stage.toLowerCase().includes('deal - lost') ||
          stage.toLowerCase().includes('deal won') || 
          stage.toLowerCase().includes('deal lost')
        )
        .map((stage, index) => ({
          label: stage,
          color: stage.toLowerCase().includes('won') ? 'green' : 'grey'
        }))
    };
    
    setTemplateData([pipelineTemplate, ...templates.slice(1)]);
  }, [pipelines, selectedPipelineIndex]);

  // Cleanup effect to remove duplicates from active stages
  useEffect(() => {
    if (templateData.length > 0 && templateData[selectedTemplate]) {
      const currentTemplate = templateData[selectedTemplate];
      const hasDuplicates = currentTemplate.activeStages.some(stage => 
        stage.label.toLowerCase().includes('deal - won') || 
        stage.label.toLowerCase().includes('deal - lost') ||
        stage.label.toLowerCase().includes('deal won') || 
        stage.label.toLowerCase().includes('deal lost')
      );
      
      if (hasDuplicates) {
        setTemplateData(prev => prev.map((tpl, idx) => {
          if (idx !== selectedTemplate) return tpl;
          return {
            ...tpl,
            activeStages: tpl.activeStages.filter(stage => 
              !stage.label.toLowerCase().includes('deal - won') && 
              !stage.label.toLowerCase().includes('deal - lost') &&
              !stage.label.toLowerCase().includes('deal won') && 
              !stage.label.toLowerCase().includes('deal lost')
            )
          };
        }));
      }
    }
  }, [templateData, selectedTemplate]);

  // Force immediate cleanup on mount
  useEffect(() => {
    setTemplateData(prev => prev.map((tpl, idx) => {
      if (idx !== selectedTemplate) return tpl;
      return {
        ...tpl,
        activeStages: tpl.activeStages.filter(stage => 
          !stage.label.toLowerCase().includes('deal - won') && 
          !stage.label.toLowerCase().includes('deal - lost') &&
          !stage.label.toLowerCase().includes('deal won') && 
          !stage.label.toLowerCase().includes('deal lost')
        )
      };
    }));
  }, []);

  useEffect(() => {
    if (editingColorIdx === null) return;
    function handleClick(e) {
      // If click is inside palette or the pencil icon, do nothing
      if (
        paletteRef.current && paletteRef.current.contains(e.target)
      ) return;
      if (
        pencilRefs.current[editingColorIdx] && pencilRefs.current[editingColorIdx].contains(e.target)
      ) return;
      setEditingColorIdx(null);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [editingColorIdx]);

  const handleColorEdit = (idx) => {
    setEditingColorIdx(idx === editingColorIdx ? null : idx);
  };

  const handleColorSelect = (stageIdx, colorName) => {
    setTemplateData((prev) => {
      const newTemplates = prev.map((tpl, tIdx) => {
        if (tIdx !== selectedTemplate) return tpl;
        return {
          ...tpl,
          activeStages: tpl.activeStages.map((stage, sIdx) =>
            sIdx === stageIdx ? { ...stage, color: colorName } : stage
          ),
        };
      });
      return newTemplates;
    });
    setEditingColorIdx(null);
  };

  const handleDeleteStage = (stageIdx) => {
    setTemplateData((prev) => {
      const newTemplates = prev.map((tpl, tIdx) => {
        if (tIdx !== selectedTemplate) return tpl;
        return {
          ...tpl,
          activeStages: tpl.activeStages.filter((_, sIdx) => sIdx !== stageIdx),
        };
      });
      return newTemplates;
    });
    if (editingColorIdx === stageIdx) setEditingColorIdx(null);
  };

  const handleAddStageClick = () => {
    setAddingStage(true);
    setNewStageName("");
    setNewStageColor("blue");
    setEditingColorIdx(template.activeStages.length); // open color picker for new stage
  };

  const handleNewStageNameChange = (e) => {
    setNewStageName(e.target.value);
  };

  const handleNewStageNameSave = () => {
    if (!newStageName.trim()) return;
    setTemplateData((prev) => {
      const newTemplates = prev.map((tpl, tIdx) => {
        if (tIdx !== selectedTemplate) return tpl;
        return {
          ...tpl,
          activeStages: [
            ...tpl.activeStages,
            { label: newStageName, color: newStageColor },
          ],
        };
      });
      return newTemplates;
    });
    setAddingStage(false);
    setNewStageName("");
    setNewStageColor("blue");
    setEditingColorIdx(null);
  };

  const handleNewStageKeyDown = (e) => {
    if (e.key === "Enter") {
      handleNewStageNameSave();
    } else if (e.key === "Escape") {
      setAddingStage(false);
      setNewStageName("");
      setEditingColorIdx(null);
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e, stageIndex) => {
    setDraggedStage(stageIndex);
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target);
  };

  const handleDragOver = (e, stageIndex) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(stageIndex);
  };

  const handleDragEnter = (e, stageIndex) => {
    e.preventDefault();
    setDragOverIndex(stageIndex);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    
    if (draggedStage === null || draggedStage === dropIndex) {
      setDragOverIndex(null);
      setIsDragging(false);
      setDraggedStage(null);
      return;
    }

    setTemplateData((prev) => {
      const newTemplates = prev.map((tpl, tIdx) => {
        if (tIdx !== selectedTemplate) return tpl;
        
        const stages = [...tpl.activeStages];
        const draggedItem = stages[draggedStage];
        stages.splice(draggedStage, 1);
        stages.splice(dropIndex, 0, draggedItem);
        
        return {
          ...tpl,
          activeStages: stages,
        };
      });
      return newTemplates;
    });

    setDragOverIndex(null);
    setIsDragging(false);
    setDraggedStage(null);
  };

  const handleDragEnd = () => {
    setDragOverIndex(null);
    setIsDragging(false);
    setDraggedStage(null);
  };

  // On Save, update pipelines in parent (Interface.jsx)
  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Get the current pipeline to preserve its ID and other properties
      const currentPipeline = pipelines[selectedPipelineIndex];
      
      if (!currentPipeline) {
        throw new Error('No current pipeline found');
      }
      
      // Get stages from the template data (which now contains actual pipeline data)
      let newStages = templateData[selectedTemplate].activeStages
        .map(s => s.label)
        .filter(stage => 
          !stage.toLowerCase().includes('deal - won') && 
          !stage.toLowerCase().includes('deal - lost') &&
          !stage.toLowerCase().includes('deal won') && 
          !stage.toLowerCase().includes('deal lost')
        ); // Filter out closed stages
      
      // Always append 'Deal - won' and 'Deal - lost' at the end
      newStages.push('Deal - won');
      newStages.push('Deal - lost');
      
      const newPipeline = {
        ...currentPipeline, // Preserve ID and other properties
        name: templateData[selectedTemplate].name, // set the name to the selected template
        stages: newStages,
      };
      
      // Create new pipelines array with the updated pipeline
      const newPipelines = pipelines.map((p, index) => 
        index === selectedPipelineIndex ? newPipeline : p
      );
      
      if (onSave) {
        await onSave(newPipelines);
      } else {
        console.error('onSave function is not provided!');
      }
    } catch (error) {
      console.error('Error in EditPipeline handleSave:', error);
      alert(`Failed to save pipeline changes: ${error.message}. Please try again.`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="editpipeline-modal-overlay">
      <div className="editpipeline-modal">
        <div className="editpipeline-header">
          <span>Set up your pipeline</span>
          <div>
            <button className="editpipeline-cancel" onClick={onClose} disabled={isSaving}>Cancel</button>
            <button 
              className="editpipeline-save" 
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
        <div className="editpipeline-content">
          <div className="editpipeline-sidebar">
            <div className="editpipeline-sidebar-title">Templates</div>
            {templateData.map((t, i) => (
              <div
                key={t.name}
                className={"editpipeline-sidebar-item" + (selectedTemplate === i ? " active" : "")}
                onClick={() => { setSelectedTemplate(i); setEditingColorIdx(null); }}
              >
                {t.name}
              </div>
            ))}
          </div>
          <div className="editpipeline-main">
            <div className="editpipeline-section">
              <div className="editpipeline-section-title">Incoming leads stage</div>
              <input className="editpipeline-input" value="Incoming leads stage" disabled />
              <div className="editpipeline-section-desc">This stage automatically captures leads from all the sources and channels you've connected to Maydiv</div>
            </div>
            <div className="editpipeline-section">
              <div className="editpipeline-section-title">Active stages</div>
              <div 
                className={`editpipeline-stages-list ${isDragging ? "editpipeline-stages-list-dragging" : ""}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = "move";
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  if (draggedStage !== null) {
                    handleDrop(e, template.activeStages.length);
                  }
                }}
              >
                {template.activeStages.map((stage, idx) => (
                  <React.Fragment key={stage.label + idx}>
                    {dragOverIndex === idx && draggedStage !== null && draggedStage !== idx && (
                      <div className="editpipeline-drop-indicator" />
                    )}
                    <div
                      className={`editpipeline-stage ${colorClass[stage.color] || ""} ${
                        draggedStage === idx ? "editpipeline-stage-dragging" : ""
                      } ${dragOverIndex === idx ? "editpipeline-stage-drag-over" : ""}`}
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, idx)}
                      onDragOver={(e) => handleDragOver(e, idx)}
                      onDragEnter={(e) => handleDragEnter(e, idx)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, idx)}
                      onDragEnd={handleDragEnd}
                    >
                      <span className="editpipeline-drag" title="Drag to reorder">⋮⋮</span> {stage.label}
                      <span className="editpipeline-stage-actions">
                        <FaPencilAlt
                          className="editpipeline-stage-edit"
                          onClick={() => handleColorEdit(idx)}
                          ref={el => pencilRefs.current[idx] = el}
                        />
                        <FaTimes className="editpipeline-stage-delete" onClick={() => handleDeleteStage(idx)} />
                      </span>
                      {editingColorIdx === idx && (
                        <div className="editpipeline-color-palette" ref={paletteRef}>
                          {colorPalette.map((c) => (
                            <span
                              key={c.name}
                              className="editpipeline-color-dot"
                              style={{ background: c.code, border: stage.color === c.name ? '2px solid #333' : '2px solid transparent' }}
                              onClick={() => handleColorSelect(idx, c.name)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                ))}
                {dragOverIndex === template.activeStages.length && draggedStage !== null && (
                  <div className="editpipeline-drop-indicator" />
                )}
                {addingStage && (
                  <React.Fragment>
                    {dragOverIndex === template.activeStages.length && draggedStage !== null && draggedStage !== template.activeStages.length && (
                      <div className="editpipeline-drop-indicator" />
                    )}
                    <div
                      className={`editpipeline-stage ${colorClass[newStageColor]} ${
                        draggedStage === template.activeStages.length ? "editpipeline-stage-dragging" : ""
                      } ${dragOverIndex === template.activeStages.length ? "editpipeline-stage-drag-over" : ""}`}
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, template.activeStages.length)}
                      onDragOver={(e) => handleDragOver(e, template.activeStages.length)}
                      onDragEnter={(e) => handleDragEnter(e, template.activeStages.length)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, template.activeStages.length)}
                      onDragEnd={handleDragEnd}
                    >
                      <span className="editpipeline-drag" title="Drag to reorder">⋮⋮</span>
                      <input
                        className="editpipeline-input"
                        style={{width: '160px', margin: '0 8px'}}
                        autoFocus
                        value={newStageName}
                        onChange={handleNewStageNameChange}
                        onBlur={handleNewStageNameSave}
                        onKeyDown={handleNewStageKeyDown}
                        placeholder="Stage name"
                      />
                      <span className="editpipeline-stage-actions">
                        <FaPencilAlt
                          className="editpipeline-stage-edit"
                          onClick={() => setEditingColorIdx(template.activeStages.length)}
                        />
                        <FaTimes className="editpipeline-stage-delete" onClick={() => { setAddingStage(false); setEditingColorIdx(null); }} />
                      </span>
                      {editingColorIdx === template.activeStages.length && (
                        <div className="editpipeline-color-palette" ref={paletteRef}>
                          {colorPalette.map((c) => (
                            <span
                              key={c.name}
                              className="editpipeline-color-dot"
                              style={{ background: c.code, border: newStageColor === c.name ? '2px solid #333' : '2px solid transparent' }}
                              onClick={() => setNewStageColor(c.name)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                )}
              </div>
              <button className="editpipeline-addstage" onClick={handleAddStageClick}>+ Add stage</button>
            </div>
            <div className="editpipeline-section">
              <div className="editpipeline-section-title">Closed stages</div>
              <div className={"editpipeline-stage " + colorClass["green"]}>Deal - won</div>
              <div className={"editpipeline-stage " + colorClass["grey"]}>Deal - lost</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
