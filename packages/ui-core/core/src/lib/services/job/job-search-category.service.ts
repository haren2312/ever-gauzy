import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { IJobSearchCategory, IPagination } from '@gauzy/contracts';
import { toParams } from '@gauzy/ui-core/common';
import { API_PREFIX } from '@gauzy/ui-core/common';

@Injectable({
	providedIn: 'root'
})
export class JobSearchCategoryService {
	constructor(private readonly http: HttpClient) {}

	getAll(request?: any) {
		return firstValueFrom(
			this.http.get<IPagination<IJobSearchCategory>>(`${API_PREFIX}/job-preset/job-search-category`, {
				params: request ? toParams(request) : {}
			})
		);
	}

	create(request?: IJobSearchCategory) {
		return firstValueFrom(
			this.http.post<IJobSearchCategory>(`${API_PREFIX}/job-preset/job-search-category`, request)
		);
	}
}
