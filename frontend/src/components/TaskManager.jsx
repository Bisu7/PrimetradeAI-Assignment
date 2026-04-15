import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, Trash2, Edit2, Plus, X } from 'lucide-react';
import api from '../api/client';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', is_completed: false });
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await api.get('/tasks/');
      setTasks(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const openForm = (task = null) => {
    setError('');
    if (task) {
      setFormData({ title: task.title, description: task.description || '', is_completed: task.is_completed });
      setCurrentTask(task);
    } else {
      setFormData({ title: '', description: '', is_completed: false });
      setCurrentTask(null);
    }
    setModalOpen(true);
  };

  const closeForm = () => {
    setModalOpen(false);
    setCurrentTask(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentTask) {
        await api.put(`/tasks/${currentTask.id}`, formData);
      } else {
        await api.post('/tasks/', formData);
      }
      closeForm();
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred saving the task');
    }
  };

  const toggleComplete = async (task) => {
    try {
      await api.put(`/tasks/${task.id}`, { ...task, is_completed: !task.is_completed });
      fetchTasks();
    } catch (err) {
      console.error('Error toggling task completion', err);
    }
  };

  const deleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await api.delete(`/tasks/${taskId}`);
        fetchTasks();
      } catch (err) {
        console.error('Error deleting task', err);
      }
    }
  };

  return (
    <div className="task-manager">
      <div className="task-header">
        <h2>Task Management</h2>
        <button onClick={() => openForm()} className="btn btn-primary">
          <Plus size={18} /> New Task
        </button>
      </div>
      
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <div className="empty-state glass-panel">
          <p>No tasks found. Create one to get started!</p>
        </div>
      ) : (
        <div className="task-grid">
          {tasks.map(task => (
            <div key={task.id} className={`task-card glass-panel ${task.is_completed ? 'completed' : ''}`}>
              <div className="task-info">
                <div className="task-status cursor-pointer" onClick={() => toggleComplete(task)}>
                  {task.is_completed ? <CheckCircle className="text-success" /> : <Circle className="text-muted" />}
                </div>
                <div>
                  <h4 className={task.is_completed ? 'line-through text-muted' : ''}>{task.title}</h4>
                  <p className="task-desc">{task.description}</p>
                </div>
              </div>
              <div className="task-actions">
                <button onClick={() => openForm(task)} className="btn-icon text-primary"><Edit2 size={18} /></button>
                <button onClick={() => deleteTask(task.id)} className="btn-icon text-error"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal glass-panel animate-zoom-in">
            <div className="modal-header">
              <h3>{currentTask ? 'Edit Task' : 'New Task'}</h3>
              <button onClick={closeForm} className="btn-icon"><X size={20} /></button>
            </div>
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label>Title</label>
                <input 
                  type="text" 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})} 
                  className="form-input" 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                  className="form-input" 
                  rows="3"
                ></textarea>
              </div>
              <div className="form-actions">
                <button type="button" onClick={closeForm} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">{currentTask ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManager;
