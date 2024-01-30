import {
  LoaderFunctionArgs,
  useLoaderData,
  // useParams
} from "react-router-dom";
import { COMMON_TITLES } from "src/constant";
import GridPage from "src/components/GridPage";
import { MEDIA_TYPE } from "src/types/Common";
import { CustomGenre, Genre } from "src/types/Genre";
import {
  genreSliceEndpoints,
  // useGetGenresQuery
} from "src/store/slices/genre";
import store from "src/store";

export async function loader({ params }: LoaderFunctionArgs) {
  let genre: CustomGenre | Genre | undefined = COMMON_TITLES.find(
    (t) => t.apiString === (params.genreId as string)
  );
  if (!genre) {
    const genres = await store
      .dispatch(genreSliceEndpoints.getGenres.initiate(MEDIA_TYPE.Movie))
      .unwrap();
    genre = genres?.find((t) => t.id.toString() === (params.genreId as string));
  }

  return genre;
}

export function Component() {
  const genre: CustomGenre | Genre | undefined = useLoaderData() as
    | CustomGenre
    | Genre
    | undefined;
  if (genre) {
    return <GridPage mediaType={MEDIA_TYPE.Movie} genre={genre} />;
  }
  return null;
}

Component.displayName = "GenreExplore";
