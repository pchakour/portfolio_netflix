import { useQuery } from 'graphql-hooks';
import { Carousel } from '../../components/Carousel/Carousel';
import { GraphQLError } from '../../components/GraphQLError';

const QUERY = `{
  education {
    title,
    image,
    description,
    tags,
    school,
    technicalSkills
  }
}`

export function Education() {
  const { loading, error, data } = useQuery(QUERY);

  return (
    <section id="education">
      <h2>Education</h2>
      { error ?
        <GraphQLError error={error} />
      :
        <Carousel cards={data?.education ?? []} padding={50} isLoading={loading} />
      }
    </section>
  );
}