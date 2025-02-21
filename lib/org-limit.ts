import { auth } from "@clerk/nextjs/server";

import { db } from "./db";
import { MAX_FREE_BOARD } from "@/constants/board";

export const incrementAvilabelCount = async () => {
  const { orgId } = await auth();
  if (!orgId) {
    throw new Error("Unauthorized");
  }
  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });
  if (orgLimit ) {
    await db.orgLimit.update({
      where: { orgId },
      data: { count: orgLimit.count + 1 },
    });
  } else {
    await db.orgLimit.create({
      data: { orgId, count: 1 },
    });
  }
};

export const decreaseAvilabelCount = async () => {
  const { orgId } = await auth();
  if (!orgId) {
    throw new Error("Unauthorized");
  }
  const orgLimt = await db.orgLimit.findUnique({
    where: { orgId },
  });
  if (orgLimt) {
    await db.orgLimit.update({
      where: { orgId },
      data: { count: orgLimt.count > 0 ? orgLimt.count - 1 : 0 },
    });
  } else {
    await db.orgLimit.create({
      data: { orgId, count: 1 },
    });
  }
};

export const hasAvailabelCount = async () => {
  const { orgId } = await auth();
  if (!orgId) {
    throw new Error(" Unauhorized");
  }
  const OrgLimit = await db.orgLimit.findUnique({
    where: {
      orgId,
    },
  });
  if(!OrgLimit || OrgLimit.count< MAX_FREE_BOARD){
    return true
  }
  else{
    return false
  }
};

export const getAvailableCount= async ()=>{
    
    const {orgId}=await auth()
    
    if(!orgId){
        return 0
    }
    const orgLimit=await db.orgLimit.findUnique({
        where:{orgId}
    })
    console.log("i came to getAvailableCount ",orgLimit)
    if(!orgLimit){
        return 0
    }
    return orgLimit.count
}
