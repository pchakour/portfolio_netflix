import data from '../../../data/experience.json';

const experienceKeys = Object.keys(data.experience[0]);
const Experience: Record<string, (obj: any) => void> = {};

for (const experienceKey of experienceKeys) {
  Experience[experienceKey] = (obj: any) => {
    return obj[experienceKey];
  }
}

export default {
  Query: {
    experience() {
      return data.experience;
    }
  },
  Experience,
}