import { Carousel } from '../../components/Carousel';
import { useQuery } from 'graphql-hooks';
import { GraphQLError } from '../../components/GraphQLError';

const QUERY = `{
  projects {
    title,
    image,
    video,
    description,
    tags,
    gitRepository,
    company,
    technicalSkills
  }
}`

export function Projects() {
  const { loading, error, data } = useQuery(QUERY);

  return (
    <section id="projects">
      <h2>Projects</h2>
      { error ?
        <GraphQLError error={error} />
      :
        <Carousel cards={data?.projects ?? []} padding={50} isLoading={loading} />
      }
    </section>
  );
}