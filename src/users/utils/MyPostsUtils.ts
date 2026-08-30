import { AnimalPostStatus, type StatusUtil } from "@/common/utils/AnimalPostUtils";

export const MyPostStatus: Record<string, StatusUtil | undefined> = {
    ...AnimalPostStatus,
    'CREATED': undefined,
    'COMPLETED': undefined,
    'FINISHED': undefined
};