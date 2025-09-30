import React, { useState, useEffect } from 'react';
import { FaUsers, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaShoppingCart, FaRupeeSign, FaSearch, FaFilter, FaEye, FaEdit, FaBan, FaCheckCircle, FaUserCog } from 'react-icons/fa';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  // Generate mock user data based on orders and predefined users
  useEffect(() => {
    const mockUsers = [
      {
        id: 1,
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@email.com',
        phone: '+91 98765 43210',
        address: 'Bangalore, Karnataka',
        joinDate: '2024-01-15',
        status: 'active',
        totalOrders: 12,
        totalSpent: 4580,
        lastOrderDate: '2024-09-10',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      {
        id: 2,
        name: 'Priya Sharma',
        email: 'priya.sharma@email.com',
        phone: '+91 87654 32109',
        address: 'Mumbai, Maharashtra',
        joinDate: '2024-02-20',
        status: 'active',
        totalOrders: 8,
        totalSpent: 3240,
        lastOrderDate: '2024-09-08',
        avatar: 'https://i.pravatar.cc/150?img=2'
      },
      {
        id: 3,
        name: 'Amit Patel',
        email: 'amit.patel@email.com',
        phone: '+91 76543 21098',
        address: 'Delhi, NCR',
        joinDate: '2024-03-10',
        status: 'inactive',
        totalOrders: 5,
        totalSpent: 1890,
        lastOrderDate: '2024-08-15',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      {
        id: 4,
        name: 'Sneha Reddy',
        email: 'sneha.reddy@email.com',
        phone: '+91 65432 10987',
        address: 'Hyderabad, Telangana',
        joinDate: '2024-04-05',
        status: 'active',
        totalOrders: 15,
        totalSpent: 6750,
        lastOrderDate: '2024-09-12',
        avatar: 'https://i.pravatar.cc/150?img=4'
      },
      {
        id: 5,
        name: 'Vikram Singh',
        email: 'vikram.singh@email.com',
        phone: '+91 54321 09876',
        address: 'Jaipur, Rajasthan',
        joinDate: '2024-05-18',
        status: 'suspended',
        totalOrders: 3,
        totalSpent: 1250,
        lastOrderDate: '2024-07-20',
        avatar: 'https://i.pravatar.cc/150?img=5'
      },
      {
        id: 6,
        name: 'Kavya Iyer',
        email: 'kavya.iyer@email.com',
        phone: '+91 43210 98765',
        address: 'Chennai, Tamil Nadu',
        joinDate: '2024-06-12',
        status: 'active',
        totalOrders: 9,
        totalSpent: 3890,
        lastOrderDate: '2024-09-11',
        avatar: 'https://i.pravatar.cc/150?img=6'
      }
    ];

    setUsers(mockUsers);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleUserAction = (userId, action) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, status: action === 'activate' ? 'active' : action === 'suspend' ? 'suspended' : user.status }
          : user
      )
    );
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { icon: <FaCheckCircle />, class: 'active', text: 'Active' },
      inactive: { icon: <FaUser />, class: 'inactive', text: 'Inactive' },
      suspended: { icon: <FaBan />, class: 'suspended', text: 'Suspended' }
    };
    
    const config = statusConfig[status] || statusConfig.inactive;
    
    return (
      <span className={`status-badge ${config.class}`}>
        {config.icon} {config.text}
      </span>
    );
  };

  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    suspended: users.filter(u => u.status === 'suspended').length
  };

  return (
    <div className="users-page">
      <div className="users-header">
        <h2><FaUsers /> User Management</h2>
        <p>Manage customer accounts, orders, and user activity</p>
      </div>

      {/* User Statistics */}
      <div className="users-stats">
        <div className="stat-card">
          <div className="stat-icon total">
            <FaUsers />
          </div>
          <div className="stat-info">
            <h3>{userStats.total}</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon active">
            <FaCheckCircle />
          </div>
          <div className="stat-info">
            <h3>{userStats.active}</h3>
            <p>Active Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon inactive">
            <FaUser />
          </div>
          <div className="stat-info">
            <h3>{userStats.inactive}</h3>
            <p>Inactive Users</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon suspended">
            <FaBan />
          </div>
          <div className="stat-info">
            <h3>{userStats.suspended}</h3>
            <p>Suspended Users</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="users-controls">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-container">
          <FaFilter className="filter-icon" />
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Users</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Contact</th>
              <th>Join Date</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td className="user-info-cell">
                  <div className="user-info">
                    <img src={user.avatar} alt={user.name} className="user-avatar" />
                    <div>
                      <h4>{user.name}</h4>
                      <p className="user-email">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="contact-cell">
                  <div className="contact-info">
                    <p><FaPhone /> {user.phone}</p>
                    <p><FaMapMarkerAlt /> {user.address}</p>
                  </div>
                </td>
                <td className="date-cell">
                  <FaCalendarAlt />
                  {new Date(user.joinDate).toLocaleDateString()}
                </td>
                <td className="orders-cell">
                  <div className="orders-info">
                    <span className="order-count">
                      <FaShoppingCart /> {user.totalOrders}
                    </span>
                    <small>Last: {new Date(user.lastOrderDate).toLocaleDateString()}</small>
                  </div>
                </td>
                <td className="spent-cell">
                  <span className="amount">
                    <FaRupeeSign />₹{user.totalSpent.toLocaleString()}
                  </span>
                </td>
                <td className="status-cell">
                  {getStatusBadge(user.status)}
                </td>
                <td className="actions-cell">
                  <div className="user-actions">
                    <button
                      onClick={() => handleViewUser(user)}
                      className="action-btn view-btn"
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleUserAction(user.id, 'edit')}
                      className="action-btn edit-btn"
                      title="Edit User"
                    >
                      <FaEdit />
                    </button>
                    {user.status === 'active' ? (
                      <button
                        onClick={() => handleUserAction(user.id, 'suspend')}
                        className="action-btn suspend-btn"
                        title="Suspend User"
                      >
                        <FaBan />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUserAction(user.id, 'activate')}
                        className="action-btn activate-btn"
                        title="Activate User"
                      >
                        <FaCheckCircle />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUsers.length === 0 && (
        <div className="no-users">
          <FaUsers className="no-users-icon" />
          <h3>No users found</h3>
          <p>Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* User Detail Modal */}
      {showUserModal && selectedUser && (
        <div className="modal-overlay" onClick={() => setShowUserModal(false)}>
          <div className="user-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3><FaUserCog /> User Details</h3>
              <button 
                className="modal-close"
                onClick={() => setShowUserModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="user-profile">
                <img src={selectedUser.avatar} alt={selectedUser.name} className="profile-avatar" />
                <div className="profile-info">
                  <h2>{selectedUser.name}</h2>
                  {getStatusBadge(selectedUser.status)}
                </div>
              </div>
              
              <div className="user-details-grid">
                <div className="detail-item">
                  <FaEnvelope className="detail-icon" />
                  <div>
                    <label>Email</label>
                    <p>{selectedUser.email}</p>
                  </div>
                </div>
                <div className="detail-item">
                  <FaPhone className="detail-icon" />
                  <div>
                    <label>Phone</label>
                    <p>{selectedUser.phone}</p>
                  </div>
                </div>
                <div className="detail-item">
                  <FaMapMarkerAlt className="detail-icon" />
                  <div>
                    <label>Address</label>
                    <p>{selectedUser.address}</p>
                  </div>
                </div>
                <div className="detail-item">
                  <FaCalendarAlt className="detail-icon" />
                  <div>
                    <label>Member Since</label>
                    <p>{new Date(selectedUser.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="detail-item">
                  <FaShoppingCart className="detail-icon" />
                  <div>
                    <label>Total Orders</label>
                    <p>{selectedUser.totalOrders}</p>
                  </div>
                </div>
                <div className="detail-item">
                  <FaRupeeSign className="detail-icon" />
                  <div>
                    <label>Total Spent</label>
                    <p>₹{selectedUser.totalSpent.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
