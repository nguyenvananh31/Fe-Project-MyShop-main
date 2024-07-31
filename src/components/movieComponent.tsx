
const movieComponent = () => {
    return (
        <div>
            <a href="#" target="_blank" className="block">
                <div className="aspect-w-2 aspect-h-1 rounded-2xl border shadow overflow-hidden bg-gray-100">
                    <img src="" loading="lazy" className="object-center object-cover w-full" />
                </div>

                <div className="p-2 space-y-1">
                    <div className="flex items-start justify-between gap-4">
                        <h3 className="flex-1 text-base font-medium text-gray-900">
                            Here goes youe article title
                        </h3>

                        <span className="mt-1 shrink-0 text-xs inline-flex items-center gap-1">
                            34233

                        </span>
                    </div>

                    <p className="text-sm text-gray-500">
                        by John Doe
                    </p>
                </div>
            </a>
        </div>
    )
}

export default movieComponent
