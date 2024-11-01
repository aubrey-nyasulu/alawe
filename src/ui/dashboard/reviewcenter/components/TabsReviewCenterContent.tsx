

export default function TabsReviewCenterContent({ placeholder }: { placeholder?: string }) {
    return (
        <div className="w-full p-4">
            {
                placeholder &&
                <p className="text-gray-600">
                    {placeholder}
                </p>
            }
        </div>
    )
}