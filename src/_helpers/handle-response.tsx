import { authenticationService } from '../_services';

export function handleResponse(response: Response) {
    try {
        return response.text().then((text: string) => {
            // console.log(text);

            const data = text && JSON.parse(text);
            if (!response.ok) {
                if ([401, 403].indexOf(response.status) !== -1) {
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    // authenticationService.logout();
                    // window.location.reload(true);
                }

                const error = (data && data.message) || response.statusText;
                return error;
            }
            return data;
        });
    } catch (error) {
        console.log(error);

    }
}
