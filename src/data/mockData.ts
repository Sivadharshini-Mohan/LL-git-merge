import { Project, CommitData } from '../types/graphql';

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Legacy Leap UI',
    description: 'A modern UI for legacy code analysis',
    repositoryUrl: 'https://github.com/org/legacy-leap-ui',
    language: 'TypeScript',
    createdAt: new Date(2024, 0, 1).toISOString(),
    updatedAt: new Date(2024, 2, 15).toISOString(),
  },
  {
    id: '2',
    name: 'Code Analysis Tool',
    description: 'Tool for analyzing legacy codebase',
    repositoryUrl: 'https://github.com/org/code-analysis',
    language: 'Python',
    createdAt: new Date(2024, 1, 1).toISOString(),
    updatedAt: new Date(2024, 2, 20).toISOString(),
  },
];

export const mockCommits: CommitData[] = [
  {
    id: '1',
    message: 'Initial project setup',
    author: 'John Doe',
    date: new Date(2024, 0, 1).toISOString(),
    hash: 'a1b2c3d4',
  },
  {
    id: '2',
    message: 'Add code analysis features',
    author: 'Jane Smith',
    date: new Date(2024, 0, 2).toISOString(),
    hash: 'e5f6g7h8',
  },
]; 