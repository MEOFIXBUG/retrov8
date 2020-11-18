import authHeader from './auth-header';
import postData from './postData';
import Delete from './Delete';
import Put from './Put';
const API_URL = 'https://retrov8.herokuapp.com/api/jobs/';

class JobService {
    async InsertJob(input, type, id) {

        const header = authHeader();
        return await postData(API_URL + 'ofboard/'+id, {
            "ByName": input,
            "Type": type
        }, header)

    }
    async UpdateJob(id,input, type) {

        const header = authHeader();
        return await Put(API_URL + id, {
            "ByName": input,
            "Type": type
        }, header)

    }
    async DeleteJob(id) {
        return await Delete(API_URL + id, authHeader());

    }
}

export default new JobService();
