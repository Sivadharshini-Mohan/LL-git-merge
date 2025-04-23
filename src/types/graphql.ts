export interface Project {
  id: string;
  name: string;
  description: string;
  repositoryUrl: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommitData {
  id: string;
  message: string;
  author: string;
  date: string;
  hash: string;
}

// GraphQL-like query type structure
export type QueryTypes = {
  projects: Project[];
  project: Project;
  commits: CommitData[];
};

// GraphQL-like mutation type structure
export type MutationTypes = {
  createProject: Project;
  updateProject: Project;
  deleteProject: { id: string; success: boolean };
}; 