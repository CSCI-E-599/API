import { singleton } from 'tsyringe';
import axios from 'axios';

@singleton()
export class PatentsService {
  getPatentById = async (patentNumber: string): Promise<boolean> => {
    const usptoResponse = await axios.get(`https://api.patentsview.org/patents/query?q={"patent_number":"${patentNumber}"}&f=["appcit_app_number", "appcit_category"]`);
    // console.log(usptoResponse.data.patents);
    return true;
  };
}
