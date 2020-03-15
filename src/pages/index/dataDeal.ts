import {fetch} from "../../utils/fetch";
import { API_MAP } from '../../config/API_MAP'
import {showModal} from '../../utils/showModal'

/**
 * 城市信息
 */
export async function getCity() {
    const ret = await fetch.get(API_MAP.getCity).catch(() => ({}));

    const cityList = ret.cityList ? ret.cityList.map((item, index) => {
        return {
            code: item.itemValue || `${index}`,
            name: item.itemName || ''
        }
    }) : [];

    return {
        curCity: {
            code: ret.currCityCode || '',
            name: ret.currCityName || ''
        },
        cityList: cityList
    }
}

/**
 * 获取城市
 * @param cityCode
 * @param developerName
 * @param pageNum
 */
export async function getActivies(cityCode, developerName, pageNum) {
    const ret = await fetch.get(API_MAP.projectList, {
        cityCode: cityCode,
        developerProject: developerName,
        currentPage: pageNum,
        pageSize: 10
    })
        .catch((e) => {
            showModal(e.msg);

            return {}
        });

    const list = ret.list ? ret.list.map((item) => {
        return {
            id: item.activityId || '',
            developerName: item.developerName || '',
            projectName: item.projectName || '',
            desc: item.address || '',
            imgUrl: item.displayPicture ?  item.displayPicture[0] : null
        }
    }): [];

    return {
        list,
        total: ret.total || 0
    }
}
