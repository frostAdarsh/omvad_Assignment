import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllURL, removeURL } from "../src/lib/api";
import toast from "react-hot-toast";
import { Trash2 } from 'lucide-react';
import { LoaderCircle } from 'lucide-react';

const ShowURLData = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userBookmarks"],
    queryFn: getAllURL,
  });

  const { mutate: deleteBookmark, isPending } = useMutation({
    mutationFn: removeURL,
    onSuccess: () => {
      toast.success("Bookmark deleted");
      queryClient.invalidateQueries({ queryKey: ["userBookmarks"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Delete failed");
    },
  });

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this bookmark?")) {
      deleteBookmark(id);
    }
  };

  if (isLoading) return <p className="text-center mt-4">Loading...</p>;

  if (isError) {
    toast.error("Failed to load bookmarks");
    return (
      <p className="text-center mt-4 text-red-500">Something went wrong.</p>
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className="text-center mt-4 text-gray-500">No bookmarks found.</p>
    );
  }

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">All URLs</h1>
      <div className="space-y-4">
        {data.map((bookmark) => (
          <div
            key={bookmark._id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm flex items-start gap-4"
          >
            <img
              src={bookmark.favicon}
              alt="favicon"
              className="w-6 h-6 mt-1"
              onError={(e) => (e.target.style.display = "none")}
            />
            <div className="flex-1">
              <h3 className="font-medium text-lg">{bookmark.title}</h3>
              <p className="text-sm text-gray-600 whitespace-pre-line mt-1 max-h-32 overflow-y-auto pr-2 overflow-x-auto">
                {bookmark.smallText}
              </p>
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 text-sm hover:underline mt-2 inline-block"
              >
                Visit URL
              </a>
            </div>
            <button
              onClick={() => handleDelete(bookmark._id)}
              className="text-sm  text-green-400/40 px-3 py-1 rounded-lg hover:text-green-500"
              disabled={isPending}
            >
              {isPending ? <LoaderCircle className="animate-spin cursor-pointer" /> : <Trash2 className="cursor-pointer"/>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowURLData;
