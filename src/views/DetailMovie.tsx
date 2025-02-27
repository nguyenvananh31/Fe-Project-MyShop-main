
import { useParams } from 'react-router-dom'
import { useMovieDetail } from '../services/movies'
import { useGetcate } from '../services/categoryes';

const DetailMovie = () => {
  const {id} = useParams()

  const { data } = useMovieDetail(id);
  const firstUrl = data?.data.thumb_url[0];
    const {data :categories} = useGetcate()
    
    
    

      
  
  return (
    <div>
     {data?.data ? (
      <>
     <div className="bg-gray-100 dark:bg-gray-800 py-8">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
                <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                    <img className="w-full h-full object-cover" src={firstUrl} alt="Product Image" />
                </div>
                <div className="flex -mx-2 mb-4">
                    <div className="w-1/2 px-2">
                        <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Add to Cart</button>
                    </div>
                    <div className="w-1/2 px-2">
                        <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Add to Wishlist</button>
                    </div>
                </div>
            </div>
            <div className="md:flex-1 px-4 mb-5">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{data?.data.name}</h2>
                
                <div className=" mb-5">
                    <div className="mr-4 mb-5">
                        <span className="font-bold text-gray-700 dark:text-gray-300">Diễn Viên : </span>
                        <span className="text-gray-600 dark:text-gray-300">{data?.data.actor}</span>
                    </div>
                    <div>
                        <span className="font-bold text-gray-700 dark:text-gray-300">Phim Chiếu Rạp:</span>
                        <span className="text-gray-600 dark:text-gray-300">{data?.data.lang}</span>
                    </div>
                </div>
                <div className="mb-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Số Tập : </span>
                    {data?.data.episode_total}
                </div>
                <div className="mb-4">
                    <span className="font-bold text-gray-700 dark:text-gray-300">Thể loại phim:</span>
                    <div className="flex items-center mt-2">
                        <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">{data?.data.category_id}</button>

                    </div>
                </div>
                <div>
                    <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                        sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut
                        lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit. Quisque
                        ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum lacinia, non
                        sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt mi consectetur.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
     </>) : (<></>)}
    </div>
  )
}

export default DetailMovie
