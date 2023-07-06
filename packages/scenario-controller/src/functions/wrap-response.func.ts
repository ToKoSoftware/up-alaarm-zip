import {ApiResponse, ApiResponseData} from '@alaarm/shared';

export function wrapResponse<T>(success: boolean, data?: ApiResponseData | T): ApiResponse<ApiResponseData | T> {
    return {
        success,
        data
    };
}
