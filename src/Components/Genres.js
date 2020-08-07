import { movieApi } from "api";
export default async () => {
  const {
    data: { genres },
  } = await movieApi.movieGenres();
  console.log(genres);
};
