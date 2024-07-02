import { api } from "./api";

interface GetLocationsInput {
  companyId: string;
}

interface GetAssetsInput {
  companyId: string;
}

interface Company {
  id: string;
  name: string;
}

export interface LocationI {
  id: string;
  name: string;
  parentId: string | null;
}

export interface Asset {
  gatewayId: string;
  id: string;
  locationId: string | null;
  name: string;
  parentId: string | null;
  sensorId: string | null;
  sensorType: string | null;
  status: string;
}

export const companyService = {
  getCompanies: async (): Promise<Company[]> => {
    const { data: companies } = await api.get("/companies");

    return companies;
  },
  getLocations: async ({
    companyId,
  }: GetLocationsInput): Promise<LocationI[]> => {
    const { data: locations } = await api.get(
      `/companies/${companyId}/locations`
    );

    return locations;
  },
  getAssets: async ({ companyId }: GetAssetsInput): Promise<Asset[]> => {
    const { data: assets } = await api.get(`/companies/${companyId}/assets`);

    return assets;
  },
};
