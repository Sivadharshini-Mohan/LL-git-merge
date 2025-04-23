import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockGraphQLClient } from '../lib/mockGraphQLClient';
import type { Project, CommitData } from '../types/graphql';

// Query keys
export const queryKeys = {
  projects: ['projects'] as const,
  project: (id: string) => ['project', id] as const,
  commits: ['commits'] as const,
  languages: ['languages'] as const,
};

// Queries
export function useLanguages() {
  return useQuery({
    queryKey: queryKeys.languages,
    queryFn: async () => {
      const { data } = await mockGraphQLClient.query<{ languages: string[] }>({
        query: `
          query GetLanguages {
            languages
          }
        `,
      });
      return data.languages;
    },
  });
}

export function useProjects() {
  return useQuery({
    queryKey: queryKeys.projects,
    queryFn: async () => {
      const { data } = await mockGraphQLClient.query<{ projects: Project[] }>({
        query: `
          query GetProjects {
            projects {
              id
              name
              description
              repositoryUrl
              language
              createdAt
              updatedAt
            }
          }
        `,
      });
      return data.projects;
    },
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: queryKeys.project(id),
    queryFn: async () => {
      const { data } = await mockGraphQLClient.query<{ project: Project }>({
        query: `
          query GetProject($id: ID!) {
            project(id: $id) {
              id
              name
              description
              repositoryUrl
              language
              createdAt
              updatedAt
            }
          }
        `,
        variables: { id },
      });
      return data.project;
    },
    enabled: !!id,
  });
}

export function useCommits() {
  return useQuery({
    queryKey: queryKeys.commits,
    queryFn: async () => {
      const { data } = await mockGraphQLClient.query<{ commits: CommitData[] }>({
        query: `
          query GetCommits {
            commits {
              id
              message
              author
              date
              hash
            }
          }
        `,
      });
      return data.commits;
    },
  });
}

// Mutations
export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
      const { data } = await mockGraphQLClient.mutate<{ createProject: Project }>({
        mutation: `
          mutation CreateProject($input: ProjectInput!) {
            createProject(input: $input) {
              id
              name
              description
              repositoryUrl
              language
              createdAt
              updatedAt
            }
          }
        `,
        variables: { input },
      });
      return data.createProject;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Project> & { id: string }) => {
      const { data } = await mockGraphQLClient.mutate<{ updateProject: Project }>({
        mutation: `
          mutation UpdateProject($input: UpdateProjectInput!) {
            updateProject(input: $input) {
              id
              name
              description
              repositoryUrl
              language
              updatedAt
            }
          }
        `,
        variables: { input: { id, ...updates } },
      });
      return data.updateProject;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects });
      queryClient.invalidateQueries({ queryKey: queryKeys.project(data.id) });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await mockGraphQLClient.mutate<{ deleteProject: { id: string; success: boolean } }>({
        mutation: `
          mutation DeleteProject($id: ID!) {
            deleteProject(id: $id) {
              id
              success
            }
          }
        `,
        variables: { id },
      });
      return data.deleteProject;
    },
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects });
      queryClient.invalidateQueries({ queryKey: queryKeys.project(id) });
    },
  });
} 