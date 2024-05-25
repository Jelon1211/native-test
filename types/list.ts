import { Category } from "./categories";

export interface ListHeaderProps {
  categories: Category[];
}

export interface SearchInputProps {
  initialQuery?: string | null;
}
