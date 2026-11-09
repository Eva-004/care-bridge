interface Filters {
  search: string;
  category: string;
  urgency: string;
}
interface HelpRequestDocument {
  fileId: string;
  name: string;
  type: string;
  url?: string;
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

export const getCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/helpCategories`);
  const data = await res.json();
  return data;
}
export const getRequestById = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/helpRequests/${id}`);
  const data = await res.json();
  return {
    ...data,
    documents: data.documents?.map((doc: HelpRequestDocument) => ({
      ...doc,
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/files/${doc.fileId}`,
    })),
  };
}

