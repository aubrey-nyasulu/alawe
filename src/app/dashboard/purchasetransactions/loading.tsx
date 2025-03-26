export default function Loading() {
    return <div className="absolute top-[50%] left-[50%] md:left-[40%] -translate-x-[50%] -translate-y-[50%]">
        <div className="flex-col gap-4 w-full flex items-center justify-center">
            <div
                className="w-20 h-20 border-4 border-transparent text-primary text-4xl animate-spin flex items-center justify-center border-t-primary rounded-full"
            >
                <div
                    className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
                ></div>
            </div>
        </div>
    </div>
}