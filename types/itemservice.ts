export interface IApiConfig {
  baseURL: string;
  timeout?: number;
}

export interface IItem {
  title: string;
  description: string;
  status: "open" | "closed";
  level: "active" | "inactive";
  item_type: string;
  owner: string;
  lon: number;
  lat: number;
  md_text: string;
  created_by: string;
}
