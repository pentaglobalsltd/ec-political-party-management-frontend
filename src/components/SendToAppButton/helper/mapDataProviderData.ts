import { getDigitBanglaFromEnglish } from "@utils";
import dayjs from "dayjs";

export const mapDataProviderData = (endPoint: string, data: any) => {
    const { moduleUpdated, alreadyPublishedModuleNames,providerHistories } = data;
    const dataExists = alreadyPublishedModuleNames?.includes(endPoint);
    const lastUpdatedAt = moduleUpdated?.find((item:any) => item?.moduleName === endPoint)?.updatedAt;
    const status = moduleUpdated?.find((item: any) => item?.moduleName === endPoint)?.status ?? null;

    const providerHistoryList = providerHistories?.map((item:any)=>{
        const banglaDate = getDigitBanglaFromEnglish(
            dayjs(item?.updatedAt.split('.')[0]).format('YYYY-MM-DD HH:mm')
        )
        const banglaStatus = item?.status === "SUCCESS" ? 'সফল' : item?.status === "RUNNING" ? 'চলছে' : 'ব্যর্থ'
        return {
            ...item,
            updatedAt: banglaDate,
            banglaStatus
        }
    })

    const modifiedUpdatedDate = lastUpdatedAt ? getDigitBanglaFromEnglish(
        dayjs(lastUpdatedAt.split('.')[0]).format('YYYY-MM-DD HH:mm')
    ) : null;

    return { dataExists, modifiedUpdatedDate,status,providerHistoryList };
};