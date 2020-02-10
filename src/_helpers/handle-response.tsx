import { authenticationService } from '../_services';

export function handleResponse(response: any) {
    try {
        return response.json().then((res: any) => {
            if (!response.ok) {
                if ([401, 403].indexOf(response.status) !== -1) {
                    authenticationService.logout();
                    window.location.reload(true);
                }
                throw res;
            }
            return res;
        });
    } catch (error) {
        console.log(error);
    }
}
