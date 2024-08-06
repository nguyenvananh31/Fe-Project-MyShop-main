import { EyeOutlined } from "@ant-design/icons";
import { Imovies } from "../InterFace/movies"
import { Link } from "react-router-dom";

interface MovieComponentProps {
    moviesData: Imovies;
}
const movieComponent: React.FC<MovieComponentProps> = ({ moviesData }) => {
    const firstUrl = moviesData.thumb_url[0];
    return (
        <div className="my-3">
            <Link to={`/phim/${moviesData.slug}/${moviesData.id}`} className="block">
                <div className="aspect-w-2 aspect-h-1 rounded-2xl border shadow overflow-hidden bg-gray-100">
                    <img src={firstUrl}  loading="lazy" className="object-center object-cover w-full" />
                </div>

                <div className="p-2 space-y-1">
                    <div className="flex items-start justify-between gap-4">
                        <h3 className="flex-1 text-base font-medium text-gray-900">
                           {moviesData.name}
                        </h3>

                        <span className="mt-1 shrink-0 text-xs inline-flex items-center gap-1">
                            {moviesData.view} <EyeOutlined />
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default movieComponent
