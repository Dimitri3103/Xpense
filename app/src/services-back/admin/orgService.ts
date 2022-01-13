import { httpClient } from "../../utils/httpClient";
import OrgConfiguration from "../../models/org";

const getOrgConfig = async (orgId: string): Promise<OrgConfiguration> => {
  const { data } = await httpClient.get<OrgConfiguration>(`/org/${orgId}`);
  return data;
};

const updateOrg = async (
  orgId: string,
  payload: any
): Promise<OrgConfiguration> => {
  const { data } = await httpClient.put<OrgConfiguration>(
    `/org/${orgId}`,
    payload
  );
  return data;
};

export { getOrgConfig, updateOrg };
