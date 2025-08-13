import React, { useState } from 'react';
import './UserGuide.css';

export default function UserGuide() {
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = [
    { id: 'getting-started', title: 'Getting Started', icon: '🚀' },
    { id: 'dashboard', title: 'Dashboard', icon: '📊' },
    { id: 'leads', title: 'Lead Management', icon: '👥' },
    { id: 'pipeline', title: 'Sales Pipeline', icon: '📈' },
    { id: 'tasks', title: 'Task Management', icon: '✅' },
    { id: 'invoices', title: 'Invoice Management', icon: '💰' },
    { id: 'mail', title: 'Email Management', icon: '📧' },
    { id: 'whatsapp', title: 'WhatsApp Integration', icon: '📱' },
    { id: 'admin', title: 'Admin Features', icon: '⚙️' },
    { id: 'tips', title: 'Tips & Best Practices', icon: '💡' }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'getting-started':
        return (
          <div className="guide-section">
            <h2>🚀 Getting Started with Your CRM</h2>
            
            <div className="guide-subsection">
              <h3>1. First Time Login</h3>
              <div className="step-container">
                <div className="step-number">1</div>
                <div className="step-content">
                  <p>Navigate to the login page and enter your credentials:</p>
                  <ul>
                    <li><strong>Email:</strong> Your registered email address</li>
                    <li><strong>Password:</strong> Your secure password</li>
                  </ul>
                  <p>Click "Sign In" to access your CRM dashboard.</p>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>2. User Roles & Access</h3>
              <div className="role-cards">
                <div className="role-card admin">
                  <h4>👑 Admin User</h4>
                  <ul>
                    <li>Full system access</li>
                    <li>User management</li>
                    <li>System settings</li>
                    <li>Analytics & reports</li>
                  </ul>
                </div>
                <div className="role-card employee">
                  <h4>👤 Employee User</h4>
                  <ul>
                    <li>Lead management</li>
                    <li>Task assignment</li>
                    <li>Pipeline access</li>
                    <li>Limited admin features</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>3. Navigation Overview</h3>
              <div className="nav-overview">
                <div className="nav-item">
                  <span className="nav-icon">📊</span>
                  <span className="nav-text">Dashboard - Main overview and analytics</span>
                </div>
                <div className="nav-item">
                  <span className="nav-icon">👥</span>
                  <span className="nav-text">Leads - Manage potential customers</span>
                </div>
                <div className="nav-item">
                  <span className="nav-icon">📈</span>
                  <span className="nav-text">Pipeline - Sales process management</span>
                </div>
                <div className="nav-item">
                  <span className="nav-icon">✅</span>
                  <span className="nav-text">Tasks - Track activities and deadlines</span>
                </div>
                <div className="nav-item">
                  <span className="nav-icon">💰</span>
                  <span className="nav-text">Invoices - Financial management</span>
                </div>
                <div className="nav-item">
                  <span className="nav-icon">📧</span>
                  <span className="nav-text">Mail - Email communication</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="guide-section">
            <h2>📊 Dashboard Guide</h2>
            
            <div className="guide-subsection">
              <h3>Dashboard Overview</h3>
              <p>The dashboard is your command center, providing real-time insights into your CRM performance.</p>
              
              <div className="feature-grid">
                <div className="feature-card">
                  <h4>📱 Widget Management</h4>
                  <ul>
                    <li><strong>Drag & Drop:</strong> Reorder widgets by dragging them</li>
                    <li><strong>Customization:</strong> Choose from 5 different widget styles</li>
                    <li><strong>Backgrounds:</strong> Select from 11 beautiful background images</li>
                    <li><strong>Font Options:</strong> Light, regular, and bold font weights</li>
                  </ul>
                </div>
                
                <div className="feature-card">
                  <h4>📊 Key Metrics Widgets</h4>
                  <ul>
                    <li><strong>Incoming Messages:</strong> Track new communications</li>
                    <li><strong>Lead Sources:</strong> Monitor where leads come from</li>
                    <li><strong>Task Overview:</strong> View pending and completed tasks</li>
                    <li><strong>Sales Performance:</strong> Track won/lost leads</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>Customization Options</h3>
              <div className="customization-steps">
                <div className="step">
                  <h4>Step 1: Access Settings</h4>
                  <p>Click the gear icon (⚙️) in the top-right corner to open customization panel.</p>
                </div>
                <div className="step">
                  <h4>Step 2: Choose Style</h4>
                  <p>Select from 5 widget color schemes and 11 background images.</p>
                </div>
                <div className="step">
                  <h4>Step 3: Apply Changes</h4>
                  <p>Use "Apply to All" to update all widgets or customize individually.</p>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>Quick Actions</h3>
              <div className="quick-actions">
                <div className="action-item">
                  <span className="action-icon">➕</span>
                  <span>Add new leads</span>
                </div>
                <div className="action-item">
                  <span className="action-icon">📅</span>
                  <span>Schedule tasks</span>
                </div>
                <div className="action-item">
                  <span className="action-icon">👥</span>
                  <span>Manage employees</span>
                </div>
                <div className="action-item">
                  <span className="action-icon">📊</span>
                  <span>View analytics</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'leads':
        return (
          <div className="guide-section">
            <h2>👥 Lead Management Guide</h2>
            
            <div className="guide-subsection">
              <h3>Understanding Leads</h3>
              <p>Leads are potential customers who have shown interest in your products or services.</p>
              
              <div className="lead-types">
                <div className="lead-type">
                  <h4>🆕 New Leads</h4>
                  <p>Fresh contacts that need immediate attention and qualification.</p>
                </div>
                <div className="lead-type">
                  <h4>🔥 Hot Leads</h4>
                  <p>Highly interested prospects ready for sales engagement.</p>
                </div>
                <div className="lead-type">
                  <h4>❄️ Cold Leads</h4>
                  <p>Contacts that need nurturing and follow-up.</p>
                </div>
                <div className="lead-type">
                  <h4>💼 Qualified Leads</h4>
                  <p>Leads that meet your ideal customer profile criteria.</p>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>Adding New Leads</h3>
              <div className="step-by-step">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Click "Add New Lead"</h4>
                    <p>Located in the leads section header</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Fill Lead Information</h4>
                    <ul>
                      <li>Name and contact details</li>
                      <li>Company information</li>
                      <li>Lead source</li>
                      <li>Initial notes</li>
                    </ul>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Assign & Categorize</h4>
                    <ul>
                      <li>Assign to team member</li>
                      <li>Set priority level</li>
                      <li>Add to appropriate pipeline stage</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>🔄 Editing & Updating Leads</h3>
              <div className="edit-features">
                <div className="edit-feature">
                  <h4>✏️ Quick Edit Mode</h4>
                  <ul>
                    <li>Click on any lead card to open edit mode</li>
                    <li>Inline editing for quick updates</li>
                    <li>Real-time saving of changes</li>
                    <li>Edit contact details, company info, and notes</li>
                  </ul>
                </div>
                <div className="edit-feature">
                  <h4>📋 Bulk Edit Operations</h4>
                  <ul>
                    <li>Select multiple leads using checkboxes</li>
                    <li>Update status, assignee, or tags for multiple leads</li>
                    <li>Mass email or message campaigns</li>
                    <li>Export selected leads for external processing</li>
                  </ul>
                </div>
                <div className="edit-feature">
                  <h4>🔄 Status Updates</h4>
                  <ul>
                    <li>Change lead status instantly</li>
                    <li>Move leads between pipeline stages</li>
                    <li>Add status change notes and reasons</li>
                    <li>Track status change history</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>🎯 Pipeline Customization</h3>
              <div className="pipeline-customization">
                <div className="customization-option">
                  <h4>🏗️ Create Custom Stages</h4>
                  <ul>
                    <li>Add new pipeline stages specific to your business</li>
                    <li>Customize stage names and colors</li>
                    <li>Set stage-specific requirements and actions</li>
                    <li>Configure stage progression rules</li>
                  </ul>
                </div>
                <div className="customization-option">
                  <h4>🎨 Visual Customization</h4>
                  <ul>
                    <li>Change stage colors and themes</li>
                    <li>Customize lead card layouts</li>
                    <li>Add company logos and branding</li>
                    <li>Personalize dashboard appearance</li>
                  </ul>
                </div>
                <div className="customization-option">
                  <h4>⚙️ Workflow Automation</h4>
                  <ul>
                    <li>Set automatic stage transitions</li>
                    <li>Configure email triggers and reminders</li>
                    <li>Create task automation rules</li>
                    <li>Set up notification preferences</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>🔍 Advanced Lead Management</h3>
              <div className="advanced-lead-features">
                <div className="advanced-feature">
                  <h4>📊 Lead Scoring & Qualification</h4>
                  <ul>
                    <li>Automated lead scoring based on behavior</li>
                    <li>Custom qualification criteria setup</li>
                    <li>Lead quality indicators and alerts</li>
                    <li>ROI tracking for lead sources</li>
                  </ul>
                </div>
                <div className="advanced-feature">
                  <h4>📈 Analytics & Reporting</h4>
                  <ul>
                    <li>Conversion rate tracking by stage</li>
                    <li>Lead source performance analysis</li>
                    <li>Sales team performance metrics</li>
                    <li>Custom report generation</li>
                  </ul>
                </div>
                <div className="advanced-feature">
                  <h4>🔗 Integration Capabilities</h4>
                  <ul>
                    <li>Connect with email marketing tools</li>
                    <li>Integrate with calendar and scheduling apps</li>
                    <li>Sync with accounting and invoicing systems</li>
                    <li>API access for custom integrations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>📱 Lead Communication Tools</h3>
              <div className="communication-tools">
                <div className="tool-item">
                  <h4>💬 In-App Messaging</h4>
                  <ul>
                    <li>Direct chat with leads</li>
                    <li>Message templates and quick responses</li>
                    <li>Conversation history tracking</li>
                    <li>Read receipts and delivery status</li>
                  </ul>
                </div>
                <div className="tool-item">
                  <h4>📧 Email Campaigns</h4>
                  <ul>
                    <li>Create personalized email sequences</li>
                    <li>Track email open rates and clicks</li>
                    <li>Automated follow-up emails</li>
                    <li>Email template library</li>
                  </ul>
                </div>
                <div className="tool-item">
                  <h4>📞 Call Management</h4>
                  <ul>
                    <li>Click-to-call functionality</li>
                    <li>Call recording and notes</li>
                    <li>Call scheduling and reminders</li>
                    <li>Call outcome tracking</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>🏷️ Lead Organization & Tags</h3>
              <div className="organization-features">
                <div className="org-feature">
                  <h4>🏷️ Smart Tagging System</h4>
                  <ul>
                    <li>Create custom tags and categories</li>
                    <li>Auto-tagging based on lead behavior</li>
                    <li>Tag-based filtering and search</li>
                    <li>Bulk tag operations</li>
                  </ul>
                </div>
                <div className="org-feature">
                  <h4>📁 Folder Organization</h4>
                  <ul>
                    <li>Create custom folders for leads</li>
                    <li>Organize by industry, region, or priority</li>
                    <li>Nested folder structures</li>
                    <li>Quick folder navigation</li>
                  </ul>
                </div>
                <div className="org-feature">
                  <h4>🔍 Advanced Search & Filters</h4>
                  <ul>
                    <li>Multi-criteria search filters</li>
                    <li>Saved search queries</li>
                    <li>Search within specific fields</li>
                    <li>Export filtered results</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>🔄 Lead Re-assignment & Team Management</h3>
              <div className="reassignment-features">
                <div className="reassignment-feature">
                  <h4>👥 Re-assign Leads</h4>
                  <ul>
                    <li>Click on the lead you want to re-assign</li>
                    <li>Click "Re-assign" or "Change Assignee" button</li>
                    <li>Select new team member from dropdown</li>
                    <li>Add reason for re-assignment (workload, expertise, etc.)</li>
                    <li>Set transfer date and any special instructions</li>
                    <li>Click "Confirm Re-assignment" to complete</li>
                  </ul>
                </div>
                <div className="reassignment-feature">
                  <h4>📋 Bulk Re-assignment</h4>
                  <ul>
                    <li>Select multiple leads using checkboxes</li>
                    <li>Click "Bulk Actions" → "Re-assign"</li>
                    <li>Choose new assignee for all selected leads</li>
                    <li>Set common reason and instructions</li>
                    <li>Review changes before confirming</li>
                    <li>Track re-assignment history</li>
                  </ul>
                </div>
                <div className="reassignment-feature">
                  <h4>⚖️ Workload Balancing</h4>
                  <ul>
                    <li>View team member workload dashboard</li>
                    <li>Identify overloaded team members</li>
                    <li>Automatically suggest re-assignments</li>
                    <li>Set workload limits and alerts</li>
                    <li>Monitor team performance metrics</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>Lead Management Best Practices</h3>
              <div className="best-practices">
                <div className="practice-item">
                  <h4>📞 Quick Follow-up</h4>
                  <p>Contact new leads within 24 hours for best conversion rates.</p>
                </div>
                <div className="practice-item">
                  <h4>🏷️ Proper Tagging</h4>
                  <p>Use consistent tags and categories for easy filtering and reporting.</p>
                </div>
                <div className="practice-item">
                  <h4>📝 Detailed Notes</h4>
                  <p>Record all interactions and important information for future reference.</p>
                </div>
                <div className="practice-item">
                  <h4>⏰ Regular Updates</h4>
                  <p>Update lead status and information regularly to maintain accuracy.</p>
                </div>
                <div className="practice-item">
                  <h4>🎯 Pipeline Optimization</h4>
                  <p>Regularly review and optimize your pipeline stages for better conversion.</p>
                </div>
                <div className="practice-item">
                  <h4>📊 Data Quality</h4>
                  <p>Maintain clean, accurate lead data for better decision making.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'pipeline':
        return (
          <div className="guide-section">
            <h2>📈 Sales Pipeline Guide</h2>
            
            <div className="guide-subsection">
              <h3>Pipeline Overview</h3>
              <p>The sales pipeline helps you visualize and manage your sales process from initial contact to closing.</p>
              
              <div className="pipeline-stages">
                <div className="stage-card">
                  <h4>1️⃣ Initial Contact</h4>
                  <p>First interaction with potential customer</p>
                  <span className="stage-tip">Tip: Send welcome message within 1 hour</span>
                </div>
                <div className="stage-card">
                  <h4>2️⃣ Discussions</h4>
                  <p>Qualifying needs and presenting solutions</p>
                  <span className="stage-tip">Tip: Schedule follow-up calls</span>
                </div>
                <div className="stage-card">
                  <h4>3️⃣ Decision Making</h4>
                  <p>Customer evaluating options</p>
                  <span className="stage-tip">Tip: Provide additional materials</span>
                </div>
                <div className="stage-card">
                  <h4>4️⃣ Contract Discussion</h4>
                  <p>Negotiating terms and conditions</p>
                  <span className="stage-tip">Tip: Be flexible with terms</span>
                </div>
                <div className="stage-card">
                  <h4>5️⃣ Closed - Won</h4>
                  <p>Deal successfully closed</p>
                  <span className="stage-tip">Tip: Celebrate and plan next steps</span>
                </div>
                <div className="stage-card">
                  <h4>❌ Closed - Lost</h4>
                  <p>Deal not successful</p>
                  <span className="stage-tip">Tip: Learn from feedback</span>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>Pipeline Management Features</h3>
              <div className="pipeline-features">
                <div className="feature-item">
                  <h4>📊 Quick Stats</h4>
                  <ul>
                    <li>Tasks due today</li>
                    <li>Leads without tasks</li>
                    <li>Overdue tasks</li>
                    <li>New leads count</li>
                  </ul>
                </div>
                <div className="feature-item">
                  <h4>💬 Bulk Messaging</h4>
                  <ul>
                    <li>Send messages to all leads in a stage</li>
                    <li>Customize message content</li>
                    <li>Track message delivery</li>
                  </ul>
                </div>
                <div className="feature-item">
                  <h4>➕ Quick Add</h4>
                  <ul>
                    <li>Add new leads directly to stages</li>
                    <li>Quick assignment and categorization</li>
                    <li>Immediate pipeline visibility</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>🔄 Pipeline Re-assignment & Bulk Operations</h3>
              <div className="pipeline-operations">
                <div className="operation-item">
                  <h4>🔄 Stage Re-assignment</h4>
                  <ul>
                    <li>Move leads between pipeline stages</li>
                    <li>Bulk move multiple leads at once</li>
                    <li>Set stage transition rules</li>
                    <li>Track stage change history</li>
                  </ul>
                </div>
                <div className="operation-item">
                  <h4>👥 Team Re-assignment</h4>
                  <ul>
                    <li>Re-assign leads to different team members</li>
                    <li>Bulk re-assignment by stage or criteria</li>
                    <li>Workload balancing across team</li>
                    <li>Performance tracking by assignee</li>
                  </ul>
                </div>
                <div className="operation-item">
                  <h4>📋 Bulk Actions</h4>
                  <ul>
                    <li>Select multiple leads across stages</li>
                    <li>Bulk status updates and changes</li>
                    <li>Mass email and messaging campaigns</li>
                    <li>Export selected leads for analysis</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>Pipeline Best Practices</h3>
              <div className="pipeline-tips">
                <div className="tip">
                  <h4>🎯 Regular Review</h4>
                  <p>Review pipeline weekly to identify bottlenecks and opportunities.</p>
                </div>
                <div className="tip">
                  <h4>📅 Task Management</h4>
                  <p>Assign tasks for each stage to ensure proper follow-up.</p>
                </div>
                <div className="tip">
                  <h4>📈 Move Leads Forward</h4>
                  <p>Actively work to move leads through stages, don't let them stagnate.</p>
                </div>
                <div className="tip">
                  <h4>📊 Track Metrics</h4>
                  <p>Monitor conversion rates between stages to optimize your process.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'tasks':
        return (
          <div className="guide-section">
            <h2>✅ Task Management Guide</h2>
            
            <div className="guide-subsection">
              <h3>Task Overview</h3>
              <p>Tasks help you stay organized and ensure nothing falls through the cracks in your sales process.</p>
              
              <div className="task-types">
                <div className="task-type">
                  <h4>📞 Follow-up Calls</h4>
                  <p>Schedule and track customer follow-up activities</p>
                </div>
                <div className="task-type">
                  <h4>📧 Email Campaigns</h4>
                  <p>Plan and execute email marketing activities</p>
                </div>
                <div className="task-type">
                  <h4>🤝 Meetings</h4>
                  <p>Schedule and prepare for customer meetings</p>
                </div>
                <div className="task-type">
                  <h4>📋 Proposals</h4>
                  <p>Create and send customer proposals</p>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>Creating and Managing Tasks</h3>
              <div className="task-workflow">
                <div className="workflow-step">
                  <h4>1. Create Task</h4>
                  <ul>
                    <li>Click "+ Add Task" button</li>
                    <li>Fill in title and description</li>
                    <li>Set due date and assignee</li>
                    <li>Choose task type</li>
                  </ul>
                </div>
                <div className="workflow-step">
                  <h4>2. Track Progress</h4>
                  <ul>
                    <li>Update task status regularly</li>
                    <li>Add notes and comments</li>
                    <li>Mark as completed when done</li>
                  </ul>
                </div>
                <div className="workflow-step">
                  <h4>3. Follow-up</h4>
                  <ul>
                    <li>Set reminders for overdue tasks</li>
                    <li>Reschedule if needed</li>
                    <li>Update lead status based on task completion</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>🔄 Task Re-assignment & Management</h3>
              <div className="task-workflow">
                <div className="workflow-step">
                  <h4>📋 Re-assign Tasks</h4>
                  <ul>
                    <li>Click on the task you want to re-assign</li>
                    <li>Click "Edit" or "Re-assign" button</li>
                    <li>Select new assignee from dropdown menu</li>
                    <li>Add reason for re-assignment (optional)</li>
                    <li>Set new due date if needed</li>
                    <li>Click "Save Changes" to confirm</li>
                  </ul>
                </div>
                <div className="workflow-step">
                  <h4>➕ Add To-Do Items</h4>
                  <ul>
                    <li>Click "+ Add Task" or "Quick Add" button</li>
                    <li>Select "To-Do" as task type</li>
                    <li>Enter task title and description</li>
                    <li>Set priority level (High, Medium, Low)</li>
                    <li>Choose assignee and due date</li>
                    <li>Add tags for better organization</li>
                    <li>Click "Create Task" to save</li>
                  </ul>
                </div>
                <div className="workflow-step">
                  <h4>📝 Task Updates & Modifications</h4>
                  <ul>
                    <li>Edit task details anytime by clicking on task</li>
                    <li>Change status: Pending → In Progress → Completed</li>
                    <li>Add comments and progress notes</li>
                    <li>Attach files or documents</li>
                    <li>Update priority levels as needed</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>🎯 Advanced Task Features</h3>
              <div className="task-features">
                <div className="feature-card">
                  <h4>📊 Task Analytics</h4>
                  <ul>
                    <li>Track completion rates by team member</li>
                    <li>Monitor task performance metrics</li>
                    <li>Identify bottlenecks in workflows</li>
                    <li>Generate productivity reports</li>
                  </ul>
                </div>
                <div className="feature-card">
                  <h4>⏰ Automated Reminders</h4>
                  <ul>
                    <li>Set up email notifications for due dates</li>
                    <li>Configure reminder intervals</li>
                    <li>Escalation alerts for overdue tasks</li>
                    <li>Calendar integration for scheduling</li>
                  </ul>
                </div>
                <div className="feature-card">
                  <h4>🏷️ Task Organization</h4>
                  <ul>
                    <li>Create custom task categories</li>
                    <li>Use tags for quick filtering</li>
                    <li>Group related tasks together</li>
                    <li>Set up task dependencies</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>Task Management Tips</h3>
              <div className="task-tips">
                <div className="tip-item">
                  <h4>⏰ Set Realistic Deadlines</h4>
                  <p>Don't overload yourself - set achievable due dates.</p>
                </div>
                <div className="tip-item">
                  <h4>👥 Delegate Effectively</h4>
                  <p>Assign tasks to team members with appropriate skills.</p>
                </div>
                <div className="tip-item">
                  <h4>📝 Be Specific</h4>
                  <p>Clear task descriptions lead to better outcomes.</p>
                </div>
                <div className="tip-item">
                  <h4>🔄 Regular Updates</h4>
                  <p>Update task status to keep team informed.</p>
                </div>
                <div className="tip-item">
                  <h4>🔄 Smart Re-assignment</h4>
                  <p>Re-assign tasks when team members are overloaded or when expertise is needed.</p>
                </div>
                <div className="tip-item">
                  <h4>📋 Quick To-Do Creation</h4>
                  <p>Use quick add features to capture tasks immediately without losing momentum.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'invoices':
        return (
          <div className="guide-section">
            <h2>💰 Invoice Management Guide</h2>
            
            <div className="guide-subsection">
              <h3>📊 Invoice System Overview</h3>
              <p>Advanced CRM-integrated invoice system with AI insights, automation, and comprehensive financial management.</p>
              
              <div className="invoice-features">
                <div className="feature-highlight">
                  <h4>📊 Real-time Dashboard</h4>
                  <ul>
                    <li>Total invoices and revenue tracking</li>
                    <li>Payment status monitoring (Paid, Pending, Overdue)</li>
                    <li>High priority invoice alerts</li>
                    <li>Monthly revenue forecasting</li>
                  </ul>
                </div>
                <div className="feature-highlight">
                  <h4>🎨 Professional Templates</h4>
                  <ul>
                    <li>Customizable invoice designs with company branding</li>
                    <li>Multiple currency support (INR, USD, EUR)</li>
                    <li>GST/Tax calculation features</li>
                    <li>Professional PDF generation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>📝 Creating New Invoices - Step by Step</h3>
              <div className="step-by-step">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Access Invoice Creation</h4>
                    <ul>
                      <li>Click "Create Invoice" button in the invoice header</li>
                      <li>Fill in supplier details (company name, GSTIN, address)</li>
                      <li>Add bank details (account, IFSC, UPI)</li>
                      <li>Upload company logo if desired</li>
                    </ul>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Client Information Setup</h4>
                    <ul>
                      <li>Select client from existing database or add new</li>
                      <li>Fill client details (name, email, phone, address)</li>
                      <li>Add buyer GSTIN for business clients</li>
                      <li>Set project reference and description</li>
                    </ul>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Invoice Details & Line Items</h4>
                    <ul>
                      <li>Set invoice date and due date</li>
                      <li>Add line items with description, quantity, and price</li>
                      <li>Configure tax rate (default 18% GST)</li>
                      <li>Apply discounts if applicable</li>
                    </ul>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>CRM Integration & Settings</h4>
                    <ul>
                      <li>Assign to team member</li>
                      <li>Set priority level (Low, Medium, High)</li>
                      <li>Choose pipeline and stage</li>
                      <li>Add relevant tags for organization</li>
                    </ul>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">5</div>
                  <div className="step-content">
                    <h4>Review & Save</h4>
                    <ul>
                      <li>Review all invoice details</li>
                      <li>Check calculated totals and tax</li>
                      <li>Set payment terms and notes</li>
                      <li>Click "Save Invoice" to create</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>📋 Invoice Management Workflow</h3>
              <div className="invoice-workflow">
                <div className="workflow-step">
                  <h4>1. Draft Stage</h4>
                  <ul>
                    <li>Create invoice in draft status</li>
                    <li>Review and edit all details</li>
                    <li>Get approval from team lead</li>
                    <li>Prepare for sending to client</li>
                  </ul>
                </div>
                <div className="workflow-step">
                  <h4>2. Send & Track</h4>
                  <ul>
                    <li>Send invoice via email to client</li>
                    <li>Track delivery and read receipts</li>
                    <li>Set automatic payment reminders</li>
                    <li>Monitor client engagement</li>
                  </ul>
                </div>
                <div className="workflow-step">
                  <h4>3. Payment Processing</h4>
                  <ul>
                    <li>Record payments received</li>
                    <li>Update invoice status to "Paid"</li>
                    <li>Generate payment receipts</li>
                    <li>Update financial records</li>
                  </ul>
                </div>
                <div className="workflow-step">
                  <h4>4. Follow-up & Collections</h4>
                  <ul>
                    <li>Send payment reminders for overdue invoices</li>
                    <li>Schedule follow-up calls</li>
                    <li>Handle partial payments</li>
                    <li>Escalate to collections if needed</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>🔍 Advanced Invoice Features</h3>
              <div className="advanced-features">
                <div className="advanced-feature">
                  <h4>🤖 Automation & AI</h4>
                  <ul>
                    <li>Automatic payment reminders for overdue invoices</li>
                    <li>AI-powered risk assessment and insights</li>
                    <li>Smart follow-up scheduling</li>
                    <li>Automated status updates</li>
                  </ul>
                </div>
                <div className="advanced-feature">
                  <h4>📈 Analytics & Reporting</h4>
                  <ul>
                    <li>Revenue trend analysis and forecasting</li>
                    <li>Client payment history and patterns</li>
                    <li>Team performance metrics</li>
                    <li>Export reports in multiple formats</li>
                  </ul>
                </div>
                <div className="advanced-feature">
                  <h4>🔄 Recurring & Bulk Operations</h4>
                  <ul>
                    <li>Set up recurring invoices for regular clients</li>
                    <li>Bulk invoice operations (edit, delete, export)</li>
                    <li>Bulk status updates and assignments</li>
                    <li>Mass email campaigns for collections</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>📊 Invoice Status Management</h3>
              <div className="invoice-features">
                <div className="invoice-feature">
                  <h4>📝 Draft</h4>
                  <p>Invoices being prepared, can be edited and modified before sending.</p>
                </div>
                <div className="invoice-feature">
                  <h4>📤 Sent</h4>
                  <p>Invoices delivered to clients, awaiting payment or response.</p>
                </div>
                <div className="invoice-feature">
                  <h4>⏰ Pending</h4>
                  <p>Invoices with approaching due dates, require follow-up.</p>
                </div>
                <div className="invoice-feature">
                  <h4>✅ Paid</h4>
                  <p>Successfully completed payments, ready for archiving.</p>
                </div>
                <div className="invoice-feature">
                  <h4>⚠️ Overdue</h4>
                  <p>Past due date, requires immediate attention and collection.</p>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>🔧 Invoice Settings & Configuration</h3>
              <div className="invoice-features">
                <div className="invoice-feature">
                  <h4>⚙️ General Settings</h4>
                  <ul>
                    <li>Default currency and tax rates</li>
                    <li>Invoice number prefix and format</li>
                    <li>Payment terms and conditions</li>
                    <li>Company branding and templates</li>
                  </ul>
                </div>
                <div className="invoice-feature">
                  <h4>📧 Email Settings</h4>
                  <ul>
                    <li>Automatic payment reminders</li>
                    <li>Invoice delivery notifications</li>
                    <li>Custom email templates</li>
                    <li>Follow-up scheduling</li>
                  </ul>
                </div>
                <div className="invoice-feature">
                  <h4>📱 Display Settings</h4>
                  <ul>
                    <li>Items per page in tables</li>
                    <li>Default view preferences</li>
                    <li>Column customization</li>
                    <li>Export format options</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>📋 Bulk Operations & Management</h3>
              <div className="step-by-step">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Select Multiple Invoices</h4>
                    <ul>
                      <li>Use checkboxes to select multiple invoices</li>
                      <li>Select all invoices using header checkbox</li>
                      <li>Filter invoices before bulk selection</li>
                      <li>View count of selected invoices</li>
                    </ul>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Choose Bulk Action</h4>
                    <ul>
                      <li>Mark multiple invoices as paid</li>
                      <li>Bulk assign to team members</li>
                      <li>Add tags to multiple invoices</li>
                      <li>Change status for multiple invoices</li>
                    </ul>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Execute & Confirm</h4>
                    <ul>
                      <li>Confirm bulk action execution</li>
                      <li>Review changes made</li>
                      <li>Export bulk operation results</li>
                      <li>Track bulk action history</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>📊 Invoice Analytics & Insights</h3>
              <div className="invoice-features">
                <div className="invoice-feature">
                  <h4>📈 Revenue Analytics</h4>
                  <ul>
                    <li>Monthly and yearly revenue trends</li>
                    <li>Payment rate analysis by client</li>
                    <li>Average payment time tracking</li>
                    <li>Revenue forecasting and predictions</li>
                  </ul>
                </div>
                <div className="invoice-feature">
                  <h4>🎯 Performance Metrics</h4>
                  <ul>
                    <li>Team member performance tracking</li>
                    <li>Pipeline stage conversion rates</li>
                    <li>Client payment behavior analysis</li>
                    <li>Collection efficiency metrics</li>
                  </ul>
                </div>
                <div className="invoice-feature">
                  <h4>🤖 AI-Powered Insights</h4>
                  <ul>
                    <li>Risk assessment for overdue invoices</li>
                    <li>Optimal follow-up timing suggestions</li>
                    <li>Client payment pattern recognition</li>
                    <li>Automated action recommendations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>💡 Invoice Best Practices</h3>
              <div className="invoice-tips">
                <div className="tip-item">
                  <h4>⏰ Timely Creation</h4>
                  <p>Create invoices immediately after service completion for faster payments.</p>
                </div>
                <div className="tip-item">
                  <h4>📝 Clear Descriptions</h4>
                  <p>Use detailed line item descriptions to avoid client confusion and disputes.</p>
                </div>
                <div className="tip-item">
                  <h4>📅 Reasonable Due Dates</h4>
                  <p>Set realistic payment terms that balance cash flow with client relationships.</p>
                </div>
                <div className="tip-item">
                  <h4>📞 Proactive Follow-up</h4>
                  <p>Follow up before due dates to ensure timely payments and maintain relationships.</p>
                </div>
                <div className="tip-item">
                  <h4>🏷️ Proper Organization</h4>
                  <p>Use tags, priorities, and pipeline stages to organize and track invoices effectively.</p>
                </div>
                <div className="tip-item">
                  <h4>📊 Regular Review</h4>
                  <p>Review invoice analytics weekly to identify trends and optimize processes.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'mail':
        return (
          <div className="guide-section">
            <h2>📧 Email Management Guide</h2>
            
            <div className="guide-subsection">
              <h3>Email System Overview</h3>
              <p>Centralized email management for better communication and lead nurturing.</p>
              
              <div className="email-folders">
                <div className="folder-item">
                  <h4>📥 Inbox</h4>
                  <p>New and unread messages requiring attention</p>
                </div>
                <div className="folder-item">
                  <h4>📤 Sent</h4>
                  <p>Outgoing messages and campaign history</p>
                </div>
                <div className="folder-item">
                  <h4>⭐ Starred</h4>
                  <p>Important messages marked for follow-up</p>
                </div>
                <div className="folder-item">
                  <h4>🗑️ Trash</h4>
                  <p>Deleted messages and cleanup</p>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>📧 Single Email Management</h3>
              <div className="step-by-step">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Compose New Email</h4>
                    <ul>
                      <li>Click the "Compose" or "New Email" button</li>
                      <li>Fill in recipient email address(es)</li>
                      <li>Add a clear and descriptive subject line</li>
                      <li>Write your email content in the body</li>
                    </ul>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Add Attachments & Formatting</h4>
                    <ul>
                      <li>Click the attachment icon to add files</li>
                      <li>Use formatting tools for text styling</li>
                      <li>Insert images or links if needed</li>
                      <li>Review your email before sending</li>
                    </ul>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Send & Track</h4>
                    <ul>
                      <li>Click "Send" to deliver your email</li>
                      <li>Check "Sent" folder for confirmation</li>
                      <li>Monitor delivery status and read receipts</li>
                      <li>Save important emails to starred folder</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>📬 Bulk Email Campaigns</h3>
              <div className="step-by-step">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Prepare Your Campaign</h4>
                    <ul>
                      <li>Create or select an email template</li>
                      <li>Prepare your email list (recipients)</li>
                      <li>Write compelling subject lines</li>
                      <li>Design engaging email content</li>
                    </ul>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Set Up Bulk Send</h4>
                    <ul>
                      <li>Click "Bulk Email" or "Campaign" option</li>
                      <li>Upload or select your recipient list</li>
                      <li>Choose your email template</li>
                      <li>Set sending schedule (immediate or scheduled)</li>
                    </ul>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Configure Campaign Settings</h4>
                    <ul>
                      <li>Set personalization options (name, company, etc.)</li>
                      <li>Configure tracking and analytics</li>
                      <li>Set up auto-responders if needed</li>
                      <li>Review and test your campaign</li>
                    </ul>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Launch & Monitor</h4>
                    <ul>
                      <li>Click "Send Campaign" to launch</li>
                      <li>Monitor delivery progress in real-time</li>
                      <li>Track open rates, clicks, and responses</li>
                      <li>Analyze campaign performance reports</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>👥 Group Mailing Features</h3>
              <div className="step-by-step">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Create Email Groups</h4>
                    <ul>
                      <li>Go to "Groups" or "Contacts" section</li>
                      <li>Click "Create New Group"</li>
                      <li>Name your group (e.g., "VIP Customers", "Prospects")</li>
                      <li>Add contacts to the group manually or by criteria</li>
                    </ul>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Group Email Setup</h4>
                    <ul>
                      <li>Select the group you want to email</li>
                      <li>Click "Send Group Email" or "Email Group"</li>
                      <li>Choose your email template or compose new</li>
                      <li>Personalize content for the group</li>
                    </ul>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Send & Manage Group Emails</h4>
                    <ul>
                      <li>Review recipient list and content</li>
                      <li>Set sending preferences (individual or BCC)</li>
                      <li>Schedule group email delivery</li>
                      <li>Track group email performance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>📊 Email Analytics & Tracking</h3>
              <div className="email-features">
                <div className="email-feature">
                  <h4>📈 Delivery Reports</h4>
                  <p>Track email delivery status, bounces, and delivery rates for all campaigns.</p>
                </div>
                <div className="email-feature">
                  <h4>👁️ Open Rate Tracking</h4>
                  <p>Monitor how many recipients open your emails and when they do so.</p>
                </div>
                <div className="email-feature">
                  <h4>🔗 Click Tracking</h4>
                  <p>See which links in your emails are clicked and by whom.</p>
                </div>
                <div className="email-feature">
                  <h4>📊 Campaign Performance</h4>
                  <p>Compare different email campaigns and optimize based on results.</p>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>📧 Email Templates & Automation</h3>
              <div className="email-features">
                <div className="email-feature">
                  <h4>📝 Template Library</h4>
                  <p>Create and save reusable email templates for different purposes.</p>
                </div>
                <div className="email-feature">
                  <h4>🤖 Auto-Responders</h4>
                  <p>Set up automatic email responses for common inquiries and confirmations.</p>
                </div>
                <div className="email-feature">
                  <h4>⏰ Scheduled Sending</h4>
                  <p>Schedule emails to be sent at optimal times for better engagement.</p>
                </div>
                <div className="email-feature">
                  <h4>🔄 Email Sequences</h4>
                  <p>Create automated email sequences for lead nurturing and follow-ups.</p>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>Email Best Practices</h3>
              <div className="email-tips">
                <div className="tip-item">
                  <h4>⏰ Timing Matters</h4>
                  <p>Send emails when recipients are most likely to read them.</p>
                </div>
                <div className="tip-item">
                  <h4>📝 Clear Subject Lines</h4>
                  <p>Write compelling subject lines that encourage opens.</p>
                </div>
                <div className="tip-item">
                  <h4>🎯 Personalization</h4>
                  <p>Use recipient names and relevant content for better engagement.</p>
                </div>
                <div className="tip-item">
                  <h4>📱 Mobile Friendly</h4>
                  <p>Ensure emails look great on all devices.</p>
                </div>
                <div className="tip-item">
                  <h4>📊 Test Before Sending</h4>
                  <p>Always test your bulk emails and group campaigns before launching.</p>
                </div>
                <div className="tip-item">
                  <h4>👥 Segment Your Lists</h4>
                  <p>Group contacts by interests, behavior, or demographics for better targeting.</p>
                </div>
                <div className="tip-item">
                  <h4>📱 Mobile Optimization</h4>
                  <p>Ensure your emails look great on mobile devices for better engagement.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'whatsapp':
        return (
          <div className="guide-section">
            <h2>📱 WhatsApp Integration Guide</h2>
            
            <div className="guide-subsection">
              <h3>WhatsApp Bot Overview</h3>
              <p>Integrate your CRM with WhatsApp for seamless communication with leads, customers, and team members.</p>
              
              <div className="feature-grid">
                <div className="feature-card">
                  <h4>🔗 CRM Integration</h4>
                  <ul>
                    <li>Direct access to CRM leads and contacts</li>
                    <li>Real-time lead information display</li>
                    <li>Pipeline stage-based organization</li>
                    <li>Automatic contact synchronization</li>
                  </ul>
                </div>
                <div className="feature-card">
                  <h4>💬 Messaging Features</h4>
                  <ul>
                    <li>Single message to individual contacts</li>
                    <li>Bulk messaging to multiple leads</li>
                    <li>Pipeline-based targeted messaging</li>
                    <li>Message templates and automation</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="guide-subsection">
              <h3>🚀 Getting Started with WhatsApp Bot</h3>
              <div className="step-by-step">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Install Dependencies</h4>
                    <p>Navigate to the WhatsApp bot directory and install required packages:</p>
                    <ul>
                      <li>Open terminal/command prompt</li>
                      <li>Navigate to: <code>cd wwebjs-bot</code></li>
                      <li>Install packages: <code>npm install</code></li>
                      <li>Ensure CRM backend is running on port 5000</li>
                    </ul>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Start WhatsApp Bot Server</h4>
                    <p>Launch the WhatsApp bot server:</p>
                    <ul>
                      <li>Run: <code>npm run server</code></li>
                      <li>Server will start on port 3000</li>
                      <li>Open dashboard: <code>http://localhost:3000</code></li>
                      <li>Verify CRM connection status</li>
                    </ul>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Connect WhatsApp Client</h4>
                    <p>Set up your WhatsApp connection:</p>
                    <ul>
                      <li>Click "Create Client" in dashboard</li>
                      <li>Scan QR code with your phone</li>
                      <li>Wait for "Client Ready" status</li>
                      <li>Verify connection is active</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="guide-subsection">
              <h3>👥 User & Lead Management</h3>
              <div className="feature-grid">
                <div className="feature-card">
                  <h4>📋 CRM Leads Display</h4>
                  <ul>
                    <li>View all leads organized by pipeline stages</li>
                    <li>See lead details: name, company, phone, email</li>
                    <li>Real-time updates from CRM database</li>
                    <li>Filter leads by stage, company, or status</li>
                  </ul>
                </div>
                <div className="feature-card">
                  <h4>🔍 Lead Information</h4>
                  <ul>
                    <li>Contact name and company details</li>
                    <li>Phone number for WhatsApp messaging</li>
                    <li>Email address and lead value</li>
                    <li>Current pipeline stage and creation date</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="guide-subsection">
              <h3>💬 Single Message Sending</h3>
              <div className="step-by-step">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Select Contact</h4>
                    <p>Choose the lead you want to message:</p>
                    <ul>
                      <li>Browse leads in CRM Leads section</li>
                      <li>Click on the specific lead's row</li>
                      <li>Verify phone number is correct</li>
                      <li>Ensure WhatsApp client is connected</li>
                    </ul>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Compose Message</h4>
                    <p>Write your personalized message:</p>
                    <ul>
                      <li>Click "Message" button for the lead</li>
                      <li>Type your message in the chat box</li>
                      <li>Use lead's name for personalization</li>
                      <li>Keep message professional and clear</li>
                    </ul>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Send & Track</h4>
                    <p>Send message and monitor delivery:</p>
                    <ul>
                      <li>Click send button to deliver message</li>
                      <li>Check delivery status in chat</li>
                      <li>Monitor for replies from the lead</li>
                      <li>Update lead status in CRM if needed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="guide-subsection">
              <h3>📢 Bulk Messaging System</h3>
              <div className="feature-grid">
                <div className="feature-card">
                  <h4>🎯 Bulk Message Setup</h4>
                  <ul>
                    <li>Select multiple leads for messaging</li>
                    <li>Create message templates for consistency</li>
                    <li>Set delivery timing and scheduling</li>
                    <li>Preview message before sending</li>
                  </ul>
                </div>
                <div className="feature-card">
                  <h4>📊 Bulk Message Management</h4>
                  <ul>
                    <li>Track delivery status for all messages</li>
                    <li>Monitor response rates and engagement</li>
                    <li>Handle failed deliveries automatically</li>
                    <li>Generate delivery reports</li>
                  </ul>
                </div>
              </div>
              
              <div className="step-by-step">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Select Target Audience</h4>
                    <ul>
                      <li>Choose leads by pipeline stage</li>
                      <li>Select by company or industry</li>
                      <li>Filter by lead value or priority</li>
                      <li>Verify phone numbers are valid</li>
                    </ul>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Create Message Template</h4>
                    <ul>
                      <li>Write compelling message content</li>
                      <li>Use personalization variables</li>
                      <li>Include clear call-to-action</li>
                      <li>Test message length and format</li>
                    </ul>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Send & Monitor</h4>
                    <ul>
                      <li>Review selected recipients list</li>
                      <li>Send messages in batches</li>
                      <li>Monitor delivery progress</li>
                      <li>Track responses and engagement</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="guide-subsection">
              <h3>🎯 Pipeline-Based Messaging</h3>
              <div className="feature-grid">
                <div className="feature-card">
                  <h4>📈 Stage-Specific Messages</h4>
                  <ul>
                    <li>Customize messages by pipeline stage</li>
                    <li>Send follow-up messages automatically</li>
                    <li>Target leads at specific milestones</li>
                    <li>Increase conversion rates with timing</li>
                  </ul>
                </div>
                <div className="feature-card">
                  <h4>🔄 Automated Workflows</h4>
                  <ul>
                    <li>Set up stage transition triggers</li>
                    <li>Automate welcome messages</li>
                    <li>Schedule reminder messages</li>
                    <li>Create nurturing sequences</li>
                  </ul>
                </div>
              </div>
              
              <div className="step-by-step">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Identify Pipeline Stages</h4>
                    <ul>
                      <li>Review your sales pipeline stages</li>
                      <li>Identify key decision points</li>
                      <li>Determine optimal messaging timing</li>
                      <li>Map customer journey stages</li>
                    </ul>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Create Stage Messages</h4>
                    <ul>
                      <li>Write messages for each stage</li>
                      <li>Include stage-specific information</li>
                      <li>Add relevant call-to-actions</li>
                      <li>Test message effectiveness</li>
                    </ul>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Set Up Automation</h4>
                    <ul>
                      <li>Configure stage transition triggers</li>
                      <li>Set message delivery timing</li>
                      <li>Create follow-up sequences</li>
                      <li>Monitor automation performance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="guide-subsection">
              <h3>⚙️ Advanced Features</h3>
              <div className="feature-grid">
                <div className="feature-card">
                  <h4>🤖 Bot Commands</h4>
                  <ul>
                    <li>!ping - Test bot connectivity</li>
                    <li>!help - Show available commands</li>
                    <li>!time - Get current time</li>
                    <li>!info - Display message details</li>
                  </ul>
                </div>
                <div className="feature-card">
                  <h4>📱 Mobile Integration</h4>
                  <ul>
                    <li>QR code scanning for connection</li>
                    <li>Session persistence across restarts</li>
                    <li>Multi-device support</li>
                    <li>Offline message queuing</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="guide-subsection">
              <h3>🔧 Troubleshooting</h3>
              <div className="feature-grid">
                <div className="feature-card">
                  <h4>❌ Common Issues</h4>
                  <ul>
                    <li>CRM server not running - Start backend on port 5000</li>
                    <li>WhatsApp connection failed - Re-scan QR code</li>
                    <li>Messages not sending - Check client status</li>
                    <li>Phone number errors - Verify CRM data</li>
                  </ul>
                </div>
                <div className="feature-card">
                  <h4>✅ Solutions</h4>
                  <ul>
                    <li>Restart CRM backend server</li>
                    <li>Reconnect WhatsApp client</li>
                    <li>Check network connectivity</li>
                    <li>Validate phone number format</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="guide-subsection">
              <h3>💡 Best Practices</h3>
              <div className="best-practices">
                <div className="practice-item">
                  <h4>⏰ Timing</h4>
                  <p>Send messages during business hours for better response rates.</p>
                </div>
                <div className="practice-item">
                  <h4>📝 Personalization</h4>
                  <p>Always use the lead's name and company for better engagement.</p>
                </div>
                <div className="practice-item">
                  <h4>🎯 Targeting</h4>
                  <p>Use pipeline stages to send relevant messages at the right time.</p>
                </div>
                <div className="practice-item">
                  <h4>📊 Monitoring</h4>
                  <p>Track message delivery and response rates to optimize campaigns.</p>
                </div>
                <div className="practice-item">
                  <h4>🔄 Follow-up</h4>
                  <p>Set up automated follow-up sequences for leads who don't respond.</p>
                </div>
                <div className="practice-item">
                  <h4>📱 Mobile-First</h4>
                  <p>Keep messages concise and mobile-friendly for better readability.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'admin':
        return (
          <div className="guide-section">
            <h2>⚙️ Admin Features Guide</h2>
            
            <div className="guide-subsection">
              <h3>Admin Dashboard Overview</h3>
              <p>Comprehensive system management for administrators with advanced analytics and control.</p>
              
              <div className="admin-stats">
                <div className="stat-card">
                  <h4>👥 User Management</h4>
                  <ul>
                    <li>Total admin users</li>
                    <li>Employee accounts</li>
                    <li>Permission management</li>
                    <li>Role assignments</li>
                  </ul>
                </div>
                <div className="stat-card">
                  <h4>📊 System Analytics</h4>
                  <ul>
                    <li>Revenue tracking</li>
                    <li>Message statistics</li>
                    <li>Package subscriptions</li>
                    <li>System performance</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>User Management</h3>
              <div className="user-management">
                <div className="management-feature">
                  <h4>➕ Add New Users</h4>
                  <ul>
                    <li>Create employee accounts</li>
                    <li>Set role permissions</li>
                    <li>Assign access levels</li>
                    <li>Send welcome emails</li>
                  </ul>
                </div>
                <div className="management-feature">
                  <h4>🔐 Permission Control</h4>
                  <ul>
                    <li>Granular access control</li>
                    <li>Feature restrictions</li>
                    <li>Data access limits</li>
                    <li>Audit logging</li>
                  </ul>
                </div>
                <div className="management-feature">
                  <h4>📈 Performance Monitoring</h4>
                  <ul>
                    <li>User activity tracking</li>
                    <li>Productivity metrics</li>
                    <li>System usage analytics</li>
                    <li>Performance reports</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>System Administration</h3>
              <div className="system-admin">
                <div className="admin-feature">
                  <h4>🔧 System Settings</h4>
                  <ul>
                    <li>Database configuration</li>
                    <li>Email server setup</li>
                    <li>Backup management</li>
                    <li>Security settings</li>
                  </ul>
                </div>
                <div className="admin-feature">
                  <h4>📋 Package Management</h4>
                  <ul>
                    <li>Subscription plans</li>
                    <li>Feature access control</li>
                    <li>Billing management</li>
                    <li>Usage monitoring</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>🔄 Advanced Admin Operations</h3>
              <div className="advanced-admin-features">
                <div className="admin-operation">
                  <h4>👥 User Re-assignment & Management</h4>
                  <ul>
                    <li>Re-assign leads and tasks between users</li>
                    <li>Bulk user role changes and permissions</li>
                    <li>User workload monitoring and balancing</li>
                    <li>Performance-based user reassignment</li>
                  </ul>
                </div>
                <div className="admin-operation">
                  <h4>📊 Advanced Analytics & Reporting</h4>
                  <ul>
                    <li>Custom report generation</li>
                    <li>Data export and import tools</li>
                    <li>System health monitoring</li>
                    <li>Real-time performance dashboards</li>
                  </ul>
                </div>
                <div className="admin-operation">
                  <h4>🔒 Security & Compliance</h4>
                  <ul>
                    <li>User activity audit logs</li>
                    <li>Data access controls and restrictions</li>
                    <li>Backup and recovery procedures</li>
                    <li>Compliance reporting tools</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'tips':
        return (
          <div className="guide-section">
            <h2>💡 Tips & Best Practices</h2>
            
            <div className="guide-subsection">
              <h3>General CRM Best Practices</h3>
              <div className="general-tips">
                <div className="tip-category">
                  <h4>📱 Daily Routine</h4>
                  <ul>
                    <li>Check dashboard first thing in the morning</li>
                    <li>Review tasks and deadlines</li>
                    <li>Follow up on hot leads</li>
                    <li>Update lead information</li>
                  </ul>
                </div>
                <div className="tip-category">
                  <h4>📊 Weekly Review</h4>
                  <ul>
                    <li>Analyze pipeline performance</li>
                    <li>Review conversion rates</li>
                    <li>Plan next week's activities</li>
                    <li>Clean up old data</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>Lead Management Tips</h3>
              <div className="lead-tips">
                <div className="tip-item">
                  <h4>🎯 Qualification</h4>
                  <p>Use BANT criteria: Budget, Authority, Need, Timeline</p>
                </div>
                <div className="tip-item">
                  <h4>📞 Follow-up Strategy</h4>
                  <p>Follow up within 24 hours, then 3-5 days, then weekly</p>
                </div>
                <div className="tip-item">
                  <h4>📝 Documentation</h4>
                  <p>Record every interaction and important detail</p>
                </div>
                <div className="tip-item">
                  <h4>⏰ Timing</h4>
                  <p>Contact leads when they're most likely to respond</p>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>Productivity Hacks</h3>
              <div className="productivity-tips">
                <div className="hack-item">
                  <h4>🚀 Keyboard Shortcuts</h4>
                  <p>Learn and use keyboard shortcuts for faster navigation</p>
                </div>
                <div className="hack-item">
                  <h4>📱 Mobile Access</h4>
                  <p>Use mobile app for quick updates on the go</p>
                </div>
                <div className="hack-item">
                  <h4>🤖 Automation</h4>
                  <p>Set up automated workflows for repetitive tasks</p>
                </div>
                <div className="hack-item">
                  <h4>📊 Templates</h4>
                  <p>Create templates for common emails and tasks</p>
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>Common Mistakes to Avoid</h3>
              <div className="mistakes-list">
                <div className="mistake-item">
                  <h4>❌ Not Following Up</h4>
                  <p>Leads need consistent follow-up to convert</p>
                </div>
                <div className="mistake-item">
                  <h4>❌ Poor Data Entry</h4>
                  <p>Incomplete or inaccurate data hurts your CRM effectiveness</p>
                </div>
                <div className="mistake-item">
                  <h4>❌ Ignoring Analytics</h4>
                  <p>Data insights help optimize your sales process</p>
                </div>
                <div className="mistake-item">
                  <h4>❌ Overcomplicating</h4>
                  <p>Keep processes simple and consistent</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="user-guide-container">
      <div className="guide-header">
        <h1>📚 CRM User Guide</h1>
        <p>Complete guide to using your CRM system effectively</p>
      </div>

      <div className="guide-content">
        <div className="guide-sidebar">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`sidebar-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <span className="section-icon">{section.icon}</span>
              <span className="section-title">{section.title}</span>
            </button>
          ))}
        </div>

        <div className="guide-main">
          {renderSection()}
        </div>
      </div>
    </div>
  );
} 