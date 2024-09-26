import data from '../../../data/education.json';

const educationKeys = Object.keys(data.education[0]);
const Education: Record<string, (obj: any) => void> = {};

for (const educationKey of educationKeys) {
  Education[educationKey] = (obj: any) => {
    return obj[educationKey];
  }
}

export default {
  Query: {
    education() {
      return data.education;
    }
  },
  Education,
}