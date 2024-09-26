import data from '../../../data/projects.json';

const projectKeys = Object.keys(data.projects[0]);
const Project: Record<string, (obj: any) => void> = {};

for (const projectKey of projectKeys) {
  Project[projectKey] = (obj: any) => {
    return obj[projectKey];
  }
}

export default {
  Query: {
    projects() {
      return data.projects;
    }
  },
  Project,
}