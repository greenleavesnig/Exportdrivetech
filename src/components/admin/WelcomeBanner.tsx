'use client'

import React from 'react'

export default function WelcomeBanner() {
  return (
    <div className="welcome-banner">
      <h1>Welcome to ExportDriveTech Admin</h1>
      <p>Manage your agricultural export business efficiently. Track RFQs, manage products, and monitor submissions from one central dashboard.</p>
      
      <div className="welcome-stats">
        <div className="stat-card">
          <h3>RFQs</h3>
          <p>Track quote requests</p>
        </div>
        <div className="stat-card">
          <h3>Products</h3>
          <p>Manage your catalog</p>
        </div>
        <div className="stat-card">
          <h3>Categories</h3>
          <p>Organize by type</p>
        </div>
        <div className="stat-card">
          <h3>Media</h3>
          <p>Upload assets</p>
        </div>
      </div>
    </div>
  )
}
