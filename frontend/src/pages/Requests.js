import React, { useEffect, useState } from 'react';
import API from '../api';
import './Requests.css';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Requests() {
  const [requests, setRequests] = useState([]);
  const [showStatus, setShowStatus] = useState(true);

  useEffect(() => {
    API.get('/requests/incoming')
      .then(res => setRequests(res.data))
      .catch(err => {
        console.error(err);
        toast.error("Failed to fetch requests");
      });
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/requests/${id}/status`, { status });
      setRequests(req => req.map(r => r._id === id ? { ...r, status } : r));
      toast.success(`Request ${status}`);
    } catch (err) {
      console.error(err);
      toast.error("Error updating request");
    }
  };

  return (
    <div className="requests-container">
      <div className="requests-header">
        <h2 className="requests-title">📨 Incoming Requests</h2>
        <button className="toggle-btn" onClick={() => setShowStatus(!showStatus)}>
          {showStatus ? <FaEyeSlash /> : <FaEye />} Toggle Status
        </button>
      </div>

      {requests.length === 0 ? (
        <p className="no-requests">No incoming requests.</p>
      ) : (
        requests.map(req => (
          <div className="request-item glass" key={req._id}>
            <p><strong>Book:</strong> {req.book?.title || 'N/A'}</p>
            {showStatus && <p><strong>Status:</strong> {req.status}</p>}

            <div className="request-actions">
              <button className="accept-btn" onClick={() => updateStatus(req._id, "accepted")}>
                ✅ Accept
              </button>
              <button className="decline-btn" onClick={() => updateStatus(req._id, "declined")}>
                ❌ Decline
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Requests;
