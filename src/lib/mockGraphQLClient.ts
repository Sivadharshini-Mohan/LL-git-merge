import { mockProjects, mockCommits } from '../data/mockData';
import type { Project, CommitData } from '../types/graphql';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Available programming languages
const PROGRAMMING_LANGUAGES = [
  "Java",
  "Python",
  "JavaScript",
  "TypeScript",
  "C++",
  "C#",
  "Ruby",
  "Go",
  "PHP",
  "Swift",
  "Kotlin",
  "Rust",
  "COBOL",
] as const;

interface GraphQLResponse<T> {
  data: T;
}

class MockGraphQLClient {
  async query<T>(options: { query: string; variables?: Record<string, any> }): Promise<GraphQLResponse<T>> {
    await delay(300); // Simulate network latency
    
    // Simple query parsing (in real GraphQL this would be properly parsed)
    const queryName = options.query.toLowerCase();
    
    if (queryName.includes('languages')) {
      return { data: { languages: PROGRAMMING_LANGUAGES } as T };
    }

    if (queryName.includes('projects')) {
      return { data: { projects: mockProjects } as T };
    }
    
    if (queryName.includes('project') && options.variables?.id) {
      const project = mockProjects.find(p => p.id === options.variables.id);
      return { data: { project } as T };
    }
    
    if (queryName.includes('commits')) {
      return { data: { commits: mockCommits } as T };
    }
    
    throw new Error(`Query not supported: ${queryName}`);
  }

  async mutate<T>(options: { mutation: string; variables: Record<string, any> }): Promise<GraphQLResponse<T>> {
    await delay(300);
    
    const mutationName = options.mutation.toLowerCase();
    
    if (mutationName.includes('createproject')) {
      const newProject: Project = {
        id: Date.now().toString(),
        ...options.variables.input,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockProjects.push(newProject);
      return { data: { createProject: newProject } as T };
    }
    
    if (mutationName.includes('updateproject')) {
      const { id, ...updates } = options.variables.input;
      const projectIndex = mockProjects.findIndex(p => p.id === id);
      if (projectIndex === -1) throw new Error('Project not found');
      
      mockProjects[projectIndex] = {
        ...mockProjects[projectIndex],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      return { data: { updateProject: mockProjects[projectIndex] } as T };
    }
    
    if (mutationName.includes('deleteproject')) {
      const { id } = options.variables;
      const projectIndex = mockProjects.findIndex(p => p.id === id);
      if (projectIndex === -1) throw new Error('Project not found');
      
      mockProjects.splice(projectIndex, 1);
      return { data: { deleteProject: { id, success: true } } as T };
    }
    
    throw new Error(`Mutation not supported: ${mutationName}`);
  }
}

export const mockGraphQLClient = new MockGraphQLClient(); 