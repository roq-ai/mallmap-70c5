import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface MallInterface {
  id?: string;
  name: string;
  location: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface MallGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  location?: string;
  organization_id?: string;
}
