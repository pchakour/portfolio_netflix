import { useQuery } from 'graphql-hooks';
import { Carousel } from '../../components/Carousel';
import { GraphQLError } from '../../components/GraphQLError';

const QUERY = `{
  experience {
    title,
    image,
    description,
    tags,
    technicalSkills
  }
}`

export function Experience() {
  const { loading, error, data } = useQuery(QUERY);

  return (
    <section id="experience">
      <h2>Experience</h2>
      { error ?
        <GraphQLError error={error} />
      :
        <Carousel cards={data?.experience ?? []} padding={50} isLoading={loading} />
      }
    </section>
  );
}