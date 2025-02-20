import { auth, currentUser } from "@clerk/nextjs/server";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { db } from "./db";

interface Props {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}
export const createAuditLog = async (prop: Props) => {
  try {
    const{ orgId }= await auth();
    const user=await currentUser()
    if(!orgId || !user){
        throw new Error("user not found")
    }
    const {entityId,entityType,entityTitle,action}=prop
    await db.auditLog.create({
        data:{
            orgId,
            entityId,
            entityType,
            entityTitle,
            action,
            userId:user.id,
            userImage:user?.imageUrl,
            userName:user?.firstName+" "+user?.lastName
        }
    })
  } catch (error) {
    console.log(error);
  }
};
