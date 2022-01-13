import groupRepository from "../../repositories/groupRepository";

export default async (groupId: string, userId: string) => {
  const group = await groupRepository.getById(groupId);
  if (group && group.supervisors?.some((m) => m === userId)) {
    const { supervisors } = group;
    const index = supervisors?.indexOf(userId);
    supervisors?.splice(index, 1);
    await groupRepository.edit(groupId, { supervisors });
  }
};
