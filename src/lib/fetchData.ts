interface Filters {
  search: string;
  category: string;
  urgency: string;
}

export const getRequests = async (filters?: Filters) => {
  const params = new URLSearchParams();

  if (filters?.search) params.append("search", filters.search);
  if (filters?.category) params.append("category", filters.category);
  if (filters?.urgency) params.append("urgency", filters.urgency);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/helpRequests?${params.toString()}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch help requests");
  }

  return res.json();
};

export const getCategories = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/helpCategories`);
    const data = await res.json();
 return data;
}
