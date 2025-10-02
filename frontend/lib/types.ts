export interface User {
  id: number;
  name: string;
  email: string;
  skills: string;
  bio: string;
  avatar?: string;
  created_at: string;
}

export interface Project {
  id: number;
  owner_id: number;
  owner: User;
  title: string;
  description: string;
  category: string;
  level: string;
  methodology: string;
  duration: string;
  involvement: string;
  kpi_score: number;
  created_at: string;
  updated_at: string;
  members?: ProjectMember[];
  messages?: Message[];
}

export interface ProjectMember {
  id: number;
  project_id: number;
  user_id: number;
  user: User;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

export interface Message {
  id: number;
  project_id: number;
  user_id: number;
  user: User;
  content: string;
  created_at: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateProjectRequest {
  title: string;
  description: string;
  category: string;
  level: string;
}

export interface UpdateUserRequest {
  name?: string;
  skills?: string;
  bio?: string;
}

export interface CreateMessageRequest {
  content: string;
}
