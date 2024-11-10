import { useQuery } from "@tanstack/react-query";

const useFetchProfile = () => {
  return useQuery({
    queryKey: ["/GET /accout/profile"],
    queryFn: async () => Promise.reject("HAHA"),
  });
};

export default useFetchProfile;
