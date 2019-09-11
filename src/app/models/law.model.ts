import { User } from './user.model';

export class Law {
  id?: number;
  title?: string;
  law_class?: string;
  fine_amount?: number;
  law_category?: LawCategory;
  law_category_id?: number;
  jurisdiction_id: number;
  created_by_id?: number;
  created_by?: User;
}

export class LawCategory {
  id?: number;
  title?: string;
  ordinal?: number;
  created_by_id?: number;
  created_by?: User;
  laws?: Law[];
  jurisdiction_id: number;
  newLaw: Law;
}

export class Jurisdiction {
  id?: number;
  title?: string;
  categories?: LawCategory[];
}