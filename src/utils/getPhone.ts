import { fetch } from './fetch'
import { API_MAP } from '../config/API_MAP'
import { login } from './login'
import { showModal } from './showModal'

/**
 * 获取手机号
 * @param iv
 * @param encryptedData
 */
export async function getPhone(iv, encryptedData): Promise<{phoneNumber: string}>   {
    // 登录
    try {
        await login();
    } catch (msg) {

        showModal(msg);

        return {
            phoneNumber: ''
        }
    }

    // 网关获取手机号
    const ret = await fetch.post(
        API_MAP.getPhone,
        {
            encryptedData: encryptedData,
            iv: iv
        }
    ).catch((e) => {
        showModal(e.msg);
        return {}
    });

    const phoneNumber = ret.phoneNumber || '';

    if (!phoneNumber) {
        return {
            phoneNumber: ''
        }
    }

    // 传到业务方保存手机号
    const hasSavedPhone = await fetch.post(API_MAP.savePhone, {"mobile": phoneNumber}).catch((e) => {
        showModal(e.msg);
    });

    return {
        phoneNumber: hasSavedPhone ? phoneNumber : ''
    }
}
