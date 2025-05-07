import React from "react";
import { DatabaseZap } from "lucide-react";

import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../src/lib/api";

const Navbar = () => {
 
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logout successful!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Logout failed");
    },
  });

  const handleLogout = () => {

    mutate();
  };

  return (
    <div className="bg-white shadow-md border-b border-gray-200">
      <div className="mx-auto px-7 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DatabaseZap className="size-6 text-green-400/40" />
          <span className="text-lg font-semibold text-gray-800">
            URL Scraperr
          </span>
        </div>

        <button
          onClick={handleLogout}
          disabled={isPending}
          className="bg-green-400/40 hover:bg-green-400 text-white font-medium px-4 py-1.5 rounded-lg transition cursor-pointer disabled:opacity-60"
        >
          {isPending ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
