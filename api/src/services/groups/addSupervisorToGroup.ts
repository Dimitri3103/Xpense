import groupRepository from "../../repositories/groupRepository";

export default async (groupId: string, userId: string) => {
  const group = await groupRepository.getById(groupId);
  if (group) {
    group.supervisors?.push(userId);
    await groupRepository.edit(groupId, { supervisors: group.supervisors! });
  }
};
