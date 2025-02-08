
import {startCase,} from "lodash"
import OrgControl from "./_componets/org-control";
import { auth } from "@clerk/nextjs/server";
export async function generateMetadata() {
  const {orgSlug}= await auth()
  return{
    title:startCase(orgSlug|| "organization")
  }
  
}
const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};
export default OrganizationIdLayout;
