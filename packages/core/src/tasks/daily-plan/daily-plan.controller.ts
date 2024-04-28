import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CrudController, PaginationParams } from '../../core/crud';
import { DailyPlan } from './daily-plan.entity';
import { DailyPlanService } from './daily-plan.service';
import { IDailyPlan, IEmployee } from '@gauzy/contracts';
import { PermissionGuard, TenantPermissionGuard } from '../../shared/guards';
import { UseValidationPipe } from 'shared';
import { CreateDailyPlanDTO } from './dto';
import { GetTaskByIdDTO } from '../dto';

@ApiTags('Daily Plan')
// @UseGuards(TenantPermissionGuard, PermissionGuard)
@Controller()
export class DailyPlanController extends CrudController<DailyPlan> {
	constructor(private readonly dailyPlanService: DailyPlanService) {
		super(dailyPlanService);
	}

	/**
	 * CREATE Daily Plan
	 */

	@ApiOperation({ summary: 'Create new Daily Plan' })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'Daily Plan has been successfully created.'
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: 'Invalid input, The request body must contain clues as to what went wrong'
	})
	@HttpCode(HttpStatus.CREATED)
	@Post()
	@UseValidationPipe({ transform: true, whitelist: true })
	async create(
		@Body() entity: CreateDailyPlanDTO,
		@Query() params: GetTaskByIdDTO,
		@Query() options: PaginationParams<DailyPlan>
	): Promise<IDailyPlan> {
		return await this.dailyPlanService.createDailyPlan(entity, params, options, entity.taskId);
	}

	/**
	 * GET daily plans for a given employee
	 *
	 * @param options
	 * @returns
	 */
	@ApiOperation({
		summary: 'Find employee daily plans.'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Found plans',
		type: DailyPlan
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'No Record found'
	})
	@Get(':id')
	async getEmployeeDailyPlans(
		@Param('id') employeeId: IEmployee['id'],
		@Query() params: PaginationParams<DailyPlan>
	) {
		return await this.dailyPlanService.getDailyPlansByEmployee(employeeId, params);
	}
}
