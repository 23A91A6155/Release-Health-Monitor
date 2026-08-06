import React, { useState } from 'react';
import * as Sentry from '@sentry/react';
import * as api from '../services/api';

interface ErrorPanelProps {
  onToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

const ErrorPanel: React.FC<ErrorPanelProps> = ({ onToast }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  const handleUnhandledException = () => {
    onToast('Throwing unhandled exception...', 'info');
    setTimeout(() => {
      throw new Error('Intentional Unhandled Exception - Frontend v1.0.0');
    }, 100);
  };

  const handleHandledError = () => {
    try {
      throw new Error('Intentional Handled Error - Frontend v1.1.0');
    } catch (err) {
      Sentry.captureException(err);
      onToast('Handled error sent to Sentry successfully!', 'success');
    }
  };

  const handleBackendUnhandled = async () => {
    setLoading('backend-unhandled');
    try {
      await api.triggerUnhandledError();
      onToast('Backend unhandled error triggered', 'info');
    } catch {
      onToast('Backend unhandled error triggered (expected failure)', 'info');
    } finally {
      setLoading(null);
    }
  };

  const handleBackendHandled = async () => {
    setLoading('backend-handled');
    try {
      await api.triggerHandledError();
      onToast('Backend handled error sent to Sentry', 'success');
    } catch {
      onToast('Backend handled error triggered', 'info');
    } finally {
      setLoading(null);
    }
  };

  const handleHealthySession = async () => {
    setLoading('healthy');
    try {
      const created = await api.createItem({
        title: 'Health Check Note',
        content: 'This note was created during a healthy session test.',
      });
      await api.getItems();
      await api.getItem(created.id);
      await api.updateItem(created.id, { title: 'Health Check Note (Updated)' });
      await api.deleteItem(created.id);
      onToast('Healthy session generated successfully!', 'success');
    } catch {
      onToast('Error generating healthy session', 'error');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className={`error-panel ${isOpen ? 'error-panel--open' : ''}`}>
      <button
        className="error-panel__header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="error-panel__header-content">
          <span className="error-panel__warning-icon">⚠️</span>
          <span className="error-panel__header-title">Sentry Error Testing Panel</span>
        </div>
        <span className={`error-panel__chevron ${isOpen ? 'error-panel__chevron--open' : ''}`}>
          ›
        </span>
      </button>

      {isOpen && (
        <div className="error-panel__body">
          <p className="error-panel__description">
            Use these buttons to trigger errors for Sentry monitoring. Each button simulates
            different error scenarios for release health tracking.
          </p>

          <div className="error-panel__grid">
            <div className="error-panel__card">
              <h4 className="error-panel__card-title">Frontend Errors</h4>
              <button
                className="btn btn--danger btn--full"
                onClick={handleUnhandledException}
                id="btn-unhandled-exception"
              >
                <span className="btn__icon">💥</span>
                Trigger Unhandled Exception (v1.0.0)
              </button>
              <p className="error-panel__btn-desc">
                Throws an unhandled Error caught by Sentry's global handler
              </p>

              <button
                className="btn btn--warning btn--full"
                onClick={handleHandledError}
                id="btn-handled-error"
              >
                <span className="btn__icon">🛡️</span>
                Trigger Handled Error (v1.1.0)
              </button>
              <p className="error-panel__btn-desc">
                Catches error and reports via Sentry.captureException()
              </p>
            </div>

            <div className="error-panel__card">
              <h4 className="error-panel__card-title">Backend Errors</h4>
              <button
                className="btn btn--danger-outline btn--full"
                onClick={handleBackendUnhandled}
                disabled={loading === 'backend-unhandled'}
                id="btn-backend-unhandled"
              >
                <span className="btn__icon">🔥</span>
                {loading === 'backend-unhandled' ? 'Triggering...' : 'Backend Unhandled Error'}
              </button>
              <p className="error-panel__btn-desc">
                Triggers an unhandled promise rejection on the server
              </p>

              <button
                className="btn btn--warning-outline btn--full"
                onClick={handleBackendHandled}
                disabled={loading === 'backend-handled'}
                id="btn-backend-handled"
              >
                <span className="btn__icon">📡</span>
                {loading === 'backend-handled' ? 'Triggering...' : 'Backend Handled Error'}
              </button>
              <p className="error-panel__btn-desc">
                Server catches error and reports to Sentry
              </p>
            </div>

            <div className="error-panel__card error-panel__card--success">
              <h4 className="error-panel__card-title">Session Health</h4>
              <button
                className="btn btn--success btn--full"
                onClick={handleHealthySession}
                disabled={loading === 'healthy'}
                id="btn-healthy-session"
              >
                <span className="btn__icon">💚</span>
                {loading === 'healthy' ? 'Generating...' : 'Generate Healthy Session'}
              </button>
              <p className="error-panel__btn-desc">
                Performs full CRUD cycle to create a healthy (crash-free) session for v1.1.1
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ErrorPanel;
