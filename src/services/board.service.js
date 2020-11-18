import authHeader from './auth-header';
import postData from './postData';
import Delete from './Delete';
import Put from './Put';
const API_URL = 'https://retrov8.herokuapp.com/api/boards/';

class BoardService {
    async getUserBoard() {
        return await fetch(API_URL , { headers: authHeader() });
    }
    async getSharedBoard() {
        return await fetch(API_URL + 'shared', { headers: authHeader() });
    }
    async getJobsOfBoard(id) {
        return await fetch(API_URL + id, { headers: authHeader() });
    }
    async getBoardByID(id) {
        return await fetch(API_URL +'detail/'+ id, { headers: authHeader() });
    }
    async InsertBoard(data) {
        return await postData(API_URL , {
            "ByName": data,
        }, authHeader() );
    }
    async DeleteBoard(id) {
        return await Delete(API_URL + id, authHeader());
            
    }
    async UpdateBoard(id,boardName) {

        const header = authHeader();
        return await Put(API_URL + id, {
            "ByName": boardName,
        }, header)

    }
    async PublishBoard(id,flag) {

        const header = authHeader();
        return await Put(API_URL + id, {
            "IsPublished": flag,
        }, header)

    }
}

export default new BoardService();
