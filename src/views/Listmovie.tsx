import MovieComponent from "../components/movieComponent"

const Listmovie = () => {
    return (
        <div className="block relative group transition hover:scale-105 hover:-rotate-1 max-w-[15%]">
            <MovieComponent />
        </div>
    )
}

export default Listmovie
