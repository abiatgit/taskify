import { OrganizationList } from "@clerk/nextjs/";

export default function CreateOrganization() {
  return (
    <div>
      <OrganizationList
        hidePersonal
        afterSelectOrganizationUrl={"/organization/:id"}
        afterCreateOrganizationUrl={"/organization/:id"}
      />
    </div>
  );
}
