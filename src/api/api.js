import axios from 'axios';

// Using port 5001 to prevent port conflicts with port 5000
const API_URL = 'http://localhost:5001/users';

const INITIAL_USERS = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@example.com',
    phone: '+1 (555) 234-5678',
    role: 'Frontend Developer',
    department: 'Engineering',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-01-15'
  },
  {
    id: '2',
    name: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    phone: '+1 (555) 345-6789',
    role: 'UI/UX Designer',
    department: 'Design',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-02-10'
  },
  {
    id: '3',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98765 43210',
    role: 'Full Stack Developer',
    department: 'Engineering',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-03-01'
  },
  {
    id: '4',
    name: 'Marcus Vance',
    email: 'marcus.vance@example.com',
    phone: '+1 (555) 567-8901',
    role: 'Product Manager',
    department: 'Product',
    status: 'Pending',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-03-12'
  },
  {
    id: '5',
    name: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    phone: '+44 20 7946 0912',
    role: 'QA Engineer',
    department: 'Engineering',
    status: 'Inactive',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-03-20'
  }
];

// Helper to get local data safely
const getLocalUsers = () => {
  try {
    const raw = localStorage.getItem('crud_users');
    if (!raw) {
      localStorage.setItem('crud_users', JSON.stringify(INITIAL_USERS));
      return INITIAL_USERS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    localStorage.setItem('crud_users', JSON.stringify(INITIAL_USERS));
    return INITIAL_USERS;
  } catch (e) {
    console.error('LocalStorage read error:', e);
    return INITIAL_USERS;
  }
};

const setLocalUsers = (users) => {
  try {
    if (Array.isArray(users)) {
      localStorage.setItem('crud_users', JSON.stringify(users));
    }
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
};

export const userService = {
  // GET all users
  async getAllUsers() {
    try {
      const response = await axios.get(API_URL, {
        timeout: 1000,
        headers: { Accept: 'application/json' }
      });

      // Crucial: Must be an array, not HTML or text
      if (Array.isArray(response.data)) {
        setLocalUsers(response.data);
        return { data: response.data, source: 'server' };
      }
      throw new Error('Server returned non-array data');
    } catch (err) {
      // Automatic fallback to local storage
      const fallback = getLocalUsers();
      return { data: fallback, source: 'local' };
    }
  },

  // GET single user
  async getUserById(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`, {
        timeout: 1000,
        headers: { Accept: 'application/json' }
      });
      if (response.data && typeof response.data === 'object') {
        return response.data;
      }
      throw new Error('Invalid user object');
    } catch {
      const users = getLocalUsers();
      return users.find((u) => String(u.id) === String(id));
    }
  },

  // POST: Create user
  async createUser(userData) {
    const newUser = {
      ...userData,
      id: String(Date.now()),
      createdAt: new Date().toISOString().split('T')[0],
      avatar:
        userData.avatar ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(userData.name)}`
    };

    try {
      const response = await axios.post(API_URL, newUser, { timeout: 1000 });
      if (response.data && response.data.id) {
        const local = getLocalUsers();
        setLocalUsers([response.data, ...local.filter((u) => u.id !== response.data.id)]);
        return response.data;
      }
      throw new Error('Invalid post response');
    } catch {
      const local = getLocalUsers();
      const updated = [newUser, ...local];
      setLocalUsers(updated);
      return newUser;
    }
  },

  // PUT: Update user
  async updateUser(id, updatedData) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData, { timeout: 1000 });
      if (response.data && typeof response.data === 'object') {
        const local = getLocalUsers();
        const updated = local.map((u) => (String(u.id) === String(id) ? response.data : u));
        setLocalUsers(updated);
        return response.data;
      }
      throw new Error('Invalid put response');
    } catch {
      const local = getLocalUsers();
      const updated = local.map((u) =>
        String(u.id) === String(id) ? { ...u, ...updatedData } : u
      );
      setLocalUsers(updated);
      return { ...updatedData, id };
    }
  },

  // DELETE: Remove user
  async deleteUser(id) {
    try {
      await axios.delete(`${API_URL}/${id}`, { timeout: 1000 });
      const local = getLocalUsers();
      setLocalUsers(local.filter((u) => String(u.id) !== String(id)));
      return true;
    } catch {
      const local = getLocalUsers();
      setLocalUsers(local.filter((u) => String(u.id) !== String(id)));
      return true;
    }
  }
};
