import { HttpHeaders } from "@angular/common/http";

export abstract class UtilityHelper {

    public static baseUrl = "http://localhost:5170/";

    public static httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            // 'Authorization': this.basic
        })
    };

}
