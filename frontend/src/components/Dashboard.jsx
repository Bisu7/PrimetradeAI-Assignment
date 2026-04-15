import React, { useState, useEffect } from 'react';
import { User, Activity, ShieldCheck } from 'lucide-react';
import TaskManager from './TaskManager';
import api from '../api/client';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/auth/me');
        setUser(response.data);
      } catch (err) {
        console.error('Failed to fetch user context', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return <div className="loading-state">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-container container">
      <div className="dashboard-header animate-fade-in">
        <h1>Dashboard</h1>
        <p>Welcome back, manage your data seamlessly.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card glass-panel animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="stat-icon"><User size={24} /></div>
          <div className="stat-details">
            <h3>Registered Email</h3>
            <p>{user?.email}</p>
          </div>
        </div>
        <div className="stat-card glass-panel animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="stat-icon"><ShieldCheck size={24} /></div>
          <div className="stat-details">
            <h3>Account Role</h3>
            <p className="role-badge">{user?.role}</p>
          </div>
        </div>
        <div className="stat-card glass-panel animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="stat-icon"><Activity size={24} /></div>
          <div className="stat-details">
            <h3>Status</h3>
            <p className="status-badge">Active</p>
          </div>
        </div>
      </div>

      <div className="content-section animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <TaskManager />
      </div>
    </div>
  );
};

export default Dashboard;
