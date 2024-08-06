import MovieComponent from "../components/movieComponent"
import { Imovies } from "../InterFace/movies"
import { useMoviesList } from "../services/movies"

const Listmovie = () => {
    const {data} = useMoviesList()

    
    return (
        <div className="block relative group transition hover:scale-105 hover:-rotate-1 max-w-[15%]">
                        {
                data?.data ? (
                    <div>
                        {data?.data.map((movie: Imovies) => (
                            <div key={movie.id}>
                                <MovieComponent moviesData={movie}/>

                            </div>
                        ))}
                    </div>
                ) : (<></>)
            }

            
        </div>
    )
}

export default Listmovie
